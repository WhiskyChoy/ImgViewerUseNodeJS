export function getRequest() {
    let url = location.search; //获取url中"?"符后的字串
    let request;
    if (url.indexOf("?") !== -1) {
        request = {};
        let str = url.substr(1);
        let str_s = str.split("&");
        for (let i = 0; i < str_s.length; i++) {
            request[str_s[i].split("=")[0]] = decodeURIComponent(str_s[i].split("=")[1]);
        }
    }
    return request;
}