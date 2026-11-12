from decimal import Decimal, InvalidOperation
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.core.cache import cache
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse
from django.views.decorators.http import require_http_methods
import hashlib
import hmac
import logging
import uuid
import json
import re
import math
from functools import lru_cache
from io import BytesIO
from pathlib import Path
import razorpay
from datetime import date, timedelta
from products.models import Product, Category
from accounts.forms import AdminProfileForm
from accounts.models import AdminProfile

from django.core.paginator import Paginator
from django.db.models import Q, Avg
from django.db.models import F, Sum, Count
from django.db.models.functions import TruncDate
from django.utils import timezone
from django.utils.http import url_has_allowed_host_and_scheme
from django.http import HttpResponse, JsonResponse
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from xml.sax.saxutils import escape as escape_xml
from collections import OrderedDict
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

import requests
from django.conf import settings
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.db import IntegrityError, transaction
from rest_framework_simplejwt.tokens import RefreshToken

from store.models import (Coupon, Order, OrderItem, OrderCancellation, Refund,
                          ReturnPolicy, ReturnRequest, ReplacementRequest,
                          OrderStatusHistory)
from store.models import GSTCatalogProduct
from .gst import calculate_cart, SUPPLIER_STATE, INDIAN_STATES
from .coupons import calculate_checkout_quote, coupon_usage_count
from .refunds import create_refund_record, submit_refund, record_gateway_refund_event, is_razorpay_order, unrefunded_balance
from tracking.services import ensure_tracking_session
from merchants.models import MerchantActivity, MerchantOrder, MerchantOrderItem, MerchantProduct, MerchantProfile, MerchantCategory, MerchantCoupon, MerchantReview, MerchantPayout, MerchantSupportTicket
from electronics.models import ElectronicsProduct, ElectronicsCategory
from .forms import CustomerPasswordResetRequestForm, CustomerSetPasswordForm

logger = logging.getLogger(__name__)


