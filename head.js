
const jsonUrl = 'https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json';

(function () {
    const head = document.head;

    // 引入 Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'lib/bootstrap-5.3.3-dist/css/bootstrap.css';
    head.appendChild(bootstrapLink);

    // 引入 Bootstrap CSS
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'lib/bootstrap-5.3.3-dist/js/bootstrap.js';
    bootstrapScript.defer = true;
    head.appendChild(bootstrapScript);

    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'lib/jquery-3.7.1-dist/jquery-3.7.1.min.js';
    jqueryScript.defer = true;
    head.appendChild(jqueryScript);    

    jqueryScript.onload = function () {
        if (typeof onPageReady === 'function') {
            onPageReady();
        }
    };
})();
