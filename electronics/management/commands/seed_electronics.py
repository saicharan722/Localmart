from django.core.management.base import BaseCommand
from django.utils.text import slugify

from electronics.models import (
    ElectronicsCategory,
    ElectronicsProduct
)


class Command(BaseCommand):

    help = "Add electronics categories and products"

    def handle(self, *args, **kwargs):

        # ==========================================
        # CATEGORIES
        # ==========================================

        categories = [
            "Smartphones",
            "Laptops",
            "Televisions",
            "Headphones",
            "Earbuds",
            "Smart Watches",
            "Cameras",
            "Speakers",
            "Tablets",
            "Computer Accessories",
            "Monitors",
            "Networking",
            "Storage",
            "Chargers and Cables",
            "Gaming Accessories",
            "Webcams",
        ]

        category_objects = {}

        for category_name in categories:

            category, created = ElectronicsCategory.objects.get_or_create(
                name=category_name
            )

            category_objects[category_name] = category

        # ==========================================
        # PRODUCTS
        # ==========================================

        products = [

            # ---------------- Smartphones ----------------

            {
                "category": "Smartphones",
                "name": "Galaxy S24",
                "brand": "Samsung",
                "price": 74999,
                "discount": 10,
                "stock": 25,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
            },

            {
                "category": "Smartphones",
                "name": "iPhone 15",
                "brand": "Apple",
                "price": 69999,
                "discount": 8,
                "stock": 20,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1591337676887-a217a6970a8a"
            },

            {
                "category": "Smartphones",
                "name": "Pixel 8",
                "brand": "Google",
                "price": 59999,
                "discount": 12,
                "stock": 18,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
            },

            {
                "category": "Smartphones",
                "name": "OnePlus 12",
                "brand": "OnePlus",
                "price": 64999,
                "discount": 10,
                "stock": 30,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            },

            {
                "category": "Smartphones",
                "name": "Nothing Phone 2",
                "brand": "Nothing",
                "price": 39999,
                "discount": 15,
                "stock": 22,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            },

            # ---------------- Laptops ----------------

            {
                "category": "Laptops",
                "name": "MacBook Air M3",
                "brand": "Apple",
                "price": 114999,
                "discount": 5,
                "stock": 12,
                "rating": 4.9,
                "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            },

            {
                "category": "Laptops",
                "name": "Dell Inspiron 15",
                "brand": "Dell",
                "price": 64999,
                "discount": 12,
                "stock": 20,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1593642532744-d377ab507dc8"
            },

            {
                "category": "Laptops",
                "name": "HP Pavilion",
                "brand": "HP",
                "price": 59999,
                "discount": 15,
                "stock": 25,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            },

            {
                "category": "Laptops",
                "name": "Lenovo IdeaPad",
                "brand": "Lenovo",
                "price": 54999,
                "discount": 10,
                "stock": 18,
                "rating": 4.3,
                "image": "https://images.unsplash.com/photo-1484788984921-03950022c9ef"
            },

            {
                "category": "Laptops",
                "name": "ASUS Vivobook",
                "brand": "ASUS",
                "price": 57999,
                "discount": 13,
                "stock": 16,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef"
            },

            # ---------------- Televisions ----------------

            {
                "category": "Televisions",
                "name": "55 Inch 4K Smart TV",
                "brand": "Samsung",
                "price": 69999,
                "discount": 20,
                "stock": 10,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
            },

            {
                "category": "Televisions",
                "name": "55 Inch OLED TV",
                "brand": "LG",
                "price": 89999,
                "discount": 15,
                "stock": 8,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79"
            },

            {
                "category": "Televisions",
                "name": "50 Inch Google TV",
                "brand": "Sony",
                "price": 74999,
                "discount": 10,
                "stock": 12,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6"
            },

            {
                "category": "Televisions",
                "name": "43 Inch Smart TV",
                "brand": "TCL",
                "price": 39999,
                "discount": 18,
                "stock": 15,
                "rating": 4.3,
                "image": "https://images.unsplash.com/photo-1593305841991-05c297ba4575"
            },

            {
                "category": "Televisions",
                "name": "65 Inch 4K TV",
                "brand": "Sony",
                "price": 119999,
                "discount": 12,
                "stock": 6,
                "rating": 4.9,
                "image": "https://images.unsplash.com/photo-1601944177325-f8867652837f"
            },

            # ---------------- Headphones ----------------

            {
                "category": "Headphones",
                "name": "WH-1000XM5",
                "brand": "Sony",
                "price": 29999,
                "discount": 10,
                "stock": 25,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            },

            {
                "category": "Headphones",
                "name": "AirPods Max",
                "brand": "Apple",
                "price": 59999,
                "discount": 5,
                "stock": 10,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b"
            },

            {
                "category": "Headphones",
                "name": "QuietComfort 45",
                "brand": "Bose",
                "price": 24999,
                "discount": 15,
                "stock": 18,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90"
            },

            {
                "category": "Headphones",
                "name": "Live 660NC",
                "brand": "JBL",
                "price": 14999,
                "discount": 20,
                "stock": 30,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944"
            },

            {
                "category": "Headphones",
                "name": "Momentum 4",
                "brand": "Sennheiser",
                "price": 29999,
                "discount": 10,
                "stock": 14,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1487215078519-e21cc028cb29"
            },

            # ---------------- Earbuds ----------------

            {
                "category": "Earbuds",
                "name": "AirPods Pro 2",
                "brand": "Apple",
                "price": 24999,
                "discount": 8,
                "stock": 30,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"
            },

            {
                "category": "Earbuds",
                "name": "Galaxy Buds 2 Pro",
                "brand": "Samsung",
                "price": 17999,
                "discount": 15,
                "stock": 22,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
            },

            {
                "category": "Earbuds",
                "name": "Nothing Ear",
                "brand": "Nothing",
                "price": 9999,
                "discount": 10,
                "stock": 35,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"
            },

            {
                "category": "Earbuds",
                "name": "OnePlus Buds Pro",
                "brand": "OnePlus",
                "price": 8999,
                "discount": 20,
                "stock": 40,
                "rating": 4.3,
                "image": "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"
            },

            {
                "category": "Earbuds",
                "name": "JBL Tune Buds",
                "brand": "JBL",
                "price": 4999,
                "discount": 15,
                "stock": 50,
                "rating": 4.2,
                "image": "https://images.unsplash.com/photo-1598331668826-20cecc596b86"
            },

            # ---------------- Smart Watches ----------------

            {
                "category": "Smart Watches",
                "name": "Apple Watch Series 9",
                "brand": "Apple",
                "price": 44999,
                "discount": 8,
                "stock": 12,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
            },

            {
                "category": "Smart Watches",
                "name": "Galaxy Watch 6",
                "brand": "Samsung",
                "price": 29999,
                "discount": 12,
                "stock": 18,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            },

            {
                "category": "Smart Watches",
                "name": "Pixel Watch 2",
                "brand": "Google",
                "price": 34999,
                "discount": 10,
                "stock": 15,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1"
            },

            {
                "category": "Smart Watches",
                "name": "Watch GT 4",
                "brand": "Huawei",
                "price": 24999,
                "discount": 15,
                "stock": 20,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
            },

            {
                "category": "Smart Watches",
                "name": "Venu 3",
                "brand": "Garmin",
                "price": 39999,
                "discount": 10,
                "stock": 10,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d"
            },

            # ---------------- Cameras ----------------

            {
                "category": "Cameras",
                "name": "EOS R50",
                "brand": "Canon",
                "price": 69999,
                "discount": 10,
                "stock": 8,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
            },

            {
                "category": "Cameras",
                "name": "Alpha A6400",
                "brand": "Sony",
                "price": 74999,
                "discount": 12,
                "stock": 7,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39"
            },

            {
                "category": "Cameras",
                "name": "Z50",
                "brand": "Nikon",
                "price": 79999,
                "discount": 15,
                "stock": 6,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84"
            },

            {
                "category": "Cameras",
                "name": "X-S20",
                "brand": "Fujifilm",
                "price": 99999,
                "discount": 8,
                "stock": 5,
                "rating": 4.9,
                "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
            },

            {
                "category": "Cameras",
                "name": "Lumix G100",
                "brand": "Panasonic",
                "price": 59999,
                "discount": 18,
                "stock": 9,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848"
            },

            # ---------------- Speakers ----------------

            {
                "category": "Speakers",
                "name": "JBL Flip 6",
                "brand": "JBL",
                "price": 11999,
                "discount": 15,
                "stock": 30,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
            },

            {
                "category": "Speakers",
                "name": "HomePod Mini",
                "brand": "Apple",
                "price": 10999,
                "discount": 5,
                "stock": 15,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1589003077984-894e133dabab"
            },

            {
                "category": "Speakers",
                "name": "Echo Dot",
                "brand": "Amazon",
                "price": 5499,
                "discount": 20,
                "stock": 40,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1543512214-318c7553f230"
            },

            {
                "category": "Speakers",
                "name": "SoundLink Flex",
                "brand": "Bose",
                "price": 15999,
                "discount": 10,
                "stock": 18,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d"
            },

            {
                "category": "Speakers",
                "name": "Xtreme 3",
                "brand": "JBL",
                "price": 24999,
                "discount": 12,
                "stock": 12,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
            },

            # ---------------- Tablets ----------------

            {
                "category": "Tablets",
                "name": "iPad Air",
                "brand": "Apple",
                "price": 59999,
                "discount": 8,
                "stock": 15,
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
            },

            {
                "category": "Tablets",
                "name": "Galaxy Tab S9",
                "brand": "Samsung",
                "price": 69999,
                "discount": 10,
                "stock": 12,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764"
            },

            {
                "category": "Tablets",
                "name": "OnePlus Pad",
                "brand": "OnePlus",
                "price": 37999,
                "discount": 15,
                "stock": 20,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9"
            },

            {
                "category": "Tablets",
                "name": "Lenovo Tab P12",
                "brand": "Lenovo",
                "price": 29999,
                "discount": 12,
                "stock": 18,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf"
            },

            {
                "category": "Tablets",
                "name": "Pixel Tablet",
                "brand": "Google",
                "price": 49999,
                "discount": 10,
                "stock": 10,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1542751110-97427bbecf20"
            },

            # ---------------- Computer Accessories ----------------

            {
                "category": "Computer Accessories",
                "name": "Wireless Keyboard",
                "brand": "Logitech",
                "price": 2999,
                "discount": 15,
                "stock": 50,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
            },

            {
                "category": "Computer Accessories",
                "name": "Wireless Mouse",
                "brand": "Logitech",
                "price": 1499,
                "discount": 10,
                "stock": 60,
                "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
            },

            {
                "category": "Computer Accessories",
                "name": "Mechanical Keyboard",
                "brand": "Redragon",
                "price": 4499,
                "discount": 20,
                "stock": 35,
                "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1595225476474-87563907a212"
            },

            {
                "category": "Computer Accessories",
                "name": "Gaming Mouse",
                "brand": "Razer",
                "price": 3999,
                "discount": 15,
                "stock": 30,
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
            },

            {
                "category": "Computer Accessories",
                "name": "USB-C Hub",
                "brand": "Anker",
                "price": 3499,
                "discount": 10,
                "stock": 40,
                "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1625842268584-8f3296236761"
            },

            # ---------------- Additional Electronics ----------------

            {
                "category": "Smartphones", "name": "Galaxy A56 5G", "brand": "Samsung",
                "price": 41999, "discount": 8, "stock": 24, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
            },
            {
                "category": "Smartphones", "name": "Nord CE 4", "brand": "OnePlus",
                "price": 24999, "discount": 10, "stock": 28, "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            },
            {
                "category": "Laptops", "name": "HP 15s Ryzen 5 Laptop", "brand": "HP",
                "price": 57999, "discount": 12, "stock": 14, "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            },
            {
                "category": "Laptops", "name": "Lenovo IdeaPad Slim 5", "brand": "Lenovo",
                "price": 64999, "discount": 9, "stock": 11, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1484788984921-03950022c9ef"
            },
            {
                "category": "Monitors", "name": "24-inch Full HD Monitor", "brand": "Samsung",
                "price": 12999, "discount": 15, "stock": 18, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
            },
            {
                "category": "Computer Accessories", "name": "MX Master Wireless Mouse", "brand": "Logitech",
                "price": 7499, "discount": 10, "stock": 22, "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
            },
            {
                "category": "Computer Accessories", "name": "K380 Bluetooth Keyboard", "brand": "Logitech",
                "price": 2995, "discount": 8, "stock": 26, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
            },
            {
                "category": "Headphones", "name": "WH-CH720N Wireless Headphones", "brand": "Sony",
                "price": 9990, "discount": 14, "stock": 19, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            },
            {
                "category": "Speakers", "name": "Charge 5 Bluetooth Speaker", "brand": "JBL",
                "price": 14999, "discount": 12, "stock": 16, "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
            },
            {
                "category": "Earbuds", "name": "Airdopes 141 True Wireless Earbuds", "brand": "boAt",
                "price": 1499, "discount": 20, "stock": 45, "rating": 4.2,
                "image": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"
            },
            {
                "category": "Smart Watches", "name": "ColorFit Pro 5 Smart Watch", "brand": "Noise",
                "price": 3499, "discount": 18, "stock": 32, "rating": 4.3,
                "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
            },
            {
                "category": "Tablets", "name": "Pad 6 Android Tablet", "brand": "Xiaomi",
                "price": 28999, "discount": 10, "stock": 13, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
            },
            {
                "category": "Chargers and Cables", "name": "20W USB-C Fast Charger", "brand": "Anker",
                "price": 1999, "discount": 15, "stock": 40, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0"
            },
            {
                "category": "Chargers and Cables", "name": "USB-C to USB-C Fast Charging Cable", "brand": "Belkin",
                "price": 1299, "discount": 10, "stock": 55, "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
            },
            {
                "category": "Networking", "name": "AC1200 Wi-Fi Dual Band Router", "brand": "TP-Link",
                "price": 2499, "discount": 12, "stock": 21, "rating": 4.4,
                "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
            },
            {
                "category": "Storage", "name": "128GB USB 3.2 Flash Drive", "brand": "SanDisk",
                "price": 999, "discount": 15, "stock": 60, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1586769852044-692d6e3703f0"
            },
            {
                "category": "Storage", "name": "1TB Portable External SSD", "brand": "WD",
                "price": 8499, "discount": 10, "stock": 17, "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
            },
            {
                "category": "Webcams", "name": "C920 HD Pro Webcam", "brand": "Logitech",
                "price": 6999, "discount": 13, "stock": 15, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
            },
            {
                "category": "Gaming Accessories", "name": "BlackShark V2 Gaming Headset", "brand": "Razer",
                "price": 7999, "discount": 15, "stock": 12, "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1599669454699-248893623440"
            },
            {
                "category": "Gaming Accessories", "name": "K552 Mechanical Gaming Keyboard", "brand": "Redragon",
                "price": 3499, "discount": 16, "stock": 25, "rating": 4.5,
                "image": "https://images.unsplash.com/photo-1595225476474-87563907a212"
            },
            {
                "category": "Gaming Accessories", "name": "DeathAdder Essential Gaming Mouse", "brand": "Razer",
                "price": 2299, "discount": 12, "stock": 30, "rating": 4.6,
                "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
            },
        ]

        # ==========================================
        # SAVE PRODUCTS
        # ==========================================

        used_images = set()

        # ==========================================
        # SAVE PRODUCTS
        # ==========================================

        created_count = 0
        updated_count = 0

        for product in products:

            name = product["name"]
            brand = product["brand"]
            price = product["price"]
            discount = product["discount"]

            # Generate unique slug from product name
            product_slug = slugify(name)

            # Get the correct ElectronicsCategory object
            category = category_objects[product["category"]]

            # Create or update product
            _, created = ElectronicsProduct.objects.update_or_create(
                slug=product_slug,
                defaults={
                    "name": name,
                    "brand": brand,
                    "price": price,
                    "discount_percentage": discount,
                    "rating": product.get("rating", 0),
                    "reviews": product.get("reviews", 0),
                    "stock": product.get("stock", 10),
                    "description": product.get("description", ""),
                    "image": product.get("image", ""),
                    "category": category,
                    "is_active": True,
                }
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        # ==========================================
        # SUCCESS MESSAGE
        # ==========================================

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "Electronics products seeded successfully!"
            )
        )

        self.stdout.write(
            f"Categories: {len(category_objects)}"
        )

        self.stdout.write(
            f"Products processed: {len(products)}"
        )

        self.stdout.write(
            f"New products created: {created_count}"
        )

        self.stdout.write(
            f"Existing products updated: {updated_count}"
        )

        self.stdout.write(
            f"Total products in database: "
            f"{ElectronicsProduct.objects.count()}"
        )

        self.stdout.write(
            f"Active products: "
            f"{ElectronicsProduct.objects.filter(is_active=True).count()}"
        )