FASHION_PRODUCTS = [
    {
        "id": "urban-overshirt", "name": "Relaxed Cotton Overshirt", "brand": "Roadster",
        "category": "men", "type": "Shirts", "price": 899, "mrp": 1999, "rating": 4.4,
        "image": "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JUNE/14/m0P6G8rD_a502801216244c4682db716ed6cb2802.jpg",
    },
    {
        "id": "classic-polo", "name": "Pure Cotton Polo T-shirt", "brand": "H&M",
        "category": "men", "type": "T-shirts", "price": 699, "mrp": 1299, "rating": 4.3,
        "image": "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JUNE/14/RYMjxwpf_c75bb124d411422d9b7ce3cb58650c00.jpg",
    },
    {
        "id": "mens-sports-edit", "name": "Performance Sports T-shirt", "brand": "HRX",
        "category": "men", "type": "Sportswear", "price": 799, "mrp": 1599, "rating": 4.4,
        "image": "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JUNE/14/oFgyKUkR_4032eec0f23b4f4abd82038a84541509.jpg",
    },
    {
        "id": "mens-lounge-edit", "name": "Relaxed Lounge Joggers", "brand": "Roadster",
        "category": "men", "type": "Loungewear", "price": 899, "mrp": 1799, "rating": 4.2,
        "image": "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JUNE/14/TaRkAho2_e1da787543e54a27ae8cf3dabdb9652f.jpg",
    },
    {
        "id": "mens-ethnic-edit", "name": "Printed Casual Kurta", "brand": "Manyavar",
        "category": "men", "type": "Ethnic Wear", "price": 1299, "mrp": 2599, "rating": 4.5,
        "image": "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2026/JUNE/14/gG6vjm0y_94f74c13330c453dbf82be77578f0582.jpg",
    },
    {"id": "roadster-pure-cotton", "name": "Pure Cotton Casual Shirt", "brand": "Roadster", "category": "men", "type": "Shirts", "price": 649, "mrp": 2499, "rating": 4.2, "color": "Blue", "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85"},
    {"id": "mischief-solid", "name": "Men Solid Cotton Casual Shirt", "brand": "MISCHIEF MONKEY", "category": "men", "type": "Shirts", "price": 793, "mrp": 2088, "rating": 4.2, "color": "White", "image": "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85"},
    {"id": "wrogn-slim-fit", "name": "Slim Fit Casual Shirt", "brand": "WROGN", "category": "men", "type": "Shirts", "price": 1199, "mrp": 2399, "rating": 4.2, "color": "Green", "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85"},
    {"id": "vestirio-cotton", "name": "Men Cotton Casual Shirt", "brand": "NEW Vestirio", "category": "men", "type": "Shirts", "price": 612, "mrp": 3999, "rating": 4.6, "color": "Blue", "image": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=700&q=85"},
    {"id": "tigc-casual", "name": "Men Casual Shirt", "brand": "The Indian Garage Co", "category": "men", "type": "Shirts", "price": 559, "mrp": 1749, "rating": 4.3, "color": "Black", "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"},
    {"id": "cahoot-opaque", "name": "Opaque Casual Shirt", "brand": "CAHOOT", "category": "men", "type": "Shirts", "price": 1199, "mrp": 1999, "rating": 3.9, "color": "Navy Blue", "image": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=700&q=85"},
    {"id": "roadster-cotton", "name": "Men Cotton Casual Shirt", "brand": "Roadster", "category": "men", "type": "Shirts", "price": 654, "mrp": 1599, "rating": 4.4, "color": "Grey", "image": "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=700&q=85"},
    {"id": "shirt-code-slim", "name": "Slim Fit Casual Shirt", "brand": "THE SHIRT CODE", "category": "men", "type": "Shirts", "price": 714, "mrp": 2199, "rating": 4.1, "color": "Beige", "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85"},
    {"id": "highlander-opaque", "name": "Slim Fit Opaque Casual Shirt", "brand": "HIGHLANDER", "category": "men", "type": "Shirts", "price": 449, "mrp": 1799, "rating": 4.2, "color": "Blue", "image": "https://images.unsplash.com/photo-1602810319428-01920f0d6e4d?auto=format&fit=crop&w=700&q=85"},
    {"id": "roadster-chambray", "name": "Chambray Casual Shirt", "brand": "Roadster", "category": "men", "type": "Shirts", "price": 653, "mrp": 1499, "rating": 4.2, "color": "Blue", "image": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=700&q=85"},
    {"id": "here-now-slim", "name": "Slim Fit Casual Shirt", "brand": "HERE&NOW", "category": "men", "type": "Shirts", "price": 786, "mrp": 1999, "rating": 4.4, "color": "White", "image": "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=85"},
    {"id": "mast-harbour-casual", "name": "Casual Shirt", "brand": "Mast & Harbour", "category": "men", "type": "Shirts", "price": 697, "mrp": 3999, "rating": 4.2, "color": "Green", "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85"},
    {"id": "powerlook-checked", "name": "Men Checked Casual Shirt", "brand": "Powerlook", "category": "men", "type": "Shirts", "price": 1403, "mrp": 2699, "rating": 4.2, "color": "Navy Blue", "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"},
    {"id": "adrom-cargo", "name": "Mens Cargo Shirt Army Style", "brand": "ADRO", "category": "men", "type": "Shirts", "price": 1299, "mrp": 2499, "rating": 3.8, "color": "Green", "image": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85"},
    {"id": "kenneth-cotton", "name": "Pure Cotton Casual Shirt", "brand": "Kenneth Cole", "category": "men", "type": "Shirts", "price": 989, "mrp": 2199, "rating": 4.2, "color": "White", "image": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=700&q=85"},
    {
        "id": "wide-leg-denim", "name": "Wide Leg High-Rise Jeans", "brand": "ONLY",
        "category": "women", "type": "Jeans", "price": 1199, "mrp": 2499, "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "floral-dress", "name": "Printed Midi Dress", "brand": "Biba",
        "category": "women", "type": "Dresses", "price": 1499, "mrp": 2999, "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "kids-hoodie", "name": "Graphic Fleece Hoodie", "brand": "Myntra",
        "category": "kids", "type": "Winterwear", "price": 799, "mrp": 1599, "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "kids-sneaker", "name": "Colourblock Everyday Sneakers", "brand": "Puma",
        "category": "kids", "type": "Footwear", "price": 1099, "mrp": 2199, "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "minimal-watch", "name": "Minimal Mesh Strap Watch", "brand": "Fossil",
        "category": "watches", "type": "Watches", "price": 2499, "mrp": 5995, "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "sport-watch", "name": "Smart Active Watch", "brand": "Noise",
        "category": "watches", "type": "Watches", "price": 1799, "mrp": 3999, "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=85",
    },
    {"id": "timex-twntg04", "name": "Men Leather Strap Analogue Watch TWNTG04SMU01", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2399, "mrp": 4995, "rating": 4.3, "color": "Black", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_75%2Cw_1080/v1/assets/images/30990824/2024/9/18/aca49558-e546-4ecb-8b7b-0d0297fd3fb31726646795696-Timex-Analogue-White-Dial-Men-Watch---TWNTG04SMU01-373172664-1.jpg"},
    {"id": "timex-tw0tg8010", "name": "Men White Dial Gold-Toned Analogue Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2999, "mrp": 5995, "rating": 4.4, "color": "Gold", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_75%2Cw_1080/v1/assets/images/17697496/2023/6/26/c18e6cc9-da89-4a8d-be16-6ba79f88957c1687765095917TimexMenWhiteDialGoldTonedAnalogueWatchTW0TG80101.jpg"},
    {"id": "timex-tw00zr261e", "name": "Men Off-White Dial Analogue Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 1799, "mrp": 3995, "rating": 4.2, "color": "Brown", "image": "https://assets.myntassets.com/w_412%2Cq_50%2C%2Cdpr_3%2Cfl_progressive%2Cf_webp/assets/images/10669924/2019/9/27/ebb99a49-823b-4791-bbc9-b58ee591c29b1569578287184-Timex-Men-Off-White-Analogue-Watch-8211569578286023-1.jpg"},
    {"id": "timex-tw000r435", "name": "Men White Dial Analogue Watch TW000R435", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 1999, "mrp": 3995, "rating": 4.3, "color": "Gold", "image": "https://assets.myntassets.com/w_360%2Cq_50%2C%2Cdpr_2%2Cfl_progressive%2Cf_webp/assets/images/11645576/2023/6/20/63c6bd20-fc72-4f97-afa0-1a90a01a42031687245449632TimexMenWhiteAnalogueWatch-TW000R4351.jpg"},
    {"id": "timex-tw0tg8301", "name": "Men White Dial Black Leather Analogue Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2499, "mrp": 4995, "rating": 4.4, "color": "Black", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/17697758/2023/6/26/7cf1ecac-fe8d-4131-beb6-e457495242301687764825478TimexMenWhiteDialBlackLeatherTexturedStrapsAnalogueWatchTW0T1.jpg"},
    {"id": "timex-twtg80smu16", "name": "Men Textured Dial Steel Bracelet Analogue Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 3199, "mrp": 5995, "rating": 4.5, "color": "Silver", "image": "https://assets.myntassets.com/w_360%2Cq_50%2C%2Cdpr_2%2Cfl_progressive%2Cf_webp/assets/images/22231676/2023/5/19/ac755b92-cbf3-45e1-83de-ef66d7eec6b91684471972164-Timex-Men-Silver-Toned-Brass-Embellished-Dial--Silver-Toned--1.jpg"},
    {"id": "timex-tweg165smu07", "name": "Men Brass Dial Leather Strap Analogue Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2299, "mrp": 4995, "rating": 4.2, "color": "Brown", "image": "https://assets.myntassets.com/assets/images/22744342/2023/6/26/e90b0f96-5f71-48a7-be52-9dc38cc1bb2a1687764921384TimexMenBrassDialLeatherStrapsAnalogueWatchTWEG165SMU071.jpg"},
    {"id": "timex-twhg53smu03", "name": "Men Leather Strap Analogue Watch TWHG53SMU03", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2799, "mrp": 5495, "rating": 4.3, "color": "Black", "image": "https://assets.myntassets.com/assets/images/30828598/2024/11/4/d55ffe64-aa2d-4ea9-85ca-1185f9ecc48e1730711193513-Timex-Men-Leather-Straps-Analogue-Watch-TWHG53SMU02-14817307-1.jpg"},
    {"id": "timex-twtg73smu09", "name": "Men Gold-Tone Dial Leather Strap Watch", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 2499, "mrp": 4995, "rating": 4.4, "color": "Brown", "image": "https://assets.myntassets.com/w_412%2Cq_50%2C%2Cdpr_3%2Cfl_progressive%2Cf_webp/assets/images/2024/OCTOBER/8/sKGnbdAl_1afa2dfdb27a407cb2e18af4f7d756f4.jpg"},
    {"id": "timex-ti000r40900", "name": "Men Silver-Toned Analogue Watch TI000R40900", "brand": "Timex", "category": "watches", "type": "Analogue Watches", "price": 1999, "mrp": 3995, "rating": 4.2, "color": "Silver", "image": "https://assets.myntassets.com/w_360%2Cq_50%2C%2Cdpr_2%2Cfl_progressive%2Cf_webp/assets/images/217957/2022/12/29/2c9b3c0e-2e32-4dba-a4a8-44e770c448ec1672309725386-Timex-Men-Silver-Toned-Analogue-Watch---TI000R40900-82416723-1.jpg"},
    {
        "id": "red-runner", "name": "Colourblock Running Shoes", "brand": "Nike",
        "category": "footwear", "type": "Sports Shoes", "price": 2899, "mrp": 5495, "rating": 4.6, "gender": "men", "color": "Red", "sizes": [7, 8, 9, 10],
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    },
    {
        "id": "everyday-sandal", "name": "Comfort Platform Sandals", "brand": "Metro",
        "category": "footwear", "type": "Sandals", "price": 999, "mrp": 1999, "rating": 4.1, "gender": "men", "color": "Brown", "sizes": [6, 7, 8, 9, 10],
        "image": "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=85",
    },
    {"id": "puma-r78-unisex", "name": "Unisex R78 Res Colourblocked Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "unisex", "sizes": [6, 7, 8, 9, 10], "price": 3299, "mrp": 6599, "rating": 4.4, "color": "White", "image": "https://assets.myntassets.com/w_360%2Cq_50%2C%2Cdpr_2%2Cfl_progressive%2Cf_webp/assets/images/2025/AUGUST/26/uEziVQyR_28d04f165dc5429b9fb2cd2198d465f1.jpg"},
    {"id": "puma-idp-white-black", "name": "Men White & Black Colourblocked IDP Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "men", "sizes": [7, 8, 9, 10], "price": 2799, "mrp": 5599, "rating": 4.3, "color": "White", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/17350726/2025/3/11/7cb4864f-3aaa-4dc6-a2aa-96aba1b1622b1741693653316-Puma-Men-White--Black-Colourblocked-IDP-Sneakers-47517416936-1.jpg"},
    {"id": "puma-mesh-colourblock", "name": "Colourblocked Mesh Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "unisex", "sizes": [6, 7, 8, 9, 10], "price": 2999, "mrp": 5999, "rating": 4.2, "color": "Multi", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/17543198/2022/3/16/5dae11c5-0a06-46f1-b986-3c8c58efb3941647429427985CasualShoes1.jpg"},
    {"id": "puma-block-sneakers", "name": "Men Colour-Block Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "men", "sizes": [7, 8, 9, 10], "price": 2899, "mrp": 5799, "rating": 4.5, "color": "Multi", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/24843934/2023/10/17/9d310884-b306-4f51-aec3-c9590fc869e61697535509508-PUMA-C-Block-Mens-Shoes-6801697535509282-1.jpg"},
    {"id": "puma-colourblocked-men", "name": "Men Colourblocked Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "men", "sizes": [7, 8, 9, 10, 11], "price": 3199, "mrp": 6399, "rating": 4.4, "color": "White", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/29441362/2024/6/3/e70ccd4b-db6e-49fb-9d82-83079af636601717416404783-Puma-Men-Colourblocked-Sneakers-5671717416404492-1.jpg"},
    {"id": "puma-cblock-green", "name": "Men C-Block Colourblocked Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "men", "sizes": [7, 8, 9, 10], "price": 2999, "mrp": 5999, "rating": 4.3, "color": "Green", "image": "https://assets.myntassets.com/w_412%2Cq_50%2C%2Cdpr_3%2Cfl_progressive%2Cf_webp/assets/images/24843930/2023/10/17/8f7aeeb4-32b5-46d7-86e9-2ddbe735af001697535501180-PUMA-C-Block-Mens-Shoes-2851697535501036-1.jpg"},
    {"id": "puma-xray-astralis", "name": "X-Ray Astralis Colourblocked Lace-Up Sneakers", "brand": "Puma", "category": "footwear", "type": "Sports Shoes", "gender": "men", "sizes": [7, 8, 9, 10], "price": 3499, "mrp": 6999, "rating": 4.5, "color": "Multi", "image": "https://assets.myntassets.com/w_412%2Cq_50%2C%2Cdpr_3%2Cfl_progressive%2Cf_webp/assets/images/2025/MARCH/3/FVSDo4VS_db91d1babd6a4700840f3212682c0e5b.jpg"},
    {"id": "puma-navy-white", "name": "Men Navy Blue & White Colourblocked Sneakers", "brand": "Puma", "category": "footwear", "type": "Sneakers", "gender": "men", "sizes": [7, 8, 9, 10], "price": 2799, "mrp": 5599, "rating": 4.4, "color": "Blue", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/17350728/2022/5/11/0f1ce8f1-6394-4785-9c67-d238acce820c1652267748897-Puma-Men-Casual-Shoes-9391652267748578-1.jpg"},
    {"id": "redtape-pu-sneakers", "name": "Men PU Sneakers", "brand": "Red Tape", "category": "footwear", "type": "Casual Shoes", "gender": "men", "sizes": [6, 7, 8, 9, 10], "price": 1499, "mrp": 5999, "rating": 4.4, "color": "White", "image": "https://assets.myntassets.com/assets/images/28132186/2024/9/26/44f5154b-e087-4b4d-9154-1b8f8b14661d1727354620484-Red-Tape-Men-PU-Sneaker-1861727354620139-1.jpg"},
    {"id": "redtape-etpu-black", "name": "Men ETPU Black Sneakers", "brand": "Red Tape", "category": "footwear", "type": "Casual Shoes", "gender": "men", "sizes": [6, 7, 8, 9, 10], "price": 1799, "mrp": 5999, "rating": 4.3, "color": "Black", "image": "https://assets.myntassets.com/assets/images/30704679/2024/10/4/4c7f5c0e-1afd-4a62-8716-0c67ed1f04a11728042013918-Red-Tape-Men-PU-ETPU-Sneakers-8671728042013393-1.jpg"},
    {"id": "redtape-mesh-sneakers", "name": "Men Textured Mesh Sneakers", "brand": "Red Tape", "category": "footwear", "type": "Casual Shoes", "gender": "men", "sizes": [6, 7, 8, 9, 10], "price": 1199, "mrp": 5999, "rating": 4.2, "color": "White", "image": "https://assets.myntassets.com/assets/images/27390440/2024/9/26/901ff874-33a6-4449-b4c7-f22b2a0a42761727354481113-Red-Tape-Men-Textured-Mesh-Sneakers-5751727354480593-1.jpg"},
    {"id": "roadster-sliders", "name": "Men Black Textured Sliders", "brand": "Roadster", "category": "footwear", "type": "Sliders", "gender": "men", "sizes": [6, 7, 8, 9, 10], "price": 549, "mrp": 2749, "rating": 4.1, "color": "Black", "image": "https://assets.myntassets.com/assets/images/24300022/2023/8/2/c5fecb5e-34a9-4ed9-be5e-52bc2db6c6e61690918638104FlipFlops1.jpg"},
    {"id": "get-glamr-aviator", "name": "Unisex Aviator Sunglasses", "brand": "Get Glamr", "category": "eyewear", "type": "Aviator Sunglasses", "gender": "unisex", "sizes": ["M"], "price": 569, "mrp": 1899, "rating": 4.2, "color": "Black", "image": "https://assets.myntassets.com/assets/images/7166151/2018/8/17/4afd83a5-508c-4d77-a8da-23320649361e1534490252127-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-1.jpg", "images": ["https://assets.myntassets.com/assets/images/7166151/2018/8/17/4afd83a5-508c-4d77-a8da-23320649361e1534490252127-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-1.jpg", "https://assets.myntassets.com/assets/images/7166151/2018/8/17/c0a08a2c-64eb-424f-a94d-d501b026d33c1534490252103-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-2.jpg", "https://assets.myntassets.com/assets/images/7166151/2018/8/17/4353258b-aabf-433a-95cb-ed2b8745755d1534490252080-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-3.jpg", "https://assets.myntassets.com/assets/images/7166151/2018/8/17/d465b32f-bfae-40e5-b865-3d6b403e47fe1534490252060-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-4.jpg", "https://assets.myntassets.com/assets/images/7166151/2018/8/17/c57339f6-6052-4acf-8886-bef7326d50641534490252034-Get-Glamr-Unisex-Aviator-Sunglasses-6721534490251993-5.jpg"]},
    {"id": "marc-louis-polarised", "name": "Men Brown Polarised Square Sunglasses", "brand": "MARC LOUIS", "category": "eyewear", "type": "Square Sunglasses", "gender": "men", "sizes": ["M"], "price": 1372, "mrp": 5490, "rating": 4.3, "color": "Brown", "image": "https://assets.myntassets.com/assets/images/16288322/2021/11/29/7e7ce004-16b8-4a5d-96ae-1051b059472e1638175302849MARCLOUISMenBrown1.jpg", "images": ["https://assets.myntassets.com/assets/images/16288322/2021/11/29/7e7ce004-16b8-4a5d-96ae-1051b059472e1638175302849MARCLOUISMenBrown1.jpg", "https://assets.myntassets.com/assets/images/16288322/2021/11/29/da1834a7-161f-453a-99ba-bcdf9d1e864e1638175302743MARCLOUISMenBrown2.jpg", "https://assets.myntassets.com/assets/images/16288322/2021/11/29/0bde3a73-6d1a-44a0-bf42-b444242df8461638175302857MARCLOUISMenBrown3.jpg", "https://assets.myntassets.com/assets/images/16288322/2021/11/29/5d535386-1951-4d00-9fce-af00c48acebc1638175302823MARCLOUISMenBrown4.jpg", "https://assets.myntassets.com/assets/images/16288322/2021/11/29/6dd7caed-11ad-41c9-b3f9-72fe85e3860f1638175302803MARCLOUISMenBrown5.jpg"]},
    {"id": "spiky-yellow-square", "name": "Kids Yellow Lens Square Sunglasses", "brand": "Spiky", "category": "eyewear", "type": "Square Sunglasses", "gender": "unisex", "sizes": ["S"], "price": 545, "mrp": 999, "rating": 4.1, "color": "Yellow", "image": "https://assets.myntassets.com/assets/images/productimage/2021/6/16/123df84b-21c3-4efb-bb1f-8a9475dbe91f1623843003753-1.jpg", "images": ["https://assets.myntassets.com/assets/images/productimage/2021/6/16/123df84b-21c3-4efb-bb1f-8a9475dbe91f1623843003753-1.jpg", "https://assets.myntassets.com/assets/images/productimage/2021/6/16/af9ca6d0-6590-4c35-be48-75b7881fdbee1623843003762-2.jpg", "https://assets.myntassets.com/assets/images/productimage/2021/6/16/c93c6c79-6436-433e-b826-57ff089f4ed11623843003771-3.jpg", "https://assets.myntassets.com/assets/images/productimage/2021/6/16/9ff8d5d3-ab3f-4a71-be00-e9263cf58ed41623843003781-4.jpg", "https://assets.myntassets.com/assets/images/productimage/2021/6/16/4fac2bc6-9358-4ebb-b70e-a4748cd77d9d1623843003789-5.jpg"]},
    {"id": "voyage-round-silver", "name": "Unisex Black Lens & Silver-Toned Round Sunglasses", "brand": "Voyage", "category": "eyewear", "type": "Round Sunglasses", "gender": "unisex", "sizes": ["M"], "price": 799, "mrp": 3000, "rating": 4.4, "color": "Silver", "image": "https://assets.myntassets.com/assets/images/16905012/2025/5/24/04020bd5-a154-4454-9dbc-0e240f3eb03b1748094600530-Voyage-Unisex-Black-Lens--Silver-Toned-Round-Sunglasses-with-1.jpg", "images": ["https://assets.myntassets.com/assets/images/16905012/2025/5/24/04020bd5-a154-4454-9dbc-0e240f3eb03b1748094600530-Voyage-Unisex-Black-Lens--Silver-Toned-Round-Sunglasses-with-1.jpg", "https://assets.myntassets.com/assets/images/16905012/2025/5/24/7493a780-463e-40f4-b335-f6175e9a85d31748094600417-Voyage-Unisex-Black-Lens--Silver-Toned-Round-Sunglasses-with-5.jpg", "https://assets.myntassets.com/assets/images/16905012/2025/5/24/a8729786-ba10-4caf-b5b0-57952ebed6591748094600445-Voyage-Unisex-Black-Lens--Silver-Toned-Round-Sunglasses-with-4.jpg"]},
    {"id": "voyage-square-green", "name": "Unisex Square Sunglasses 58157MG2971", "brand": "Voyage", "category": "eyewear", "type": "Square Sunglasses", "gender": "unisex", "sizes": ["L"], "price": 779, "mrp": 1800, "rating": 4.3, "color": "Green", "image": "https://assets.myntassets.com/assets/images/10748638/2023/8/25/f9a46c48-5e9e-4fd7-b51d-38f1f86de8ae1692961998340-Voyage-Unisex-Square-Sunglasses-58157MG2971-6931692961997761-2.jpg", "images": ["https://assets.myntassets.com/assets/images/10748638/2023/8/25/f9a46c48-5e9e-4fd7-b51d-38f1f86de8ae1692961998340-Voyage-Unisex-Square-Sunglasses-58157MG2971-6931692961997761-2.jpg"]},
    {"id": "eyejack-square-black", "name": "Unisex Square UV Protected Sunglasses", "brand": "Eyejack", "category": "eyewear", "type": "Square Sunglasses", "gender": "unisex", "sizes": ["M"], "price": 699, "mrp": 3000, "rating": 4.3, "color": "Black", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/32364834/2025/1/22/63a5a4cb-1af6-4859-9f78-2b4e60aeab8c1737537836194-Eyejack-Unisex-Square-Sunglasses-with-UV-Protected-Lens-5668-1.jpg", "images": ["https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/32364834/2025/1/22/63a5a4cb-1af6-4859-9f78-2b4e60aeab8c1737537836194-Eyejack-Unisex-Square-Sunglasses-with-UV-Protected-Lens-5668-1.jpg"]},
    {"id": "voyage-black-wayfarer", "name": "Unisex Black Wayfarer Sunglasses with UV Protection", "brand": "Voyage", "category": "eyewear", "type": "Wayfarer Sunglasses", "gender": "unisex", "sizes": ["L"], "price": 849, "mrp": 3000, "rating": 4.5, "color": "Black", "image": "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/26668196/2024/9/28/074adc0e-61a4-408a-ad93-18ec6c7e18d91727514553555-Voyage-Unisex-Black-Lens--Black-Wayfarer-Sunglasses-with-Pol-1.jpg", "images": ["https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_100%2Cw_1080/v1/assets/images/26668196/2024/9/28/074adc0e-61a4-408a-ad93-18ec6c7e18d91727514553555-Voyage-Unisex-Black-Lens--Black-Wayfarer-Sunglasses-with-Pol-1.jpg"]},
]


def _fashion_product(product_id):
    return next((product for product in FASHION_PRODUCTS if product["id"] == product_id), None)


def _fashion_catalog(request, category="all", default_discount=0, default_gender="all"):
    products = [product.copy() for product in FASHION_PRODUCTS]
    for product in products:
        product["discount"] = round((1 - product["price"] / product["mrp"]) * 100)
    category = request.GET.get("category", category).lower()
    search = request.GET.get("q", "").strip().lower()
    product_type = request.GET.get("type", "all")
    sort = request.GET.get("sort", "recommended")
    selected_brands = request.GET.getlist("brand")
    selected_colors = request.GET.getlist("color")
    min_price = request.GET.get("min_price", "")
    max_price = request.GET.get("max_price", "")
    min_discount = request.GET.get("discount", str(default_discount))
    gender = request.GET.get("gender", default_gender).lower()
    selected_sizes = request.GET.getlist("size")

    if category != "all":
        products = [product for product in products if product["category"] == category]
    if gender == "men":
        products = [product for product in products if product.get("gender", "men") in {"men", "unisex"}]
    elif gender == "women":
        products = [product for product in products if product.get("gender", "unisex") in {"women", "unisex"}]
    if selected_sizes:
        products = [product for product in products if any(str(size) in {str(s) for s in product.get("sizes", [])} for size in selected_sizes)]
    if search:
        products = [product for product in products if search in f'{product["name"]} {product["brand"]} {product["type"]}'.lower()]
    if product_type != "all":
        products = [product for product in products if product["type"] == product_type]
    if selected_brands:
        products = [product for product in products if product["brand"] in selected_brands]
    if selected_colors:
        products = [product for product in products if product.get("color") in selected_colors]
    if min_price.isdigit():
        products = [product for product in products if product["price"] >= int(min_price)]
    if max_price.isdigit():
        products = [product for product in products if product["price"] <= int(max_price)]
    if min_discount.isdigit() and int(min_discount):
        products = [product for product in products if product["discount"] >= int(min_discount)]
    if sort == "price-low":
        products.sort(key=lambda product: product["price"])
    elif sort == "price-high":
        products.sort(key=lambda product: product["price"], reverse=True)
    elif sort == "rating":
        products.sort(key=lambda product: product["rating"], reverse=True)

    available = [product for product in FASHION_PRODUCTS if category == "all" or product["category"] == category]
    types = sorted({product["type"] for product in available})
    brands = sorted({product["brand"] for product in available})
    colors = sorted({product.get("color", "Blue") for product in available})
    sizes = sorted({str(size) for product in available for size in product.get("sizes", [])})
    return products, category, product_type, sort, types, brands, colors, selected_brands, selected_colors, min_price, max_price, min_discount, gender, sizes, selected_sizes

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


@ensure_csrf_cookie
def home(request):

    user_data = request.session.get("user") or {}
    approved_merchants = (
        MerchantProfile.objects.filter(is_approved=True, owner__is_active=True)
        .select_related("owner")
        .prefetch_related("categories")
        .annotate(average_rating=Avg("reviews__rating"))
        .order_by("shop_name")
    )

    return render(
        request,
        "index.html",
        {
            "user_data": user_data,
            "nav_user_name": user_data.get("fullname") or user_data.get("username") or "User",
            "nav_user_email": user_data.get("email", ""),
            "approved_merchants": approved_merchants,
        }
    )


@ensure_csrf_cookie
def merchant_store(request, slug):
    merchant = get_object_or_404(
        MerchantProfile.objects.select_related("owner").annotate(
            average_rating=Avg("reviews__rating")
        ),
        slug=slug,
        is_approved=True,
        owner__is_active=True,
    )
    categories = MerchantCategory.objects.filter(
        merchant=merchant,
        products__merchant=merchant,
        products__is_active=True,
        products__stock__gt=0,
    ).distinct().order_by("name")
    products = MerchantProduct.objects.filter(
        merchant=merchant,
        is_active=True,
        stock__gt=0,
    ).filter(Q(category__isnull=True) | Q(category__merchant=merchant)).select_related("category")

    search_query = request.GET.get("q", "").strip()[:100]
    if search_query:
        products = products.filter(
            Q(name__icontains=search_query) | Q(description__icontains=search_query)
        )
    selected_category = request.GET.get("category", "").strip()
    if selected_category.isdigit() and categories.filter(pk=selected_category).exists():
        products = products.filter(category_id=int(selected_category))
    else:
        selected_category = ""

    basket = request.session.get("merchant_store_cart", {})
    basket_items = basket.get("items", {}) if basket.get("merchant_id") == merchant.id else {}
    try:
        basket_count = sum(max(0, int(value)) for value in basket_items.values())
    except (TypeError, ValueError, OverflowError):
        basket_items = {}
        basket_count = 0
    for product in products:
        try:
            product.cart_quantity = min(product.stock, max(0, int(basket_items.get(str(product.pk), 0))))
        except (TypeError, ValueError, OverflowError):
            product.cart_quantity = 0
    wishlist = request.session.get("merchant_store_wishlist", [])
    wishlist_ids = [
        int(value.split(":", 1)[1])
        for value in wishlist
        if value.startswith(f"{merchant.pk}:") and value.split(":", 1)[1].isdigit()
    ]
    return render(request, "merchant-store.html", {
        "merchant": merchant,
        "products": products,
        "categories": categories,
        "search_query": search_query,
        "selected_category": selected_category,
        "merchant_cart_count": basket_count,
        "merchant_cart_url": reverse("merchant_store_cart", args=[merchant.slug]),
        "merchant_wishlist_ids": wishlist_ids,
    })


@ensure_csrf_cookie
def merchant_store_cart(request, slug):
    merchant = get_object_or_404(
        MerchantProfile.objects.select_related("owner"),
        slug=slug,
        is_approved=True,
        owner__is_active=True,
    )
    basket = request.session.get("merchant_store_cart", {})
    if basket.get("merchant_id") != merchant.pk:
        lines = []
    else:
        current_merchant, lines = _merchant_store_checkout_lines(request)
        if current_merchant != merchant:
            lines = []
    for line in lines:
        line["line_total"] = Decimal(str(line["price"])) * int(line["quantity"])
    subtotal = sum((Decimal(str(line["price"])) * int(line["quantity"]) for line in lines), Decimal("0.00"))
    return render(request, "merchant-store-cart.html", {
        "merchant": merchant,
        "cart_items": lines,
        "cart_count": sum(int(line["quantity"]) for line in lines),
        "subtotal": subtotal,
    })


@require_http_methods(["POST"])
@ensure_csrf_cookie
def merchant_store_cart_add(request, slug, product_id):
    merchant = get_object_or_404(
        MerchantProfile,
        slug=slug,
        is_approved=True,
        owner__is_active=True,
    )
    product = get_object_or_404(
        MerchantProduct,
        pk=product_id,
        merchant=merchant,
        is_active=True,
    )
    try:
        if request.content_type == "application/json" and request.body:
            payload = json.loads(request.body)
        else:
            payload = {"action": request.POST.get("action", "add")}
        action = str(payload.get("action", "add")).strip().lower()
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid cart action."}, status=400)
    if action not in {"add", "increase", "decrease", "remove"}:
        return JsonResponse({"success": False, "message": "Unsupported cart action."}, status=400)
    basket = request.session.get("merchant_store_cart", {})
    if basket and basket.get("merchant_id") not in (None, merchant.id):
        return JsonResponse({
            "success": False,
            "message": "Checkout your current merchant store cart before adding items from another store.",
        }, status=409)
    items = basket.get("items", {})
    key = str(product.pk)
    try:
        current_quantity = max(0, int(items.get(key, 0)))
    except (TypeError, ValueError, OverflowError):
        current_quantity = 0
    if action in {"add", "increase"}:
        if product.stock <= current_quantity:
            return JsonResponse({"success": False, "message": f"Only {product.stock} of {product.name} are currently available."}, status=400)
        quantity = current_quantity + 1
        items[key] = quantity
    elif action == "decrease":
        quantity = max(0, current_quantity - 1)
        if quantity:
            items[key] = quantity
        else:
            items.pop(key, None)
    else:
        quantity = 0
        items.pop(key, None)
    request.session["merchant_store_cart"] = {"merchant_id": merchant.id, "items": items}
    request.session.modified = True
    messages = {
        "add": f"{product.name} added to your cart.",
        "increase": f"{product.name} quantity updated.",
        "decrease": f"{product.name} quantity updated.",
        "remove": f"{product.name} removed from your cart.",
    }
    return JsonResponse({"success": True, "quantity": quantity, "product_id": product.pk,
        "count": sum(int(value) for value in items.values()), "message": messages[action]})


@require_http_methods(["POST"])
@ensure_csrf_cookie
def merchant_store_wishlist_toggle(request, slug, product_id):
    merchant = get_object_or_404(
        MerchantProfile,
        slug=slug,
        is_approved=True,
        owner__is_active=True,
    )
    product = get_object_or_404(
        MerchantProduct,
        pk=product_id,
        merchant=merchant,
        is_active=True,
        stock__gt=0,
    )
    wishlist = request.session.get("merchant_store_wishlist", [])
    key = f"{merchant.pk}:{product.pk}"
    if key in wishlist:
        wishlist.remove(key)
        active = False
    else:
        wishlist.append(key)
        active = True
    request.session["merchant_store_wishlist"] = wishlist
    request.session.modified = True
    return JsonResponse({"success": True, "active": active, "message": "Wishlist updated."})


def _merchant_store_checkout_lines(request):
    basket = request.session.get("merchant_store_cart", {})
    merchant_id = basket.get("merchant_id")
    item_quantities = basket.get("items", {})
    if not merchant_id or not item_quantities:
        return None, []
    merchant = MerchantProfile.objects.filter(
        pk=merchant_id,
        is_approved=True,
        owner__is_active=True,
    ).first()
    if merchant is None:
        request.session.pop("merchant_store_cart", None)
        return None, []
    ids = [int(value) for value in item_quantities if str(value).isdigit()]
    product_map = {
        str(product.pk): product
        for product in MerchantProduct.objects.filter(
            merchant=merchant,
            pk__in=ids,
            is_active=True,
            stock__gt=0,
        ).select_related("category")
    }
    lines = []
    valid_items = {}
    for product_id, raw_quantity in item_quantities.items():
        product = product_map.get(str(product_id))
        if product is None:
            continue
        try:
            quantity = min(product.stock, max(1, int(raw_quantity)))
        except (TypeError, ValueError, OverflowError):
            continue
        valid_items[str(product.pk)] = quantity
        lines.append({
            "id": f"merchant:{merchant.pk}:{product.pk}",
            "gst_source": "merchant",
            "merchant_id": merchant.pk,
            "merchant_product_id": product.pk,
            "name": product.name,
            "price": float(product.price),
            "quantity": quantity,
            "image": product.image or "",
            "category": product.category.name if product.category else "Merchant Store",
            "merchant_name": merchant.shop_name,
            "restaurant_name": merchant.shop_name,
        })
    if valid_items != item_quantities:
        request.session["merchant_store_cart"] = {
            "merchant_id": merchant.pk,
            "items": valid_items,
        } if valid_items else {}
        request.session.modified = True
    return merchant, lines


def _validate_merchant_store_checkout_lines(request, cart):
    merchant_payloads = [
        item for item in cart
        if isinstance(item, dict) and item.get("merchant_product_id") is not None
    ]
    if not merchant_payloads:
        return cart, None
    basket = request.session.get("merchant_store_cart", {})
    merchant_id = basket.get("merchant_id")
    quantities = basket.get("items", {})
    if not merchant_id or not quantities:
        raise ValueError("Your merchant store cart has expired. Please add the products again.")
    submitted = {}
    try:
        for item in merchant_payloads:
            if int(item.get("merchant_id")) != int(merchant_id):
                raise ValueError("The merchant cart is invalid. Please reload checkout.")
            product_id = str(int(item["merchant_product_id"]))
            if product_id in submitted:
                raise ValueError("Duplicate merchant cart item.")
            submitted[product_id] = int(item.get("quantity", 0))
    except (TypeError, ValueError, OverflowError):
        raise ValueError("The merchant cart is invalid. Please reload checkout.")
    if submitted != {str(key): int(value) for key, value in quantities.items()}:
        raise ValueError("Your cart changed. Please reload checkout before paying.")
    merchant = MerchantProfile.objects.filter(
        pk=merchant_id,
        is_approved=True,
        owner__is_active=True,
    ).first()
    if merchant is None:
        raise ValueError("This store is no longer available for orders.")
    products = {
        str(product.pk): product
        for product in MerchantProduct.objects.filter(
            merchant=merchant,
            pk__in=[int(product_id) for product_id in submitted],
            is_active=True,
            stock__gt=0,
        )
    }
    if set(products) != set(submitted):
        raise ValueError("A product in your cart is no longer available.")
    canonical_lines = []
    for product_id, quantity in submitted.items():
        product = products[product_id]
        if quantity < 1 or quantity > product.stock:
            raise ValueError(f"Only {product.stock} of {product.name} are currently in stock.")
        canonical_lines.append({
            "id": f"merchant:{merchant.pk}:{product.pk}",
            "gst_source": "merchant",
            "merchant_id": merchant.pk,
            "merchant_product_id": product.pk,
            "name": product.name,
            "price": str(product.price),
            "quantity": quantity,
            "image": product.image or "",
            "category": product.category.name if product.category else "Merchant Store",
            "merchant_name": merchant.shop_name,
            "restaurant_name": merchant.shop_name,
        })
    non_merchant_lines = [
        item for item in cart
        if not (isinstance(item, dict) and item.get("merchant_product_id") is not None)
    ]
    return non_merchant_lines + canonical_lines, merchant


def _create_order_with_inventory(order_data, cart, merchant, coupon=None):
    merchant_lines = [
        item for item in cart
        if item.get("merchant_product_id") is not None
    ]
    with transaction.atomic():
        if coupon is not None:
            coupon = Coupon.objects.select_for_update().get(pk=coupon.pk)
            if not coupon.is_currently_valid():
                raise ValueError("This coupon is no longer active.")
            if coupon.first_order_only:
                customer_parts = []
                customer_user = order_data.get("customer_user")
                customer_email = str(order_data.get("customer_email", "")).strip()
                if customer_user is not None and getattr(customer_user, "is_authenticated", False):
                    customer_parts.append(Q(customer_user=customer_user))
                if customer_email:
                    customer_parts.append(Q(customer_email__iexact=customer_email))
                if not customer_parts:
                    raise ValueError("Sign in or enter your email to use this first-order coupon.")
                customer_identity = customer_parts[0]
                for part in customer_parts[1:]:
                    customer_identity |= part
                recent_pending = timezone.now() - timedelta(minutes=30)
                prior_paid = Order.objects.filter(payment_status__iexact="Paid").filter(customer_identity)
                coupon_reserved = coupon.orders.filter(
                    payment_status__iexact="Pending", created_at__gte=recent_pending,
                ).filter(customer_identity)
                if prior_paid.exists() or coupon_reserved.exists():
                    raise ValueError("This coupon is available on your first completed order only and is already reserved for another order.")
            coupon_usage_count(
                coupon,
                order_data.get("customer_email", ""),
                order_data.get("customer_user"),
            )
            order_data["coupon"] = coupon
        products = {}
        quantities = {}
        if merchant_lines:
            if merchant is None:
                raise ValueError("The merchant store for this order is unavailable.")
            for item in merchant_lines:
                try:
                    product_id = int(item["merchant_product_id"])
                    quantity = int(item["quantity"])
                except (KeyError, TypeError, ValueError, OverflowError):
                    raise ValueError("A product in your cart is invalid.")
                if quantity < 1:
                    raise ValueError("Product quantities must be greater than zero.")
                quantities[product_id] = quantities.get(product_id, 0) + quantity

            products = {
                product.pk: product
                for product in MerchantProduct.objects.select_for_update().filter(
                    merchant=merchant,
                    pk__in=quantities,
                    is_active=True,
                )
            }
            if len(products) != len(quantities):
                raise ValueError("A product in your cart is no longer available.")

            for product_id, quantity in quantities.items():
                product = products[product_id]
                if product.stock < quantity:
                    raise ValueError(
                        f"Only {product.stock} of {product.name} are currently in stock."
                    )
                changed = MerchantProduct.objects.filter(
                    pk=product_id,
                    merchant=merchant,
                    stock__gte=quantity,
                ).update(stock=F("stock") - quantity)
                if not changed:
                    product.refresh_from_db(fields=["stock"])
                    raise ValueError(
                        f"Only {product.stock} of {product.name} are currently in stock."
                    )

        order = Order.objects.create(**order_data)
        if not order.invoice_number:
            from django.utils import timezone
            invoice_date = timezone.localtime(order.created_at).date()
            financial_year_start = invoice_date.year if invoice_date.month >= 4 else invoice_date.year - 1
            order.invoice_number = f"LM/{financial_year_start}-{str(financial_year_start + 1)[-2:]}/{order.pk:06d}"
            order.save(update_fields=["invoice_number"])
        for item in cart:
            product_id = item.get("merchant_product_id")
            product = products.get(int(product_id)) if product_id is not None else None
            OrderItem.objects.create(
                order=order,
                merchant_product=product,
                name=item.get("name", "Product"),
                category=item.get("category", ""),
                price=Decimal(str(item.get("price", 0))),
                quantity=int(item.get("quantity", 1)),
                image=item.get("image", ""),
                source_product_id=str(item.get("merchant_product_id") or item.get("id", "")),
                catalog_source=str(item.get("gst_source", item.get("catalog_source", ""))),
                hsn_code=item.get("hsn_code", ""),
                tax_classification=item.get("tax_classification", ""),
                tax_effective_from=item.get("tax_effective_from") or None,
                tax_source_reference=item.get("tax_source_reference", ""),
                gst_rate=Decimal(str(item.get("gst_rate", 0))),
                cgst_rate=Decimal(str(item.get("cgst_rate", 0))),
                sgst_rate=Decimal(str(item.get("sgst_rate", 0))),
                igst_rate=Decimal(str(item.get("igst_rate", 0))),
                price_includes_gst=bool(item.get("price_includes_gst", False)),
                original_line_amount=item.get("original_line_amount", Decimal(str(item.get("price", 0))) * int(item.get("quantity", 1))),
                tax_treatment=item.get("tax_treatment", "taxable"),
                supplier_state=item.get("supplier_state", SUPPLIER_STATE),
                place_of_supply_state=item.get("place_of_supply_state", ""),
                place_of_supply_rule=item.get("place_of_supply_rule", ""),
                discount_amount=item.get("discount_amount", 0),
                taxable_value=item.get("taxable_value", 0),
                cgst_amount=item.get("cgst_amount", 0),
                sgst_amount=item.get("sgst_amount", 0),
                igst_amount=item.get("igst_amount", 0),
                total_tax=item.get("total_tax", 0),
                line_total=item.get("line_total", Decimal(str(item.get("price", 0))) * int(item.get("quantity", 1))),
                coupon_discount_amount=item.get("coupon_discount_amount", 0),
                delivery_charge_share=item.get("delivery_charge_share", 0),
                stock_deducted=product is not None,
            )
        return order


def _restore_order_inventory(order):
    """Release reserved merchant stock once when an order is cancelled/refunded."""
    with transaction.atomic():
        locked_order = Order.objects.select_for_update().get(pk=order.pk)
        items = list(
            OrderItem.objects.select_for_update()
            .filter(order=locked_order, stock_deducted=True, merchant_product__isnull=False)
            .select_related("merchant_product")
        )
        for item in items:
            MerchantProduct.objects.filter(pk=item.merchant_product_id).update(
                stock=F("stock") + item.quantity
            )
            item.stock_deducted = False
            item.save(update_fields=["stock_deducted"])
        return len(items)


def record_razorpay_failure(request):
    """Release this session's pending inventory reservation after a gateway failure."""
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        payload = json.loads(request.body or b"{}")
        local_order_id = int(payload.get("local_order_id"))
        razorpay_order_id = str(payload.get("razorpay_order_id", "")).strip()
    except (ValueError, TypeError, json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid order reference."}, status=400)
    pending_ids = {str(value) for value in request.session.get("pending_inventory_orders", [])}
    if str(local_order_id) not in pending_ids or not razorpay_order_id:
        return JsonResponse({"success": False, "message": "Pending order not found for this checkout session."}, status=404)
    with transaction.atomic():
        order = Order.objects.select_for_update().filter(
            pk=local_order_id, razorpay_order_id=razorpay_order_id,
        ).first()
        if order is None:
            return JsonResponse({"success": False, "message": "Pending order not found."}, status=404)
        if order.payment_status.casefold() == "paid":
            return JsonResponse({"success": False, "message": "This order is already paid."}, status=409)
        if order.payment_status.casefold() != "failed":
            previous_status = order.order_status
            order.payment_status = "Failed"
            order.order_status = "Cancelled"
            order.save(update_fields=["payment_status", "order_status"])
            _restore_order_inventory(order)
            OrderStatusHistory.objects.create(order=order, event_type="payment", from_status=previous_status, to_status="Cancelled", note="Payment attempt failed; reserved inventory released.")
    request.session["pending_inventory_orders"] = [
        value for value in request.session.get("pending_inventory_orders", [])
        if str(value) != str(local_order_id)
    ]
    request.session.modified = True
    return JsonResponse({"success": True})


# =========================
# USER
# =========================

def login(request):
    if request.method == "POST":
        email = request.POST.get("email", "").strip().lower()
        password = request.POST.get("password", "")
        if not email or not password:
            return render(request, "login.html", {"login_error": "Enter your email and password."})
        user_obj = User.objects.filter(email__iexact=email).first()
        user = authenticate(request, username=user_obj.username if user_obj else email, password=password)
        if user is None or not user.is_active:
            return render(request, "login.html", {"login_error": "Invalid email or password."})
        auth_login(request, user)
        request.session["user"] = {
            "id": user.id,
            "username": user.username,
            "fullname": user.first_name or user.username,
            "email": user.email.lower(),
        }
        next_url = request.POST.get("next", "").strip()
        if next_url and url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}, require_https=request.is_secure()):
            return redirect(next_url)
        return redirect("index")
    return render(request, 'login.html')

def logout(request):
    auth_logout(request)
    request.session.pop("user", None)
    request.session.pop("access_token", None)
    request.session.pop("refresh_token", None)
    return redirect("login")


def signup(request):
    return render(request, 'signup.html')

# =========================
# CATEGORIES
# =========================

def food(request):
    return render(request, 'food.html')


def grocery(request):
    return render(request, 'grocery.html')




def shoppingwishlist(request):
    return render(request, "shoppingwishlist.html")


# =========================================================
# SHOPPING CART
# =========================================================

def shoppingcart(request):
    return redirect("cart")




    
# =========================
# FASHION
# =========================

def fashion(request):
    return render(request, "fashion.html")


def fashion_men(request):
    return render(request, "fashion-men.html", {"fashion_page": "men"})


def fashion_women(request):
    return render(request, "fashion-women.html", {"fashion_page": "women"})


def fashion_watches(request):
    products, category, product_type, sort, types, brands, colors, selected_brands, selected_colors, min_price, max_price, min_discount, gender, sizes, selected_sizes = _fashion_catalog(request, "watches", 40)
    return render(request, "fashion-watches.html", {
        "fashion_products": products, "fashion_category": category, "selected_type": product_type,
        "selected_sort": sort, "fashion_types": types, "fashion_brands": brands, "fashion_colors": colors,
        "selected_brands": selected_brands, "selected_colors": selected_colors,
        "min_price": min_price, "max_price": max_price, "min_discount": min_discount,
        "fashion_page": "watches", "fashion_product_count": len(products), "fashion_cart_count": sum(request.session.get("fashion_cart", {}).values()),
        "fashion_wishlist_count": len(request.session.get("fashion_wishlist", [])),
    })


def fashion_footwear(request):
    products, category, product_type, sort, types, brands, colors, selected_brands, selected_colors, min_price, max_price, min_discount, gender, sizes, selected_sizes = _fashion_catalog(request, "footwear", 40, "men")
    return render(request, "fashion-footwear.html", {
        "fashion_products": products, "fashion_category": category, "selected_type": product_type,
        "selected_sort": sort, "fashion_types": types, "fashion_brands": brands, "fashion_colors": colors,
        "selected_brands": selected_brands, "selected_colors": selected_colors,
        "min_price": min_price, "max_price": max_price, "min_discount": min_discount,
        "selected_gender": gender, "fashion_sizes": sizes, "selected_sizes": selected_sizes,
        "fashion_page": "footwear", "fashion_product_count": len(products), "fashion_cart_count": sum(request.session.get("fashion_cart", {}).values()),
        "fashion_wishlist_count": len(request.session.get("fashion_wishlist", [])),
    })


def fashion_eyewear(request):
    products, category, product_type, sort, types, brands, colors, selected_brands, selected_colors, min_price, max_price, min_discount, gender, sizes, selected_sizes = _fashion_catalog(request, "eyewear", 30, "all")
    return render(request, "fashion-eyewear.html", {
        "fashion_products": products, "fashion_category": category, "selected_type": product_type,
        "selected_sort": sort, "fashion_types": types, "fashion_brands": brands, "fashion_colors": colors,
        "selected_brands": selected_brands, "selected_colors": selected_colors,
        "min_price": min_price, "max_price": max_price, "min_discount": min_discount,
        "selected_gender": gender, "fashion_sizes": sizes, "selected_sizes": selected_sizes,
        "gender_options": (("all", "All genders"), ("men", "Men"), ("women", "Women"), ("unisex", "Unisex")),
        "fashion_page": "eyewear", "fashion_product_count": len(products),
        "fashion_cart_count": sum(request.session.get("fashion_cart", {}).values()),
        "fashion_wishlist_count": len(request.session.get("fashion_wishlist", [])),
    })


def fashion_kids(request):
    return render(request, "fashion-kids.html")

def fashion_add_to_cart(request, product_id):
    cached_products = request.session.get("fashion_product_cache", {})
    product = _fashion_product(product_id) or cached_products.get(product_id)
    if not product:
        return JsonResponse({"ok": False, "error": "Product not found"}, status=404)
    product_key = str(product_id) if product_id in cached_products else f'{product.get("category", "fashion")}:{product_id}'
    cart = request.session.get("fashion_cart", {})
    cart[product_key] = int(cart.get(product_key, 0)) + 1
    cache = request.session.get("fashion_product_cache", {})
    cache[product_key] = {**product, "id": product_key}
    request.session["fashion_product_cache"] = cache
    request.session["fashion_cart"] = cart
    if request.GET.get("next") == "cart":
        return redirect("cart")
    return JsonResponse({"ok": True, "count": sum(cart.values())})


def fashion_toggle_wishlist(request, product_id):
    cached_products = request.session.get("fashion_product_cache", {})
    product = _fashion_product(product_id) or cached_products.get(product_id)
    if not product:
        return JsonResponse({"ok": False, "error": "Product not found"}, status=404)
    product_key = str(product_id) if product_id in cached_products else f'{product.get("category", "fashion")}:{product_id}'
    wishlist = request.session.get("fashion_wishlist", [])
    if product_key in wishlist:
        wishlist.remove(product_key)
        active = False
    else:
        wishlist.append(product_key)
        active = True
    cache = request.session.get("fashion_product_cache", {})
    cache[product_key] = {**product, "id": product_key}
    request.session["fashion_product_cache"] = cache
    request.session["fashion_wishlist"] = wishlist
    return JsonResponse({"ok": True, "active": active, "count": len(wishlist)})


def fashion_shopping_api(request):
    """Keep men's and women's browser interactions in the shared session bag."""
    if request.method == "GET":
        cart = request.session.get("fashion_cart", {})
        wishlist = request.session.get("fashion_wishlist", [])
        return JsonResponse({"cart_count": sum(int(q) for q in cart.values()), "wishlist_count": len(wishlist)})
    if request.method != "POST":
        return JsonResponse({"ok": False, "error": "Method not allowed"}, status=405)
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse({"ok": False, "error": "Invalid request"}, status=400)
    action = payload.get("action")
    catalog = str(payload.get("catalog", "fashion")).lower()
    product = payload.get("product") or {}
    raw_id = str(product.get("id", "")).strip()
    if catalog not in {"men", "women"} or not raw_id:
        return JsonResponse({"ok": False, "error": "Invalid product"}, status=400)
    key = f"{catalog}:{raw_id}"
    try:
        price = max(0, int(float(product.get("price", 0))))
        mrp = max(price, int(float(product.get("mrp", price))))
    except (TypeError, ValueError, OverflowError):
        return JsonResponse({"ok": False, "error": "Invalid price"}, status=400)
    cached = {
        "id": key, "source_id": raw_id, "category": catalog,
        "name": str(product.get("name", "Product"))[:180],
        "brand": str(product.get("brand", "LocalMart"))[:100],
        "price": price, "mrp": mrp,
        "discount": max(0, round((1 - price / mrp) * 100)) if mrp else 0,
        "image": str(product.get("image", ""))[:1000],
        "rating": product.get("rating", ""),
    }
    cache = request.session.get("fashion_product_cache", {})
    cache[key] = cached
    request.session["fashion_product_cache"] = cache
    cart = request.session.get("fashion_cart", {})
    wishlist = request.session.get("fashion_wishlist", [])
    if action == "add":
        cart[key] = int(cart.get(key, 0)) + 1
    elif action == "wishlist_toggle":
        if key in wishlist:
            wishlist.remove(key)
            active = False
        else:
            wishlist.append(key)
            active = True
    elif action == "sync":
        quantity = min(99, max(0, int(payload.get("quantity", 0))))
        if quantity:
            cart[key] = max(quantity, int(cart.get(key, 0)))
        if payload.get("wishlisted") and key not in wishlist:
            wishlist.append(key)
    else:
        return JsonResponse({"ok": False, "error": "Unknown action"}, status=400)
    request.session["fashion_cart"] = cart
    request.session["fashion_wishlist"] = wishlist
    request.session.modified = True
    result = {"ok": True, "cart_count": sum(int(q) for q in cart.values()), "wishlist_count": len(wishlist)}
    if action == "wishlist_toggle":
        result["active"] = active
    return JsonResponse(result)

def fashion_cart_action(request, product_id, change):
    """
    Fashion cart quantity action.

    change = 1   -> increase quantity
    change = -1  -> decrease quantity
    """

    # Get fashion cart from session
    cart = request.session.get("fashion_cart", {})

    product_id = str(product_id)
    change = int(change)

    # Current quantity
    current_quantity = int(cart.get(product_id, 0))

    # New quantity
    quantity = current_quantity + change

    # Update or remove product
    if quantity > 0:
        cart[product_id] = quantity
    else:
        cart.pop(product_id, None)

    # Save cart back to session
    request.session["fashion_cart"] = cart
    request.session.modified = True

    # Return to cart page
    return redirect("cart")




def stationery(request):
    return render(request, 'stationery.html')


def electronics(request):
    return render(request, 'electronics.html')


def home_appliances(request):
    return render(request, 'home-appliances.html')

def product_detail(request, product_id):
    product = get_object_or_404(
        Product,
        id=product_id,
    )

    return render(
        request,
        "product_detail.html",
        {"product": product},
    )


def add_to_cart(request, product_id):
    return redirect("home_appliances")

def electronics_cart(request):
    return redirect("cart")






def electronics(request):
    categories = ElectronicsCategory.objects.all().order_by("name")
    products = ElectronicsProduct.objects.all().order_by("-id")

    return render(
        request,
        "electronics.html",
        {
            "categories": categories,
            "products": products,
        }
    )









# =========================
# MERCHANT
# =========================

def merchant_login(request):
    if request.user.is_authenticated and request.session.get("merchant_authenticated") and getattr(request.user, "merchant_profile", None) and request.user.merchant_profile.is_approved:
        return redirect("merchant_dashboard")

    error = ""
    if request.method == "POST":
        # The login form submits this field as ``email``; accept ``username``
        # too so older forms and bookmarked integrations continue to work.
        login_value = request.POST.get("email", request.POST.get("username", "")).strip()
        password = request.POST.get("password", "")
        if not login_value or not password:
            return render(request, "merchant-login.html", {
                "error": "Enter your shop name/email and password.",
                "active_tab": "login",
            })
        account = User.objects.filter(
            Q(username__iexact=login_value)
            | Q(email__iexact=login_value)
        ).first()
        user = authenticate(
            request,
            username=account.username if account else login_value,
            password=password,
        )
        if user is not None:
            if not user.is_active:
                return render(request, "merchant-login.html", {
                    "error": "Your merchant account is inactive. Please contact admin.",
                    "active_tab": "login",
                })
            profile = MerchantProfile.objects.filter(owner=user).first()
            if profile is None:
                return render(request, "merchant-login.html", {
                    "error": "No merchant profile is linked to this account. Register your shop or contact admin.",
                    "active_tab": "login",
                })
            if not profile.is_approved:
                error = "Your shop registration is waiting for admin approval."
                return render(request, "merchant-login.html", {"error": error, "active_tab": "login"})
            auth_login(request, user)
            request.session["merchant_authenticated"] = True
            request.session["merchant_profile"] = {
                "shop_name": profile.shop_name,
                "owner_name": user.first_name,
                "email": user.email,
            }
            return redirect("merchant_dashboard")
        error = "Invalid shop name/email or password."

    return render(request, "merchant-login.html", {"error": error, "active_tab": "login"})


def merchant_register(request):
    if request.method != "POST":
        return render(request, "merchant-login.html", {"active_tab": "register"})

    shop_name = request.POST.get("shop_name", "").strip()
    owner_name = request.POST.get("owner_name", "").strip()
    email = request.POST.get("email", "").strip().lower()
    mobile = request.POST.get("mobile", "").strip()
    password = request.POST.get("password", "")
    confirm_password = request.POST.get("confirm_password", "")

    if not all([shop_name, owner_name, email, mobile, password]):
        return render(request, "merchant-login.html", {"error": "All merchant fields are required.", "active_tab": "register"})
    if not all(character.isalpha() or character == " " for character in shop_name):
        return render(request, "merchant-login.html", {
            "error": "Shop name can contain letters and spaces only.",
            "active_tab": "register",
        })
    if not all(character.isalpha() or character == " " for character in owner_name):
        return render(request, "merchant-login.html", {
            "error": "Owner name can contain letters and spaces only.",
            "active_tab": "register",
        })
    if not mobile.isascii() or not mobile.isdigit():
        return render(request, "merchant-login.html", {
            "error": "Mobile number can contain digits only.",
            "active_tab": "register",
        })
    if password != confirm_password:
        return render(request, "merchant-login.html", {"error": "Passwords do not match.", "active_tab": "register"})
    if User.objects.filter(username=shop_name).exists():
        return render(request, "merchant-login.html", {"error": "That shop name is already registered.", "active_tab": "register"})
    if User.objects.filter(email=email).exists():
        return render(request, "merchant-login.html", {"error": "That email is already registered.", "active_tab": "register"})

    try:
        user = User.objects.create_user(
            username=shop_name,
            email=email,
            first_name=owner_name,
            password=password,
        )
    except IntegrityError:
        return render(request, "merchant-login.html", {
            "error": "That shop name or email is already registered.",
            "active_tab": "register",
        })
    MerchantProfile.objects.create(owner=user, shop_name=shop_name, phone=mobile)
    return redirect("/merchant/login/?registered=1")


def merchant_dashboard(request):
    if not request.user.is_authenticated or not request.session.get("merchant_authenticated") or not getattr(request.user, "merchant_profile", None) or not request.user.merchant_profile.is_approved:
        return redirect("merchant_login")
    profile, _ = MerchantProfile.objects.get_or_create(
        owner=request.user,
        defaults={"shop_name": request.user.username},
    )
    orders = profile.orders.all()
    local_orders = Order.objects.filter(merchant_profile=profile)
    products = profile.products.all()
    total_revenue = (orders.aggregate(value=Sum("total"))["value"] or Decimal("0.00")) + (local_orders.aggregate(value=Sum("total_amount"))["value"] or Decimal("0.00"))
    pending_payout = profile.payouts.filter(status="pending").aggregate(value=Sum("amount"))["value"] or Decimal("0.00")
    order_statuses = {
        status: orders.filter(status=status).count()
        for status, _ in MerchantOrder.STATUS_CHOICES
    }
    for status, count in local_orders.values_list("order_status").annotate(count=Count("id")):
        normalized = (status or "").strip().lower()
        if normalized == "delivered":
            order_statuses["delivered"] += count
        elif normalized in {"cancelled", "refunded"}:
            order_statuses[normalized] += count
        elif normalized in {"shipped", "out for delivery", "arriving soon"}:
            order_statuses["shipped"] += count
        else:
            order_statuses["processing"] += count
    top_products = list(
        MerchantOrderItem.objects.filter(order__merchant=profile)
        .values("name")
        .annotate(sold=Sum("quantity"), revenue=Sum(F("price") * F("quantity")))
        .order_by("-sold")[:5]
    )
    for item in OrderItem.objects.filter(order__merchant_profile=profile, order__order_status__iexact="Delivered").values("name").annotate(sold=Sum("quantity"), revenue=Sum(F("price") * F("quantity"))):
        existing = next((row for row in top_products if row["name"] == item["name"]), None)
        if existing:
            existing["sold"] += item["sold"] or 0
            existing["revenue"] = (existing["revenue"] or 0) + (item["revenue"] or 0)
        else:
            top_products.append(item)
    top_products = sorted(top_products, key=lambda row: row["sold"] or 0, reverse=True)[:5]
    today = timezone.localdate()
    today_orders = orders.filter(created_at__date=today)
    today_local_orders = local_orders.filter(created_at__date=today)
    dashboard_order_rows = [{
        "id": order.id,
        "kind": "merchant",
        "number": order.order_number,
        "customer": order.customer_name,
        "email": order.customer_email,
        "items": order.items.count(),
        "total": float(order.total),
        "status": order.status.lower().replace(" ", "-"),
        "time": timezone.localtime(order.created_at).strftime("%d %b %Y, %I:%M %p"),
        "sort": order.created_at.timestamp(),
    } for order in orders]
    dashboard_order_rows.extend({
        "id": order.id,
        "kind": "local",
        "number": f"LM{order.id:05d}",
        "customer": order.customer_name,
        "email": order.customer_email,
        "items": order.items.count(),
        "total": float(order.total_amount),
        "status": (order.order_status or "Placed").lower().replace(" ", "-"),
        "time": timezone.localtime(order.created_at).strftime("%d %b %Y, %I:%M %p"),
        "sort": order.created_at.timestamp(),
    } for order in local_orders)
    dashboard_order_rows.sort(key=lambda row: row["sort"], reverse=True)
    dashboard_orders = [{key: value for key, value in row.items() if key != "sort"} for row in dashboard_order_rows[:100]]
    customer_emails = set(orders.values_list("customer_email", flat=True)) | set(local_orders.values_list("customer_email", flat=True))
    sales_by_day = {}
    for queryset, amount_field in ((orders.filter(created_at__date__gte=today - timedelta(days=6)), "total"), (local_orders.filter(created_at__date__gte=today - timedelta(days=6)), "total_amount")):
        for row in queryset.annotate(day=TruncDate("created_at")).values("day").annotate(revenue=Sum(amount_field)):
            sales_by_day[row["day"]] = sales_by_day.get(row["day"], Decimal("0")) + (row["revenue"] or Decimal("0"))
    context = {
        "merchant_profile": profile,
        "merchant_owner": request.user,
        "today": today.strftime("%d %b %Y"),
        "today_orders": today_orders.count() + today_local_orders.count(),
        "today_revenue": (today_orders.aggregate(value=Sum("total"))["value"] or Decimal("0.00")) + (today_local_orders.aggregate(value=Sum("total_amount"))["value"] or Decimal("0.00")),
        "total_revenue": total_revenue,
        "total_orders": orders.count() + local_orders.count(),
        "pending_payout": pending_payout,
        "active_listings": products.filter(is_active=True).count(),
        "low_stock_count": products.filter(stock__lte=F("low_stock_threshold"), is_active=True).count(),
        "recent_orders": dashboard_order_rows[:8],
        "merchant_products": products[:12],
        "dashboard_orders": json.dumps(dashboard_orders),
        "dashboard_products": json.dumps([
            {
                "id": product.id,
                "name": product.name,
                "price": float(product.price),
                "stock": product.stock,
                "active": product.is_active,
            }
            for product in products[:20]
        ]),
        "activities": profile.activities.all()[:8],
        "unread_notifications": profile.notifications.filter(is_read=False).count(),
        "customer_count": len(customer_emails),
        "coupon_count": profile.coupons.count(),
        "payout_balance": profile.payout_balance,
        "review_count": profile.reviews.count(),
        "ticket_count": profile.tickets.exclude(status="closed").count(),
        "order_statuses": json.dumps(order_statuses),
        "top_products": json.dumps([
            {"name": item["name"], "sold": item["sold"], "revenue": float(item["revenue"] or 0)}
            for item in top_products
        ]),
        "sales_chart": json.dumps([
            {"date": (today - timedelta(days=offset)).strftime("%d %b"), "revenue": float(sales_by_day.get(today - timedelta(days=offset), 0))}
            for offset in range(6, -1, -1)
        ]),
    }
    return render(request, "merchant-dashboard.html", context)


def merchant_logout(request):
    auth_logout(request)
    request.session.pop("merchant_authenticated", None)
    request.session.pop("merchant_profile", None)
    return redirect("merchant_login")


@ensure_csrf_cookie
def cart(request):
    items = []
    fashion_cart = request.session.get("fashion_cart", {})
    fashion_cache = request.session.get("fashion_product_cache", {})
    for product_id, quantity in fashion_cart.items():
        product = fashion_cache.get(str(product_id)) or _fashion_product(str(product_id))
        if product:
            items.append({"source": "fashion", "gst_source": "fashion", "id": str(product_id), "name": product.get("name", "Fashion item"), "category": "Fashion", "image": product.get("image", ""), "price": Decimal(str(product.get("price", 0))), "quantity": int(quantity)})

    electronics_cart = request.session.get("electronics_cart", {})
    for product in ElectronicsProduct.objects.filter(id__in=[int(value) for value in electronics_cart if str(value).isdigit()], is_active=True):
        quantity = int(electronics_cart.get(str(product.id), 0))
        if quantity:
            items.append({"source": "electronics", "gst_source": "electronics", "id": str(product.id), "name": product.name, "category": "Electronics", "image": product.image or "", "price": product.discounted_price, "quantity": quantity, "product_type": product.product_type, "package_size": product.package_size, "stock": product.stock, "stock_unit": product.stock_unit, "stock_status": product.stock_status})

    appliance_cart = request.session.get("home_appliances_cart", {})
    for product in Product.objects.filter(id__in=[int(value) for value in appliance_cart if str(value).isdigit()]):
        quantity = int(appliance_cart.get(str(product.id), 0))
        if quantity:
            items.append({"source": "appliances", "gst_source": "home_appliances", "id": str(product.id), "name": product.name, "category": product.category.name, "image": product.image or "", "price": product.price, "quantity": quantity, "product_type": product.product_type, "package_size": product.package_size, "stock": product.stock, "stock_unit": product.stock_unit, "stock_status": product.stock_status})

    for item in items:
        item["line_total"] = item["price"] * item["quantity"]
    subtotal = sum((item["line_total"] for item in items), Decimal("0.00"))
    tax_items = [{key: item[key] for key in ("id", "name", "quantity", "gst_source", "merchant_product_id") if key in item} for item in items]
    return render(request, "cart.html", {
        "shared_cart_items": items,
        "shared_cart_tax_items": tax_items,
        "shared_cart_subtotal": subtotal,
        "shared_cart_count": sum(item["quantity"] for item in items),
        "gst_supplier_state": SUPPLIER_STATE,
        "applied_coupon_code": request.session.get("checkout_coupon_code", ""),
        "checkout_customer_email": (request.session.get("user") or {}).get("email", ""),
    })


@require_http_methods(["POST"])
def cart_item_action(request):
    source = request.POST.get("source")
    product_id = request.POST.get("product_id", "")
    action = request.POST.get("action")
    session_keys = {"fashion": "fashion_cart", "electronics": "electronics_cart", "appliances": "home_appliances_cart"}
    if source not in session_keys or not product_id:
        return redirect("cart")
    cart_data = request.session.get(session_keys[source], {})
    quantity = int(cart_data.get(product_id, 0))
    if action == "remove" or action == "decrease" and quantity <= 1:
        cart_data.pop(product_id, None)
    elif action == "increase":
        if source == "electronics":
            product = ElectronicsProduct.objects.filter(id=product_id, is_active=True).first()
        elif source == "appliances":
            product = Product.objects.filter(id=product_id).first()
        else:
            product = _fashion_product(product_id) or request.session.get("fashion_product_cache", {}).get(product_id)
        stock = getattr(product, "stock", None) if product is not None else (99 if source == "fashion" else 0)
        if quantity < stock:
            cart_data[product_id] = quantity + 1
    elif action == "decrease" and quantity > 1:
        cart_data[product_id] = quantity - 1
    request.session[session_keys[source]] = cart_data
    return redirect("cart")


def wishlist(request):
    wishlist_ids = request.session.get("fashion_wishlist", [])
    cached_products = request.session.get("fashion_product_cache", {})
    wishlist_items = [product for product_id in wishlist_ids if (product := (_fashion_product(product_id) or cached_products.get(product_id)))]
    return render(request, "wishlist.html", {"fashion_items": wishlist_items})


def admin_login(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect("admin_dashboard")

    error = ""
    if request.method == "POST":
        login_value = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")
        account = User.objects.filter(
            Q(username__iexact=login_value) | Q(email__iexact=login_value)
        ).first()
        user = authenticate(
            request,
            username=account.username if account else login_value,
            password=password,
        )
        if user is not None and user.is_active and (user.is_staff or user.is_superuser):
            auth_login(request, user)
            request.session["admin_authenticated"] = True
            return redirect("admin_dashboard")
        error = "Invalid administrator credentials or insufficient permissions."

    return render(request, "admin-login.html", {"error": error})


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def admin_forgot_password(request):
    form = CustomerPasswordResetRequestForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        email = form.cleaned_data["email"].strip()
        if _password_reset_request_allowed(request, email, "admin"):
            admins = User.objects.filter(
                Q(is_staff=True) | Q(is_superuser=True),
                email__iexact=email,
                is_active=True,
            ).distinct()
            for user in admins:
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                reset_path = reverse(
                    "admin_reset_password",
                    kwargs={"uidb64": uidb64, "token": token},
                )
                reset_url = request.build_absolute_uri(reset_path)
                if not settings.DEBUG and reset_url.startswith("http://"):
                    reset_url = "https://" + reset_url[len("http://"):]
                context = {
                    "user_name": user.get_short_name() or user.username,
                    "reset_url": reset_url,
                    "expires_minutes": max(1, settings.PASSWORD_RESET_TIMEOUT // 60),
                }
                message = EmailMultiAlternatives(
                    subject="LocalMart Admin Password Reset",
                    body=render_to_string("emails/admin-password-reset.txt", context),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[user.email],
                )
                message.attach_alternative(
                    render_to_string("emails/admin-password-reset.html", context),
                    "text/html",
                )
                try:
                    message.send(fail_silently=False)
                except Exception:
                    logger.exception("Admin password-reset email could not be sent")
        return render(request, "admin-password-reset-sent.html", {
            "message": "If an administrator account exists with that email address, a password reset link has been sent.",
        })
    return render(request, "admin-forgot-password.html", {"form": form})


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def admin_reset_password(request, uidb64, token):
    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=user_id, is_active=True)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    valid_link = bool(
        user
        and (user.is_staff or user.is_superuser)
        and default_token_generator.check_token(user, token)
    )
    if not valid_link:
        return render(request, "admin-reset-password.html", {
            "valid_link": False,
            "error_message": "This password reset link is invalid or has expired. Request a new link to continue.",
        }, status=400)

    form = CustomerSetPasswordForm(user, request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(request, "admin-password-reset-success.html")
    return render(request, "admin-reset-password.html", {
        "valid_link": True,
        "form": form,
    })


def admin_dashboard(request):
    if not request.user.is_authenticated or not (
        request.user.is_staff or request.user.is_superuser
    ) or not request.session.get("admin_authenticated"):
        return redirect("admin_login")
    admin_profile, _ = AdminProfile.objects.get_or_create(user=request.user)
    orders = Order.objects.all().order_by("-created_at")
    merchant_orders = MerchantOrder.objects.all().order_by("-created_at")
    revenue = orders.aggregate(total=Sum("total_amount"))["total"] or Decimal("0.00")
    revenue += merchant_orders.aggregate(total=Sum("total"))["total"] or Decimal("0.00")
    customer_count = orders.values("customer_email").distinct().count()
    customer_count += merchant_orders.values("customer_email").distinct().count()
    today = timezone.localdate()
    chart_days = [today - timedelta(days=offset) for offset in range(364, -1, -1)]
    daily_sales = {}
    for row in orders.filter(created_at__date__gte=chart_days[0]).annotate(day=TruncDate("created_at")).values("day").annotate(value=Sum("total_amount")):
        daily_sales[row["day"]] = daily_sales.get(row["day"], Decimal("0")) + (row["value"] or Decimal("0"))
    for row in merchant_orders.filter(created_at__date__gte=chart_days[0]).annotate(day=TruncDate("created_at")).values("day").annotate(value=Sum("total")):
        daily_sales[row["day"]] = daily_sales.get(row["day"], Decimal("0")) + (row["value"] or Decimal("0"))
    product_sales = {}
    for item in OrderItem.objects.values("name", "category").annotate(sold=Sum("quantity"), revenue=Sum(F("price") * F("quantity"))).order_by("-sold")[:10]:
        product_sales[item["name"]] = {"name": item["name"], "category": item["category"], "sold": item["sold"], "revenue": item["revenue"] or 0}
    for item in MerchantOrderItem.objects.values("name").annotate(sold=Sum("quantity"), revenue=Sum(F("price") * F("quantity"))).order_by("-sold")[:10]:
        row = product_sales.setdefault(item["name"], {"name": item["name"], "category": "Merchant product", "sold": 0, "revenue": Decimal("0")})
        row["sold"] += item["sold"] or 0
        row["revenue"] += item["revenue"] or Decimal("0")
    activity_items = []
    for order in orders.order_by("-created_at")[:4]:
        activity_items.append({"sort": order.created_at.timestamp(), "icon": "blue", "title": "Order received", "detail": f"Order ORD-{order.id} · {order.customer_name}", "date": order.created_at.strftime("%d %b, %I:%M %p")})
    for profile in MerchantProfile.objects.select_related("owner").order_by("-created_at")[:4]:
        activity_items.append({"sort": profile.created_at.timestamp(), "icon": "purple", "title": "Merchant application", "detail": f"{profile.shop_name} · {'Approved' if profile.is_approved else 'Awaiting review'}", "date": profile.created_at.strftime("%d %b, %I:%M %p")})
    for activity in MerchantActivity.objects.select_related("merchant").order_by("-created_at")[:4]:
        activity_items.append({"sort": activity.created_at.timestamp(), "icon": "green", "title": activity.merchant.shop_name, "detail": activity.message, "date": activity.created_at.strftime("%d %b, %I:%M %p")})
    activity_items = sorted(activity_items, key=lambda item: item["sort"], reverse=True)[:6]
    for item in activity_items: item.pop("sort", None)
    recent_orders = [
        {
            "id": f"ORD-{order.id}",
            "customer": order.customer_name,
            "date": order.created_at.strftime("%d %b %Y, %I:%M %p"),
            "status": order.order_status.lower(),
            "amount": float(order.total_amount),
            "sort": order.created_at.timestamp(),
        }
        for order in orders[:10]
    ] + [
        {
            "id": order.order_number,
            "customer": order.customer_name,
            "date": order.created_at.strftime("%d %b %Y, %I:%M %p"),
            "status": order.status,
            "amount": float(order.total),
            "sort": order.created_at.timestamp(),
        }
        for order in merchant_orders[:10]
    ]
    recent_orders.sort(key=lambda item: item["sort"], reverse=True)
    for item in recent_orders: item.pop("sort", None)
    context = {
        "admin_user": request.user,
        "admin_profile": admin_profile,
        "admin_profile_data": json.dumps({
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "username": request.user.username,
            "mobile_number": admin_profile.mobile_number,
            "image_url": admin_profile.image_url,
            "role": "Super Admin" if request.user.is_superuser else "Administrator",
            "date_joined": request.user.date_joined.strftime("%b %d, %Y") if request.user.date_joined else "Not available",
            "last_login": request.user.last_login.strftime("%b %d, %Y %I:%M %p") if request.user.last_login else "Never",
            "is_active": request.user.is_active,
            "avatar_initial": (request.user.get_full_name() or request.user.username)[:1].upper(),
        }),
        "admin_today": today.strftime("%d %b %Y"),
        "admin_revenue": revenue,
        "admin_order_count": orders.count() + merchant_orders.count(),
        "admin_customer_count": customer_count,
        "admin_merchant_count": MerchantProfile.objects.filter(is_approved=True, owner__is_active=True).count(),
        "admin_pending_merchants": MerchantProfile.objects.filter(is_approved=False).count(),
        "admin_sales_chart": json.dumps([{"date": day.isoformat(), "label": day.strftime("%d %b"), "revenue": float(daily_sales.get(day, 0))} for day in chart_days]),
        "admin_top_products": json.dumps([{**item, "revenue": float(item["revenue"])} for item in sorted(product_sales.values(), key=lambda x: x["sold"], reverse=True)[:5]]),
        "admin_activity": json.dumps(activity_items),
        "admin_categories": Category.objects.count() + ElectronicsCategory.objects.count(),
        "admin_merchant_data": json.dumps([
            {
                "id": profile.id,
                "shop_name": profile.shop_name,
                "email": profile.owner.email,
                "is_approved": profile.is_approved,
            }
            for profile in MerchantProfile.objects.select_related("owner").order_by("shop_name")
        ]),
        "admin_recent_orders": json.dumps(recent_orders[:10]),
        "admin_product_count": Product.objects.count() + ElectronicsProduct.objects.count() + MerchantProduct.objects.count() + len(_admin_static_product_catalog()) + len(FASHION_PRODUCTS),
        "admin_category_count": Category.objects.count() + ElectronicsCategory.objects.count(),
    }
    return render(request, "admin.html", context)


def admin_logout(request):
    auth_logout(request)
    request.session.pop("admin_authenticated", None)
    return redirect("admin_login")


def _admin_api_allowed(request):
    return bool(request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser) and request.session.get("admin_authenticated"))


@require_http_methods(["POST"])
def admin_profile_update(request):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    profile, _ = AdminProfile.objects.get_or_create(user=request.user)
    form = AdminProfileForm(request.POST, instance=profile, user=request.user)
    if not form.is_valid():
        return JsonResponse({"success": False, "errors": form.errors.get_json_data()}, status=400)
    profile = form.save()
    full_name = request.user.get_full_name()
    return JsonResponse({
        "success": True,
        "message": "Profile updated successfully.",
        "profile": {
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "full_name": full_name,
            "email": request.user.email,
            "username": request.user.username,
            "mobile_number": profile.mobile_number,
            "image_url": profile.image_url,
            "role": "Super Admin" if request.user.is_superuser else "Administrator",
            "avatar_initial": (full_name or request.user.username)[:1].upper(),
        },
    })


def _admin_json(request):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    try:
        return json.loads(request.body.decode("utf-8")) if request.body else {}
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None


def admin_merchant_approvals_api(request):
    if request.method != "GET" or not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    merchants = list(
        MerchantProfile.objects.select_related("owner").order_by("shop_name").values(
            "id", "shop_name", "owner__email", "is_approved",
        )
    )
    return JsonResponse({
        "success": True,
        "pending_count": sum(not merchant["is_approved"] for merchant in merchants),
        "merchants": [{
            "id": merchant["id"],
            "shop_name": merchant["shop_name"],
            "email": merchant["owner__email"],
            "is_approved": merchant["is_approved"],
        } for merchant in merchants],
    })


@lru_cache(maxsize=1)
def _admin_static_product_catalog():
    catalog_path = Path(__file__).with_name("admin_catalog.json")
    try:
        with catalog_path.open(encoding="utf-8") as catalog_file:
            return json.load(catalog_file)
    except (OSError, json.JSONDecodeError):
        return []


def _admin_product_group(category):
    category = str(category or "")
    prefix = category.split(" / ", 1)[0]
    if prefix in {"Food", "Grocery", "Shopping", "Electronics", "Home Appliances"}:
        return prefix
    appliance_categories = {
        "Refrigerators", "Washing Machines", "Air Conditioners", "Televisions",
        "Microwave Ovens", "Mixer Grinders", "Air Fryers", "Fans", "Vacuum Cleaners",
        "Water Purifiers", "Geysers", "Dishwashers", "Induction Cooktops", "Kitchen Chimneys",
    }
    return "Home Appliances" if category in appliance_categories else "Marketplace"


def admin_products_api(request, product_id=None):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        qs = Product.objects.select_related("category").all()
        if product_id:
            qs = qs.filter(id=product_id)
        products = [
            {**row, "kind": "store", "category": row["category__name"], "group": _admin_product_group(row["category__name"])}
            for row in qs.values("id", "name", "brand", "price", "stock", "image", "category_id", "category__name")
        ]
        if product_id:
            return JsonResponse({"success": True, "products": products})

        for item in ElectronicsProduct.objects.select_related("category").values("id", "name", "brand", "price", "stock", "image", "category__name"):
            products.append({**item, "kind": "electronics", "category": f"Electronics / {item['category__name']}", "group": "Electronics", "stock": item["stock"]})

        seen = {(str(p["name"]).strip().casefold(), str(p.get("price", "")).strip()) for p in products}
        static_products = []
        for item in _admin_static_product_catalog():
            name = str(item.get("name", "")).strip()
            raw_price = str(item.get("price", ""))
            numeric_price = re.sub(r"[^0-9.]", "", raw_price.replace(",", ""))
            key = (name.casefold(), numeric_price)
            if not name or key in seen:
                continue
            seen.add(key)
            static_products.append({
                "id": f"static-{len(static_products) + 1}", "kind": "static",
                "name": name, "brand": item.get("brand", ""),
                "price": numeric_price or raw_price, "stock": item.get("stock"),
                "image": item.get("image", ""), "category": item.get("category", "Other"),
                "group": _admin_product_group(item.get("category")),
            })
        for item in FASHION_PRODUCTS:
            name = str(item.get("name", "")).strip()
            raw_price = str(item.get("price", ""))
            numeric_price = re.sub(r"[^0-9.]", "", raw_price.replace(",", ""))
            key = (name.casefold(), numeric_price)
            if not name or key in seen:
                continue
            seen.add(key)
            static_products.append({"id": f"fashion-{len(static_products) + 1}", "kind": "static", "name": name,
                "brand": item.get("brand", ""), "price": numeric_price or raw_price, "stock": None,
                "image": item.get("image", ""), "category": f"Shopping / {str(item.get('category', 'Fashion')).title()}", "group": "Shopping"})
        products.extend(static_products)
        return JsonResponse({"success": True, "products": products})
    data = _admin_json(request)
    if data is None:
        return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    if request.method == "POST" and product_id is None:
        try:
            category = Category.objects.filter(id=int(data.get("category_id"))).first()
            if category is None: raise ValueError
            name = str(data.get("name", "")).strip()
            price = Decimal(str(data.get("price", "")))
            stock = int(data.get("stock", 0))
            if not name or price < 0 or stock < 0:
                raise ValueError
            product = Product.objects.create(category=category, name=name, brand=str(data.get("brand", "")).strip(), price=price, stock=stock, image=str(data.get("image", "")).strip())
        except (ValueError, TypeError, InvalidOperation, Category.DoesNotExist):
            return JsonResponse({"success": False, "message": "Provide a valid category, product name, price, and stock."}, status=400)
        return JsonResponse({"success": True, "product_id": product.id}, status=201)
    if not product_id:
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    product = get_object_or_404(Product, id=product_id)
    if request.method == "DELETE":
        product.delete()
        return JsonResponse({"success": True})
    if request.method not in ("PATCH", "PUT"):
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    try:
        if "category_id" in data:
            category = Category.objects.filter(id=int(data["category_id"])).first()
            if category is None: raise ValueError
            product.category = category
        if "name" in data: product.name = str(data["name"]).strip()
        if "brand" in data: product.brand = str(data["brand"]).strip()
        if "image" in data: product.image = str(data["image"]).strip()
        if "price" in data: product.price = Decimal(str(data["price"]))
        if "stock" in data: product.stock = int(data["stock"])
        if not product.name or product.price < 0 or product.stock < 0: raise ValueError
        product.save()
    except (ValueError, TypeError, InvalidOperation, Category.DoesNotExist):
        return JsonResponse({"success": False, "message": "Invalid product details."}, status=400)
    return JsonResponse({"success": True})


def admin_merchant_products_api(request, product_id=None):
    if not _admin_api_allowed(request): return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    qs = MerchantProduct.objects.select_related("merchant", "category").all()
    if request.method == "GET":
        if product_id: qs = qs.filter(id=product_id)
        return JsonResponse({"success": True, "products": list(qs.values("id", "name", "sku", "merchant__shop_name", "category__name", "price", "stock", "is_active"))})
    if not product_id: return JsonResponse({"success": False, "message": "Product ID required."}, status=400)
    product = get_object_or_404(MerchantProduct, id=product_id)
    if request.method == "DELETE": product.delete(); return JsonResponse({"success": True})
    if request.method not in ("PATCH", "PUT"): return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    if not isinstance(data.get("is_active"), bool): return JsonResponse({"success": False, "message": "is_active must be true or false."}, status=400)
    product.is_active = data["is_active"]
    product.save(update_fields=["is_active", "updated_at"])
    return JsonResponse({"success": True})


def admin_categories_api(request, category_id=None):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        qs = Category.objects.all()
        if category_id: qs = qs.filter(id=category_id)
        return JsonResponse({"success": True, "categories": list(qs.values("id", "name"))})
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    if request.method == "POST" and category_id is None:
        name = str(data.get("name", "")).strip()
        if not name: return JsonResponse({"success": False, "message": "Category name is required."}, status=400)
        category, created = Category.objects.get_or_create(name=name)
        return JsonResponse({"success": True, "category_id": category.id}, status=201 if created else 200)
    if not category_id: return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    category = get_object_or_404(Category, id=category_id)
    if request.method == "DELETE":
        if category.products.exists(): return JsonResponse({"success": False, "message": "Move or delete this category’s products first."}, status=400)
        category.delete(); return JsonResponse({"success": True})
    if request.method not in ("PATCH", "PUT"): return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    name = str(data.get("name", "")).strip()
    if not name: return JsonResponse({"success": False, "message": "Category name is required."}, status=400)
    category.name = name
    try: category.save()
    except IntegrityError: return JsonResponse({"success": False, "message": "That category already exists."}, status=400)
    return JsonResponse({"success": True})


def admin_customers_api(request):
    if request.method != "GET" or not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    orders = list(Order.objects.values("customer_email", "customer_name").annotate(order_count=Count("id"), spent=Sum("total_amount")))
    merchant_orders = list(MerchantOrder.objects.values("customer_email", "customer_name").annotate(order_count=Count("id"), spent=Sum("total")))
    customer_map = {}
    for row in orders + merchant_orders:
        customer = customer_map.setdefault(row["customer_email"], {"email": row["customer_email"], "name": row["customer_name"], "orders": 0, "spent": Decimal("0")})
        customer["orders"] += row["order_count"]
        customer["spent"] += row["spent"] or Decimal("0")
    return JsonResponse({"success": True, "customers": [{**c, "spent": str(c["spent"])} for c in customer_map.values()]})


def admin_orders_api(request):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        rows = [{"kind": "store", "id": o.id, "number": f"ORD-{o.id}", "customer": o.customer_name, "date": o.created_at.strftime("%d %b %Y, %I:%M %p"), "sort": o.created_at.timestamp(), "status": o.order_status, "amount": str(o.total_amount)} for o in Order.objects.all().order_by("-created_at")]
        rows += [{"kind": "merchant", "id": o.id, "number": o.order_number, "customer": o.customer_name, "date": o.created_at.strftime("%d %b %Y, %I:%M %p"), "sort": o.created_at.timestamp(), "status": o.status, "amount": str(o.total)} for o in MerchantOrder.objects.all().order_by("-created_at")]
        rows.sort(key=lambda row: row["sort"], reverse=True)
        for row in rows: row.pop("sort", None)
        return JsonResponse({"success": True, "orders": rows})
    if request.method not in ("PATCH", "PUT"):
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    kind, status_value = data.get("kind"), str(data.get("status", "")).strip()
    allowed = ["Placed", "Confirmed", "Processing", "Shipped", "Delivered"] if kind == "store" else ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned"]
    normalized = {v.lower(): v for v in allowed}.get(status_value.lower())
    if not normalized: return JsonResponse({"success": False, "message": "Invalid order status."}, status=400)
    order_model = Order if kind == "store" else MerchantOrder if kind == "merchant" else None
    if order_model is None: return JsonResponse({"success": False, "message": "Invalid order type."}, status=400)
    if kind == "store":
        with transaction.atomic():
            order = get_object_or_404(Order.objects.select_for_update(), id=data.get("id"))
            previous_status = order.order_status
            order.order_status = normalized
            order.save(update_fields=["order_status"])
            if previous_status != normalized:
                OrderStatusHistory.objects.create(order=order, event_type="order_status", from_status=previous_status, to_status=normalized, note="Updated by administrator.", actor=request.user if request.user.is_authenticated else None)
    else:
        order = get_object_or_404(order_model, id=data.get("id"))
        order.status = normalized
        order.save(update_fields=["status"])
    return JsonResponse({"success": True})


def admin_coupons_api(request, coupon_id=None):
    if not _admin_api_allowed(request): return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        qs = MerchantCoupon.objects.select_related("merchant").all()
        if coupon_id: qs = qs.filter(id=coupon_id)
        return JsonResponse({"success": True, "coupons": list(qs.values("id", "code", "merchant__shop_name", "percentage", "fixed_amount", "active", "expires_at"))})
    if not coupon_id: return JsonResponse({"success": False, "message": "Coupon ID required."}, status=400)
    coupon = get_object_or_404(MerchantCoupon, id=coupon_id)
    if request.method == "DELETE": coupon.delete(); return JsonResponse({"success": True})
    if request.method not in ("PATCH", "PUT"): return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    if "active" in data:
        if not isinstance(data["active"], bool): return JsonResponse({"success": False, "message": "Active must be true or false."}, status=400)
        coupon.active = data["active"]
    try:
        if "percentage" in data: coupon.percentage = int(data["percentage"])
        if "fixed_amount" in data: coupon.fixed_amount = Decimal(str(data["fixed_amount"]))
        if coupon.percentage < 0 or coupon.percentage > 100 or coupon.fixed_amount < 0: raise ValueError
    except (ValueError, TypeError, InvalidOperation): return JsonResponse({"success": False, "message": "Invalid coupon discount."}, status=400)
    coupon.save(); return JsonResponse({"success": True})


def admin_checkout_coupons_api(request):
    if not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method != "GET":
        return JsonResponse({"success": False, "message": "Manage checkout coupons in the coupon editor."}, status=405)
    coupons = []
    for coupon in Coupon.objects.all():
        paid_orders = coupon.orders.filter(payment_status__iexact="Paid")
        paid_count = paid_orders.count()
        discount_given = paid_orders.aggregate(total=Sum("coupon_discount"))["total"] or Decimal("0.00")
        coupons.append({
            "id": coupon.pk,
            "code": coupon.code,
            "description": coupon.description,
            "discount_type": coupon.discount_type,
            "discount_value": str(coupon.discount_value),
            "maximum_discount": str(coupon.maximum_discount_amount) if coupon.maximum_discount_amount is not None else "",
            "minimum_order": str(coupon.minimum_order_amount),
            "eligible_categories": coupon.eligible_categories or list(Coupon.CATEGORY_GROUPS),
            "is_active": coupon.is_active,
            "starts_at": coupon.starts_at.isoformat() if coupon.starts_at else "",
            "expires_at": coupon.expires_at.isoformat() if coupon.expires_at else "",
            "usage_limit": coupon.usage_limit,
            "successful_redemptions": paid_count,
            "discount_given": str(discount_given),
            "remaining_capacity": max(0, coupon.usage_limit - paid_count) if coupon.usage_limit is not None else None,
        })
    return JsonResponse({"success": True, "coupons": coupons})


def admin_reviews_api(request, review_id=None):
    if not _admin_api_allowed(request): return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        qs = MerchantReview.objects.select_related("merchant", "product").all()
        if review_id: qs = qs.filter(id=review_id)
        return JsonResponse({"success": True, "reviews": list(qs.values("id", "merchant__shop_name", "product__name", "customer_name", "rating", "comment", "reply", "created_at"))})
    if request.method not in ("PATCH", "PUT"): return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    review = get_object_or_404(MerchantReview, id=review_id)
    review.reply = str(data.get("reply", ""))[:5000]
    review.save(update_fields=["reply"]); return JsonResponse({"success": True})


def admin_payouts_api(request, payout_id=None):
    if not _admin_api_allowed(request): return JsonResponse({"success": False, "message": "Administrator access required."}, status=403)
    if request.method == "GET":
        qs = MerchantPayout.objects.select_related("merchant").all()
        if payout_id: qs = qs.filter(id=payout_id)
        return JsonResponse({"success": True, "payouts": list(qs.values("id", "merchant__shop_name", "amount", "status", "reference", "created_at"))})
    if request.method not in ("PATCH", "PUT"): return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    data = _admin_json(request)
    if data is None: return JsonResponse({"success": False, "message": "Invalid JSON."}, status=400)
    payout = get_object_or_404(MerchantPayout, id=payout_id)
    status_value = str(data.get("status", "")).lower()
    if status_value not in {"pending", "paid", "failed"}: return JsonResponse({"success": False, "message": "Invalid payout status."}, status=400)
    payout.status = status_value
    if "reference" in data: payout.reference = str(data["reference"])[:120]
    payout.save(update_fields=["status", "reference"]); return JsonResponse({"success": True})


def admin_approve_merchant(request, merchant_id):
    if request.method != "POST" or not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Admin permission required."}, status=403)
    profile = get_object_or_404(MerchantProfile, id=merchant_id)
    profile.is_approved = True
    profile.approved_at = timezone.now()
    profile.save(update_fields=["is_approved", "approved_at"])
    return JsonResponse({"success": True, "merchant_id": profile.id})


def admin_delete_merchant(request, merchant_id):
    if request.method != "POST" or not _admin_api_allowed(request):
        return JsonResponse({"success": False, "message": "Admin permission required."}, status=403)
    profile = get_object_or_404(MerchantProfile, pk=merchant_id)
    if not profile.is_approved:
        return JsonResponse({"success": False, "message": "Only approved merchant stores can be deleted here."}, status=400)
    deleted_name = profile.shop_name
    profile.delete()
    return JsonResponse({"success": True, "merchant_id": merchant_id, "shop_name": deleted_name})


def admin_export_report(request):
    if not _admin_api_allowed(request):
        return redirect("admin_login")
    section = request.GET.get("section", "overview")
    if section not in {"overview", "orders", "merchants"}:
        return JsonResponse({"success": False, "message": "Unknown report section."}, status=400)

    styles = getSampleStyleSheet()
    title_style = styles["Title"]
    body_style = styles["BodyText"]
    body_style.fontSize = 7
    body_style.leading = 9

    def cell(value):
        text = str(value if value is not None else "")
        safe_text = escape_xml(text.encode("ascii", "replace").decode("ascii"))
        return Paragraph(safe_text, body_style)

    report = BytesIO()
    document = SimpleDocTemplate(
        report,
        pagesize=landscape(A4),
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30,
        title=f"LocalMart {section.title()} Report",
    )
    content = [
        Paragraph(f"LocalMart {section.title()} Report", title_style),
        Paragraph(f"Generated {timezone.localtime().strftime('%d %b %Y, %I:%M %p')}", body_style),
        Spacer(1, 14),
    ]
    table_style = TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#17324d")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f1f5f9")]),
    ])

    if section in {"overview", "orders"}:
        content.append(Paragraph("Orders", styles["Heading2"]))
        order_rows = [[cell(value) for value in ("Order", "Customer", "Email", "Status", "Amount", "Date")]]
        for order in Order.objects.all().order_by("-created_at"):
            order_rows.append([cell(value) for value in (
                f"ORD-{order.id}", order.customer_name, order.customer_email,
                order.order_status, f"INR {order.total_amount:.2f}",
                timezone.localtime(order.created_at).strftime("%d %b %Y, %I:%M %p"),
            )])
        for order in MerchantOrder.objects.all().order_by("-created_at"):
            order_rows.append([cell(value) for value in (
                order.order_number, order.customer_name, order.customer_email,
                order.status, f"INR {order.total:.2f}",
                timezone.localtime(order.created_at).strftime("%d %b %Y, %I:%M %p"),
            )])
        content.append(Table(order_rows, colWidths=[75, 125, 175, 90, 75, 145], repeatRows=1, style=table_style))

    if section in {"overview", "merchants"}:
        if section == "overview":
            content.extend([Spacer(1, 18)])
        content.append(Paragraph("Merchants", styles["Heading2"]))
        merchant_rows = [[cell(value) for value in ("Store", "Owner email", "Phone", "Status", "Payout balance", "Registered")]]
        for merchant in MerchantProfile.objects.select_related("owner").order_by("shop_name"):
            merchant_rows.append([cell(value) for value in (
                merchant.shop_name, merchant.owner.email, merchant.phone,
                "Approved" if merchant.is_approved else "Pending",
                f"{merchant.currency} {merchant.payout_balance:.2f}",
                timezone.localtime(merchant.created_at).strftime("%d %b %Y, %I:%M %p"),
            )])
        content.append(Table(merchant_rows, colWidths=[140, 175, 100, 85, 105, 145], repeatRows=1, style=table_style))

    document.build(content)
    response = HttpResponse(report.getvalue(), content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="localmart-{section}-report.pdf"'
    return response


CUSTOMER_RESET_GENERIC_MESSAGE = (
    "If an account exists with that email address, a password reset link has been sent."
)


def _password_reset_request_allowed(request, email, scope):
    """Rate-limit password-reset requests without placing emails in cache keys."""
    ip = request.META.get("REMOTE_ADDR", "unknown")
    email_hash = hashlib.sha256(email.casefold().encode("utf-8")).hexdigest()
    ip_hash = hashlib.sha256(ip.encode("utf-8")).hexdigest()
    try:
        outcomes = []
        for key, limit in (
            (f"{scope}-reset:email:{email_hash}", 3),
            (f"{scope}-reset:ip:{ip_hash}", 10),
        ):
            if cache.add(key, 1, timeout=3600):
                outcomes.append(True)
            else:
                outcomes.append(cache.incr(key) <= limit)
        return all(outcomes)
    except Exception:
        logger.warning("Customer password-reset rate-limit cache unavailable")
        return True


def _customer_reset_users(email):
    """Only customer accounts use this flow; merchant and admin accounts have separate login flows."""
    return User.objects.filter(
        email__iexact=email,
        is_active=True,
        is_staff=False,
        is_superuser=False,
    ).exclude(merchant_profile__isnull=False).distinct()


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def forgot_password(request):
    form = CustomerPasswordResetRequestForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        email = form.cleaned_data["email"].strip()
        if _password_reset_request_allowed(request, email, "customer"):
            for user in _customer_reset_users(email):
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                reset_path = reverse(
                    "user_reset_password",
                    kwargs={"uidb64": uidb64, "token": token},
                )
                reset_url = request.build_absolute_uri(reset_path)
                if not settings.DEBUG and reset_url.startswith("http://"):
                    reset_url = "https://" + reset_url[len("http://"):]
                context = {
                    "user_name": user.first_name or user.username,
                    "reset_url": reset_url,
                    "expires_minutes": max(1, settings.PASSWORD_RESET_TIMEOUT // 60),
                }
                text_body = render_to_string("emails/user-password-reset.txt", context)
                html_body = render_to_string("emails/user-password-reset.html", context)
                message = EmailMultiAlternatives(
                    subject="LocalMart Password Reset",
                    body=text_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[user.email],
                )
                message.attach_alternative(html_body, "text/html")
                try:
                    message.send(fail_silently=False)
                except Exception:
                    logger.exception("Customer password-reset email could not be sent")
        return render(request, "user-password-reset-sent.html", {
            "message": CUSTOMER_RESET_GENERIC_MESSAGE,
        })
    return render(request, "user-forgot-password.html", {"form": form})


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def user_reset_password(request, uidb64, token):
    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=user_id, is_active=True)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    valid_link = bool(
        user
        and not user.is_staff
        and not user.is_superuser
        and not hasattr(user, "merchant_profile")
        and default_token_generator.check_token(user, token)
    )
    if not valid_link:
        return render(request, "user-reset-password.html", {
            "valid_link": False,
            "error_message": "This password reset link is invalid or has expired. Request a new link to continue.",
        }, status=400)

    form = CustomerSetPasswordForm(user, request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return render(request, "user-password-reset-success.html")
    return render(request, "user-reset-password.html", {
        "valid_link": True,
        "form": form,
    })


def orders(request):

    # ==========================================
    # GET LOGGED-IN USER FROM SESSION
    # ==========================================

    user_data = request.session.get("user")

    print("========================================")
    print("MY ORDERS")
    print("SESSION USER:", user_data)
    print("========================================")

    if not user_data:
        return redirect("login")

    customer_email = (
        user_data.get("email", "")
        .strip()
        .lower()
    )

    if not customer_email:
        return redirect("login")

    # ==========================================
    # GET CUSTOMER ORDERS
    # ==========================================

    customer_orders = (
        Order.objects
        .filter(
            customer_email__iexact=customer_email
        )
        .prefetch_related("items")
        .order_by("-created_at")
    )

    print("CUSTOMER EMAIL:", customer_email)
    print("ORDERS FOUND:", customer_orders.count())

    for order in customer_orders:

        print(
            "ORDER:",
            order.id,
            "| EMAIL:",
            order.customer_email,
            "| STATUS:",
            order.order_status
        )

    # ==========================================
    # RENDER
    # ==========================================

    _annotate_customer_order_actions(customer_orders)
    return render(
        request,
        "orders.html",
        {
            "orders": customer_orders
        }
    )


def shopping_my_orders(request):
    user_data = request.session.get("user")

    if not user_data:
        return redirect("login")

    customer_email = user_data.get("email", "").strip().lower()

    if not customer_email:
        return redirect("login")

    customer_orders = (
        Order.objects
        .filter(customer_email__iexact=customer_email)
        .prefetch_related("items")
        .order_by("-created_at")
    )

    _annotate_customer_order_actions(customer_orders)
    return render(request, "orders.html", {"orders": customer_orders})


def _annotate_customer_order_actions(customer_orders):
    delivered_statuses = {"delivered", "complete", "completed"}
    for order in customer_orders:
        normalized = (order.order_status or "").strip().casefold()
        order.can_request_cancellation = normalized not in {"delivered", "complete", "completed", "cancelled", "canceled", "refunded"}
        try:
            order.cancellation_request = order.cancellation
        except OrderCancellation.DoesNotExist:
            order.cancellation_request = None
        order.refund_records = order.refunds.all()
        order.returnable_items = []
        if normalized not in delivered_statuses:
            continue
        delivery_event = order.status_history.filter(to_status__iexact="delivered").order_by("-created_at").first()
        delivered_at = delivery_event.created_at if delivery_event else order.created_at
        for item in order.items.all():
            policy = ReturnPolicy.objects.filter(category__iexact=item.category).first()
            item.return_policy = policy
            item.return_deadline = delivered_at + timedelta(days=policy.return_window_days) if policy and policy.return_window_days is not None else None
            within_return_window = bool(item.return_deadline and timezone.now() <= item.return_deadline)
            item.can_return = bool(policy and policy.returns_allowed and within_return_window)
            item.can_replace = bool(policy and policy.replacements_allowed and policy.replacement_window_days is not None and timezone.now() <= delivered_at + timedelta(days=policy.replacement_window_days))
            order.returnable_items.append(item)


def _customer_order_for_action(request, order_id):
    user_data = request.session.get("user") or {}
    email = str(user_data.get("email", "")).strip().lower()
    if not request.user.is_authenticated or not email or request.user.email.strip().lower() != email:
        return None
    return Order.objects.filter(pk=order_id, customer_email__iexact=email).first()


def _policy_for_item(item):
    return ReturnPolicy.objects.filter(category__iexact=item.category).first()


def _replacement_inventory(item, reserve=False):
    """Check and, when approving, reserve supported product inventory atomically."""
    source = (item.catalog_source or "").casefold()
    key = str(item.source_product_id or "")
    if item.merchant_product_id:
        product = MerchantProduct.objects.select_for_update().filter(pk=item.merchant_product_id, is_active=True).first()
        if not product or product.stock < item.quantity:
            return False
        if reserve:
            product.stock -= item.quantity
            product.save(update_fields=("stock",))
        return True
    if source == "electronics" and key.isdigit():
        product = ElectronicsProduct.objects.select_for_update().filter(pk=int(key), is_active=True).first()
        if not product or product.stock < item.quantity:
            return False
        if reserve:
            product.stock -= item.quantity
            product.save(update_fields=("stock",))
        return True
    if source == "home_appliances" and key.isdigit():
        product = Product.objects.select_for_update().filter(pk=int(key)).first()
        if not product or product.stock < item.quantity:
            return False
        if reserve:
            product.stock -= item.quantity
            product.save(update_fields=("stock",))
        return True
    catalog = GSTCatalogProduct.objects.select_for_update().filter(source=source, product_key=key, is_active=True, stock_configured=True).first()
    if not catalog or catalog.stock < item.quantity:
        return False
    if reserve:
        catalog.stock -= item.quantity
        catalog.save(update_fields=("stock",))
    return True


def _release_replacement_inventory(record):
    if not record.replacement_stock_reserved:
        return
    item = record.order_item
    source = (item.catalog_source or "").casefold()
    key = str(item.source_product_id or "")
    if item.merchant_product_id:
        MerchantProduct.objects.filter(pk=item.merchant_product_id).update(stock=F("stock") + item.quantity)
    elif source == "electronics" and key.isdigit():
        ElectronicsProduct.objects.filter(pk=int(key)).update(stock=F("stock") + item.quantity)
    elif source == "home_appliances" and key.isdigit():
        Product.objects.filter(pk=int(key)).update(stock=F("stock") + item.quantity)
    else:
        GSTCatalogProduct.objects.filter(source=source, product_key=key, stock_configured=True).update(stock=F("stock") + item.quantity)
    record.replacement_stock_reserved = False


def _notify_order_update(order, subject, body):
    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [order.customer_email], fail_silently=True)
    except Exception:
        logger.exception("Unable to notify customer for order %s", order.pk)


@require_http_methods(["POST"])
def request_order_cancellation(request, order_id):
    order = _customer_order_for_action(request, order_id)
    if order is None:
        return JsonResponse({"success": False, "message": "Sign in to manage this order."}, status=403)
    reason = str(request.POST.get("reason", "")).strip()
    details = str(request.POST.get("details", "")).strip()[:2000]
    valid_reasons = dict(OrderCancellation.REASONS)
    if reason not in valid_reasons:
        return JsonResponse({"success": False, "message": "Choose a cancellation reason."}, status=400)
    refund_to_submit = None
    try:
        with transaction.atomic():
            order = Order.objects.select_for_update().get(pk=order.pk)
            current = (order.order_status or "").strip().casefold()
            if current in {"delivered", "complete", "completed"}:
                raise ValueError("This order is delivered. Use the return option for an eligible item.")
            if current in {"cancelled", "canceled", "refunded"}:
                raise ValueError("This order has already been cancelled.")
            if OrderCancellation.objects.filter(order=order).exists():
                raise ValueError("A cancellation request already exists for this order.")
            instant = current in {"placed", "confirmed"}
            cancellation = OrderCancellation.objects.create(
                order=order, requested_by=request.user, reason=reason, details=details,
                status="approved" if instant else "requested",
                review_note="Automatically approved before processing." if instant else "Awaiting staff review.",
                reviewed_at=timezone.now() if instant else None,
            )
            if instant:
                previous_status = order.order_status
                order.order_status = "Cancelled"
                if order.payment_status.casefold() not in {"paid", "partially refunded", "refunded"}:
                    order.payment_status = "Cancelled"
                order.save(update_fields=("order_status", "payment_status"))
                _restore_order_inventory(order)
                OrderStatusHistory.objects.create(order=order, event_type="cancellation", from_status=previous_status, to_status="Cancelled", note=details or valid_reasons[reason], actor=request.user)
                if order.payment_status.casefold() in {"paid", "partially refunded"} and is_razorpay_order(order):
                    refundable_amount = unrefunded_balance(order)
                    if refundable_amount > 0:
                        refund_to_submit, _ = create_refund_record(order=order, amount=refundable_amount, reason=f"Order cancellation: {valid_reasons[reason]}", idempotency_key=f"cancel:{cancellation.pk}", cancellation=cancellation)
            else:
                OrderStatusHistory.objects.create(order=order, event_type="cancellation", from_status=order.order_status, to_status="Requested", note=details or valid_reasons[reason], actor=request.user)
    except (ValueError, IntegrityError) as error:
        return JsonResponse({"success": False, "message": str(error) or "A cancellation request already exists."}, status=409)
    if refund_to_submit:
        refund_to_submit = submit_refund(refund_to_submit.pk)
    _notify_order_update(order, f"LocalMart cancellation update for order #{order.pk}", f"Your cancellation is {cancellation.get_status_display().lower()}. Refunds are tracked separately and are not marked complete until Razorpay confirms them.")
    return JsonResponse({"success": True, "message": f"Cancellation {cancellation.status}.", "status": cancellation.status, "refund_status": refund_to_submit.status if refund_to_submit else "not_applicable"})


@require_http_methods(["POST"])
def request_order_return(request, order_id, item_id):
    order = _customer_order_for_action(request, order_id)
    if order is None:
        return JsonResponse({"success": False, "message": "Sign in to manage this order."}, status=403)
    item = OrderItem.objects.filter(pk=item_id, order=order).first()
    if item is None:
        return JsonResponse({"success": False, "message": "Order item not found."}, status=404)
    policy = _policy_for_item(item)
    if (order.order_status or "").casefold() != "delivered" or not policy or not policy.returns_allowed or policy.return_window_days is None:
        return JsonResponse({"success": False, "message": "This item is not return eligible under its current category policy."}, status=400)
    delivery_event = order.status_history.filter(to_status__iexact="delivered").order_by("-created_at").first()
    delivered_at = delivery_event.created_at if delivery_event else order.created_at
    if timezone.now() > delivered_at + timedelta(days=policy.return_window_days):
        return JsonResponse({"success": False, "message": "The return window for this item has expired."}, status=400)
    reason = str(request.POST.get("reason", "")).strip()
    if reason not in dict(ReturnRequest.REASONS):
        return JsonResponse({"success": False, "message": "Choose a return reason."}, status=400)
    photo = request.FILES.get("evidence_photo")
    if photo and (photo.size > 5 * 1024 * 1024 or not str(getattr(photo, "content_type", "")).startswith("image/")):
        return JsonResponse({"success": False, "message": "Evidence must be an image no larger than 5 MB."}, status=400)
    try:
        returned = ReturnRequest.objects.create(order=order, order_item=item, requested_by=request.user, reason=reason, description=str(request.POST.get("description", ""))[:3000], evidence_photo=photo)
    except IntegrityError:
        return JsonResponse({"success": False, "message": "An active return request already exists for this item."}, status=409)
    OrderStatusHistory.objects.create(order=order, event_type="return", from_status="", to_status=returned.status, note=f"Item {item.pk}: {reason}", actor=request.user)
    return JsonResponse({"success": True, "message": "Return request submitted for review.", "status": returned.status})


@require_http_methods(["POST"])
def request_order_replacement(request, order_id, item_id):
    order = _customer_order_for_action(request, order_id)
    if order is None:
        return JsonResponse({"success": False, "message": "Sign in to manage this order."}, status=403)
    item = OrderItem.objects.filter(pk=item_id, order=order).first()
    if item is None:
        return JsonResponse({"success": False, "message": "Order item not found."}, status=404)
    policy = _policy_for_item(item)
    if (order.order_status or "").casefold() != "delivered" or not policy or not policy.replacements_allowed or policy.replacement_window_days is None:
        return JsonResponse({"success": False, "message": "This item is not replacement eligible under its current category policy."}, status=400)
    delivery_event = order.status_history.filter(to_status__iexact="delivered").order_by("-created_at").first()
    delivered_at = delivery_event.created_at if delivery_event else order.created_at
    if timezone.now() > delivered_at + timedelta(days=policy.replacement_window_days):
        return JsonResponse({"success": False, "message": "The replacement window for this item has expired."}, status=400)
    reason = str(request.POST.get("reason", "")).strip()
    if reason not in dict(ReturnRequest.REASONS):
        return JsonResponse({"success": False, "message": "Choose a replacement reason."}, status=400)
    with transaction.atomic():
        replacement_available = _replacement_inventory(item)
    if not replacement_available:
        return JsonResponse({"success": False, "message": "Replacement stock is unavailable. You can request an eligible return instead."}, status=409)
    photo = request.FILES.get("evidence_photo")
    if photo and (photo.size > 5 * 1024 * 1024 or not str(getattr(photo, "content_type", "")).startswith("image/")):
        return JsonResponse({"success": False, "message": "Evidence must be an image no larger than 5 MB."}, status=400)
    try:
        replacement = ReplacementRequest.objects.create(order=order, order_item=item, requested_by=request.user, reason=reason, description=str(request.POST.get("description", ""))[:3000], evidence_photo=photo, replacement_available=True)
    except IntegrityError:
        return JsonResponse({"success": False, "message": "An active replacement request already exists for this item."}, status=409)
    OrderStatusHistory.objects.create(order=order, event_type="replacement", to_status=replacement.status, note=f"Item {item.pk}: {reason}", actor=request.user)
    return JsonResponse({"success": True, "message": "Replacement request submitted for review.", "status": replacement.status})


@require_http_methods(["POST"])
def admin_order_request_action(request, request_type, request_id):
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"success": False, "message": "Staff access required."}, status=403)
    try:
        payload = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid request body."}, status=400)
    target_status = str(payload.get("status", "")).strip().lower()
    note = str(payload.get("note", "")).strip()[:2000]
    refund_to_submit = None
    try:
        with transaction.atomic():
            if request_type == "cancellation":
                record = OrderCancellation.objects.select_for_update().select_related("order").get(pk=request_id)
                order = Order.objects.select_for_update().get(pk=record.order_id)
                if record.status != "requested" or target_status not in {"approved", "rejected"}:
                    raise ValueError("This cancellation request can no longer be reviewed.")
                if target_status == "approved":
                    if (order.order_status or "").casefold() in {"delivered", "complete", "completed", "cancelled", "canceled"}:
                        raise ValueError("This order can no longer be cancelled.")
                    before = order.order_status
                    order.order_status = "Cancelled"
                    if order.payment_status.casefold() not in {"paid", "partially refunded", "refunded"}:
                        order.payment_status = "Cancelled"
                    order.save(update_fields=("order_status", "payment_status"))
                    _restore_order_inventory(order)
                    if order.payment_status.casefold() in {"paid", "partially refunded"} and is_razorpay_order(order):
                        refundable_amount = unrefunded_balance(order)
                        if refundable_amount > 0:
                            refund_to_submit, _ = create_refund_record(order=order, amount=refundable_amount, reason="Approved order cancellation", idempotency_key=f"cancel:{record.pk}", cancellation=record)
                else:
                    before = record.status
                record.status = target_status
                record.review_note = note
                record.reviewed_at = timezone.now()
                record.save(update_fields=("status", "review_note", "reviewed_at"))
                OrderStatusHistory.objects.create(order=order, event_type="cancellation", from_status=before, to_status=target_status.title(), note=note, actor=request.user)
            elif request_type == "return":
                record = ReturnRequest.objects.select_for_update().select_related("order", "order_item").get(pk=request_id)
                order = Order.objects.select_for_update().get(pk=record.order_id)
                if target_status not in dict(ReturnRequest.STATUSES):
                    raise ValueError("Invalid return status.")
                if record.status in {"rejected", "completed"}:
                    raise ValueError("This return request is already closed.")
                return_transitions = {
                    "requested": {"approved", "rejected", "inspection_pending", "accepted"},
                    "approved": {"pickup_scheduled", "rejected"},
                    "pickup_scheduled": {"picked_up", "rejected"},
                    "picked_up": {"received", "inspection_pending", "rejected"},
                    "received": {"inspection_pending", "accepted", "rejected"},
                    "inspection_pending": {"accepted", "rejected"},
                }
                if target_status not in return_transitions.get(record.status, set()) and target_status != "refund_processing":
                    raise ValueError(f"Cannot change return status from {record.status} to {target_status}.")
                previous_return_status = record.status
                if target_status == "accepted":
                    policy = _policy_for_item(record.order_item)
                    if policy and policy.inspection_required and record.status not in {"inspection_pending", "received"}:
                        raise ValueError("Record item receipt and inspection before accepting this return.")
                    record.status = "accepted"
                    if order.payment_status.casefold() == "paid" and is_razorpay_order(order):
                        amount = record.order_item.line_total or record.order_item.price * record.order_item.quantity
                        refund_to_submit, _ = create_refund_record(order=order, order_item=record.order_item, return_request=record, amount=amount, reason=f"Return refund: {record.get_reason_display()}", idempotency_key=f"return:{record.pk}")
                        record.status = "refund_processing"
                    elif order.payment_status.casefold() == "paid":
                        record.status = "refund_processing"
                        note = note or "Return accepted; payment refund requires manual reconciliation outside Razorpay."
                    else:
                        record.status = "completed"
                        record.completed_at = timezone.now()
                elif target_status == "refund_processing" and order.payment_status.casefold() != "paid":
                    raise ValueError("An unpaid or cash-on-delivery order cannot use the Razorpay refund workflow.")
                else:
                    record.status = target_status
                record.review_note = note
                record.save(update_fields=("status", "review_note", "completed_at", "updated_at"))
                OrderStatusHistory.objects.create(order=order, event_type="return", from_status=previous_return_status, to_status=record.status, note=note or f"Return for item {record.order_item_id}", actor=request.user)
            elif request_type == "replacement":
                record = ReplacementRequest.objects.select_for_update().select_related("order", "order_item").get(pk=request_id)
                order = Order.objects.select_for_update().get(pk=record.order_id)
                if target_status not in dict(ReplacementRequest.STATUSES) or record.status in {"rejected", "completed", "delivered"}:
                    raise ValueError("This replacement request can no longer be updated.")
                transitions = {
                    "requested": {"approved", "rejected"},
                    "approved": {"pickup_scheduled", "inspection_pending", "rejected"},
                    "pickup_scheduled": {"picked_up", "rejected"},
                    "picked_up": {"inspection_pending", "rejected"},
                    "inspection_pending": {"replacement_confirmed", "rejected"},
                    "replacement_confirmed": {"dispatched", "rejected"},
                    "dispatched": {"delivered"},
                    "delivered": {"completed"},
                }
                if target_status not in transitions.get(record.status, set()):
                    raise ValueError(f"Cannot change replacement status from {record.status} to {target_status}.")
                if target_status == "approved":
                    if not _replacement_inventory(record.order_item, reserve=True):
                        raise ValueError("Replacement stock is no longer available. Offer a return/refund if eligible.")
                    record.replacement_available = True
                    record.replacement_stock_reserved = True
                if target_status == "rejected":
                    _release_replacement_inventory(record)
                record.status = target_status
                record.review_note = note
                if target_status in {"delivered", "completed"}:
                    record.completed_at = timezone.now()
                record.save(update_fields=("status", "replacement_available", "replacement_stock_reserved", "review_note", "completed_at", "updated_at"))
                OrderStatusHistory.objects.create(order=order, event_type="replacement", from_status="", to_status=target_status, note=note or f"Replacement for item {record.order_item_id}", actor=request.user)
            else:
                return JsonResponse({"success": False, "message": "Unknown request type."}, status=404)
    except (OrderCancellation.DoesNotExist, ReturnRequest.DoesNotExist, ReplacementRequest.DoesNotExist):
        return JsonResponse({"success": False, "message": "Request not found."}, status=404)
    except (ValueError, IntegrityError) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=409)
    if refund_to_submit:
        refund_to_submit = submit_refund(refund_to_submit.pk)
    _notify_order_update(order, f"LocalMart order update for order #{order.pk}", f"Your {request_type} request is now {record.status.replace('_', ' ')}. Refund processing status: {refund_to_submit.status if refund_to_submit else 'not applicable'}.")
    return JsonResponse({"success": True, "status": record.status, "refund_status": refund_to_submit.status if refund_to_submit else "not_applicable"})


@csrf_exempt
@require_http_methods(["POST"])
def razorpay_refund_webhook(request):
    secret = getattr(settings, "RAZORPAY_WEBHOOK_SECRET", "")
    signature = request.headers.get("X-Razorpay-Signature", "")
    if not secret or not signature:
        return JsonResponse({"success": False, "message": "Webhook signature configuration is missing."}, status=400)
    expected = hmac.new(secret.encode("utf-8"), request.body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        return JsonResponse({"success": False, "message": "Invalid webhook signature."}, status=400)
    try:
        event = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid webhook payload."}, status=400)
    event_name = str(event.get("event", ""))
    if event_name not in {"refund.processed", "refund.failed"}:
        return JsonResponse({"success": True, "ignored": True})
    entity = ((event.get("payload") or {}).get("refund") or {}).get("entity") or {}
    local_id = (entity.get("notes") or {}).get("localmart_refund_id")
    status_value = "completed" if event_name == "refund.processed" else "failed"
    record_gateway_refund_event(entity.get("id", ""), status_value, event, local_id)
    return JsonResponse({"success": True})

def restaurant_menu(request, id):
    return render(request, "restaurant_menu.html")

class SignupAPIView(APIView):

    def post(self, request):

        full_name = request.data.get("full_name", "").strip()
        email = request.data.get("email", "").strip().lower()
        mobile = request.data.get("mobile", "").strip()
        password = request.data.get("password", "")
        confirm_password = request.data.get("confirm_password", "")

        # Validate required fields
        if not full_name:
            return Response(
                {"error": "Full name is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not all(character.isalpha() or character == " " for character in full_name):
            return Response(
                {"error": "Full name can contain letters and spaces only."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not email:
            return Response(
                {"error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not mobile:
            return Response(
                {"error": "Mobile number is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not mobile.isascii() or not mobile.isdigit():
            return Response(
                {"error": "Mobile number can contain digits only."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not password:
            return Response(
                {"error": "Password is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != confirm_password:
            return Response(
                {"error": "Passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(password) < 8:
            return Response(
                {"error": "Password must contain at least 8 characters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check existing email
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "An account with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check username
        username = email.split("@")[0]

        if User.objects.filter(username=username).exists():
            username = f"{username}_{mobile[-4:]}"

        # Create Django user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=full_name
        )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Account created successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "fullname": full_name,
                    "email": user.email,
                    "mobile": mobile
                }
            },
            status=status.HTTP_201_CREATED
        )





class LoginAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")

        if not email or not password:

            return Response(
                {
                    "error": "Email and password are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # ==========================================
        # FIND USER
        # ==========================================

        user_obj = User.objects.filter(
            email__iexact=email,
            is_active=True,
        ).order_by("id").first()

        if user_obj is None:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # ==========================================
        # AUTHENTICATE
        # ==========================================

        user = authenticate(
            username=user_obj.username,
            password=password
        )

        if user is None:

            return Response(
                {
                    "error": "Invalid email or password."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Create the regular Django auth session too, so protected pages and
        # session-based account features recognize this API login.
        auth_login(request, user)

        # ==========================================
        # JWT TOKENS
        # ==========================================

        refresh = RefreshToken.for_user(user)

        access_token = str(
            refresh.access_token
        )

        refresh_token = str(
            refresh
        )

        # ==========================================
        # SAVE USER IN SESSION
        # ==========================================

        request.session["access_token"] = access_token

        request.session["refresh_token"] = refresh_token

        request.session["user"] = {

            "id": user.id,

            "username": user.username,

            "fullname": (
                user.first_name
                or user.username
            ),

            "email": user.email.lower(),

        }

        request.session.modified = True

        print("========================================")
        print("LOGIN SUCCESSFUL")
        print("USER ID:", user.id)
        print("USER EMAIL:", user.email)
        print("SESSION USER:", request.session.get("user"))
        print("========================================")

        # ==========================================
        # RESPONSE
        # ==========================================

        return Response(
            {
                "message": "Login successful.",

                "user": {

                    "id": user.id,

                    "username":
                        user.username,

                    "fullname":
                        user.first_name
                        or user.username,

                    "email":
                        user.email,

                },

                "access":
                    access_token,

                "refresh":
                    refresh_token,

            },
            status=status.HTTP_200_OK
        )









@api_view(['POST'])
def api_signup(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    mobile = request.data.get('mobile')


    # ==============================
    # REQUIRED FIELD VALIDATION
    # ==============================

    if not username:
        return Response(
            {
                'error': 'Full name is required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    if not email:
        return Response(
            {
                'error': 'Email is required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    if not password:
        return Response(
            {
                'error': 'Password is required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    if not confirm_password:
        return Response(
            {
                'error': 'Confirm password is required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # ==============================
    # PASSWORD MATCH
    # ==============================

    if password != confirm_password:

        return Response(
            {
                'error': 'Passwords do not match.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # ==============================
    # CHECK EMAIL
    # ==============================

    if User.objects.filter(
        email=email
    ).exists():

        return Response(
            {
                'error': 'Email already registered.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # ==============================
    # CREATE UNIQUE USERNAME
    # ==============================

    base_username = username.replace(
        ' ',
        '_'
    ).lower()

    final_username = base_username

    counter = 1


    while User.objects.filter(
        username=final_username
    ).exists():

        final_username = (
            f"{base_username}{counter}"
        )

        counter += 1


    # ==============================
    # CREATE USER
    # ==============================

    user = User.objects.create_user(

        username=final_username,

        email=email,

        password=password

    )


    # ==============================
    # JWT TOKENS
    # ==============================

    refresh = RefreshToken.for_user(user)

    access_token = str(
        refresh.access_token
    )


    # ==============================
    # RESPONSE
    # ==============================

    return Response(

        {
            'message':
                'Account created successfully.',

            'access':
                access_token,

            'refresh':
                str(refresh),

            'user': {

                'id':
                    user.id,

                'username':
                    user.username,

                'email':
                    user.email,

                'mobile':
                    mobile

            }

        },

        status=status.HTTP_201_CREATED

    )






# ==========================================
# GOOGLE LOGIN
# ==========================================

def google_login(request):

    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
    )

    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "select_account",
    }

    from urllib.parse import urlencode

    url = (
        google_auth_url
        + "?"
        + urlencode(params)
    )

    return redirect(url)


# ==========================================
# GOOGLE CALLBACK
# ==========================================

def google_callback(request):

    code = request.GET.get("code")

    if not code:

        return redirect(
            "/login/?error=google_login_failed"
        )


    # ==========================================
    # EXCHANGE CODE FOR GOOGLE ACCESS TOKEN
    # ==========================================

    token_response = requests.post(

        "https://oauth2.googleapis.com/token",

        data={

            "code": code,

            "client_id":
                settings.GOOGLE_CLIENT_ID,

            "client_secret":
                settings.GOOGLE_CLIENT_SECRET,

            "redirect_uri":
                settings.GOOGLE_REDIRECT_URI,

            "grant_type":
                "authorization_code",

        }

    )


    token_data = token_response.json()


    if "access_token" not in token_data:

        return redirect(
            "/login/?error=google_token_failed"
        )


    google_access_token = (
        token_data["access_token"]
    )


    # ==========================================
    # GET GOOGLE USER INFORMATION
    # ==========================================

    user_response = requests.get(

        "https://www.googleapis.com/oauth2/v2/userinfo",

        headers={

            "Authorization":
                f"Bearer {google_access_token}"

        }

    )


    google_user = user_response.json()


    google_id = google_user.get(
        "id"
    )

    email = (google_user.get("email") or "").strip().lower()

    full_name = google_user.get(
        "name",
        ""
    )

    first_name = google_user.get(
        "given_name",
        ""
    )


    if not email:

        return redirect(
            "/login/?error=google_email_missing"
        )


    # ==========================================
    # FIND EXISTING USER
    # ==========================================

    # Duplicate emails can exist in older LocalMart data. Prefer the oldest
    # active matching account deterministically; never create another account
    # just because the email already exists more than once.
    user = User.objects.filter(
        email__iexact=email,
        is_active=True,
    ).order_by("id").first()

    if user is None:
        if User.objects.filter(email__iexact=email).exists():
            return redirect("/login/?error=google_account_disabled")

        # ==========================================
        # CREATE NEW USER
        # ==========================================

        base_username = (
            email.split("@")[0]
        )

        username = base_username

        counter = 1


        while User.objects.filter(
            username=username
        ).exists():

            username = (
                f"{base_username}{counter}"
            )

            counter += 1


        user = User.objects.create_user(

            username=username,

            email=email,

            first_name=first_name,

            password=None

        )


        user.set_unusable_password()

        user.save()


    # Establish the same Django authenticated session as email/password login.
    auth_login(request, user, backend="django.contrib.auth.backends.ModelBackend")

    # ==========================================
    # GENERATE JWT TOKENS
    # ==========================================

    refresh = RefreshToken.for_user(
        user
    )

    access_token = str(
        refresh.access_token
    )

    refresh_token = str(
        refresh
    )


    # ==========================================
    # SAVE DATA IN SESSION
    # ==========================================

    request.session[
        "access_token"
    ] = access_token

    request.session[
        "refresh_token"
    ] = refresh_token

    request.session[
        "user"
    ] = {

        "id":
            user.id,

        "username":
            user.username,

        "fullname":
            full_name
            or first_name
            or user.first_name
            or user.username,

        "email":
            (user.email or email).strip().lower(),

    }


    # ==========================================
    # REDIRECT TO HOME
    # ==========================================

    return redirect(
        "index"
    )



@ensure_csrf_cookie
def checkout(request):

    electronics_cart = request.session.get("electronics_cart", {})
    electronics_product_ids = []

    for product_id in electronics_cart:
        try:
            electronics_product_ids.append(int(product_id))
        except (TypeError, ValueError):
            pass

    electronics_products = ElectronicsProduct.objects.filter(
        id__in=electronics_product_ids,
        is_active=True,
    )

    electronics_product_map = {
        str(product.id): product
        for product in electronics_products
    }

    electronics_checkout_cart = []

    for product_id, quantity in electronics_cart.items():
        product = electronics_product_map.get(str(product_id))
        if not product:
            continue

        electronics_checkout_cart.append({
            "id": product.id,
            "name": product.name,
            "price": float(product.discounted_price),
            "quantity": int(quantity),
            "image": product.image or "",
            "category": "Electronics",
            "gst_source": "electronics",
        })

    appliance_cart = request.session.get("home_appliances_cart", {})
    appliance_product_ids = [
        int(product_id)
        for product_id in appliance_cart
        if str(product_id).isdigit()
    ]
    appliance_products = Product.objects.filter(id__in=appliance_product_ids)
    appliance_product_map = {
        str(product.id): product
        for product in appliance_products
    }

    for product_id, quantity in appliance_cart.items():
        product = appliance_product_map.get(str(product_id))
        if not product:
            continue

        electronics_checkout_cart.append({
            "id": product.id,
            "name": product.name,
            "price": float(product.price),
            "quantity": int(quantity),
            "image": product.image or "",
            "category": "Home Appliances",
            "gst_source": "home_appliances",
        })

    # Fashion pages all share this server-side cart. Include every cached
    # men's, women's, watch, and footwear product in the same checkout payload.
    fashion_cart = request.session.get("fashion_cart", {})
    fashion_cache = request.session.get("fashion_product_cache", {})
    category_labels = {
        "men": "Men's Fashion",
        "women": "Women's Fashion",
        "watches": "Watches",
        "footwear": "Footwear",
    }
    for product_id, quantity in fashion_cart.items():
        product = fashion_cache.get(str(product_id)) or _fashion_product(str(product_id))
        if not product:
            continue
        try:
            item_quantity = max(1, int(quantity))
            item_price = float(product.get("price", 0))
        except (TypeError, ValueError, OverflowError):
            continue
        if item_price <= 0:
            continue
        category = str(product.get("category", "fashion")).lower()
        electronics_checkout_cart.append({
            "id": str(product_id),
            "name": product.get("name", "Fashion product"),
            "price": item_price,
            "quantity": item_quantity,
            "image": product.get("image", ""),
            "category": category_labels.get(category, category.title()),
            "gst_source": "fashion",
            "brand": product.get("brand", ""),
        })

    checkout_merchant, merchant_store_lines = _merchant_store_checkout_lines(request)
    electronics_checkout_cart.extend(merchant_store_lines)

    user_data = request.session.get("user") or {}
    checkout_customer_name = user_data.get("fullname") or user_data.get("username", "")
    checkout_customer_email = user_data.get("email", "")

    return render(
        request,
        "checkout.html",
        {
            "razorpay_key_id": settings.RAZORPAY_KEY_ID,
            "electronics_checkout_cart": json.dumps(electronics_checkout_cart),
            "checkout_customer_name": checkout_customer_name,
            "checkout_customer_email": checkout_customer_email,
            "checkout_merchant_name": checkout_merchant.shop_name if checkout_merchant else "",
            "gst_supplier_state": SUPPLIER_STATE,
            "indian_states": INDIAN_STATES,
            "applied_coupon_code": request.session.get("checkout_coupon_code", ""),
        }
    )


def _checkout_quote_response(request, data, forced_coupon_code=None):
    cart = data.get("cart", [])
    if not isinstance(cart, list) or not cart:
        raise ValueError("Cart is empty.")
    cart, merchant = _validate_merchant_store_checkout_lines(request, cart)
    state = str(data.get("customer_state", "")).strip()
    canonical_states = {name.casefold(): name for name in INDIAN_STATES}
    if state.casefold() not in canonical_states:
        raise ValueError("Select your delivery state.")
    state = canonical_states[state.casefold()]
    user_data = request.session.get("user") or {}
    customer_email = str(data.get("customer_email") or user_data.get("email") or "").strip().lower()
    coupon_code = data.get("coupon_code", "") if forced_coupon_code is None else forced_coupon_code
    canonical, totals, coupon = calculate_checkout_quote(
        cart,
        state,
        coupon_code,
        merchant,
        customer_email,
        request.user if request.user.is_authenticated else None,
    )
    details = [{key: (str(value) if isinstance(value, Decimal) else value.isoformat() if isinstance(value, date) else value) for key, value in item.items()} for item in canonical]
    return {
        "success": True,
        "items": details,
        "totals": {key: str(value) for key, value in totals.items()},
        "coupon": {
            "code": coupon.code,
            "discount": str(totals["coupon_discount"]),
            "eligible_subtotal": str(totals.get("coupon_eligible_subtotal", 0)),
            "description": coupon.description,
            "free_delivery": coupon.free_delivery,
        } if coupon else None,
        "intra_state": all(
            str(item["supplier_state"]).casefold() == str(item["place_of_supply_state"]).casefold()
            for item in canonical
        ),
    }


@require_http_methods(["POST"])
def available_coupons(request):
    try:
        data = json.loads(request.body or b"{}")
        cart = data.get("cart", [])
        if not isinstance(cart, list) or not cart:
            return JsonResponse({"success": True, "coupons": []})
        cart, merchant = _validate_merchant_store_checkout_lines(request, cart)
        state = str(data.get("customer_state") or SUPPLIER_STATE).strip()
        state_map = {name.casefold(): name for name in INDIAN_STATES}
        state = state_map.get(state.casefold(), SUPPLIER_STATE)
        user_data = request.session.get("user") or {}
        email = str(data.get("customer_email") or user_data.get("email") or "").strip().lower()
        offers = []
        for coupon in Coupon.objects.filter(is_active=True).order_by("code"):
            if not coupon.is_currently_valid():
                continue
            try:
                _, totals, _ = calculate_checkout_quote(
                    cart, state, coupon.code, merchant, email,
                    request.user if request.user.is_authenticated else None,
                )
                eligible = True
                reason = ""
                discount = str(totals["coupon_discount"])
            except ValueError as error:
                eligible = False
                reason = str(error)
                discount = "0.00"
            offers.append({
                "code": coupon.code,
                "description": coupon.description,
                "terms": coupon.terms_and_conditions,
                "discount_type": coupon.discount_type,
                "discount_value": str(coupon.discount_value),
                "maximum_discount": str(coupon.maximum_discount_amount) if coupon.maximum_discount_amount is not None else "",
                "minimum_order": str(coupon.minimum_order_amount),
                "eligible_categories": coupon.eligible_categories or list(Coupon.CATEGORY_GROUPS),
                "applicable_products": coupon.applicable_products or [],
                "minimum_eligible_quantity": coupon.minimum_eligible_quantity,
                "usage_limit": coupon.usage_limit,
                "per_customer_limit": coupon.per_customer_limit,
                "expires_at": coupon.expires_at.isoformat() if coupon.expires_at else "",
                "first_order_only": coupon.first_order_only,
                "free_delivery": coupon.free_delivery,
                "eligible": eligible,
                "reason": reason,
                "discount": discount,
            })
        return JsonResponse({"success": True, "coupons": offers})
    except (ValueError, TypeError, InvalidOperation, json.JSONDecodeError) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)


def checkout_tax_preview(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        return JsonResponse(_checkout_quote_response(request, data))
    except (ValueError, TypeError, InvalidOperation) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)


def cart_tax_preview(request):
    """Return a verified tax quote for the shared cart, before checkout delivery charges."""
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        cart = data.get("cart", [])
        if not isinstance(cart, list) or not cart:
            raise ValueError("Cart is empty.")
        cart, merchant = _validate_merchant_store_checkout_lines(request, cart)
        _, totals = calculate_cart(cart, SUPPLIER_STATE, merchant)
        return JsonResponse({
            "success": True,
            "subtotal": str(totals["subtotal"]),
            "gst_total": str(totals["gst_total"]),
            "total": str(totals["total"]),
        })
    except (ValueError, TypeError, InvalidOperation, json.JSONDecodeError) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)


def checkout_coupon_apply(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        code = str(data.get("coupon_code", "")).strip()
        if not code:
            raise ValueError("Enter a coupon code first.")
        response = _checkout_quote_response(request, data, code)
        request.session["checkout_coupon_code"] = code.upper()
        request.session.modified = True
        return JsonResponse(response)
    except (ValueError, TypeError, InvalidOperation) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)


def checkout_coupon_remove(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        if not data.get("cart"):
            request.session.pop("checkout_coupon_code", None)
            request.session.modified = True
            return JsonResponse({"success": True, "coupon": None, "items": [], "totals": {"coupon_discount": "0.00", "coupon_eligible_subtotal": "0.00", "total": "0.00"}})
        response = _checkout_quote_response(request, data, "")
        request.session.pop("checkout_coupon_code", None)
        request.session.modified = True
        return JsonResponse(response)
    except (ValueError, TypeError, InvalidOperation) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)






@csrf_exempt
def create_razorpay_order(request):

    if request.method != "POST":
        return JsonResponse({
            "success": False,
            "message": "Only POST requests are allowed."
        }, status=405)

    try:

        # ==========================================
        # READ FRONTEND DATA
        # ==========================================

        data = json.loads(request.body)

        print("========================================")
        print("FRONTEND DATA")
        print("CUSTOMER NAME:", data.get("customer_name"))
        print("CUSTOMER EMAIL:", data.get("customer_email"))
        print("========================================")

        cart = data.get("cart", [])

        if not isinstance(cart, list) or len(cart) == 0:
            return JsonResponse({
                "success": False,
                "message": "Cart is empty."
            }, status=400)

        try:
            cart, cart_merchant = _validate_merchant_store_checkout_lines(request, cart)
        except ValueError as error:
            return JsonResponse({"success": False, "message": str(error)}, status=400)

        # ==========================================
        # CUSTOMER INFORMATION
        # ==========================================

        customer_name = data.get(
            "customer_name",
            ""
        ).strip()

        customer_email = data.get(
            "customer_email",
            ""
        ).strip().lower()
        customer_gstin = ""
        customer_address = str(data.get("customer_address", "")).strip()[:1000]
        restaurant_name = str(data.get("restaurant_name", "")).strip()[:180]
        if cart_merchant:
            merchant_profile = cart_merchant
            restaurant_name = cart_merchant.shop_name
        else:
            merchant_matches = MerchantProfile.objects.filter(is_approved=True, shop_name__iexact=restaurant_name) if restaurant_name else MerchantProfile.objects.none()
            merchant_profile = merchant_matches.first() if merchant_matches.count() == 1 else None
        raw_lat, raw_lng = data.get("customer_latitude"), data.get("customer_longitude")
        try:
            delivery_lat = float(raw_lat) if raw_lat is not None else None
            delivery_lng = float(raw_lng) if raw_lng is not None else None
            if (isinstance(raw_lat, bool) or isinstance(raw_lng, bool)
                    or (delivery_lat is None) != (delivery_lng is None)
                    or (delivery_lat is not None and (not math.isfinite(delivery_lat) or not -90 <= delivery_lat <= 90))
                    or (delivery_lng is not None and (not math.isfinite(delivery_lng) or not -180 <= delivery_lng <= 180))):
                raise ValueError
        except (TypeError, ValueError):
            return JsonResponse({"success": False, "message": "Confirm a valid delivery pin on the map."}, status=400)
        delivery_confirmed = data.get("delivery_location_confirmed") is True and delivery_lat is not None
        if not delivery_confirmed:
            return JsonResponse({"success": False, "message": "Confirm your delivery location on the map before payment."}, status=400)

        # ==========================================
        # SESSION USER FALLBACK
        # Only use session email if frontend
        # did NOT send customer email
        # ==========================================

        user_data = request.session.get("user")

        if user_data:

            if not customer_name:
                customer_name = user_data.get(
                    "fullname",
                    user_data.get("username", "")
                )

            if not customer_email:
                customer_email = user_data.get(
                    "email",
                    ""
                ).strip().lower()

        # ==========================================
        # DEFAULT CUSTOMER NAME
        # ==========================================

        if not customer_name:
            customer_name = "Customer"

        # ==========================================
        # EMAIL REQUIRED
        # ==========================================

        if not customer_email:
            return JsonResponse({
                "success": False,
                "message": "Customer email is required."
            }, status=400)

        # ==========================================
        # FINAL CUSTOMER DETAILS DEBUG
        # ==========================================

        print("========================================")
        print("FINAL CUSTOMER DETAILS")
        print("CUSTOMER NAME:", customer_name)
        print("CUSTOMER EMAIL:", customer_email)
        print("========================================")

        # ==========================================
        # CALCULATE TOTAL
        # ==========================================

        customer_state = str(data.get("customer_state", "")).strip()
        state_map = {name.casefold(): name for name in INDIAN_STATES}
        if customer_state.casefold() not in state_map:
            return JsonResponse({"success": False, "message": "Delivery state is required."}, status=400)
        customer_state = state_map[customer_state.casefold()]
        coupon_code = str(data.get("coupon_code") or request.session.get("checkout_coupon_code", "")).strip()
        cart, tax_totals, applied_coupon = calculate_checkout_quote(
            cart,
            customer_state,
            coupon_code,
            cart_merchant,
            customer_email,
            request.user if request.user.is_authenticated else None,
        )
        subtotal = tax_totals["subtotal"]
        tax = tax_totals["gst_total"]
        total = tax_totals["total"]

        # ==========================================
        # CONVERT INR TO PAISE
        # ==========================================

        amount = int(
            total * Decimal("100")
        )

        # ==========================================
        # CREATE RAZORPAY ORDER
        # ==========================================

        import time

        receipt_id = (
            "localmart_"
            + str(int(time.time()))
            + "_"
            + uuid.uuid4().hex[:6]
        )

        razorpay_order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "receipt": receipt_id,
            "payment_capture": 1
        })

        razorpay_order_id = razorpay_order["id"]

        print("========================================")
        print("RAZORPAY ORDER CREATED")
        print("RAZORPAY ORDER ID:", razorpay_order_id)
        print("CUSTOMER EMAIL:", customer_email)
        print("========================================")

        # ==========================================
        # CREATE LOCAL DATABASE ORDER
        # ==========================================

        local_order = _create_order_with_inventory(
            {
                "customer_name": customer_name,
                "customer_email": customer_email,
                "customer_gstin": customer_gstin,
                "customer_user": request.user if request.user.is_authenticated else None,
                "delivery_address": customer_address,
                "customer_latitude": delivery_lat,
                "customer_longitude": delivery_lng,
                "delivery_latitude": delivery_lat,
                "delivery_longitude": delivery_lng,
                "delivery_location_confirmed": delivery_confirmed,
                "restaurant_name": restaurant_name,
                "merchant_profile": merchant_profile,
                "total_amount": total,
                "payment_method": "Razorpay",
                "supplier_state": cart_merchant.gst_state if cart_merchant and cart_merchant.gst_state else SUPPLIER_STATE,
                "supplier_legal_name": cart_merchant.shop_name if cart_merchant else getattr(settings, "LOCALMART_GST_LEGAL_NAME", ""),
                "supplier_address": cart_merchant.address if cart_merchant else getattr(settings, "LOCALMART_GST_ADDRESS", ""),
                "supplier_gstin": cart_merchant.gstin if cart_merchant else getattr(settings, "LOCALMART_GSTIN", ""),
                "customer_state": customer_state,
                "subtotal": tax_totals["subtotal"],
                "discount_total": tax_totals["discount_total"],
                "taxable_total": tax_totals["taxable_total"],
                "cgst_total": tax_totals["cgst_total"],
                "sgst_total": tax_totals["sgst_total"],
                "igst_total": tax_totals["igst_total"],
                "gst_total": tax_totals["gst_total"],
                "delivery_charges": tax_totals["delivery_charges"],
                "delivery_tax": tax_totals["delivery_tax"],
                "other_charges": tax_totals["other_charges"],
                "delivery_discount": tax_totals["delivery_discount"],
                "delivery_taxable": tax_totals["delivery_taxable"],
                "delivery_cgst": tax_totals["delivery_cgst"],
                "delivery_sgst": tax_totals["delivery_sgst"],
                "delivery_igst": tax_totals["delivery_igst"],
                "coupon": applied_coupon,
                "coupon_code": applied_coupon.code if applied_coupon else "",
                "coupon_discount": tax_totals["coupon_discount"],
                "coupon_eligible_subtotal": tax_totals.get("coupon_eligible_subtotal", 0),
                "razorpay_order_id": razorpay_order_id,
                "payment_id": razorpay_order_id,
                "payment_status": "Pending",
                "order_status": "Placed",
            },
            cart,
            cart_merchant,
            coupon=applied_coupon,
        )
        pending_inventory_orders = request.session.get("pending_inventory_orders", [])
        request.session["pending_inventory_orders"] = list(dict.fromkeys(
            [*pending_inventory_orders, local_order.pk]
        ))
        request.session.modified = True

        print("========================================")
        print("LOCAL ORDER CREATED")
        print("LOCAL ORDER ID:", local_order.id)
        print("ORDER CUSTOMER EMAIL:", local_order.customer_email)
        print("========================================")

        # ==========================================
        # RESPONSE
        # ==========================================

        return JsonResponse({

            "success": True,

            "key_id":
                settings.RAZORPAY_KEY_ID,

            "amount":
                amount,

            "currency":
                "INR",

            "order_id":
                razorpay_order_id,

            "local_order_id":
                local_order.id,

            "customer_email":
                local_order.customer_email,

            "subtotal":
                float(subtotal),

            "tax":
                float(tax),

            "total":
                float(total)
        })

    # ==============================================
    # INVALID JSON
    # ==============================================

    except json.JSONDecodeError:

        return JsonResponse({
            "success": False,
            "message": "Invalid JSON request."
        }, status=400)

    except ValueError as error:
        return JsonResponse({
            "success": False,
            "message": str(error)
        }, status=400)

    # ==============================================
    # OTHER ERRORS
    # ==============================================

    except Exception as e:

        print("========================================")
        print("CREATE ORDER ERROR:")
        print(str(e))
        print("========================================")

        return JsonResponse({
            "success": False,
            "message": str(e)
        }, status=500)


# ==============================================
# ORDER SUCCESS
# ==============================================

def order_success(request):
    customer = request.session.get("user") or {}
    orders = Order.objects.filter(customer_email__iexact=customer.get("email", ""), payment_status__iexact="Paid") if customer.get("email") else Order.objects.none()
    order_id = request.GET.get("order_id")
    order = orders.filter(pk=order_id).first() if order_id and order_id.isdigit() else orders.order_by("-created_at").first()
    if order:
        ensure_tracking_session(order)
    return render(
        request,
        "order-success.html",
        {"tracked_order": order}
    )


def send_order_confirmation_email(order):

    items = order.items.all()

    subtotal = order.subtotal

    item_lines = []

    for item in items:

        item_total = item.line_total

        item_lines.append(
            f"""
Product       : {item.name}
Category      : {item.category}
Quantity      : {item.quantity}
Price         : Rs. {item.price:.2f}
HSN / GST      : {item.hsn_code or '—'} / {item.gst_rate}% ({item.tax_treatment})
Taxable value : Rs. {item.taxable_value:.2f}
CGST / SGST   : Rs. {item.cgst_amount:.2f} / Rs. {item.sgst_amount:.2f}
IGST          : Rs. {item.igst_amount:.2f}
Line total    : Rs. {item_total:.2f}
"""
        )

    items_text = "\n----------------------------------------\n".join(
        item_lines
    )

    tax = order.gst_total
    total = order.total_amount

    message = f"""
LOCALMART
ORDER CONFIRMATION
========================================

Hello {order.customer_name},

Thank you for shopping with LocalMart!

Your payment has been successfully completed
and your order has been confirmed.

========================================
ORDER DETAILS
========================================

Order ID       : #{order.id}

Order Date     : {order.created_at.strftime('%d %b %Y, %I:%M %p')}

Customer Name  : {order.customer_name}

Customer Email : {order.customer_email}

Order Status   : {order.order_status}

Payment Status : {order.payment_status}


Payment ID     : {order.payment_id}

========================================
ORDER ITEMS
========================================

{items_text}


========================================
BILL SUMMARY
========================================

Subtotal       : Rs. {subtotal:.2f}

Product discount: Rs. {order.discount_total:.2f}
Coupon {order.coupon_code or '—'}: Rs. {order.coupon_discount:.2f}
Taxable value  : Rs. {order.taxable_total:.2f}
CGST           : Rs. {order.cgst_total:.2f}
SGST           : Rs. {order.sgst_total:.2f}
IGST           : Rs. {order.igst_total:.2f}
Total GST      : Rs. {tax:.2f}
Delivery       : Rs. {order.delivery_charges - order.delivery_discount:.2f}

----------------------------------------
TOTAL PAID     : Rs. {total:.2f}
----------------------------------------


========================================
PAYMENT DETAILS
========================================

Payment Status : PAID

Payment ID     : {order.payment_id}

Order ID       : #{order.id}


========================================

Thank you for ordering with LocalMart!

Your order has been successfully confirmed.

Regards,
LocalMart Team

This is an automated confirmation email.
"""

    print("========================================")
    print("SENDING ORDER CONFIRMATION EMAIL")
    print("TO:", order.customer_email)
    print("ORDER:", order.id)
    print("========================================")

    result = send_mail(

        subject=f"LocalMart Order Confirmation - #{order.id}",

        message=message,

        from_email=settings.DEFAULT_FROM_EMAIL,

        recipient_list=[
            order.customer_email
        ],

        fail_silently=False
    )

    print(
        "EMAIL SEND RESULT:",
        result
    )

def _paypal_base_url():
    return "https://api-m.paypal.com" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"


def _paypal_access_token():
    if not settings.PAYPAL_CLIENT_ID or not settings.PAYPAL_CLIENT_SECRET:
        raise ValueError("PayPal credentials are not configured.")
    response = requests.post(
        f"{_paypal_base_url()}/v1/oauth2/token",
        auth=(settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET),
        headers={"Accept": "application/json"},
        data={"grant_type": "client_credentials"},
        timeout=20,
    )
    response.raise_for_status()
    return response.json()["access_token"]


def _paypal_checkout_details(request, data):
    cart = data.get("cart", [])
    if not isinstance(cart, list) or not cart:
        raise ValueError("Cart is empty.")
    cart, cart_merchant = _validate_merchant_store_checkout_lines(request, cart)
    user_data = request.session.get("user") or {}
    customer_name = data.get("customer_name", "").strip() or user_data.get("fullname", "Customer")
    customer_email = data.get("customer_email", "").strip().lower() or user_data.get("email", "").strip().lower()
    if not customer_email:
        raise ValueError("Customer email is required.")
    customer_state = str(data.get("customer_state", "")).strip()
    state_map = {name.casefold(): name for name in INDIAN_STATES}
    if customer_state.casefold() not in state_map:
        raise ValueError("Delivery state is required for GST calculation.")
    customer_state = state_map[customer_state.casefold()]
    cart, totals = calculate_cart(cart, customer_state, cart_merchant)
    return cart, customer_name, customer_email, totals, customer_state, cart_merchant


@csrf_exempt
def create_paypal_order(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        cart, customer_name, customer_email, tax_totals, customer_state, cart_merchant = _paypal_checkout_details(request, data)
        subtotal, tax, total = tax_totals["subtotal"], tax_totals["gst_total"], tax_totals["total"]
        access_token = _paypal_access_token()
        response = requests.post(
            f"{_paypal_base_url()}/v2/checkout/orders",
            headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json", "Prefer": "return=representation"},
            json={"intent": "CAPTURE", "purchase_units": [{"reference_id": "localmart-order", "amount": {"currency_code": settings.PAYPAL_CURRENCY, "value": f"{(total * Decimal(str(settings.PAYPAL_INR_TO_USD))):.2f}"}}]},
            timeout=20,
        )
        response.raise_for_status()
        paypal_order_id = response.json().get("id")
        if not paypal_order_id:
            raise ValueError("PayPal did not return an order ID.")
        restaurant_name = str(data.get("restaurant_name", "")).strip()[:180]
        if cart_merchant:
            merchant_profile = cart_merchant
            restaurant_name = cart_merchant.shop_name
        else:
            merchant_matches = MerchantProfile.objects.filter(is_approved=True, shop_name__iexact=restaurant_name) if restaurant_name else MerchantProfile.objects.none()
            merchant_profile = merchant_matches.first() if merchant_matches.count() == 1 else None
        local_order = _create_order_with_inventory(
            {
                "customer_name": customer_name,
                "customer_email": customer_email,
                "customer_user": request.user if request.user.is_authenticated else None,
                "delivery_address": str(data.get("customer_address", "")).strip()[:1000],
                "restaurant_name": restaurant_name,
                "merchant_profile": merchant_profile,
                "total_amount": total,
                "payment_method": "PayPal",
                "supplier_state": cart_merchant.gst_state if cart_merchant and cart_merchant.gst_state else SUPPLIER_STATE,
                "customer_state": customer_state,
                "subtotal": tax_totals["subtotal"], "discount_total": tax_totals["discount_total"],
                "taxable_total": tax_totals["taxable_total"], "cgst_total": tax_totals["cgst_total"],
                "sgst_total": tax_totals["sgst_total"], "igst_total": tax_totals["igst_total"],
                "gst_total": tax_totals["gst_total"], "delivery_charges": Decimal("0.00"),
                "payment_id": paypal_order_id,
                "payment_status": "Pending",
                "order_status": "Placed",
            },
            cart,
            cart_merchant,
        )
        return JsonResponse({"success": True, "paypal_order_id": paypal_order_id, "local_order_id": local_order.id, "subtotal": float(subtotal), "tax": float(tax), "total": float(total)})
    except (json.JSONDecodeError, ValueError) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)
    except requests.RequestException:
        return JsonResponse({"success": False, "message": "PayPal is unavailable. Please try again."}, status=502)


@csrf_exempt
def capture_paypal_order(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        paypal_order_id = data.get("paypal_order_id")
        if not paypal_order_id:
            raise ValueError("PayPal order ID is required.")
        access_token = _paypal_access_token()
        response = requests.post(f"{_paypal_base_url()}/v2/checkout/orders/{paypal_order_id}/capture", headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json", "Prefer": "return=representation"}, timeout=20)
        capture_data = response.json()
        if not response.ok or capture_data.get("status") != "COMPLETED":
            return JsonResponse({"success": False, "message": "PayPal payment was not completed."}, status=400)
        order = Order.objects.get(payment_id=paypal_order_id)
        if order.payment_status != "Paid":
            previous_status = order.order_status
            order.payment_status = "Paid"
            order.order_status = "Confirmed"
            order.save(update_fields=["payment_status", "order_status"])
            OrderStatusHistory.objects.create(order=order, event_type="payment", from_status=previous_status, to_status="Confirmed", note="PayPal capture confirmed.")
            request.session.pop("merchant_store_cart", None)
            request.session.modified = True
            try:
                send_order_confirmation_email(order)
            except Exception:
                pass
        # Also retry tracking setup on repeated capture callbacks in case an
        # earlier callback marked payment paid but could not create assignment.
        ensure_tracking_session(order)
        return JsonResponse({"success": True, "payment_id": paypal_order_id, "order_id": order.id, "email": order.customer_email})
    except Order.DoesNotExist:
        return JsonResponse({"success": False, "message": "Local order not found."}, status=404)
    except (json.JSONDecodeError, ValueError) as error:
        return JsonResponse({"success": False, "message": str(error)}, status=400)
    except requests.RequestException:
        return JsonResponse({"success": False, "message": "PayPal is unavailable. Please try again."}, status=502)


@csrf_exempt
def verify_payment(request):

    if request.method != "POST":

        return JsonResponse({

            "success": False,

            "message":
                "Only POST requests are allowed."

        }, status=405)


    try:

        data = json.loads(
            request.body
        )


        razorpay_order_id = data.get(
            "razorpay_order_id"
        )

        razorpay_payment_id = data.get(
            "razorpay_payment_id"
        )

        razorpay_signature = data.get(
            "razorpay_signature"
        )

        local_order_id = data.get(
            "local_order_id"
        )


        print("================================")
        print("PAYMENT VERIFICATION")
        print("Razorpay Order ID:", razorpay_order_id)
        print("Razorpay Payment ID:", razorpay_payment_id)
        print("Local Order ID:", local_order_id)
        print("================================")


        # -----------------------------------------
        # VALIDATE PAYMENT DATA
        # -----------------------------------------

        if (
            not razorpay_order_id
            or not razorpay_payment_id
            or not razorpay_signature
        ):

            return JsonResponse({

                "success": False,

                "message":
                    "Payment details are missing."

            }, status=400)


        # -----------------------------------------
        # VERIFY RAZORPAY SIGNATURE
        # -----------------------------------------

        client.utility.verify_payment_signature({

            "razorpay_order_id":
                razorpay_order_id,

            "razorpay_payment_id":
                razorpay_payment_id,

            "razorpay_signature":
                razorpay_signature

        })


        print(
            "RAZORPAY PAYMENT VERIFIED"
        )


        # -----------------------------------------
        # GET LOCAL ORDER
        # -----------------------------------------

        try:

            order = Order.objects.filter(
                Q(razorpay_order_id=razorpay_order_id) | Q(payment_id=razorpay_order_id)
            ).first()
            if order is None:
                raise Order.DoesNotExist

        except Order.DoesNotExist:

            return JsonResponse({

                "success": False,

                "message":
                    "Local order not found."

            }, status=404)


        # -----------------------------------------
        # UPDATE ORDER
        # -----------------------------------------

        if local_order_id and str(local_order_id) != str(order.pk):
            return JsonResponse({"success": False, "message": "The local order does not match this Razorpay order."}, status=400)

        try:
            gateway_order = client.order.fetch(razorpay_order_id)
            gateway_amount = int(gateway_order.get("amount", -1))
        except Exception as gateway_error:
            logger.warning("Could not fetch Razorpay order %s: %s", razorpay_order_id, gateway_error)
            return JsonResponse({"success": False, "message": "Unable to verify the Razorpay order amount."}, status=502)
        expected_amount = int(Decimal(order.total_amount) * Decimal("100"))
        if gateway_amount != expected_amount:
            return JsonResponse({"success": False, "message": "The Razorpay amount does not match the saved order total."}, status=400)

        with transaction.atomic():
            order = Order.objects.select_for_update().get(pk=order.pk)
            if order.payment_status.casefold() in {"paid", "partially refunded", "refunded"}:
                if order.payment_id != razorpay_payment_id:
                    return JsonResponse({"success": False, "message": "This order has already been paid with another payment."}, status=409)
                return JsonResponse({
                    "success": True,
                    "message": "Payment was already verified.",
                    "payment_id": order.payment_id,
                    "order_id": order.id,
                    "email": order.customer_email,
                    "email_sent": False,
                    "already_verified": True,
                })

            previous_status = order.order_status
            order.payment_id = razorpay_payment_id
            order.payment_status = "Paid"
            order.order_status = "Confirmed"
            if data.get("customer_address"):
                new_address = str(data["customer_address"]).strip()[:1000]
                if new_address != order.delivery_address:
                    order.delivery_latitude = order.delivery_longitude = None
                    order.customer_latitude = order.customer_longitude = None
                    order.delivery_location_confirmed = False
                order.delivery_address = new_address
            order.razorpay_order_id = razorpay_order_id
            order.save()
            OrderStatusHistory.objects.create(order=order, event_type="payment", from_status=previous_status, to_status="Confirmed", note="Razorpay payment signature and order amount verified.")
        pending_inventory_orders = request.session.get("pending_inventory_orders", [])
        request.session["pending_inventory_orders"] = [
            order_id for order_id in pending_inventory_orders if str(order_id) != str(order.pk)
        ]
        request.session.modified = True
        request.session.pop("checkout_coupon_code", None)
        ensure_tracking_session(order)

        if order.merchant_profile_id:
            request.session.pop("merchant_store_cart", None)
            request.session.modified = True

        request.session["fashion_cart"] = {}
        request.session.modified = True

        purchased_appliance_ids = {
            str(item.get("id"))
            for item in data.get("cart", [])
            if item.get("category") == "Home Appliances" and item.get("id")
        }

        if purchased_appliance_ids:
            appliance_cart = request.session.get("home_appliances_cart", {})
            appliance_wishlist = request.session.get("home_appliances_wishlist", [])
            request.session["home_appliances_cart"] = {
                product_id: quantity
                for product_id, quantity in appliance_cart.items()
                if str(product_id) not in purchased_appliance_ids
            }
            request.session["home_appliances_wishlist"] = [
                product_id
                for product_id in appliance_wishlist
                if str(product_id) not in purchased_appliance_ids
            ]
            request.session.modified = True


        print(
            "ORDER UPDATED:",
            order.id
        )

        print(
            "CUSTOMER EMAIL:",
            order.customer_email
        )


        # -----------------------------------------
        # SEND ORDER EMAIL
        # -----------------------------------------

        email_sent = False

        try:

            if not order.customer_email:

                print(
                    "EMAIL NOT SENT: Customer email is empty."
                )

            else:

                send_order_confirmation_email(
                    order
                )

                email_sent = True

                print(
                    "ORDER CONFIRMATION EMAIL SENT TO:",
                    order.customer_email
                )


        except Exception as email_error:

            print(
                "EMAIL ERROR:",
                str(email_error)
            )


        # -----------------------------------------
        # RETURN SUCCESS
        # -----------------------------------------

        return JsonResponse({

            "success": True,

            "message":
                "Payment verified and order confirmed successfully.",

            "payment_id":
                razorpay_payment_id,

            "order_id":
                order.id,

            "email":
                order.customer_email,

            "email_sent":
                email_sent

        })


    # -----------------------------------------
    # RAZORPAY SIGNATURE ERROR
    # -----------------------------------------

    except razorpay.errors.SignatureVerificationError:

        return JsonResponse({

            "success": False,

            "message":
                "Payment signature verification failed."

        }, status=400)


    # -----------------------------------------
    # OTHER ERRORS
    # -----------------------------------------

    except Exception as e:

        print(
            "PAYMENT VERIFY ERROR:",
            str(e)
        )

        return JsonResponse({

            "success": False,

            "message":
                str(e)

        }, status=500)

        

def download_order_pdf(request, order_id):

    print("PDF FUNCTION CALLED:", order_id)

    # Get logged-in user
    user_data = request.session.get("user")

    if not user_data:
        return redirect("login")

    customer_email = user_data.get("email")

    # Get order
    order = (
        Order.objects
        .filter(
            id=order_id,
            customer_email=customer_email
        )
        .prefetch_related("items")
        .first()
    )

    if not order:
        return HttpResponse(
            "Order not found",
            status=404
        )

    # Create PDF response
    response = HttpResponse(
        content_type="application/pdf"
    )

    response["Content-Disposition"] = (
        f'attachment; filename="Order_{order.id}.pdf"'
    )

    # Create PDF
    pdf = canvas.Canvas(
        response,
        pagesize=A4
    )

    width, height = A4

    y = height - 50

    # --------------------------------
    # HEADER
    # --------------------------------

    pdf.setFont(
        "Helvetica-Bold",
        22
    )

    pdf.drawString(
        50,
        y,
        (order.supplier_legal_name or "LocalMart")[:45]
    )

    y -= 30

    pdf.setFont(
        "Helvetica",
        12
    )

    pdf.drawString(
        50,
        y,
        "Order Invoice"
    )

    y -= 18
    if order.supplier_address:
        pdf.setFont("Helvetica", 9)
        pdf.drawString(50, y, order.supplier_address.replace("\n", ", ")[:95])
        y -= 14
    if order.supplier_gstin:
        pdf.setFont("Helvetica", 9)
        pdf.drawString(50, y, f"GSTIN: {order.supplier_gstin}")
        y -= 14
    pdf.setFont("Helvetica", 9)
    pdf.drawString(50, y, f"Invoice No: {order.invoice_number or f'Order-{order.id}'}")
    y -= 25

    # --------------------------------
    # ORDER DETAILS
    # --------------------------------

    pdf.setFont(
        "Helvetica-Bold",
        11
    )

    pdf.drawString(
        50,
        y,
        f"Order #{order.id}"
    )

    y -= 20

    pdf.setFont(
        "Helvetica",
        10
    )

    pdf.drawString(
        50,
        y,
        f"Customer: {order.customer_name}"
    )

    y -= 18

    pdf.drawString(
        50,
        y,
        f"Email: {order.customer_email}"
    )

    y -= 18

    if order.delivery_address:
        delivery_text = order.delivery_address.replace("\n", ", ")
        pdf.drawString(50, y, f"Delivery: {delivery_text[:95]}")
        y -= 18

    pdf.drawString(50, y, f"Place of supply: {order.customer_state or '—'}")

    y -= 18

    if order.customer_gstin:
        pdf.drawString(50, y, f"Customer GSTIN: {order.customer_gstin}")
        y -= 18

    pdf.drawString(
        50,
        y,
        f"Date: {order.created_at.strftime('%d %b %Y, %I:%M %p')}"
    )

    y -= 18

    pdf.drawString(
        50,
        y,
        f"Payment: {order.payment_status}"
    )

    y -= 18

    pdf.drawString(
        50,
        y,
        f"Order Status: {order.order_status}"
    )

    y -= 35

    # --------------------------------
    # ITEMS HEADER
    # --------------------------------

    pdf.setFont(
        "Helvetica-Bold",
        11
    )

    pdf.drawString(
        50,
        y,
        "Item"
    )

    pdf.drawString(
        300,
        y,
        "Qty"
    )

    pdf.drawString(
        360,
        y,
        "Price"
    )

    pdf.drawString(
        460,
        y,
        "Amount"
    )

    y -= 15

    pdf.line(
        50,
        y,
        550,
        y
    )

    y -= 20

    # --------------------------------
    # ORDER ITEMS
    # --------------------------------

    pdf.setFont(
        "Helvetica",
        10
    )

    for item in order.items.all():

        item_total = item.line_total

        pdf.drawString(
            50,
            y,
            item.name[:35]
        )

        pdf.drawString(
            300,
            y,
            str(item.quantity)
        )

        pdf.drawString(
            360,
            y,
            f"Rs. {item.price}"
        )

        pdf.drawString(
            460,
            y,
            f"Rs. {item_total}"
        )

        y -= 14
        pdf.setFont("Helvetica", 8)
        pdf.drawString(50, y, f"HSN {item.hsn_code or '—'} | GST {item.gst_rate}% ({item.tax_treatment}) | Taxable Rs. {item.taxable_value}")
        y -= 11
        pdf.drawString(50, y, f"Original Rs. {item.original_line_amount} | Product discount Rs. {item.discount_amount} | Coupon discount Rs. {item.coupon_discount_amount}")
        y -= 11
        pdf.drawString(50, y, f"Rates: CGST {item.cgst_rate}% | SGST/UTGST {item.sgst_rate}% | IGST {item.igst_rate}%")
        y -= 11
        pdf.drawString(50, y, f"CGST Rs. {item.cgst_amount} | SGST/UTGST Rs. {item.sgst_amount} | IGST Rs. {item.igst_amount} | Total tax Rs. {item.total_tax}")
        y -= 11
        pdf.drawString(50, y, f"Place of supply: {item.place_of_supply_state or order.customer_state} | Delivery share Rs. {item.delivery_charge_share}")
        y -= 17
        pdf.setFont("Helvetica", 10)

        if y < 80:

            pdf.showPage()

            y = height - 50

            pdf.setFont(
                "Helvetica",
                10
            )

    # --------------------------------
    # TOTAL
    # --------------------------------

    if y < 190:
        pdf.showPage()
        y = height - 50

    y -= 10

    pdf.line(
        50,
        y,
        550,
        y
    )

    y -= 30

    pdf.setFont("Helvetica", 10)
    for label, value in (
        ("Subtotal", order.subtotal), ("Product discount", order.discount_total),
        (f"Coupon {order.coupon_code}" if order.coupon_code else "Coupon discount", order.coupon_discount),
        ("Taxable value", order.taxable_total), ("CGST", order.cgst_total),
        ("SGST", order.sgst_total), ("IGST", order.igst_total),
        ("Total GST", order.gst_total), ("Delivery", order.delivery_charges - order.delivery_discount),
        ("GST on delivery", order.delivery_tax), ("Other applicable charges", order.other_charges),
    ):
        pdf.drawRightString(550, y, f"{label}: Rs. {value:.2f}")
        y -= 15

    pdf.setFont(
        "Helvetica-Bold",
        14
    )

    pdf.drawRightString(
        550,
        y,
        f"Total Paid: Rs. {order.total_amount}"
    )

    y -= 35

    pdf.setFont(
        "Helvetica",
        10
    )

    pdf.drawString(
        50,
        y,
        "Thank you for ordering with LocalMart!"
    )

    # --------------------------------
    # SAVE PDF
    # --------------------------------

    pdf.showPage()

    pdf.save()

    # --------------------------------
    # VERY IMPORTANT
    # --------------------------------

    return response






def grocery_home(request):

    return render(
        request,
        "grocery.html"
    )


def fruits_vegetables(request):

    return render(
        request,
        "fruits-vegetables.html"
    )


def dairy_bread_eggs(request):

    return render(
        request,
        "dairy-bread-eggs.html"
    )


def atta_rice_oil_dals(request):
    return render(request, "atta-rice-oil-dals.html")


def meats_fish_eggs(request):

    return render(
        request,
        "meats-fish-eggs.html"
    )


def masala_dry_fruits_more(request):

    return render(
        request,
        "masala-dry-fruits-more.html"
    )


def breakfast_sauces(request):

    return render(
        request,
        "breakfast-sauces.html"
    )





def tea_coffee(request):

    return render(
        request,
        "tea-coffee-more.html"
    )


def ice_cream_tubs(request):
    return render(request, "ice-cream-tubs.html")


def frozen_food(request):

    return render(
        request,
        "frozen-food.html"
    )


def sweet_cravings(request):

    return render(
        request,
        "sweet-cravings.html"
    )


def cold_drinks(request):
    return render(request, "drinks-juices.html")


def munchies(request):

    return render(
        request,
        "munchies.html"
    )


def biscuits(request):

    return render(
        request,
        "biscuits.html"
    )








def grocery_cart(request):
    """
    Grocery-specific cart page.

    Grocery cart data is stored in browser localStorage
    using the key:
        localmartGroceryCart
    """

    return redirect("cart")


@ensure_csrf_cookie
def grocery_checkout(request):
    """Keep grocery purchases on the shared, mixed-category checkout."""
    return redirect("checkout")









def grocery_orders(request):
    """
    Grocery-specific My Orders page.

    Food orders remain on:
        /my-orders/

    Grocery orders appear on:
        /grocery/orders/
    """

    user_data = request.session.get("user")

    # -------------------------------------------------
    # LOGIN CHECK
    # -------------------------------------------------

    if not user_data:
        return redirect("login")

    customer_email = (
        user_data.get("email", "")
        .strip()
        .lower()
    )

    customer_name = (
        user_data.get("fullname")
        or user_data.get("full_name")
        or user_data.get("name")
        or user_data.get("username")
        or "Customer"
    )

    if not customer_email:
        return redirect("login")

    # -------------------------------------------------
    # GROCERY KEYWORDS
    # -------------------------------------------------

    grocery_keywords = [
        # Fruits
        "fruit",
        "fruits",
        "apple",
        "banana",
        "orange",
        "mango",
        "grape",
        "watermelon",
        "papaya",
        "pineapple",
        "pomegranate",
        "guava",

        # Vegetables
        "vegetable",
        "vegetables",
        "tomato",
        "potato",
        "onion",
        "carrot",
        "cucumber",
        "capsicum",
        "spinach",
        "brinjal",
        "cauliflower",
        "broccoli",

        # Dairy
        "dairy",
        "milk",
        "curd",
        "yogurt",
        "paneer",
        "butter",
        "cheese",
        "cream",
        "lassi",

        # Bread / Eggs
        "bread",
        "bun",
        "eggs",
        "egg",

        # Atta / Rice / Dal
        "atta",
        "flour",
        "rice",
        "basmati",
        "dal",
        "dals",
        "pulse",
        "pulses",
        "toor",
        "moong",
        "urad",
        "chana",

        # Oil / Ghee
        "oil",
        "sunflower oil",
        "mustard oil",
        "rice bran oil",
        "coconut oil",
        "ghee",

        # Masala
        "masala",
        "spice",
        "spices",
        "turmeric",
        "chilli powder",
        "pepper",
        "cumin",
        "cardamom",
        "cinnamon",

        # Dry Fruits / Seeds
        "dry fruit",
        "dry fruits",
        "nuts",
        "almond",
        "cashew",
        "walnut",
        "pistachio",
        "raisins",
        "dates",
        "seeds",
        "pumpkin seeds",
        "sunflower seeds",
        "chia seeds",

        # Breakfast
        "breakfast",
        "muesli",
        "oats",
        "cereal",
        "corn flakes",
        "honey",
        "jam",
        "spread",
        "peanut butter",

        # Sauces
        "ketchup",
        "sauce",
        "sauces",
        "mayonnaise",

        # Packaged food
        "packaged",
        "packaged food",
        "noodles",
        "vermicelli",
        "pasta",
        "soup",
        "ready to eat",
        "ready-to-eat",
        "papad",
        "papads",
        "pickle",
        "pickles",
        "chutney",
        "baking",
        "baking mix",

        # Snacks
        "munchies",
        "snack",
        "snacks",
        "biscuit",
        "biscuits",
        "cookie",
        "cookies",
        "chips",
        "namkeen",

        # Sweets / Chocolate
        "chocolate",
        "chocolates",
        "sweet",
        "sweets",
        "dessert",
        "desserts",

        # Beverages
        "beverage",
        "beverages",
        "drink",
        "drinks",
        "juice",
        "juices",
        "tea",
        "coffee",

        # Ice cream / Frozen
        "ice cream",
        "icecream",
        "frozen",

        # Personal care
        "personal care",
        "shampoo",
        "soap",
        "toothpaste",
        "toothbrush",
        "face wash",
        "body wash",

        # Cleaning / Household
        "cleaning",
        "cleaner",
        "detergent",
        "dishwash",
        "dish washer",
        "floor cleaner",
        "household",
    ]

    # -------------------------------------------------
    # CHECK WHETHER ITEM IS GROCERY
    # -------------------------------------------------

    def is_grocery_item(item):

        category = (
            str(item.category or "")
            .strip()
            .lower()
        )

        name = (
            str(item.name or "")
            .strip()
            .lower()
        )

        searchable_text = f"{category} {name}"

        return any(
            keyword in searchable_text
            for keyword in grocery_keywords
        )

    # -------------------------------------------------
    # GET USER ORDERS
    # -------------------------------------------------

    all_orders = (
        Order.objects
        .filter(
            customer_email__iexact=customer_email
        )
        .prefetch_related("items")
        .order_by("-created_at")
    )

    prepared_orders = []

    total_items_purchased = 0

    # -------------------------------------------------
    # CATEGORY ICONS
    # -------------------------------------------------

    category_icons = {

        "Fruits & Vegetables":
            "bi-basket2",

        "Dairy, Bread & Eggs":
            "bi-cup-straw",

        "Atta, Rice, Oil & Dals":
            "bi-bag",

        "Masala, Dry Fruits & More":
            "bi-stars",

        "Breakfast & Sauces":
            "bi-egg-fried",

        "Tea, Coffee & More":
            "bi-cup-hot",

        "Ice Creams & More":
            "bi-snow2",

        "Sweet Cravings":
            "bi-gift",

        "Cold Drinks & Juices":
            "bi-cup",

        "Munchies":
            "bi-cookie",

        "Packaged Food":
            "bi-box-seam",

        "Personal Care":
            "bi-person",

        "Cleaning":
            "bi-droplet",
    }

    # -------------------------------------------------
    # PROCESS ORDERS
    # -------------------------------------------------

    for order in all_orders:

        all_items = list(
            order.items.all()
        )

        # ONLY GROCERY ITEMS
        grocery_items = [
            item
            for item in all_items
            if is_grocery_item(item)
        ]

        # IMPORTANT:
        # If this order contains no Grocery products,
        # completely hide it from Grocery My Orders.

        if not grocery_items:
            continue

        # -------------------------------------------------
        # CATEGORY GROUPING
        # -------------------------------------------------

        category_groups = OrderedDict()

        for item in grocery_items:

            category = (
                item.category.strip()
                if item.category
                else "Grocery"
            )

            if category not in category_groups:
                category_groups[category] = []

            # Item subtotal
            try:

                item.subtotal = (
                    float(item.price)
                    * int(item.quantity)
                )

            except (
                TypeError,
                ValueError
            ):

                item.subtotal = 0

            # Category icon
            item.category_icon = (
                category_icons.get(
                    category,
                    "bi-bag-check"
                )
            )

            category_groups[
                category
            ].append(item)

            # Total quantity
            try:

                total_items_purchased += int(
                    item.quantity
                )

            except (
                TypeError,
                ValueError
            ):

                pass

        # -------------------------------------------------
        # ORDER STATUS
        # -------------------------------------------------

        order_status = (
            order.order_status
            or "Placed"
        )

        status_class = (
            order_status
            .strip()
            .lower()
            .replace(" ", "-")
        )

        # -------------------------------------------------
        # PAYMENT STATUS
        # -------------------------------------------------

        payment_status = (
            order.payment_status
            or "Pending"
        )

        payment_class = (
            payment_status
            .strip()
            .lower()
            .replace(" ", "-")
        )

        # -------------------------------------------------
        # ITEM COUNT
        # -------------------------------------------------

        order_item_count = 0

        for item in grocery_items:

            try:

                order_item_count += int(
                    item.quantity
                )

            except (
                TypeError,
                ValueError
            ):

                pass

        # -------------------------------------------------
        # CATEGORY GROUPS FOR TEMPLATE
        # -------------------------------------------------

        order.category_groups = [

            {
                "name": category_name,

                "icon": category_icons.get(
                    category_name,
                    "bi-bag-check"
                ),

                "items": items,
            }

            for (
                category_name,
                items
            )
            in category_groups.items()
        ]

        # -------------------------------------------------
        # TEMPLATE VALUES
        # -------------------------------------------------

        order.order_status_display = (
            order_status
        )

        order.status_class = (
            status_class
        )

        order.payment_status_display = (
            payment_status
        )

        order.payment_class = (
            payment_class
        )

        order.item_count = (
            order_item_count
        )

        prepared_orders.append(order)

    # -------------------------------------------------
    # SUMMARY
    # -------------------------------------------------

    total_orders = len(
        prepared_orders
    )

    last_order = (
        prepared_orders[0]
        if prepared_orders
        else None
    )

    # -------------------------------------------------
    # CONTEXT
    # -------------------------------------------------

    context = {

        "orders":
            prepared_orders,

        "customer_name":
            customer_name,

        "customer_email":
            customer_email,

        "total_orders":
            total_orders,

        "total_items_purchased":
            total_items_purchased,

        "last_order":
            last_order,
    }

    # -------------------------------------------------
    # GROCERY TEMPLATE
    # -------------------------------------------------

    return render(
        request,
        "groceryorders.html",
        context
    )




def grocery_wishlist(request):
    return render(
        request,
        "grocerywishlist.html"
    )






def home_appliances(request):

    # =====================================================
    # HOME APPLIANCE CATEGORIES
    # =====================================================

    appliance_category_names = [
        "Refrigerators",
        "Washing Machines",
        "Air Conditioners",
        "Televisions",
        "Microwave Ovens",
        "Mixer Grinders",
        "Air Fryers",
        "Fans",
        "Vacuum Cleaners",
        "Water Purifiers",
        "Geysers",
        "Dishwashers",
        "Induction Cooktops",
        "Kitchen Chimneys",
    ]

    # =====================================================
    # BASE PRODUCTS
    # =====================================================

    products = (
        Product.objects
        .filter(
            category__name__in=appliance_category_names
        )
        .select_related("category")
    )

    # =====================================================
    # SEARCH
    # =====================================================

    search = request.GET.get(
        "q",
        ""
    ).strip()

    if search:
        products = products.filter(
            Q(name__icontains=search)
            |
            Q(brand__icontains=search)
            |
            Q(category__name__icontains=search)
        )

    # =====================================================
    # CATEGORY
    # =====================================================

    selected_category = request.GET.get(
        "category",
        ""
    ).strip()

    if selected_category:
        products = products.filter(
            category__name=selected_category
        )

    # =====================================================
    # BRAND
    # =====================================================

    selected_brand = request.GET.get(
        "brand",
        ""
    ).strip()

    if selected_brand:
        products = products.filter(
            brand=selected_brand
        )

    # =====================================================
    # MIN PRICE
    # =====================================================

    min_price = request.GET.get(
        "min_price",
        ""
    ).strip()

    if min_price:
        try:
            products = products.filter(
                price__gte=float(min_price)
            )
        except (ValueError, TypeError):
            min_price = ""

    # =====================================================
    # MAX PRICE
    # =====================================================

    max_price = request.GET.get(
        "max_price",
        ""
    ).strip()

    if max_price:
        try:
            products = products.filter(
                price__lte=float(max_price)
            )
        except (ValueError, TypeError):
            max_price = ""

    # =====================================================
    # RATING
    # =====================================================

    rating = request.GET.get(
        "rating",
        ""
    ).strip()

    if rating:
        try:
            products = products.filter(
                rating__gte=float(rating)
            )
        except (ValueError, TypeError):
            rating = ""

    # =====================================================
    # STOCK
    # =====================================================

    in_stock = request.GET.get(
        "in_stock",
        ""
    ) == "1"

    if in_stock:
        products = products.filter(
            stock__gt=0
        )

    # =====================================================
    # DISCOUNT
    # =====================================================

    discount_only = request.GET.get(
        "discount",
        ""
    ) == "1"

    if discount_only:
        products = products.filter(
            discount__gt=0
        )

    # =====================================================
    # SORT
    # =====================================================

    selected_sort = request.GET.get(
        "sort",
        "popular"
    )

    if selected_sort == "price-low":

        products = products.order_by(
            "price"
        )

    elif selected_sort == "price-high":

        products = products.order_by(
            "-price"
        )

    elif selected_sort == "rating":

        products = products.order_by(
            "-rating"
        )

    elif selected_sort == "name":

        products = products.order_by(
            "name"
        )

    else:

        products = products.order_by(
            "-rating",
            "-discount"
        )

    # =====================================================
    # PRODUCT COUNT
    # =====================================================

    product_count = products.count()

    # =====================================================
    # PAGINATION
    # =====================================================

    paginator = Paginator(
        products,
        20
    )

    page_number = request.GET.get(
        "page"
    )

    page_obj = paginator.get_page(
        page_number
    )

    # =====================================================
    # CATEGORIES FOR SIDEBAR
    # =====================================================

    categories = (
        Category.objects
        .filter(
            name__in=appliance_category_names
        )
        .order_by("name")
    )

    # =====================================================
    # BRANDS FOR SIDEBAR
    # =====================================================

    brands = (
        Product.objects
        .filter(
            category__name__in=appliance_category_names
        )
        .exclude(
            brand__isnull=True
        )
        .exclude(
            brand=""
        )
        .values_list(
            "brand",
            flat=True
        )
        .distinct()
        .order_by("brand")
    )

    # =====================================================
    # PAGINATION FILTER QUERY
    # =====================================================

    query_params = request.GET.copy()

    query_params.pop(
        "page",
        None
    )

    filter_query = query_params.urlencode()

    # =====================================================
    # CONTEXT
    # =====================================================

    context = {
        "products": page_obj,

        "page_obj": page_obj,

        "product_count": product_count,

        "categories": categories,

        "brands": brands,

        "selected_category": selected_category,

        "selected_brand": selected_brand,

        "selected_sort": selected_sort,

        "min_price": min_price,

        "max_price": max_price,

        "rating": rating,

        "in_stock": in_stock,

        "discount_only": discount_only,

        "filter_query": filter_query,

        "search": search,

        "cart_count": sum(
            int(quantity)
            for quantity in request.session.get("home_appliances_cart", {}).values()
        ),

        "wishlist_ids": request.session.get("home_appliances_wishlist", []),
    }

    # =====================================================
    # RENDER
    # =====================================================

    return render(
        request,
        "home-appliances.html",
        context
    )


def _home_appliance_product(product_id):
    return get_object_or_404(
        Product,
        id=product_id,
        category__name__in=[
            "Refrigerators", "Washing Machines", "Air Conditioners",
            "Televisions", "Microwave Ovens", "Mixer Grinders",
            "Air Fryers", "Fans", "Vacuum Cleaners", "Water Purifiers",
            "Geysers", "Dishwashers", "Induction Cooktops", "Kitchen Chimneys",
        ],
    )


def home_appliances_cart(request):
    return redirect("cart")


def home_appliances_cart_add(request, product_id):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "POST request required."}, status=405)
    product = _home_appliance_product(product_id)
    cart = request.session.get("home_appliances_cart", {})
    key = str(product.id)
    quantity = int(cart.get(key, 0))
    if quantity >= product.stock:
        return JsonResponse({"success": False, "message": "Maximum available quantity reached."})
    cart[key] = quantity + 1
    request.session["home_appliances_cart"] = cart
    request.session.modified = True
    return JsonResponse({"success": True, "quantity": cart[key], "cart_count": sum(int(value) for value in cart.values())})


def home_appliances_cart_update(request, product_id):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "POST request required."}, status=405)
    product = _home_appliance_product(product_id)
    try:
        data = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        data = request.POST
    cart = request.session.get("home_appliances_cart", {})
    key = str(product.id)
    quantity = int(cart.get(key, 0))
    action = data.get("action")
    if action == "increase":
        quantity = min(quantity + 1, product.stock)
    elif action == "decrease":
        quantity -= 1
    elif action == "remove":
        quantity = 0
    else:
        return JsonResponse({"success": False, "message": "Invalid cart action."}, status=400)
    if quantity > 0:
        cart[key] = quantity
    else:
        cart.pop(key, None)
    request.session["home_appliances_cart"] = cart
    request.session.modified = True
    return JsonResponse({"success": True, "quantity": quantity, "cart_count": sum(int(value) for value in cart.values())})


def home_appliances_wishlist(request):
    wishlist = request.session.get("home_appliances_wishlist", [])
    products = Product.objects.filter(id__in=[int(product_id) for product_id in wishlist if str(product_id).isdigit()])
    return render(request, "home-appliances-wishlist.html", {
        "wishlist_products": products,
        "wishlist_count": products.count(),
        "cart_count": sum(int(quantity) for quantity in request.session.get("home_appliances_cart", {}).values()),
    })


def home_appliances_wishlist_toggle(request, product_id):
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "POST request required."}, status=405)
    product = _home_appliance_product(product_id)
    wishlist = request.session.get("home_appliances_wishlist", [])
    key = str(product.id)
    if key in wishlist:
        wishlist.remove(key)
        added = False
    else:
        wishlist.append(key)
        added = True
    request.session["home_appliances_wishlist"] = wishlist
    request.session.modified = True
    return JsonResponse({"success": True, "added": added, "wishlist_count": len(wishlist)})
