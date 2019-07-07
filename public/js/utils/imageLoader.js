export async function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        let image = new Image();

        image.onload = function () {
            // console.log('加载图片成功');
            resolve(image);
        };

        image.onerror = function () {
            // console.log('加载图片失败');
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}