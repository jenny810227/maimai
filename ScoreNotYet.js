const script = document.createElement('script');
script.src = "https://code.jquery.com/jquery-3.6.4.min.js"; // 載入最新版 jQuery
script.onload = function () {
    console.log("jQuery 已加載完成!");
    getImage();
};
document.head.appendChild(script);

function getImage() {
    fetch('https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json')
        .then(response => response.json())
        .then(data => {
            const baseUrl = "https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/";

            const tables = $('.candidateTable');

            // 使用 .each 迭代每個 table
            tables.each((index, table) => {
                // 取出當前 table 的所有 tr
                const rows = $(table).find('tbody tr');

                // 迭代每個 tr
                rows.each((rowindex, row) => {
                    const tds = $(row).find('td'); // 取得該行中的所有 td
                    const link = $(tds[1]).find('a'); // 取出第 2 個 td 裡的 a
                    const songName = link.text().trim().replace('▶ ', '');

                    const songData = data.songs.find(x => x.title === songName);

                    let image = '';

                    if(songData){
                        image = `
                        <img style='width: 100%;height: 100%;object-fit: cover;' src="${baseUrl}${songData.imageName}">`;
                    }

                    const td = `
                        <td style='width: 120px;height: 120px;display: block;'>${image}</td>`;

                    $(row).append(td);
                });
            });         

        })
        .catch(error => {
            console.error('讀取 JSON 失敗:', error);
        });
}


