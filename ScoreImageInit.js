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

            const tables = $('.topRecordTable');

            let htmlTop15 = '';
            let htmlTop35 = '';

            // 使用 .each 迭代每個 table
            tables.each((index, table) => {
                // 取出當前 table 的所有 tr
                const rows = $(table).find('tbody tr');

                // 迭代每個 tr
                rows.each((rowindex, row) => {
                    const tds = $(row).find('td'); // 取得該行中的所有 td
                    const link = $(tds[1]).find('a'); // 取出第 2 個 td 裡的 a
                    const songName = link.text().trim();
                    const songData = data.songs.find(x => x.title === songName);

                    const td = `
                        <div class="imageDiv">
                            <div class="image">
                                <img src="${baseUrl}${songData.imageName}">
                                <div class="overlay"></div>
                                    <span class="span-title">#${$(tds[0]).text().trim()}<br>${songName}<br>${$(tds[2]).text().trim()}</span>
                                <div class="score-div">
                                <span>${$(tds[4]).text().trim()}</span>
                                <span class="socre-span">${$(tds[5]).text().trim()}</span>
                                </div>
                                <div class="level-div">
                                    <span class="songLevel-span">${$(tds[3]).text().trim()}</span>
                                    <span class="level-span">${$(tds[6]).text().trim()}</span>
                                </div>
                            </div>
                        </div>`

                    if(index == 0){
                        htmlTop15 += td;
                    }else{
                        htmlTop35 += td;
                    }                   
                });
            });

            let html = `
             <style>
        .specail{
            font-family: 'Microsoft JhengHei', '微軟正黑體', sans-serif;
        }

        .text-center {
            text-align: center;
        }

        .flex{
            display: flex; 
            flex-wrap: wrap;
        }

        .imageDiv{
            box-sizing: border-box;
            padding: 10px;
            width: 20%;
        }

        .image {
            box-sizing: border-box;
            height: 150px;
            overflow: hidden;
            border-radius: 10px;
            position: relative;
        }

        .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
            /* 選擇性：若直接設定到圖片 */
        }

        .image .overlay {
            position: absolute;
            /* 設置遮罩的絕對定位 */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            /* 灰色半透明遮罩 */
            border-radius: 15px;
            /* 確保遮罩和圖片的圓角一致 */
        }

        .span-title{
            position: absolute;
            /* 設置遮罩的絕對定位 */
            top: 10px;
            left: 15px;
            color: #fff;
            font-size: 11px;
        }

        .score-div{
            position: absolute;
            /* 設置遮罩的絕對定位 */
            bottom: 5px;
            left: 15px;
            color: #fff;
            font-size: 11px;            
        }

        .socre-span{
            font-size: 20px;
            display: block;
            font-weight: bolder;
        }

        .level-div{
            position: absolute;
            /* 設置遮罩的絕對定位 */
            bottom: 1px;
            right:  15px;
            color: #fff;
            font-size: 12px;
            text-align: right;
        }

        .level-span{
            font-size: 40px;
            display: block;
            font-weight: bolder;
        }

        .songLevel-span{
            position: relative;
            bottom: -6px;
        }
    </style>
    <div class="specail">
        <p class="text-center">New Songs</p>
        <div class="flex">
        ${htmlTop15} 
        </div>
        <p class="text-center">Old Songs</p>
        <div class="flex">
        ${htmlTop35} 
        </div>
    </div>  `


    $('.ratingOverview').append(html);






        })
        .catch(error => {
            console.error('讀取 JSON 失敗:', error);
        });

}


