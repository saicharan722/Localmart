const cuisineMenus = {

    "Biryani": [

        {
            id: 101,
            name: "Chicken Dum Biryani",
            category: "Biryani",
            price: 299,
            veg: false,
            bestseller: true,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800",
            description: "Traditional Hyderabadi chicken dum biryani with raita and salan."
        },

        {
            id: 102,
            name: "Mutton Dum Biryani",
            category: "Biryani",
            price: 389,
            veg: false,
            bestseller: true,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=800",
            description: "Slow-cooked mutton biryani prepared with fragrant basmati rice."
        },

        {
            id:103,
            name:"Paneer Biryani",
            category:"Biryani",
            price:229,
            veg:true,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1751618646882-4221d5e3b1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fFBhbmVlciUyMEJpcnlhbmklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
            description:"Paneer cubes cooked with aromatic spices."
        },

        {
            id:104,
            name:"Veg Dum Biryani",
            category:"Biryani",
            price:199,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1642821369314-100fece91d3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxQYW5lZXIlMjBCaXJ5YW5pJTIwaW1hZ2VzfGVufDB8fDB8fHwwoto-1589302168068-964664d93dc0?w=800",
            description:"Fresh vegetables layered with basmati rice."
        },

        {
            id:105,
            name:"Egg Biryani",
            category:"Biryani",
            price:189,
            veg:false,
            bestseller:false,
            rating:4.3,
            image:"https://images.unsplash.com/photo-1681546898018-961e2a05c6fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RWdnJTIwQmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
            description:"Boiled eggs cooked in spicy biryani masala."
        },

        {
            id:106,
            name:"Special Family Biryani",
            category:"Biryani",
            price:699,
            veg:false,
            bestseller:true,
            rating:4.9,
            image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
            description:"Serves four with chicken, mutton and kebabs."
        },

        {
            id:107,
            name:"Chicken Fry Piece Biryani",
            category:"Biryani",
            price:329,
            veg:false,
            bestseller:true,
            rating:4.7,
            image:"https://images.unsplash.com/photo-1782541370275-6761522e39d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fENoaWNrZW4lMjBGcnklMjBQaWVjZSUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Crispy fried chicken served over spicy biryani."
        },

        {
            id:108,
            name:"Boneless Chicken Biryani",
            category:"Biryani",
            price:319,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1736680056325-ba2ade6250a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEJvbmVsZXNzJTIwQ2hpY2tlbiUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Boneless chicken cooked with premium rice."
        },

        {
            id:109,
            name:"Mushroom Biryani",
            category:"Biryani",
            price:219,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1696950169706-d4533c32f81a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fE11c2hyb29tJTIwQmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
            description:"Fresh mushrooms with traditional spices."
        },

        {
            id:110,
            name:"Prawn Biryani",
            category:"Biryani",
            price:349,
            veg:false,
            bestseller:false,
            rating:4.6,
            image:"https://images.unsplash.com/photo-1562967915-6ba607ff7d05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFByYXduJTIwQmlyeWFuaSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
            description:"Juicy prawns cooked with aromatic basmati rice."
        },

        {
            id:111,
            name:"Fish Biryani",
            category:"Biryani",
            price:329,
            veg:false,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1661081090288-fd8ffc486dd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEZpc2glMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Spicy fish biryani with fresh herbs."
        },

        {
            id:112,
            name:"Kaju Biryani",
            category:"Biryani",
            price:249,
            veg:true,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
            description:"Cashew rich dum biryani."
        },

        {
            id:113,
            name:"Chicken 65 Biryani",
            category:"Biryani",
            price:339,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1714611626323-5ba6204453be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENoaWNrZW4lMjA2NSUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Chicken 65 served over spicy dum biryani."
        },

        {
            id:114,
            name:"Keema Biryani",
            category:"Biryani",
            price:319,
            veg:false,
            bestseller:false,
            rating:4.6,
            image:"https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
            description:"Minced meat biryani."
        },

        {
            id:115,
            name:"Double Masala Biryani",
            category:"Biryani",
            price:349,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1630851840633-f96999247032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENoaWNrZW4lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Extra spicy Hyderabadi biryani."
        },

        {
            id:116,
            name:"Mini Chicken Biryani",
            category:"Biryani",
            price:169,
            veg:false,
            bestseller:false,
            rating:4.2,
            image:"https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=800",
            description:"Perfect for one person."
        },

        {
            id:117,
            name:"Veg Family Pack",
            category:"Biryani",
            price:499,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
            description:"Family pack veg biryani."
        },

        {
            id:118,
            name:"Andhra Chicken Biryani",
            category:"Biryani",
            price:309,
            veg:false,
            bestseller:true,
            rating:4.7,
            image:"https://images.unsplash.com/photo-1708184528306-f75a0a5118ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Authentic Andhra spicy biryani."
        },

        {
            id:119,
            name:"Ulavacharu Chicken Biryani",
            category:"Biryani",
            price:359,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1676436293945-a613dde9c3b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fENoaWNrZW4lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Rich Ulavacharu gravy with biryani."
        },

        {
            id:120,
            name:"Special Dum Biryani Combo",
            category:"Biryani",
            price:399,
            veg:false,
            bestseller:true,
            rating:4.9,
            image:"https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENoaWNrZW4lMjBkdW0lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Biryani, starter, drink and dessert combo."
        }

    ]



,

"Pizza":[

{
id:201,
name:"Margherita Pizza",
category:"Pizza",
price:199,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800",
description:"Classic cheese pizza with mozzarella."
},

{
id:202,
name:"Farmhouse Pizza",
category:"Pizza",
price:299,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
description:"Loaded with fresh vegetables and cheese."
},

{
id:203,
name:"Veg Extravaganza",
category:"Pizza",
price:349,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800",
description:"Premium vegetables with extra cheese."
},

{
id:204,
name:"Paneer Tikka Pizza",
category:"Pizza",
price:329,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
description:"Indian paneer tikka on cheesy pizza."
},

{
id:205,
name:"Cheese Burst Pizza",
category:"Pizza",
price:369,
veg:true,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1618213837799-25d5552820d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww",
description:"Extra cheese stuffed crust."
},

{
id:206,
name:"Pepperoni Pizza",
category:"Pizza",
price:399,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
description:"Loaded with pepperoni slices."
},

{
id:207,
name:"Chicken Dominator",
category:"Pizza",
price:429,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800",
description:"Chicken loaded pizza."
},

{
id:208,
name:"Chicken Tikka Pizza",
category:"Pizza",
price:389,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1655471264223-b07ce84d521c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENoaWNrZW4lMjBUaWtrYSUyMFBpenphfGVufDB8fDB8fHww",
description:"Chicken tikka with cheese."
},

{
id:209,
name:"BBQ Chicken Pizza",
category:"Pizza",
price:429,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800",
description:"BBQ chicken toppings."
},

{
id:210,
name:"Mexican Green Wave",
category:"Pizza",
price:339,
veg:true,
bestseller:false,
rating:4.6,
image:"https://images.unsplash.com/photo-1657799831232-e9548089a643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Mexican herbs and vegetables."
},

{
id:211,
name:"Corn Cheese Pizza",
category:"Pizza",
price:259,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1592977731761-2d58aafef572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Sweet corn with mozzarella."
},

{
id:212,
name:"Mushroom Pizza",
category:"Pizza",
price:289,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800",
description:"Fresh mushroom delight."
},

{
id:213,
name:"Chicken Supreme",
category:"Pizza",
price:459,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1751026044668-c8fb63abaa4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Loaded chicken toppings."
},

{
id:214,
name:"Peri Peri Chicken Pizza",
category:"Pizza",
price:419,
veg:false,
bestseller:true,
rating:4.7,
image:"https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww",
description:"Spicy peri peri chicken."
},

{
id:215,
name:"Double Cheese Pizza",
category:"Pizza",
price:299,
veg:true,
bestseller:true,
rating:4.8,
image:"https://plus.unsplash.com/premium_photo-1661762555601-47d088a26b50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww",
description:"Double mozzarella cheese."
},

{
id:216,
name:"Veg Deluxe Pizza",
category:"Pizza",
price:319,
veg:true,
bestseller:false,
rating:4.6,
image:"https://images.unsplash.com/photo-1632641736062-29327b7182d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Premium vegetables."
},

{
id:217,
name:"Chicken Sausage Pizza",
category:"Pizza",
price:399,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1751026044668-c8fb63abaa4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
description:"Chicken sausage topping."
},

{
id:218,
name:"Tandoori Chicken Pizza",
category:"Pizza",
price:449,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1655673654158-9f7285b7d1ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww",
description:"Indian tandoori chicken."
},

{
id:219,
name:"Garlic Cheese Pizza",
category:"Pizza",
price:249,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1609159085820-d9a6ff0f469e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Garlic butter and cheese."
},

{
id:220,
name:"Ultimate Pizza Combo",
category:"Pizza",
price:599,
veg:false,
bestseller:true,
rating:5.0,
image:"https://plus.unsplash.com/premium_photo-1672498193366-7b9ba9fe26cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fENoaWNrZW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
description:"Large pizza with garlic bread and Coke."
}

]


,

"Burger":[

{
id:301,
name:"Classic Veg Burger",
category:"Burger",
price:149,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
description:"Fresh vegetable patty with lettuce, tomato and cheese."
},

{
id:302,
name:"Cheese Veg Burger",
category:"Burger",
price:169,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
description:"Loaded with melted cheese and crispy veggies."
},

{
id:303,
name:"Paneer Burger",
category:"Burger",
price:189,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
description:"Grilled paneer patty with spicy mayo."
},

{
id:304,
name:"Mexican Veg Burger",
category:"Burger",
price:199,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWV4aWNhbiUyMFZlZyUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
description:"Mexican salsa and crispy patty."
},

{
id:305,
name:"Double Cheese Burger",
category:"Burger",
price:229,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1547129691-e50363083b1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"Double cheese with premium buns."
},

{
id:306,
name:"Chicken Burger",
category:"Burger",
price:199,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1543392765-620e968d2162?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"Juicy grilled chicken burger."
},

{
id:307,
name:"Crispy Chicken Burger",
category:"Burger",
price:229,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800",
description:"Crunchy fried chicken fillet."
},

{
id:308,
name:"Zinger Burger",
category:"Burger",
price:249,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
description:"Spicy crispy zinger burger."
},

{
id:309,
name:"BBQ Chicken Burger",
category:"Burger",
price:259,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1703575571961-e8db6e8ea4bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"BBQ sauce with grilled chicken."
},

{
id:310,
name:"Peri Peri Chicken Burger",
category:"Burger",
price:269,
veg:false,
bestseller:true,
rating:4.8,
image:"https://plus.unsplash.com/premium_photo-1695758787947-0aff87c1f93a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TWV4aWNhbiUyMFZlZyUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
description:"Peri peri flavored chicken burger."
},

{
id:311,
name:"Chicken Cheese Burger",
category:"Burger",
price:249,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1625683279315-8222ae8af27a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"Chicken burger with cheese slice."
},

{
id:312,
name:"Maharaja Chicken Burger",
category:"Burger",
price:349,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1732614701437-6891c26cb518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"Large double chicken burger."
},

{
id:313,
name:"Loaded Chicken Burger",
category:"Burger",
price:289,
veg:false,
bestseller:false,
rating:4.6,
image:"https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxNZXhpY2FuJTIwVmVnJTIwQnVyZ2VyfGVufDB8fDB8fHww",
description:"Extra chicken and cheese."
},

{
id:314,
name:"American Burger",
category:"Burger",
price:279,
veg:false,
bestseller:false,
rating:4.6,
image:"https://plus.unsplash.com/premium_photo-1740080127946-00c2ba8c337a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxNZXhpY2FuJTIwVmVnJTIwQnVyZ2VyfGVufDB8fDB8fHww",
description:"Classic American style burger."
},

{
id:315,
name:"Veg Supreme Burger",
category:"Burger",
price:219,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
description:"Premium vegetable burger."
},

{
id:316,
name:"Spicy Paneer Burger",
category:"Burger",
price:209,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
description:"Paneer with spicy sauce."
},

{
id:317,
name:"Corn & Cheese Burger",
category:"Burger",
price:179,
veg:true,
bestseller:false,
rating:4.4,
image:"https://images.unsplash.com/photo-1611309454921-16cef3438ee0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1leGljYW4lMjBWZWclMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
description:"Sweet corn with creamy cheese."
},

{
id:318,
name:"Mushroom Burger",
category:"Burger",
price:189,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1697877240896-d252bf5cdfdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxNZXhpY2FuJTIwVmVnJTIwQnVyZ2VyfGVufDB8fDB8fHww",
description:"Grilled mushroom burger."
},

{
id:319,
name:"Chicken Crunch Burger",
category:"Burger",
price:239,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1740838535478-8f67b29f1c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxNZXhpY2FuJTIwVmVnJTIwQnVyZ2VyfGVufDB8fDB8fHww",
description:"Crunchy chicken patty."
},

{
id:320,
name:"Ultimate Burger Combo",
category:"Burger",
price:449,
veg:false,
bestseller:true,
rating:5.0,
image:"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
description:"Burger, fries and Coke combo."
}

],




"Chinese":[

{
id:401,
name:"Veg Hakka Noodles",
category:"Chinese",
price:179,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800",
description:"Stir-fried noodles with fresh vegetables."
},

{
id:402,
name:"Chicken Hakka Noodles",
category:"Chinese",
price:229,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
description:"Chicken noodles tossed in Chinese sauces."
},

{
id:403,
name:"Veg Fried Rice",
category:"Chinese",
price:169,
veg:true,
bestseller:true,
rating:4.5,
image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
description:"Classic vegetable fried rice."
},

{
id:404,
name:"Chicken Fried Rice",
category:"Chinese",
price:219,
veg:false,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
description:"Chicken fried rice with soy sauce."
},

{
id:405,
name:"Schezwan Noodles",
category:"Chinese",
price:199,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
description:"Spicy Schezwan noodles."
},

{
id:406,
name:"Chicken Schezwan Noodles",
category:"Chinese",
price:249,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
description:"Chicken noodles in Schezwan sauce."
},

{
id:407,
name:"Veg Manchurian",
category:"Chinese",
price:199,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1710508774177-7ac2f3492675?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2hpY2tlbiUyME1hbmNodXJpYW58ZW58MHx8MHx8fDA%3D",
description:"Veg balls in spicy Manchurian gravy."
},

{
id:408,
name:"Gobi Manchurian",
category:"Chinese",
price:189,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1658249499954-4aad343157f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fENoaWNrZW4lMjBNYW5jaHVyaWFufGVufDB8fDB8fHww",
description:"Crispy cauliflower Manchurian."
},

{
id:409,
name:"Chicken Manchurian",
category:"Chinese",
price:259,
veg:false,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1676976197902-4a01ee87cd78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fENoaWNrZW4lMjBNYW5jaHVyaWFufGVufDB8fDB8fHww",
description:"Chicken Manchurian in rich sauce."
},

{
id:410,
name:"Paneer Chilli",
category:"Chinese",
price:229,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
description:"Spicy paneer tossed with vegetables."
},

{
id:411,
name:"Chicken Chilli",
category:"Chinese",
price:279,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpY2tlbiUyMENoaWxsaXxlbnwwfHwwfHx8MA%3D%3D",
description:"Restaurant-style Chicken Chilli."
},

{
id:412,
name:"Spring Rolls",
category:"Chinese",
price:169,
veg:true,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
description:"Crispy vegetable spring rolls."
},

{
id:413,
name:"Chicken Spring Rolls",
category:"Chinese",
price:219,
veg:false,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
description:"Chicken stuffed crispy rolls."
},

{
id:414,
name:"Veg Momos",
category:"Chinese",
price:149,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1738608084602-f9543952188e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmVnJTIwTW9tb3N8ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
description:"Steamed vegetable momos."
},

{
id:415,
name:"Chicken Momos",
category:"Chinese",
price:189,
veg:false,
bestseller:true,
rating:4.8,
image:"https://plus.unsplash.com/premium_photo-1671547329182-deaf1c94263e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fENoaWNrZW4lMjBNb21vc3xlbnwwfHwwfHx8MA%3D%3D",
description:"Steamed chicken dumplings."
},

{
id:416,
name:"Dragon Chicken",
category:"Chinese",
price:299,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1621783166120-d044fe456f4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RHJhZ29uJTIwQ2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
description:"Crispy spicy Dragon Chicken."
},

{
id:417,
name:"American Chopsuey",
category:"Chinese",
price:259,
veg:true,
bestseller:false,
rating:4.6,
image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
description:"Sweet and tangy American chopsuey."
},

{
id:418,
name:"Singapore Noodles",
category:"Chinese",
price:239,
veg:false,
bestseller:false,
rating:4.5,
image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
description:"Singapore style spicy noodles."
},

{
id:419,
name:"Triple Schezwan Rice",
category:"Chinese",
price:319,
veg:false,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
description:"Rice, noodles and Manchurian combo."
},

{
id:420,
name:"Chinese Combo Meal",
category:"Chinese",
price:399,
veg:false,
bestseller:true,
rating:5.0,
image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
description:"Fried rice, noodles, Manchurian and drink."
}

],




"South Indian":[

{
id:501,
name:"Plain Dosa",
category:"South Indian",
price:79,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
description:"Traditional crispy plain dosa served with chutney & sambar."
},

{
id:502,
name:"Masala Dosa",
category:"South Indian",
price:119,
veg:true,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFzYWxhJTIwRG9zYXxlbnwwfHwwfHx8MA%3D%3D",
description:"Classic potato masala stuffed dosa."
},

{
id:503,
name:"Ghee Roast",
category:"South Indian",
price:149,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1751560455942-f859f1215826?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEdoZWUlMjBSb2FzdHxlbnwwfHwwfHx8MA%3D%3D",
description:"Extra crispy dosa roasted in pure ghee."
},

{
id:504,
name:"Onion Dosa",
category:"South Indian",
price:139,
veg:true,
bestseller:false,
rating:4.6,
image:"https://images.unsplash.com/photo-1743615467363-250466982515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fEdoZWUlMjBSb2FzdHxlbnwwfHwwfHx8MA%3D%3D",
description:"Dosa topped with fresh onions."
},

{
id:505,
name:"Mysore Masala Dosa",
category:"South Indian",
price:159,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE15c29yZSUyME1hc2FsYSUyMERvc2F8ZW58MHx8MHx8fDA%3D",
description:"Spicy Mysore chutney with potato filling."
},

{
id:506,
name:"Rava Dosa",
category:"South Indian",
price:149,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
description:"Crispy semolina dosa."
},

{
id:507,
name:"Paper Dosa",
category:"South Indian",
price:169,
veg:true,
bestseller:false,
rating:4.7,
image:"https://images.unsplash.com/photo-1743517894265-c86ab035adef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFwZXIlMjBEb3NhfGVufDB8fDB8fHww",
description:"Extra large crispy paper dosa."
},

{
id:508,
name:"Idli (2 Pcs)",
category:"South Indian",
price:69,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SWRsaXxlbnwwfHwwfHx8MA%3D%3D",
description:"Soft steamed idlis with chutney & sambar."
},

{
id:509,
name:"Medu Vada",
category:"South Indian",
price:79,
veg:true,
bestseller:true,
rating:4.6,
image:"https://images.unsplash.com/photo-1683533678033-f5d60f0a3437?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNvdXRoJTIwaW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
description:"Crispy medu vada served with chutney."
},

{
id:510,
name:"Idli Vada Combo",
category:"South Indian",
price:119,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SWRsaSUyMFZhZGElMjBDb21ib3xlbnwwfHwwfHx8MA%3D%3D",
description:"2 Idlis + 1 Medu Vada."
},

{
id:511,
name:"Pongal",
category:"South Indian",
price:109,
veg:true,
bestseller:false,
rating:4.5,
image:"https://media.istockphoto.com/id/678434780/photo/ven-pongal-traditional-indian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=qglWwS5-kOHxxQEWOoYp0MObkhgNeVxDoMrXxZiF_3Y=",
description:"Creamy ghee pongal."
},

{
id:512,
name:"Upma",
category:"South Indian",
price:89,
veg:true,
bestseller:false,
rating:4.4,
image:"https://media.istockphoto.com/id/1124391424/photo/rava-upma-uppuma-south-indian-breakfast-served-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=iRw3yr7groRyAJV7uHkgHhI1X5PhcoFoPYAcuevxgck=",
description:"Traditional rava upma."
},

{
id:513,
name:"Poori Masala",
category:"South Indian",
price:119,
veg:true,
bestseller:true,
rating:4.7,
image:"https://images.unsplash.com/photo-1596449870280-83df0de3f4fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UG9vcml8ZW58MHx8MHx8fDA%3D",
description:"Fluffy pooris with potato curry."
},

{
id:514,
name:"Uttapam",
category:"South Indian",
price:139,
veg:true,
bestseller:false,
rating:4.5,
image:"https://media.istockphoto.com/id/2012905499/photo/south-indian-food-uttapam.webp?a=1&b=1&s=612x612&w=0&k=20&c=1ty_1M4AJ1zzOoD0-aaP9N527WyVmuMdoRrfPZ9lb1o=",
description:"Vegetable uttapam with chutney."
},

{
id:515,
name:"Onion Uttapam",
category:"South Indian",
price:149,
veg:true,
bestseller:false,
rating:4.6,
image:"https://media.istockphoto.com/id/666848572/photo/south-indian-food-uttapam-or-ooththappam-or-uthappa.webp?a=1&b=1&s=612x612&w=0&k=20&c=u-oDiGrA3IDOVLyblvHyf7LqYRHpKfn0QTvgeOAaG4s=",
description:"Fresh onion uttapam."
},

{
id:516,
name:"Mini Tiffin",
category:"South Indian",
price:199,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
description:"Idli, Vada, Dosa, Pongal & Coffee."
},

{
id:517,
name:"Filter Coffee",
category:"South Indian",
price:49,
veg:true,
bestseller:true,
rating:4.8,
image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
description:"Authentic South Indian filter coffee."
},

{
id:518,
name:"Curd Rice",
category:"South Indian",
price:99,
veg:true,
bestseller:false,
rating:4.5,
image:"https://media.istockphoto.com/id/1168154867/photo/indian-curd-rice-with-carrots-pomegranate-and-with-additional-tempering-of-spices-close-up-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=Dk85jkXogUsp313-hAysEeliVA9KEG_LyJ3W1PWfuQ0=",
description:"Homestyle curd rice."
},

{
id:519,
name:"Lemon Rice",
category:"South Indian",
price:99,
veg:true,
bestseller:false,
rating:4.5,
image:"https://media.istockphoto.com/id/609913058/photo/lemon-rice-south-indian-rice-dish-with-lemon.webp?a=1&b=1&s=612x612&w=0&k=20&c=xaSqAqbf5N8gEbksZHcsZ7jLaedJ9r5PFybuU_I3Udo=",
description:"Tangy lemon flavored rice."
},

{
id:520,
name:"South Indian Meals",
category:"South Indian",
price:249,
veg:true,
bestseller:true,
rating:4.9,
image:"https://images.unsplash.com/photo-1743674453123-93356ade2891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNvdXRoJTIwSW5kaWFuJTIwTWVhbHN8ZW58MHx8MHx8fDA%3D",
description:"Complete traditional South Indian meals."
}

],



"Hyderabadi": [

    {
            id: 101,
            name: "Chicken Dum Biryani",
            category: "Biryani",
            price: 299,
            veg: false,
            bestseller: true,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800",
            description: "Traditional Hyderabadi chicken dum biryani with raita and salan."
        },

        {
            id: 102,
            name: "Mutton Dum Biryani",
            category: "Biryani",
            price: 389,
            veg: false,
            bestseller: true,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=800",
            description: "Slow-cooked mutton biryani prepared with fragrant basmati rice."
        },

        {
            id:103,
            name:"Paneer Biryani",
            category:"Biryani",
            price:229,
            veg:true,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1751618646882-4221d5e3b1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fFBhbmVlciUyMEJpcnlhbmklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
            description:"Paneer cubes cooked with aromatic spices."
        },

        {
            id:104,
            name:"Veg Dum Biryani",
            category:"Biryani",
            price:199,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1642821369314-100fece91d3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxQYW5lZXIlMjBCaXJ5YW5pJTIwaW1hZ2VzfGVufDB8fDB8fHwwoto-1589302168068-964664d93dc0?w=800",
            description:"Fresh vegetables layered with basmati rice."
        },

        {
            id:105,
            name:"Egg Biryani",
            category:"Biryani",
            price:189,
            veg:false,
            bestseller:false,
            rating:4.3,
            image:"https://images.unsplash.com/photo-1681546898018-961e2a05c6fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RWdnJTIwQmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
            description:"Boiled eggs cooked in spicy biryani masala."
        },

        {
            id:106,
            name:"Special Family Biryani",
            category:"Biryani",
            price:699,
            veg:false,
            bestseller:true,
            rating:4.9,
            image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
            description:"Serves four with chicken, mutton and kebabs."
        },

        {
            id:107,
            name:"Chicken Fry Piece Biryani",
            category:"Biryani",
            price:329,
            veg:false,
            bestseller:true,
            rating:4.7,
            image:"https://images.unsplash.com/photo-1782541370275-6761522e39d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fENoaWNrZW4lMjBGcnklMjBQaWVjZSUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Crispy fried chicken served over spicy biryani."
        },

        {
            id:108,
            name:"Boneless Chicken Biryani",
            category:"Biryani",
            price:319,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1736680056325-ba2ade6250a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEJvbmVsZXNzJTIwQ2hpY2tlbiUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Boneless chicken cooked with premium rice."
        },

        {
            id:109,
            name:"Mushroom Biryani",
            category:"Biryani",
            price:219,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1696950169706-d4533c32f81a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fE11c2hyb29tJTIwQmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
            description:"Fresh mushrooms with traditional spices."
        },

        {
            id:110,
            name:"Prawn Biryani",
            category:"Biryani",
            price:349,
            veg:false,
            bestseller:false,
            rating:4.6,
            image:"https://images.unsplash.com/photo-1562967915-6ba607ff7d05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFByYXduJTIwQmlyeWFuaSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
            description:"Juicy prawns cooked with aromatic basmati rice."
        },

        {
            id:111,
            name:"Fish Biryani",
            category:"Biryani",
            price:329,
            veg:false,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1661081090288-fd8ffc486dd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEZpc2glMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Spicy fish biryani with fresh herbs."
        },

        {
            id:112,
            name:"Kaju Biryani",
            category:"Biryani",
            price:249,
            veg:true,
            bestseller:false,
            rating:4.5,
            image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
            description:"Cashew rich dum biryani."
        },

        {
            id:113,
            name:"Chicken 65 Biryani",
            category:"Biryani",
            price:339,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1714611626323-5ba6204453be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENoaWNrZW4lMjA2NSUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Chicken 65 served over spicy dum biryani."
        },

        {
            id:114,
            name:"Keema Biryani",
            category:"Biryani",
            price:319,
            veg:false,
            bestseller:false,
            rating:4.6,
            image:"https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
            description:"Minced meat biryani."
        },

        {
            id:115,
            name:"Double Masala Biryani",
            category:"Biryani",
            price:349,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1630851840633-f96999247032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENoaWNrZW4lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Extra spicy Hyderabadi biryani."
        },

        {
            id:116,
            name:"Mini Chicken Biryani",
            category:"Biryani",
            price:169,
            veg:false,
            bestseller:false,
            rating:4.2,
            image:"https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=800",
            description:"Perfect for one person."
        },

        {
            id:117,
            name:"Veg Family Pack",
            category:"Biryani",
            price:499,
            veg:true,
            bestseller:false,
            rating:4.4,
            image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
            description:"Family pack veg biryani."
        },

        {
            id:118,
            name:"Andhra Chicken Biryani",
            category:"Biryani",
            price:309,
            veg:false,
            bestseller:true,
            rating:4.7,
            image:"https://images.unsplash.com/photo-1708184528306-f75a0a5118ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJpcnlhbml8ZW58MHx8MHx8fDA%3D",
            description:"Authentic Andhra spicy biryani."
        },

        {
            id:119,
            name:"Ulavacharu Chicken Biryani",
            category:"Biryani",
            price:359,
            veg:false,
            bestseller:true,
            rating:4.8,
            image:"https://images.unsplash.com/photo-1676436293945-a613dde9c3b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fENoaWNrZW4lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Rich Ulavacharu gravy with biryani."
        },

        {
            id:120,
            name:"Special Dum Biryani Combo",
            category:"Biryani",
            price:399,
            veg:false,
            bestseller:true,
            rating:4.9,
            image:"https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENoaWNrZW4lMjBkdW0lMjBCaXJ5YW5pfGVufDB8fDB8fHww",
            description:"Biryani, starter, drink and dessert combo."
        }

    ]



,


"Tandoori": [

    {
        id: 901,
        name: "Tandoori Chicken",
        category: "Tandoori",
        price: 299,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800",
        description: "Classic tandoori chicken marinated with yogurt and Indian spices."
    },

    {
        id: 902,
        name: "Chicken Tikka",
        category: "Tandoori",
        price: 279,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        description: "Boneless chicken cubes grilled in a traditional tandoor."
    },

    {
        id: 903,
        name: "Paneer Tikka",
        category: "Tandoori",
        price: 249,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800",
        description: "Soft paneer cubes marinated in spices and grilled."
    },

    {
        id: 904,
        name: "Malai Chicken Tikka",
        category: "Tandoori",
        price: 319,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        description: "Creamy chicken tikka with rich malai marinade."
    },

    {
        id: 905,
        name: "Hariyali Chicken Tikka",
        category: "Tandoori",
        price: 309,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
        description: "Green herb-marinated chicken grilled to perfection."
    },

    {
        id: 906,
        name: "Achari Chicken Tikka",
        category: "Tandoori",
        price: 319,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1604908176997-4319d1d0f8b4?w=800",
        description: "Tangy pickle-flavored chicken tikka."
    },

    {
        id: 907,
        name: "Fish Tikka",
        category: "Tandoori",
        price: 349,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=800",
        description: "Fresh fish marinated with spices and grilled."
    },

    {
        id: 908,
        name: "Tandoori Prawns",
        category: "Tandoori",
        price: 399,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        description: "Juicy prawns roasted in a traditional clay oven."
    },

    {
        id: 909,
        name: "Mushroom Tikka",
        category: "Tandoori",
        price: 229,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        description: "Fresh mushrooms grilled with aromatic spices."
    },

    {
        id: 910,
        name: "Tandoori Broccoli",
        category: "Tandoori",
        price: 219,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Healthy broccoli florets roasted in a tandoor."
    },

    {
        id: 911,
        name: "Tandoori Gobi",
        category: "Tandoori",
        price: 199,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800",
        description: "Spiced cauliflower grilled until crispy."
    },

    {
        id: 912,
        name: "Chicken Seekh Kebab",
        category: "Tandoori",
        price: 279,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800",
        description: "Minced chicken skewers cooked over charcoal."
    },

    {
        id: 913,
        name: "Mutton Seekh Kebab",
        category: "Tandoori",
        price: 329,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        description: "Juicy minced mutton kebabs grilled in tandoor."
    },

    {
        id: 914,
        name: "Reshmi Kebab",
        category: "Tandoori",
        price: 329,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        description: "Creamy and tender chicken reshmi kebabs."
    },

    {
        id: 915,
        name: "Tangdi Kebab",
        category: "Tandoori",
        price: 299,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800",
        description: "Marinated chicken drumsticks roasted in clay oven."
    },

    {
        id: 916,
        name: "Afghani Chicken",
        category: "Tandoori",
        price: 339,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1604908176997-4319d1d0f8b4?w=800",
        description: "Creamy Afghani-style grilled chicken."
    },

    {
        id: 917,
        name: "Chicken Malai Kebab",
        category: "Tandoori",
        price: 319,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        description: "Tender chicken kebabs in rich malai marinade."
    },

    {
        id: 918,
        name: "Hara Bhara Kebab",
        category: "Tandoori",
        price: 199,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
        description: "Spinach and green pea kebabs grilled to perfection."
    },

    {
        id: 919,
        name: "Mixed Grill Platter",
        category: "Tandoori",
        price: 599,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800",
        description: "A delicious platter of assorted tandoori delights."
    },

    {
        id: 920,
        name: "Tandoori Platter",
        category: "Tandoori",
        price: 699,
        veg: false,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        description: "Premium tandoori platter with chicken, fish, prawns and kebabs."
    }

],



"BBQ & Grill": [

    {
        id: 921,
        name: "BBQ Chicken",
        category: "BBQ & Grill",
        price: 299,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800",
        description: "Juicy grilled chicken glazed with smoky BBQ sauce."
    },

    {
        id: 922,
        name: "Grilled Chicken Breast",
        category: "BBQ & Grill",
        price: 329,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800",
        description: "Tender grilled chicken breast served with herbs."
    },

    {
        id: 923,
        name: "BBQ Chicken Wings",
        category: "BBQ & Grill",
        price: 279,
        veg: false,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
        description: "Crispy chicken wings tossed in smoky BBQ sauce."
    },

    {
        id: 924,
        name: "Peri Peri Chicken",
        category: "BBQ & Grill",
        price: 339,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        description: "Spicy peri peri grilled chicken with signature seasoning."
    },

    {
        id: 925,
        name: "Grilled Fish",
        category: "BBQ & Grill",
        price: 389,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
        description: "Fresh fish fillet grilled with lemon butter."
    },

    {
        id: 926,
        name: "Grilled Prawns",
        category: "BBQ & Grill",
        price: 449,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800",
        description: "Juicy prawns grilled with garlic herbs."
    },

    {
        id: 927,
        name: "BBQ Lamb Chops",
        category: "BBQ & Grill",
        price: 549,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        description: "Tender lamb chops grilled over charcoal."
    },

    {
        id: 928,
        name: "Chicken Skewers",
        category: "BBQ & Grill",
        price: 299,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
        description: "Chicken cubes grilled on skewers with vegetables."
    },

    {
        id: 929,
        name: "BBQ Paneer",
        category: "BBQ & Grill",
        price: 249,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800",
        description: "Grilled paneer cubes coated with BBQ spices."
    },

    {
        id: 930,
        name: "Grilled Mushroom",
        category: "BBQ & Grill",
        price: 229,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        description: "Fresh mushrooms grilled with herbs and spices."
    },

    {
        id: 931,
        name: "Grilled Corn",
        category: "BBQ & Grill",
        price: 149,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800",
        description: "Sweet corn grilled with butter and spices."
    },

    {
        id: 932,
        name: "BBQ Veg Skewers",
        category: "BBQ & Grill",
        price: 199,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Mixed vegetables grilled on skewers."
    },

    {
        id: 933,
        name: "Grilled Sausages",
        category: "BBQ & Grill",
        price: 279,
        veg: false,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800",
        description: "Smoky grilled chicken sausages."
    },

    {
        id: 934,
        name: "Peri Peri Wings",
        category: "BBQ & Grill",
        price: 289,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800",
        description: "Chicken wings tossed in spicy peri peri seasoning."
    },

    {
        id: 935,
        name: "Smoked Chicken",
        category: "BBQ & Grill",
        price: 359,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        description: "Slow-smoked chicken with BBQ glaze."
    },

    {
        id: 936,
        name: "Grilled Veg Platter",
        category: "BBQ & Grill",
        price: 299,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
        description: "Assorted grilled vegetables with herb seasoning."
    },

    {
        id: 937,
        name: "Chicken Grill Platter",
        category: "BBQ & Grill",
        price: 499,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800",
        description: "A platter of grilled chicken, wings and skewers."
    },

    {
        id: 938,
        name: "Mixed BBQ Platter",
        category: "BBQ & Grill",
        price: 649,
        veg: false,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        description: "Ultimate BBQ platter with chicken, fish, prawns and lamb."
    },

    {
        id: 939,
        name: "BBQ Chicken Leg",
        category: "BBQ & Grill",
        price: 249,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        description: "Charcoal grilled chicken leg with BBQ seasoning."
    },

    {
        id: 940,
        name: "Garlic Butter Grilled Fish",
        category: "BBQ & Grill",
        price: 429,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
        description: "Fresh grilled fish topped with garlic butter and herbs."
    }

],







"Momos": [

    {
        id: 941,
        name: "Veg Steam Momos",
        category: "Momos",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "...",
        description: "..."
    },

    

],



"Rolls & Wraps": [

    {
        id: 961,
        name: "Chicken Kathi Roll",
        category: "Rolls & Wraps",
        price: 199,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        description: "Soft paratha stuffed with spicy chicken and fresh vegetables."
    },

    {
        id: 962,
        name: "Paneer Kathi Roll",
        category: "Rolls & Wraps",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Grilled paneer wrapped in a soft paratha with sauces."
    },

    {
        id: 963,
        name: "Egg Roll",
        category: "Rolls & Wraps",
        price: 149,
        veg: false,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
        description: "Classic Kolkata-style egg roll with onions and spices."
    },

    {
        id: 964,
        name: "Double Egg Roll",
        category: "Rolls & Wraps",
        price: 179,
        veg: false,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800",
        description: "Double egg roll loaded with vegetables and sauces."
    },

    {
        id: 965,
        name: "Veg Roll",
        category: "Rolls & Wraps",
        price: 139,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
        description: "Mixed vegetable roll with spicy chutney."
    },

    {
        id: 966,
        name: "Chicken Shawarma",
        category: "Rolls & Wraps",
        price: 219,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
        description: "Arabic-style chicken shawarma with garlic mayonnaise."
    },

    {
        id: 967,
        name: "Paneer Shawarma",
        category: "Rolls & Wraps",
        price: 199,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        description: "Paneer shawarma with fresh vegetables and creamy sauce."
    },

    {
        id: 968,
        name: "Chicken Tikka Wrap",
        category: "Rolls & Wraps",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        description: "Grilled chicken tikka wrapped in soft tortilla."
    },

    {
        id: 969,
        name: "Paneer Tikka Wrap",
        category: "Rolls & Wraps",
        price: 209,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800",
        description: "Paneer tikka wrapped with crunchy veggies."
    },

    {
        id: 970,
        name: "BBQ Chicken Wrap",
        category: "Rolls & Wraps",
        price: 239,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800",
        description: "BBQ chicken wrapped with lettuce and cheese."
    },

    {
        id: 971,
        name: "Mexican Veg Wrap",
        category: "Rolls & Wraps",
        price: 189,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Mexican-style wrap with beans, corn and cheese."
    },

    {
        id: 972,
        name: "Peri Peri Chicken Roll",
        category: "Rolls & Wraps",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        description: "Spicy peri peri chicken wrapped in soft tortilla."
    },

    {
        id: 973,
        name: "Cheese Corn Roll",
        category: "Rolls & Wraps",
        price: 169,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
        description: "Sweet corn and cheese stuffed roll."
    },

    {
        id: 974,
        name: "Mushroom Wrap",
        category: "Rolls & Wraps",
        price: 189,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        description: "Grilled mushrooms wrapped with fresh vegetables."
    },

    {
        id: 975,
        name: "Chicken Cheese Roll",
        category: "Rolls & Wraps",
        price: 239,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        description: "Loaded chicken roll with melted cheese."
    },

    {
        id: 976,
        name: "Falafel Wrap",
        category: "Rolls & Wraps",
        price: 199,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        description: "Middle Eastern falafel wrap with hummus."
    },

    {
        id: 977,
        name: "Grilled Veg Wrap",
        category: "Rolls & Wraps",
        price: 179,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Healthy grilled vegetable wrap."
    },

    {
        id: 978,
        name: "Chicken Seekh Roll",
        category: "Rolls & Wraps",
        price: 249,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800",
        description: "Chicken seekh kebab rolled with mint mayo."
    },

    {
        id: 979,
        name: "Spicy Mayo Chicken Wrap",
        category: "Rolls & Wraps",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        description: "Chicken wrap with spicy mayo and fresh veggies."
    },

    {
        id: 980,
        name: "Supreme Chicken Wrap",
        category: "Rolls & Wraps",
        price: 269,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
        description: "Premium wrap loaded with grilled chicken, cheese and special sauce."
    }

],







"Pasta": [

    {
        id: 981,
        name: "White Sauce Pasta",
        category: "Pasta",
        price: 229,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800",
        description: "Creamy white sauce pasta with herbs and parmesan cheese."
    },

    {
        id: 982,
        name: "Red Sauce Pasta",
        category: "Pasta",
        price: 219,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        description: "Penne pasta tossed in rich tomato basil sauce."
    },

    {
        id: 983,
        name: "Pink Sauce Pasta",
        category: "Pasta",
        price: 239,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800",
        description: "Creamy blend of white and red sauce with fresh herbs."
    },

    {
        id: 984,
        name: "Chicken Alfredo Pasta",
        category: "Pasta",
        price: 299,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
        description: "Grilled chicken served with creamy Alfredo pasta."
    },

    {
        id: 985,
        name: "Arrabbiata Pasta",
        category: "Pasta",
        price: 249,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800",
        description: "Spicy Italian pasta cooked in garlic tomato sauce."
    },

    {
        id: 986,
        name: "Mac & Cheese",
        category: "Pasta",
        price: 259,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800",
        description: "Creamy macaroni loaded with melted cheese."
    },

    {
        id: 987,
        name: "Veg Penne Pasta",
        category: "Pasta",
        price: 229,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        description: "Penne pasta with fresh vegetables and herbs."
    },

    {
        id: 988,
        name: "Chicken Penne Pasta",
        category: "Pasta",
        price: 289,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
        description: "Tender chicken tossed with penne pasta in creamy sauce."
    },

    {
        id: 989,
        name: "Cheesy Mushroom Pasta",
        category: "Pasta",
        price: 249,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        description: "Mushroom pasta topped with mozzarella cheese."
    },

    {
        id: 990,
        name: "Peri Peri Pasta",
        category: "Pasta",
        price: 269,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800",
        description: "Creamy pasta tossed with spicy peri peri seasoning."
    },






     {
        id: 991,
        name: "Spaghetti Bolognese",
        category: "Pasta",
        price: 319,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800",
        description: "Classic Italian spaghetti served with rich chicken bolognese sauce."
    },

    {
        id: 992,
        name: "Spaghetti Aglio e Olio",
        category: "Pasta",
        price: 239,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
        description: "Spaghetti tossed with garlic, olive oil, herbs and chili flakes."
    },

    {
        id: 993,
        name: "Pesto Pasta",
        category: "Pasta",
        price: 269,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800",
        description: "Italian basil pesto pasta with parmesan cheese."
    },

    {
        id: 994,
        name: "Lasagna",
        category: "Pasta",
        price: 329,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=800",
        description: "Layers of pasta, chicken, cheese and creamy tomato sauce."
    },

    {
        id: 995,
        name: "Creamy Corn Pasta",
        category: "Pasta",
        price: 249,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800",
        description: "Creamy white sauce pasta with sweet corn and herbs."
    },

    {
        id: 996,
        name: "Cheese Burst Pasta",
        category: "Pasta",
        price: 289,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800",
        description: "Loaded with mozzarella, cheddar and parmesan cheese."
    },

    {
        id: 997,
        name: "Garlic Butter Pasta",
        category: "Pasta",
        price: 229,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        description: "Pasta tossed in rich garlic butter and Italian herbs."
    },

    {
        id: 998,
        name: "Chicken Mushroom Pasta",
        category: "Pasta",
        price: 309,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
        description: "Creamy pasta with grilled chicken and sautÃ©ed mushrooms."
    },

    {
        id: 999,
        name: "Seafood Pasta",
        category: "Pasta",
        price: 379,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800",
        description: "Italian pasta loaded with prawns, fish and seafood in rich sauce."
    },

    {
        id: 1000,
        name: "Ultimate Italian Pasta Platter",
        category: "Pasta",
        price: 499,
        veg: false,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800",
        description: "A premium platter featuring Alfredo, Arrabbiata, Pesto and Garlic Butter pasta served together."
    }

],   

"Sandwiches": [

    {
        id: 1001,
        name: "Veg Sandwich",
        category: "Sandwiches",
        price: 119,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
        description: "Fresh vegetable sandwich with cucumber, tomato, onion and mint chutney."
    },

    {
        id: 1002,
        name: "Grilled Veg Sandwich",
        category: "Sandwiches",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800",
        description: "Grilled sandwich loaded with vegetables and cheese."
    },

    {
        id: 1003,
        name: "Cheese Sandwich",
        category: "Sandwiches",
        price: 159,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800",
        description: "Toasted sandwich filled with melted mozzarella cheese."
    },

    {
        id: 1004,
        name: "Paneer Sandwich",
        category: "Sandwiches",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=800",
        description: "Grilled paneer cubes with vegetables and spicy mayo."
    },

    {
        id: 1005,
        name: "Corn Cheese Sandwich",
        category: "Sandwiches",
        price: 169,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
        description: "Sweet corn mixed with cheese served in toasted bread."
    },

    {
        id: 1006,
        name: "Chicken Sandwich",
        category: "Sandwiches",
        price: 199,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800",
        description: "Grilled chicken breast with lettuce, tomato and mayonnaise."
    },

    {
        id: 1007,
        name: "Club Sandwich",
        category: "Sandwiches",
        price: 249,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=800",
        description: "Triple-layer sandwich with chicken, egg, vegetables and cheese."
    },

    {
        id: 1008,
        name: "Egg Sandwich",
        category: "Sandwiches",
        price: 159,
        veg: false,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
        description: "Boiled egg sandwich with butter and pepper seasoning."
    },

    {
        id: 1009,
        name: "BBQ Chicken Sandwich",
        category: "Sandwiches",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800",
        description: "BBQ grilled chicken with cheese and smoky sauce."
    },

    {
        id: 1010,
        name: "Tuna Sandwich",
        category: "Sandwiches",
        price: 249,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800",
        description: "Fresh tuna mixed with herbs and creamy mayo in toasted bread."
    },



    {
        id: 1011,
        name: "Mushroom Sandwich",
        category: "Sandwiches",
        price: 179,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
        description: "SautÃ©ed mushrooms, cheese and herbs served in toasted bread."
    },

    {
        id: 1012,
        name: "Mexican Sandwich",
        category: "Sandwiches",
        price: 189,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
        description: "Loaded with Mexican beans, corn, cheese and spicy salsa."
    },

    {
        id: 1013,
        name: "Aloo Sandwich",
        category: "Sandwiches",
        price: 129,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800",
        description: "Spiced mashed potato filling grilled to perfection."
    },

    {
        id: 1014,
        name: "Garlic Cheese Sandwich",
        category: "Sandwiches",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800",
        description: "Crispy toasted bread filled with garlic butter and melted cheese."
    },

    {
        id: 1015,
        name: "Veg Mayo Sandwich",
        category: "Sandwiches",
        price: 159,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
        description: "Fresh vegetables mixed with creamy mayonnaise."
    },

    {
        id: 1016,
        name: "Chicken Mayo Sandwich",
        category: "Sandwiches",
        price: 219,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800",
        description: "Tender chicken tossed in creamy mayonnaise and herbs."
    },

    {
        id: 1017,
        name: "Peri Peri Sandwich",
        category: "Sandwiches",
        price: 199,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=800",
        description: "Grilled chicken with spicy peri peri sauce and cheese."
    },

    {
        id: 1018,
        name: "Triple Layer Sandwich",
        category: "Sandwiches",
        price: 259,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800",
        description: "Three layers of chicken, cheese, vegetables and signature sauce."
    },

    {
        id: 1019,
        name: "Toast Sandwich",
        category: "Sandwiches",
        price: 119,
        veg: true,
        bestseller: false,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
        description: "Simple butter toast sandwich with fresh vegetables."
    },

    {
        id: 1020,
        name: "Chocolate Sandwich",
        category: "Sandwiches",
        price: 169,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
        description: "Grilled sandwich filled with rich chocolate and creamy spread."
    }

],







"Fast Food": [

    {
        id: 1021,
        name: "French Fries",
        category: "Fast Food",
        price: 129,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
        description: "Golden crispy French fries served with tomato ketchup."
    },

    {
        id: 1022,
        name: "Peri Peri Fries",
        category: "Fast Food",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800",
        description: "Crispy fries tossed with spicy peri peri seasoning."
    },

    {
        id: 1023,
        name: "Cheese Fries",
        category: "Fast Food",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800",
        description: "French fries topped with creamy melted cheese."
    },

    {
        id: 1024,
        name: "Loaded Fries",
        category: "Fast Food",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800",
        description: "Loaded fries with chicken, cheese, jalapeÃ±os and sauces."
    },

    {
        id: 1025,
        name: "Chicken Nuggets",
        category: "Fast Food",
        price: 199,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800",
        description: "Crunchy chicken nuggets served with spicy dip."
    },

    {
        id: 1026,
        name: "Popcorn Chicken",
        category: "Fast Food",
        price: 219,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606755962773-0bb7f0f54f26?w=800",
        description: "Bite-sized crispy chicken popcorn with seasoning."
    },

    {
        id: 1027,
        name: "Onion Rings",
        category: "Fast Food",
        price: 149,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800",
        description: "Crunchy golden onion rings served with mayo."
    },

    {
        id: 1028,
        name: "Garlic Bread",
        category: "Fast Food",
        price: 139,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
        description: "Freshly baked garlic bread with butter and herbs."
    },

    {
        id: 1029,
        name: "Cheese Garlic Bread",
        category: "Fast Food",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800",
        description: "Garlic bread loaded with mozzarella cheese."
    },

    {
        id: 1030,
        name: "Hot Dog",
        category: "Fast Food",
        price: 199,
        veg: false,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1612392062798-3d363e4d4d8d?w=800",
        description: "Classic hot dog with grilled sausage, lettuce and sauces."
    },











    {
        id: 1031,
        name: "Corn Dog",
        category: "Fast Food",
        price: 189,
        veg: false,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08d?w=800",
        description: "Crispy corn-coated chicken sausage served with mustard sauce."
    },

    {
        id: 1032,
        name: "Chicken Fingers",
        category: "Fast Food",
        price: 229,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800",
        description: "Golden crispy chicken strips served with spicy garlic dip."
    },

    {
        id: 1033,
        name: "Veg Fingers",
        category: "Fast Food",
        price: 169,
        veg: true,
        bestseller: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800",
        description: "Crunchy vegetable fingers made with fresh vegetables."
    },

    {
        id: 1034,
        name: "Mozzarella Sticks",
        category: "Fast Food",
        price: 219,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800",
        description: "Crispy mozzarella cheese sticks with marinara sauce."
    },

    {
        id: 1035,
        name: "Potato Wedges",
        category: "Fast Food",
        price: 159,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800",
        description: "Seasoned potato wedges baked until golden brown."
    },

    {
        id: 1036,
        name: "Nachos",
        category: "Fast Food",
        price: 189,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800",
        description: "Crunchy tortilla chips served with salsa and cheese dip."
    },

    {
        id: 1037,
        name: "Cheese Nachos",
        category: "Fast Food",
        price: 229,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800",
        description: "Nachos topped with melted cheese, jalapeÃ±os and salsa."
    },

    {
        id: 1038,
        name: "Chilli Cheese Toast",
        category: "Fast Food",
        price: 199,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800",
        description: "Toasted bread topped with cheese, chilli flakes and herbs."
    },

    {
        id: 1039,
        name: "Chicken Pops",
        category: "Fast Food",
        price: 219,
        veg: false,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606755962773-0bb7f0f54f26?w=800",
        description: "Crispy bite-sized chicken pops with spicy seasoning."
    },

    {
        id: 1040,
        name: "Crispy Chicken Bucket",
        category: "Fast Food",
        price: 499,
        veg: false,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800",
        description: "Bucket of crispy fried chicken served with fries, dips and soft drink."
    }

],







"Ice Cream": [

    {
        id: 1081,
        name: "Vanilla Ice Cream",
        category: "Ice Cream",
        price: 99,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        description: "Classic creamy vanilla ice cream made with premium milk."
    },

    {
        id: 1082,
        name: "Chocolate Ice Cream",
        category: "Ice Cream",
        price: 119,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
        description: "Rich chocolate ice cream topped with chocolate chips."
    },

    {
        id: 1083,
        name: "Strawberry Ice Cream",
        category: "Ice Cream",
        price: 109,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800",
        description: "Fresh strawberry flavored ice cream with fruit pieces."
    },

    {
        id: 1084,
        name: "Butterscotch Ice Cream",
        category: "Ice Cream",
        price: 119,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
        description: "Creamy butterscotch ice cream with crunchy caramel bits."
    },

    {
        id: 1085,
        name: "Mango Ice Cream",
        category: "Ice Cream",
        price: 119,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579462107238-0ff854b04810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE1hbmdvJTIwSWNlJTIwQ3JlYW18ZW58MHx8MHx8fDA%3D",
        description: "Refreshing mango ice cream made with real mango pulp."
    },

    {
        id: 1086,
        name: "Black Currant Ice Cream",
        category: "Ice Cream",
        price: 129,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=800",
        description: "Creamy black currant ice cream with berry swirls."
    },

    {
        id: 1087,
        name: "Pistachio Ice Cream",
        category: "Ice Cream",
        price: 139,
        veg: true,
        bestseller: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800",
        description: "Premium pistachio ice cream topped with roasted nuts."
    },

    {
        id: 1088,
        name: "Kesar Pista Ice Cream",
        category: "Ice Cream",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://media.istockphoto.com/id/812704178/photo/pistachio-ice-creams-on-blue-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=BPMhntgtNyu4VV0vhLy5SCx_ByR6c9Z0Qvr2XyLOa_g=",
        description: "Traditional saffron and pistachio flavored ice cream."
    },

    {
        id: 1089,
        name: "Chocolate Chip Ice Cream",
        category: "Ice Cream",
        price: 129,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1686948927872-af1042ff16dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENob2NvbGF0ZSUyMENoaXAlMjBJY2UlMjBDcmVhbXxlbnwwfHwwfHx8MA%3D%3D",
        description: "Smooth vanilla ice cream loaded with chocolate chips."
    },

    {
        id: 1090,
        name: "Coffee Ice Cream",
        category: "Ice Cream",
        price: 139,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://plus.unsplash.com/premium_photo-1675279010961-8a6679ff03da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fEljZSUyMENyZWFtfGVufDB8fDB8fHww",
        description: "Creamy coffee-flavored ice cream with roasted coffee aroma."
    },








    {
        id: 1091,
        name: "Oreo Ice Cream",
        category: "Ice Cream",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1771209188277-67c33def9201?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE9yZW8lMjBJY2UlMjBDcmVhbXxlbnwwfHwwfHx8MA%3D%3D",
        description: "Creamy vanilla ice cream loaded with crunchy Oreo cookie pieces."
    },

    {
        id: 1092,
        name: "Brownie Sundae",
        category: "Ice Cream",
        price: 199,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJvd25pZSUyMFN1bmRhZXxlbnwwfHwwfHx8MA%3D%3D",
        description: "Warm chocolate brownie served with vanilla ice cream and chocolate sauce."
    },

    {
        id: 1093,
        name: "Chocolate Fudge Sundae",
        category: "Ice Cream",
        price: 219,
        veg: true,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1635491231222-8e524584da52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2hvY29sYXRlJTIwRnVkZ2UlMjBTdW5kYWV8ZW58MHx8MHx8fDA%3D",
        description: "Rich chocolate ice cream topped with hot fudge, whipped cream and nuts."
    },

    {
        id: 1094,
        name: "Fruit Sundae",
        category: "Ice Cream",
        price: 189,
        veg: true,
        bestseller: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800",
        description: "Vanilla ice cream topped with seasonal fresh fruits and fruit syrup."
    },

    {
        id: 1095,
        name: "Belgian Chocolate Ice Cream",
        category: "Ice Cream",
        price: 169,
        veg: true,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
        description: "Premium Belgian chocolate ice cream with rich cocoa flavor."
    },

    {
        id: 1096,
        name: "Bubblegum Ice Cream",
        category: "Ice Cream",
        price: 129,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800",
        description: "Colorful bubblegum flavored ice cream loved by kids."
    },

    {
        id: 1097,
        name: "Cotton Candy Ice Cream",
        category: "Ice Cream",
        price: 139,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=800",
        description: "Sweet cotton candy flavored ice cream with colorful sprinkles."
    },

    {
        id: 1098,
        name: "Kulfi Ice Cream",
        category: "Ice Cream",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        description: "Traditional Indian kulfi flavored with cardamom, saffron and pistachios."
    },

    {
        id: 1099,
        name: "Cassata Ice Cream",
        category: "Ice Cream",
        price: 159,
        veg: true,
        bestseller: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1590080962330-747c6aba8028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fEljZSUyMENyZWFtfGVufDB8fDB8fHww",
        description: "Classic layered cassata ice cream with nuts and candied fruits."
    },

    {
        id: 1100,
        name: "Premium Family Ice Cream Tub",
        category: "Ice Cream",
        price: 399,
        veg: true,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        description: "Large family pack featuring assorted premium ice cream flavors."
    }

],





"Bakery": [

    {
        id: 1101,
        name: "Chocolate Cake",
        category: "Bakery",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
        description: "Soft and moist chocolate cake topped with rich chocolate frosting."
    },

    {
        id: 1102,
        name: "Black Forest Cake",
        category: "Bakery",
        price: 169,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
        description: "Classic Black Forest cake layered with whipped cream and cherries."
    },

    {
        id: 1103,
        name: "Red Velvet Cake",
        category: "Bakery",
        price: 189,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800",
        description: "Soft red velvet sponge with delicious cream cheese frosting."
    },

    {
        id: 1104,
        name: "Vanilla Cake",
        category: "Bakery",
        price: 139,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
        description: "Classic vanilla sponge cake with creamy vanilla icing."
    },

    {
        id: 1105,
        name: "Pineapple Cake",
        category: "Bakery",
        price: 159,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800",
        description: "Fresh pineapple cake layered with whipped cream."
    },

    {
        id: 1106,
        name: "Chocolate Brownie",
        category: "Bakery",
        price: 119,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
        description: "Rich fudgy brownie loaded with premium chocolate."
    },

    {
        id: 1107,
        name: "Chocolate Muffin",
        category: "Bakery",
        price: 89,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800",
        description: "Soft chocolate muffin with gooey chocolate chips."
    },

    {
        id: 1108,
        name: "Blueberry Muffin",
        category: "Bakery",
        price: 99,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
        description: "Fresh blueberry muffin baked to perfection."
    },

    {
        id: 1109,
        name: "Chocolate Donut",
        category: "Bakery",
        price: 79,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
        description: "Soft donut coated with rich chocolate glaze."
    },

    {
        id: 1110,
        name: "Strawberry Donut",
        category: "Bakery",
        price: 79,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
        description: "Fresh donut topped with sweet strawberry glaze."
    },



],



"Beverages": [

    {
        id: 1121,
        name: "Mineral Water",
        category: "Beverages",
        price: 30,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1564419320408-38e24e038739?w=800",
        description: "500ml chilled mineral water."
    },

    {
        id: 1122,
        name: "Coca-Cola",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
        description: "Refreshing chilled Coca-Cola soft drink."
    },

    {
        id: 1123,
        name: "Pepsi",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=800",
        description: "Classic Pepsi served ice cold."
    },

    {
        id: 1124,
        name: "Sprite",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800",
        description: "Refreshing lemon-lime flavored soft drink."
    },

    {
        id: 1125,
        name: "Thumbs Up",
        category: "Beverages",
        price: 55,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800",
        description: "Strong cola drink served chilled."
    },

    {
        id: 1126,
        name: "Fresh Lime Soda",
        category: "Beverages",
        price: 79,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
        description: "Fresh lime soda available in sweet or salted."
    },

    {
        id: 1127,
        name: "Fresh Orange Juice",
        category: "Beverages",
        price: 129,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=800",
        description: "Freshly squeezed orange juice with no added sugar."
    },

    {
        id: 1128,
        name: "Watermelon Juice",
        category: "Beverages",
        price: 119,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
        description: "Refreshing watermelon juice served chilled."
    },

    {
        id: 1129,
        name: "Mango Shake",
        category: "Beverages",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800",
        description: "Creamy mango milkshake made with fresh mangoes."
    },

    {
        id: 1130,
        name: "Chocolate Milkshake",
        category: "Beverages",
        price: 159,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
        description: "Rich chocolate milkshake topped with whipped cream."
    },



],



"Beverages": [

    {
        id: 1121,
        name: "Mineral Water",
        category: "Beverages",
        price: 30,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1564419320408-38e24e038739?w=800",
        description: "500ml chilled mineral water."
    },

    {
        id: 1122,
        name: "Coca-Cola",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
        description: "Refreshing chilled Coca-Cola soft drink."
    },

    {
        id: 1123,
        name: "Pepsi",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=800",
        description: "Classic Pepsi served ice cold."
    },

    {
        id: 1124,
        name: "Sprite",
        category: "Beverages",
        price: 50,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800",
        description: "Refreshing lemon-lime flavored soft drink."
    },

    {
        id: 1125,
        name: "Thumbs Up",
        category: "Beverages",
        price: 55,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800",
        description: "Strong cola drink served chilled."
    },

    {
        id: 1126,
        name: "Fresh Lime Soda",
        category: "Beverages",
        price: 79,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
        description: "Fresh lime soda available in sweet or salted."
    },

    {
        id: 1127,
        name: "Fresh Orange Juice",
        category: "Beverages",
        price: 129,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=800",
        description: "Freshly squeezed orange juice with no added sugar."
    },

    {
        id: 1128,
        name: "Watermelon Juice",
        category: "Beverages",
        price: 119,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
        description: "Refreshing watermelon juice served chilled."
    },

    {
        id: 1129,
        name: "Mango Shake",
        category: "Beverages",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800",
        description: "Creamy mango milkshake made with fresh mangoes."
    },

    {
        id: 1130,
        name: "Chocolate Milkshake",
        category: "Beverages",
        price: 159,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
        description: "Rich chocolate milkshake topped with whipped cream."
    },









        {
        id: 1131,
        name: "Vanilla Milkshake",
        category: "Beverages",
        price: 149,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
        description: "Creamy vanilla milkshake topped with whipped cream."
    },

    {
        id: 1132,
        name: "Strawberry Milkshake",
        category: "Beverages",
        price: 159,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553530666-ba11a90bb918?w=800",
        description: "Fresh strawberry milkshake blended with premium ice cream."
    },

    {
        id: 1133,
        name: "Cold Coffee",
        category: "Beverages",
        price: 139,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800",
        description: "Chilled cold coffee blended with milk and ice cream."
    },

    {
        id: 1134,
        name: "Cappuccino",
        category: "Beverages",
        price: 149,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
        description: "Freshly brewed cappuccino topped with rich milk foam."
    },

    {
        id: 1135,
        name: "Cafe Latte",
        category: "Beverages",
        price: 159,
        veg: true,
        bestseller: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        description: "Smooth espresso mixed with steamed milk."
    },

    {
        id: 1136,
        name: "Green Tea",
        category: "Beverages",
        price: 99,
        veg: true,
        bestseller: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        description: "Refreshing green tea packed with natural antioxidants."
    },

    {
        id: 1137,
        name: "Masala Chai",
        category: "Beverages",
        price: 59,
        veg: true,
        bestseller: true,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        description: "Traditional Indian masala tea brewed with aromatic spices."
    },

    {
        id: 1138,
        name: "Hot Chocolate",
        category: "Beverages",
        price: 169,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800",
        description: "Rich and creamy hot chocolate topped with marshmallows."
    },

    {
        id: 1139,
        name: "Oreo Shake",
        category: "Beverages",
        price: 179,
        veg: true,
        bestseller: true,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1553530666-ba11a90bb918?w=800",
        description: "Thick Oreo cookie milkshake topped with whipped cream and cookie crumbs."
    },

    {
        id: 1140,
        name: "Premium Signature Mocktail",
        category: "Beverages",
        price: 249,
        veg: true,
        bestseller: true,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
        description: "A refreshing premium mocktail made with mixed fruit juices, mint, citrus, and sparkling soda. Perfect to complement any meal."
    }

],





"Tandoori": [

{
    id: 901,
    name: "Chicken Tandoori",
    category: "Tandoori",
    price: 349,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?chicken+tandoori",
    description: "Classic tandoori chicken marinated with yogurt and Indian spices."
},
{
    id: 902,
    name: "Half Chicken Tandoori",
    category: "Tandoori",
    price: 229,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "https://source.unsplash.com/600x400/?half+tandoori+chicken",
    description: "Half portion of juicy roasted tandoori chicken."
},
{
    id: 903,
    name: "Paneer Tikka",
    category: "Tandoori",
    price: 279,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "https://source.unsplash.com/600x400/?paneer+tikka",
    description: "Soft paneer cubes grilled with capsicum and onion."
},
{
    id: 904,
    name: "Hariyali Chicken Tikka",
    category: "Tandoori",
    price: 329,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "https://source.unsplash.com/600x400/?hariyali+chicken+tikka",
    description: "Chicken tikka marinated in mint and coriander."
},
{
    id: 905,
    name: "Malai Chicken Tikka",
    category: "Tandoori",
    price: 339,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?malai+chicken+tikka",
    description: "Creamy chicken tikka cooked in tandoor."
},
{
    id: 906,
    name: "Achari Chicken Tikka",
    category: "Tandoori",
    price: 329,
    veg: false,
    bestseller: false,
    rating: 4.5,
    image: "https://source.unsplash.com/600x400/?achari+chicken",
    description: "Chicken tikka flavored with pickle spices."
},
{
    id: 907,
    name: "Tangdi Kebab",
    category: "Tandoori",
    price: 349,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?tangdi+kebab",
    description: "Juicy chicken leg pieces roasted in clay oven."
},
{
    id: 908,
    name: "Chicken Seekh Kebab",
    category: "Tandoori",
    price: 319,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "https://source.unsplash.com/600x400/?seekh+kebab",
    description: "Minced chicken kebabs grilled to perfection."
},
{
    id: 909,
    name: "Mutton Seekh Kebab",
    category: "Tandoori",
    price: 389,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://source.unsplash.com/600x400/?mutton+seekh+kebab",
    description: "Spicy minced mutton kebabs cooked in tandoor."
},
{
    id: 910,
    name: "Fish Tikka",
    category: "Tandoori",
    price: 379,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "https://source.unsplash.com/600x400/?fish+tikka",
    description: "Fresh fish cubes marinated and grilled."
},
{
    id: 911,
    name: "Prawn Tandoori",
    category: "Tandoori",
    price: 449,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?tandoori+prawns",
    description: "Tiger prawns marinated and roasted in tandoor."
},
{
    id: 912,
    name: "Tandoori Mushroom",
    category: "Tandoori",
    price: 259,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "https://source.unsplash.com/600x400/?grilled+mushroom",
    description: "Mushrooms marinated with Indian spices."
},
{
    id: 913,
    name: "Tandoori Broccoli",
    category: "Tandoori",
    price: 249,
    veg: true,
    bestseller: false,
    rating: 4.4,
    image: "https://source.unsplash.com/600x400/?grilled+broccoli",
    description: "Char-grilled broccoli with creamy marinade."
},
{
    id: 914,
    name: "Veg Seekh Kebab",
    category: "Tandoori",
    price: 239,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "https://source.unsplash.com/600x400/?veg+seekh+kebab",
    description: "Vegetable kebabs grilled in traditional tandoor."
},
{
    id: 915,
    name: "Tandoori Soya Chaap",
    category: "Tandoori",
    price: 269,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "https://source.unsplash.com/600x400/?soya+chaap",
    description: "Smoky soya chaap marinated with rich spices."
},
{
    id: 916,
    name: "Chicken Reshmi Kebab",
    category: "Tandoori",
    price: 339,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?reshmi+kebab",
    description: "Soft and creamy chicken kebabs."
},
{
    id: 917,
    name: "Afghani Chicken",
    category: "Tandoori",
    price: 359,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://source.unsplash.com/600x400/?afghani+chicken",
    description: "Creamy Afghani-style grilled chicken."
},
{
    id: 918,
    name: "Tandoori Baby Corn",
    category: "Tandoori",
    price: 229,
    veg: true,
    bestseller: false,
    rating: 4.4,
    image: "https://source.unsplash.com/600x400/?baby+corn+grill",
    description: "Grilled baby corn with tandoori spices."
},
{
    id: 919,
    name: "Chicken Wings Tandoori",
    category: "Tandoori",
    price: 299,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "https://source.unsplash.com/600x400/?tandoori+chicken+wings",
    description: "Spicy grilled chicken wings."
},
{
    id: 920,
    name: "Mixed Tandoori Platter",
    category: "Tandoori",
    price: 699,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://source.unsplash.com/600x400/?tandoori+platter",
    description: "A combination of kebabs, tikkas and tandoori specialties."
}

],


"BBQ & Grill": [

{
    id: 921,
    name: "BBQ Chicken",
    category: "BBQ & Grill",
    price: 369,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    description: "Juicy grilled chicken glazed with smoky BBQ sauce."
},

{
    id: 922,
    name: "Grilled Chicken Breast",
    category: "BBQ & Grill",
    price: 349,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "",
    description: "Tender grilled chicken breast seasoned with herbs."
},

{
    id: 923,
    name: "BBQ Chicken Wings",
    category: "BBQ & Grill",
    price: 319,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    description: "Crispy grilled chicken wings tossed in BBQ sauce."
},

{
    id: 924,
    name: "Grilled Fish Fillet",
    category: "BBQ & Grill",
    price: 429,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "",
    description: "Fresh fish fillet grilled with lemon butter."
},

{
    id: 925,
    name: "Grilled Prawns",
    category: "BBQ & Grill",
    price: 479,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    description: "Tiger prawns grilled with garlic herb seasoning."
},

{
    id: 926,
    name: "Lamb Chops BBQ",
    category: "BBQ & Grill",
    price: 549,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    description: "Succulent lamb chops grilled over charcoal."
},

{
    id: 927,
    name: "BBQ Chicken Drumsticks",
    category: "BBQ & Grill",
    price: 339,
    veg: false,
    bestseller: false,
    rating: 4.7,
    image: "",
    description: "Grilled chicken drumsticks with smoky BBQ flavor."
},

{
    id: 928,
    name: "Grilled Sausages",
    category: "BBQ & Grill",
    price: 299,
    veg: false,
    bestseller: false,
    rating: 4.5,
    image: "",
    description: "Juicy grilled sausages served with mustard dip."
},

{
    id: 929,
    name: "BBQ Chicken Skewers",
    category: "BBQ & Grill",
    price: 329,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "",
    description: "Tender chicken cubes grilled on skewers."
},

{
    id: 930,
    name: "Grilled Veg Platter",
    category: "BBQ & Grill",
    price: 279,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "",
    description: "Seasonal vegetables grilled with herbs."
},

{
    id: 931,
    name: "BBQ Paneer Skewers",
    category: "BBQ & Grill",
    price: 289,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "",
    description: "Paneer cubes grilled with BBQ spices."
},

{
    id: 932,
    name: "Grilled Mushroom",
    category: "BBQ & Grill",
    price: 249,
    veg: true,
    bestseller: false,
    rating: 4.4,
    image: "",
    description: "Fresh mushrooms grilled with garlic butter."
},

{
    id: 933,
    name: "BBQ Corn on the Cob",
    category: "BBQ & Grill",
    price: 199,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "",
    description: "Sweet corn grilled with butter and spices."
},

{
    id: 934,
    name: "Grilled Pineapple",
    category: "BBQ & Grill",
    price: 189,
    veg: true,
    bestseller: false,
    rating: 4.3,
    image: "",
    description: "Caramelized grilled pineapple slices."
},

{
    id: 935,
    name: "BBQ Chicken Burger Patty",
    category: "BBQ & Grill",
    price: 329,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "",
    description: "Grilled BBQ chicken patty served separately."
},

{
    id: 936,
    name: "Grilled Soya Chaap",
    category: "BBQ & Grill",
    price: 269,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "",
    description: "Smoky grilled soya chaap with Indian spices."
},

{
    id: 937,
    name: "BBQ Chicken Platter",
    category: "BBQ & Grill",
    price: 599,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    description: "A complete BBQ platter with grilled chicken and sides."
},

{
    id: 938,
    name: "Mixed Grill Platter",
    category: "BBQ & Grill",
    price: 699,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    description: "A mix of grilled chicken, fish, prawns and kebabs."
},

{
    id: 939,
    name: "BBQ Veg Platter",
    category: "BBQ & Grill",
    price: 399,
    veg: true,
    bestseller: false,
    rating: 4.6,
    image: "",
    description: "Paneer, mushrooms, corn and vegetables grilled together."
},

{
    id: 940,
    name: "Chef's Special BBQ Combo",
    category: "BBQ & Grill",
    price: 749,
    veg: false,
    bestseller: true,
    rating: 5.0,
    image: "",
    description: "Signature BBQ combo featuring premium grilled specialties."
}

],




"KFC": [

{
    id: 1201,
    name: "Classic Zinger Burger",
    category: "KFC",
    price: 229,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1655895176036-bf1a11326e5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENsYXNzaWMlMjBaaW5nZXIlMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Classic crispy chicken burger",
    description: "Crispy chicken fillet with lettuce and creamy mayo."
},

{
    id: 1202,
    name: "Spicy Zinger Burger",
    category: "KFC",
    price: 249,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1692737349870-e3bfc704ebf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENsYXNzaWMlMjBaaW5nZXIlMjBCdXJnZXJ8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Spicy crispy chicken burger",
    description: "Hot and spicy crispy chicken burger."
},

{
    id: 1203,
    name: "Veg Zinger Burger",
    category: "KFC",
    price: 199,
    veg: true,
    bestseller: true,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8WmluZ2VyJTIwQnVyZ2VyfGVufDB8fDB8fHww",
    imageQuery: "Veg burger",
    description: "Crunchy veg patty with fresh lettuce."
},

{
    id: 1204,
    name: "Chicken Popcorn Regular",
    category: "KFC",
    price: 179,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1371553984/photo/street-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=eLWcVPL-fJQRocWOm_HrFBZfe3spnAFvVszCR_ayho0=",
    imageQuery: "Chicken popcorn",
    description: "Crispy bite-sized chicken popcorn."
},

{
    id: 1205,
    name: "Chicken Popcorn Large",
    category: "KFC",
    price: 259,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1767469576675-0c02a8d66f4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyMFBvcGNvcm4lMjBSZWd1bGFyfGVufDB8fDB8fHww",
    imageQuery: "Large chicken popcorn",
    description: "Large bucket of crispy chicken popcorn."
},

{
    id: 1206,
    name: "Hot & Crispy Chicken 2 Pc",
    category: "KFC",
    price: 239,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEhvdCUyMCUyNiUyMENyaXNweSUyMENoaWNrZW4lMjAyJTIwUGN8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Fried chicken",
    description: "Signature crispy fried chicken."
},

{
    id: 1207,
    name: "Hot & Crispy Chicken 4 Pc",
    category: "KFC",
    price: 459,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1730900737724-5b752e1ed3dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SG90JTIwJTI2JTIwQ3Jpc3B5JTIwQ2hpY2tlbiUyMDIlMjBQY3xlbnwwfHwwfHx8MA%3D%3D",
    imageQuery: "Fried chicken bucket",
    description: "Four pieces of crispy fried chicken."
},

{
    id: 1208,
    name: "Chicken Wings 6 Pc",
    category: "KFC",
    price: 289,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1734949160721-c9bf35d66fd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fEhvdCUyMCUyNiUyMENyaXNweSUyMENoaWNrZW4lMjAyJTIwUGN8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chicken wings",
    description: "Juicy crispy chicken wings."
},

{
    id: 1209,
    name: "Chicken Wings 12 Pc",
    category: "KFC",
    price: 529,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG90JTIwJTI2JTIwQ3Jpc3B5JTIwQ2hpY2tlbiUyMDIlMjBQY3xlbnwwfHwwfHx8MA%3D%3D",
    imageQuery: "Chicken wings bucket",
    description: "Family-size chicken wings."
},

{
    id: 1210,
    name: "Chicken Strips",
    category: "KFC",
    price: 249,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "https://media.istockphoto.com/id/610223718/photo/fried-chicken-strips.webp?a=1&b=1&s=612x612&w=0&k=20&c=d4vnoKcLiMyg5eb1KdSMrKM925RblKTFBhYPoz_TI1M=",
    imageQuery: "Chicken strips",
    description: "Golden crispy chicken strips."
},

{
    id: 1211,
    name: "Chicken Bucket 6 Pc",
    category: "KFC",
    price: 699,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1736451179715-1e303bca3f09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fENoaWNrZW4lMjBTdHJpcHN8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chicken bucket",
    description: "Six pieces of signature fried chicken."
},

{
    id: 1212,
    name: "Chicken Bucket 12 Pc",
    category: "KFC",
    price: 1299,
    veg: false,
    bestseller: true,
    rating: 5.0,
    image: "https://plus.unsplash.com/premium_photo-1683657860615-d6caa9dfd514?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fENoaWNrZW4lMjBTdHJpcHN8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Large fried chicken bucket",
    description: "Perfect family bucket."
},

{
    id: 1213,
    name: "French Fries Regular",
    category: "KFC",
    price: 119,
    veg: true,
    bestseller: true,
    rating: 4.6,
    image: "https://plus.unsplash.com/premium_photo-1672774750509-bc9ff226f3e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnJlbmNoJTIwRnJpZXMlMjBSZWd1bGFyfGVufDB8fDB8fHww",
    imageQuery: "French fries",
    description: "Golden crispy fries."
},

{
    id: 1214,
    name: "French Fries Large",
    category: "KFC",
    price: 169,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1775617412720-b7dd23488731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fEZyZW5jaCUyMEZyaWVzJTIwUmVndWxhcnxlbnwwfHwwfHx8MA%3D%3D",
    imageQuery: "Large french fries",
    description: "Large serving of crispy fries."
},

{
    id: 1215,
    name: "Chicken Rice Bowl",
    category: "KFC",
    price: 249,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2ZjJTIwUmljZSUyMEJvd2x8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chicken rice bowl",
    description: "Rice bowl topped with crispy chicken."
},

{
    id: 1216,
    name: "Veg Rice Bowl",
    category: "KFC",
    price: 199,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1693434060467-025dc2a63868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGtmYyUyMFJpY2UlMjBidWNrZXR8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Veg rice bowl",
    description: "Rice bowl with vegetables and sauces."
},

{
    id: 1217,
    name: "Chicken Wrap",
    category: "KFC",
    price: 229,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1683657860968-7474e7ea2d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2hpY2tlbiUyMFdyYXB8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chicken wrap",
    description: "Soft tortilla loaded with crispy chicken."
},

{
    id: 1218,
    name: "Chocolate Brownie",
    category: "KFC",
    price: 99,
    veg: true,
    bestseller: false,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENob2NvbGF0ZSUyMEJyb3duaWV8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chocolate brownie",
    description: "Rich chocolate brownie dessert."
},

{
    id: 1219,
    name: "Pepsi",
    category: "KFC",
    price: 79,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "https://plus.unsplash.com/premium_photo-1725075086083-89117890371d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGVwc2l8ZW58MHx8MHx8fDA%3D",
    imageQuery: "Pepsi cold drink",
    description: "Chilled Pepsi."
},

{
    id: 1220,
    name: "Chicken Meal Combo",
    category: "KFC",
    price: 499,
    veg: false,
    bestseller: true,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1693434060467-025dc2a63868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENoaWNrZW4lMjBNZWFsJTIwQ29tYm98ZW58MHx8MHx8fDA%3D",
    imageQuery: "Chicken burger fries coke combo",
    description: "Burger, fries, chicken and drink combo."
}

],







"Tandoori": [

{
    id: 1301,
    name: "Chicken Tandoori",
    category: "Tandoori",
    price: 299,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Chicken Tandoori",
    description: "Traditional tandoori chicken marinated with yogurt and Indian spices."
},

{
    id: 1302,
    name: "Tandoori Chicken Half",
    category: "Tandoori",
    price: 349,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "",
    imageQuery: "Half Tandoori Chicken",
    description: "Half portion of juicy tandoori chicken cooked in a clay oven."
},

{
    id: 1303,
    name: "Tandoori Chicken Full",
    category: "Tandoori",
    price: 599,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    imageQuery: "Full Tandoori Chicken",
    description: "Whole tandoori chicken roasted to perfection with authentic spices."
},

{
    id: 1304,
    name: "Paneer Tikka",
    category: "Tandoori",
    price: 259,
    veg: true,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Paneer Tikka",
    description: "Soft paneer cubes grilled with yogurt, herbs, and spices."
},

{
    id: 1305,
    name: "Hariyali Chicken Tikka",
    category: "Tandoori",
    price: 319,
    veg: false,
    bestseller: false,
    rating: 4.7,
    image: "",
    imageQuery: "Hariyali Chicken Tikka",
    description: "Green herb-marinated chicken tikka grilled in a tandoor."
},

{
    id: 1306,
    name: "Malai Chicken Tikka",
    category: "Tandoori",
    price: 329,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Malai Chicken Tikka",
    description: "Creamy chicken tikka marinated with cheese and fresh cream."
},

{
    id: 1307,
    name: "Achari Chicken Tikka",
    category: "Tandoori",
    price: 339,
    veg: false,
    bestseller: false,
    rating: 4.6,
    image: "",
    imageQuery: "Achari Chicken Tikka",
    description: "Chicken tikka flavored with tangy Indian pickle spices."
},

{
    id: 1308,
    name: "Tangdi Kebab",
    category: "Tandoori",
    price: 349,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Tangdi Kebab",
    description: "Juicy chicken drumsticks marinated with aromatic spices."
},

{
    id: 1309,
    name: "Chicken Seekh Kebab",
    category: "Tandoori",
    price: 289,
    veg: false,
    bestseller: true,
    rating: 4.7,
    image: "",
    imageQuery: "Chicken Seekh Kebab",
    description: "Minced chicken skewers grilled in a traditional tandoor."
},

{
    id: 1310,
    name: "Mutton Seekh Kebab",
    category: "Tandoori",
    price: 369,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Mutton Seekh Kebab",
    description: "Tender minced mutton kebabs with smoky tandoori flavor."
}









,



{
    id: 1311,
    name: "Fish Tikka",
    category: "Tandoori",
    price: 389,
    veg: false,
    bestseller: false,
    rating: 4.7,
    image: "",
    imageQuery: "Fish Tikka",
    description: "Fresh fish cubes marinated with Indian spices and grilled in a tandoor."
},

{
    id: 1312,
    name: "Prawns Tandoori",
    category: "Tandoori",
    price: 449,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Tandoori Prawns",
    description: "Juicy prawns marinated with yogurt and spices, cooked in a clay oven."
},

{
    id: 1313,
    name: "Afghani Chicken",
    category: "Tandoori",
    price: 359,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    imageQuery: "Afghani Chicken Tandoori",
    description: "Creamy Afghani-style chicken grilled until tender and smoky."
},

{
    id: 1314,
    name: "Reshmi Kebab",
    category: "Tandoori",
    price: 339,
    veg: false,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Reshmi Kebab",
    description: "Soft and juicy chicken kebabs marinated with cream and mild spices."
},

{
    id: 1315,
    name: "Hara Bhara Kebab",
    category: "Tandoori",
    price: 229,
    veg: true,
    bestseller: false,
    rating: 4.6,
    image: "",
    imageQuery: "Hara Bhara Kebab",
    description: "Healthy spinach and green pea kebabs grilled to perfection."
},

{
    id: 1316,
    name: "Stuffed Mushroom Tikka",
    category: "Tandoori",
    price: 269,
    veg: true,
    bestseller: false,
    rating: 4.7,
    image: "",
    imageQuery: "Stuffed Mushroom Tikka",
    description: "Mushrooms stuffed with cheese and herbs, roasted in a tandoor."
},

{
    id: 1317,
    name: "Soya Chaap Tikka",
    category: "Tandoori",
    price: 249,
    veg: true,
    bestseller: true,
    rating: 4.7,
    image: "",
    imageQuery: "Soya Chaap Tikka",
    description: "Protein-rich soya chaap marinated in spicy yogurt and grilled."
},

{
    id: 1318,
    name: "Tandoori Broccoli",
    category: "Tandoori",
    price: 239,
    veg: true,
    bestseller: false,
    rating: 4.5,
    image: "",
    imageQuery: "Tandoori Broccoli",
    description: "Fresh broccoli florets marinated with spices and roasted."
},

{
    id: 1319,
    name: "Mixed Tandoori Platter",
    category: "Tandoori",
    price: 699,
    veg: false,
    bestseller: true,
    rating: 4.9,
    image: "",
    imageQuery: "Mixed Tandoori Platter",
    description: "A grand platter of chicken tikka, kebabs, prawns, and fish tikka."
},

{
    id: 1320,
    name: "Veg Tandoori Platter",
    category: "Tandoori",
    price: 499,
    veg: true,
    bestseller: true,
    rating: 4.8,
    image: "",
    imageQuery: "Vegetarian Tandoori Platter",
    description: "A delicious assortment of paneer tikka, mushrooms, broccoli, and hara bhara kebabs."
}





],









};



module.exports = { cuisineMenus };