(async function() {
    const urls = [
      "https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/",
      "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=1",
      "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=2",
      "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=3",
      "https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=4",
      
    ];
  
    // 取得 HTML 的函數
    async function fetchHTML(url) {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // 保持登入狀態
      });
      return await response.text();
    }
  
    // 解析 HTML 並提取數據
    function parseHTML(html, selector) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const rows = doc.querySelectorAll(selector);
  
      const data = [];
      rows.forEach(row => {
        const song = row.querySelector(".song-name")?.innerText.trim() || "Unknown";
        const score = row.querySelector(".score")?.innerText.trim() || "0";
        data.push({ song, score });
      });
      return data;
    }
  
    // 從各個頁面抓取資料
    const allData = [];
    for (const url of urls) {
      const html = await fetchHTML(url);
      const data = parseHTML(html, ".table-row"); // 修改選擇器以符合頁面結構
      allData.push(...data);
    }
  
    // 將資料存入 localStorage 並跳轉到新頁面
    localStorage.setItem("maimaiData", JSON.stringify(allData));
    window.location.href = "/your-custom-page.html"; // 替換為你的 HTML 頁面路徑
  })();