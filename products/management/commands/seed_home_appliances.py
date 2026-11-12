from django.core.management.base import BaseCommand

from products.models import Product, Category


class Command(BaseCommand):

    help = "Seed Home Appliances products"

    def handle(self, *args, **options):

        # =====================================================
        # HOME APPLIANCES DATA
        # =====================================================

        appliance_products = [

            {
                "category": "Refrigerators",
                "name": "Samsung 236L Double Door Refrigerator",
                "brand": "Samsung",
                "price": 24990,
                "rating": 4.5,
                "discount": 18,
                "stock": 15,
                "image": "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30",
            },

            {
                "category": "Refrigerators",
                "name": "LG 260L Frost Free Double Door Refrigerator",
                "brand": "LG",
                "price": 28990,
                "rating": 4.6,
                "discount": 16,
                "stock": 12,
                "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
            },

            {
                "category": "Washing Machines",
                "name": "LG 7 Kg Fully Automatic Washing Machine",
                "brand": "LG",
                "price": 22990,
                "rating": 4.5,
                "discount": 20,
                "stock": 10,
                "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
            },

            {
                "category": "Washing Machines",
                "name": "Samsung 8 Kg Front Load Washing Machine",
                "brand": "Samsung",
                "price": 31990,
                "rating": 4.7,
                "discount": 15,
                "stock": 8,
                "image": "https://images.unsplash.com/photo-1626806787921-7c8b9b9b6b7d",
            },

            {
                "category": "Air Conditioners",
                "name": "Daikin 1.5 Ton 5 Star Split AC",
                "brand": "Daikin",
                "price": 38990,
                "rating": 4.7,
                "discount": 22,
                "stock": 7,
                "image": "https://images.unsplash.com/photo-1759772238012-9d5ad59ae637?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMJA3fDA%3D",
            },

            {
                "category": "Air Conditioners",
                "name": "Voltas 1.5 Ton 5 Star Split AC",
                "brand": "Voltas",
                "price": 34990,
                "rating": 4.4,
                "discount": 20,
                "stock": 9,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXHFMb4HAphlMEU1N9lgQokAo94bjuAidlASj4flqzA&s=10",
            },

            {
                "category": "Televisions",
                "name": "Sony 55 Inch 4K Ultra HD Smart TV",
                "brand": "Sony",
                "price": 59990,
                "rating": 4.8,
                "discount": 25,
                "stock": 6,
                "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6",
            },

            {
                "category": "Televisions",
                "name": "Samsung 50 Inch Crystal 4K Smart TV",
                "brand": "Samsung",
                "price": 44990,
                "rating": 4.6,
                "discount": 23,
                "stock": 10,
                "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
            },

            {
                "category": "Microwave Ovens",
                "name": "Samsung 28L Convection Microwave Oven",
                "brand": "Samsung",
                "price": 12990,
                "rating": 4.5,
                "discount": 18,
                "stock": 14,
                "image": "https://images.unsplash.com/photo-1585659722983-3a675dabf23d",
            },

            {
                "category": "Microwave Ovens",
                "name": "IFB 30L Convection Microwave Oven",
                "brand": "IFB",
                "price": 13990,
                "rating": 4.4,
                "discount": 20,
                "stock": 11,
                "image": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
            },

            {
                "category": "Mixer Grinders",
                "name": "Philips 750W Mixer Grinder",
                "brand": "Philips",
                "price": 4299,
                "rating": 4.5,
                "discount": 25,
                "stock": 25,
                "image": "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
            },

            {
                "category": "Mixer Grinders",
                "name": "Preethi Zodiac 750W Mixer Grinder",
                "brand": "Preethi",
                "price": 7999,
                "rating": 4.6,
                "discount": 18,
                "stock": 16,
                "image": "https://images.unsplash.com/photo-1598514982901-ae6273f9f1e7",
            },

            {
                "category": "Air Fryers",
                "name": "Philips 4.1L Digital Air Fryer",
                "brand": "Philips",
                "price": 6999,
                "rating": 4.6,
                "discount": 24,
                "stock": 18,
                "image": "https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMja3fDA%3D",
            },

            {
                "category": "Air Fryers",
                "name": "Agaro Regency 12L Air Fryer Oven",
                "brand": "Agaro",
                "price": 8999,
                "rating": 4.5,
                "discount": 30,
                "stock": 13,
                "image": "https://images.unsplash.com/photo-1640717602870-2a9e0f6e5b5d",
            },

            {
                "category": "Fans",
                "name": "Crompton High Speed Ceiling Fan",
                "brand": "Crompton",
                "price": 2499,
                "rating": 4.3,
                "discount": 20,
                "stock": 30,
                "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001",
            },

            {
                "category": "Fans",
                "name": "Orient Electric 1200mm Ceiling Fan",
                "brand": "Orient",
                "price": 2299,
                "rating": 4.4,
                "discount": 18,
                "stock": 28,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3QoEnC1uo-sSt04OSQIlFazqPeq53WVajS1B9Mv6uwA&s=10",
            },

            {
                "category": "Vacuum Cleaners",
                "name": "Dyson V8 Cordless Vacuum Cleaner",
                "brand": "Dyson",
                "price": 29990,
                "rating": 4.7,
                "discount": 15,
                "stock": 5,
                "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001",
            },

            {
                "category": "Vacuum Cleaners",
                "name": "Eureka Forbes Quick Clean Vacuum Cleaner",
                "brand": "Eureka Forbes",
                "price": 5999,
                "rating": 4.3,
                "discount": 22,
                "stock": 20,
                "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
            },

            {
                "category": "Water Purifiers",
                "name": "Kent Grand Plus RO Water Purifier",
                "brand": "Kent",
                "price": 16990,
                "rating": 4.5,
                "discount": 20,
                "stock": 12,
                "image": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
            },

            {
                "category": "Water Purifiers",
                "name": "Aquaguard Aura RO Water Purifier",
                "brand": "Aquaguard",
                "price": 18990,
                "rating": 4.4,
                "discount": 18,
                "stock": 10,
                "image": "/static/images/aquaguard-aura-ro-water-purifier.webp",
            },

            {
                "category": "Geysers",
                "name": "AO Smith 15L Storage Water Geyser",
                "brand": "AO Smith",
                "price": 11990,
                "rating": 4.5,
                "discount": 23,
                "stock": 14,
                "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            },

            {
                "category": "Geysers",
                "name": "Racold 15L Vertical Water Geyser",
                "brand": "Racold",
                "price": 9999,
                "rating": 4.3,
                "discount": 20,
                "stock": 18,
                "image": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            },

            {
                "category": "Dishwashers",
                "name": "Bosch 13 Place Settings Dishwasher",
                "brand": "Bosch",
                "price": 42990,
                "rating": 4.7,
                "discount": 15,
                "stock": 5,
                "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
            },

            {
                "category": "Dishwashers",
                "name": "IFB 12 Place Settings Dishwasher",
                "brand": "IFB",
                "price": 36990,
                "rating": 4.5,
                "discount": 18,
                "stock": 7,
                "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
            },

            {
                "category": "Induction Cooktops",
                "name": "Prestige PIC 20 Induction Cooktop",
                "brand": "Prestige",
                "price": 2499,
                "rating": 4.4,
                "discount": 25,
                "stock": 35,
                "image": "https://images.unsplash.com/photo-1556911220-bff31c812dba",
            },

            {
                "category": "Induction Cooktops",
                "name": "Philips HD4929 Induction Cooktop",
                "brand": "Philips",
                "price": 3199,
                "rating": 4.5,
                "discount": 20,
                "stock": 25,
                "image": "https://images.unsplash.com/photo-1556911220-bff31c812dba",
            },

            {
                "category": "Kitchen Chimneys",
                "name": "Faber 60cm Auto Clean Kitchen Chimney",
                "brand": "Faber",
                "price": 14990,
                "rating": 4.5,
                "discount": 30,
                "stock": 8,
                "image": "https://asset7.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/How-to-Save-Money-on-Home-Appliances-in-India.jpg",
            },

            {
                "category": "Kitchen Chimneys",
                "name": "Elica 60cm Auto Clean Kitchen Chimney",
                "brand": "Elica",
                "price": 12990,
                "rating": 4.4,
                "discount": 25,
                "stock": 10,
                "image": "https://asset7.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/How-to-Save-Money-on-Home-Appliances-in-India.jpg",
            },
        ]

        # =====================================================
        # CREATE / UPDATE PRODUCTS
        # =====================================================

        created_count = 0
        updated_count = 0

        for item in appliance_products:

            category_name = item.pop("category")

            category, category_created = (
                Category.objects.get_or_create(
                    name=category_name
                )
            )

            product, created = Product.objects.update_or_create(
                name=item["name"],
                defaults={
                    "category": category,
                    "brand": item["brand"],
                    "price": item["price"],
                    "rating": item["rating"],
                    "discount": item["discount"],
                    "stock": item["stock"],
                    "image": item["image"],
                },
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        # =====================================================
        # SUCCESS MESSAGE
        # =====================================================

        self.stdout.write(
            self.style.SUCCESS(
                f"Home Appliances seed completed. "
                f"Created: {created_count}, "
                f"Updated: {updated_count}"
            )
        )
