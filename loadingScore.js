async function fetchAndStoreHTML(urls) {
  const dbRequest = indexedDB.open("maimaiDB", 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("htmlPages", { keyPath: "id" });
  };

  dbRequest.onsuccess = async (event) => {
    const db = event.target.result;
    const transaction = db.transaction("htmlPages", "readwrite");
    const store = transaction.objectStore("htmlPages");

    // 遍歷所有 URL 並獲取 HTML
    for (const [index, url] of urls.entries()) {
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // 保持登入狀態
        });
        const html = await response.text();

        // 存儲每個頁面的 HTML 內容
        store.put({ id: index, url: url, htmlContent: html });
        console.log(`頁面 ${url} 存儲成功`);
      } catch (error) {
        console.error(`抓取或存儲頁面 ${url} 失敗: ${error}`);
      }
    }

    debugger

    // 完成後跳轉到下一個頁面
    window.location.href = "https://jenny810227.github.io/maimai/ScoreIndex.html"; // 這裡是你想跳轉的網址
  };

  dbRequest.onerror = (event) => {
    console.error("IndexedDB 錯誤：", event.target.error);
  };
}

// 要抓取的 URL 列表
const urls = [
  "https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/",
  "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=1",
  "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=2",
  "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=3",
  "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=4",
];

// 存儲 HTML 並轉跳頁面
fetchAndStoreHTML(urls);
