const fs = require("fs");

// ======= YOUR UNSPLASH ACCESS KEY =======
const ACCESS_KEY = "OJO_71C1BG26bk649CS3w0oSJ-5sAjs-27_KRKkjLck";
// ======= Import your cuisineMenus =======
const { cuisineMenus } = require("./cuisineMenus");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getImage(foodName) {

    try {

        const url =
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(foodName + " food")}&per_page=1&orientation=landscape`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`
            }
        });

        const data = await response.json();

console.log(data);

if (data.results && data.results.length > 0) {

    return data.results[0].urls.regular;

}

        return "";

    } catch (err) {

        console.log(foodName, err);

        return "";

    }

}

async function updateImages() {

    for (const category in cuisineMenus) {

        console.log("\nUpdating:", category);

        for (const item of cuisineMenus[category]) {

            console.log("Searching:", item.name);

            item.image = await getImage(item.name);

            await delay(1200);

        }

    }

    fs.writeFileSync(
        "cuisineMenus.updated.js",
        "const cuisineMenus = " +
        JSON.stringify(cuisineMenus, null, 4) +
        ";\n\nexport default cuisineMenus;"
    );

    console.log("\nFinished Successfully.");

}

updateImages();