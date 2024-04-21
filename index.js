const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message());
    await dialog.dismiss();
  });

  await page.goto("https://map.kakao.com/?target=other&folderid=543387", {
    timeout: 7000000,
  });

  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector("#other\\.favorite > ul");

  restaurantsList = await page.evaluate(async () => {
    const restaurantsList = [];
    const restaurantLinkList = document.querySelectorAll(
      ".FavoriteDetailItem .FavoriteInformationBundle > div > div > div.tit_directory > strong > a"
    );

    await new Promise((r) => setTimeout(r, 1000));

    for (let i = 0; i < restaurantLinkList.length; i++) {
      try {
        restaurantLinkList[i].click();
        await new Promise((r) => setTimeout(r, 1000));

        restaurant = {};
        title = document.querySelector(".name");
        console.log(restaurant.name);
        restaurant.name = document.querySelector(".name").textContent;
        restaurant.url = document.querySelector(".name").href;
        restaurant.score = !!document.querySelector("span.txt_blind")
          ? "N/A"
          : document.querySelector('[data-id="score"]').textContent;
        restaurant.phone = !!document.querySelector(".phone")
          ? document.querySelector(".phone").textContent
          : "N/A";
        restaurantsList.push(restaurant);
      } catch (error) {
        console.error("Error clicking element:", error);
      }
    }
    return restaurantsList;
  });

  console.log(restaurantsList);

  await browser.close();

  const csv =
    "id,name,url,score,phone\n" +
    restaurantsList
      .map(
        (item, index) =>
          `${index},${item.name},${item.url},${item.score},${item.phone}`
      )
      .join("\n");

  fs.writeFile("restaurants.csv", csv, (err) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("File written successfuly");
  });
})();
