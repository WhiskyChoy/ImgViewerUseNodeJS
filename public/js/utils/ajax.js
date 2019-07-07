/* 封装ajax函数
 * @param {string}opt.method http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 */
export async function ajax(opt) {
    return new Promise(((resolve, reject) => {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        console.log(opt);
        let xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xmlHttp.timeout = 3000;
        let params = [];
        for (let key in opt.data) {
            if (opt.data.hasOwnProperty(key)) {
                params.push(key + '=' + opt.data[key]);
            }
        }
        let postData = params.join('&');
        console.log(postData);
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                resolve(xmlHttp.responseText);
            } else {
                reject(new Error('网络错误'));
            }
        };
    }));

}