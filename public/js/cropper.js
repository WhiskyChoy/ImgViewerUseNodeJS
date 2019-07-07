import {getPosition} from "./utils/pos.js";
import {context} from "./utils/context.js";
import {loadImageAsync} from "./utils/imageLoader.js";

// 在元素加载完之后执行，确保元素可以成功获取
export function startCropService(inputImage, crop) {
    console.log(inputImage.width);

    let centralContainer = document.getElementsByClassName("central_container")[0];
    if (centralContainer.style.display !== "flex") {
        let canvasContainer = document.getElementsByClassName("canvas_container")[0];
        let canvasBox = document.getElementById("box");
        let imgContainers = document.getElementsByClassName("img_container");
        let img2 = document.getElementById("img2");
        let rightDiv = document.getElementById("right");
        let upDiv = document.getElementById("up");
        let leftDiv = document.getElementById("left");
        let downDiv = document.getElementById("down");
        let leftupDiv = document.getElementById("left-up");
        let rightupDiv = document.getElementById("right-up");
        let rightdownDiv = document.getElementById("right-down");
        let leftdownDiv = document.getElementById("left-down");
        let mainDiv = document.getElementById("main");
        let preview = document.getElementById("preview");
        let ifKeyDown = false;
        let contact = "";// 表示被按下的触点
        let imgTargets = document.getElementsByClassName("imgTarget");
        let confirmCrop = document.getElementById("confirm_crop");

        centralContainer.style.display = "flex";
        canvasContainer.style.display = "none";

        // let isWider = resolvedImg.width > resolvedImg.height;
        // let rate;
        // for (let container of imgContainers) {
        //     if (isWider) {
        //         rate = context.maxWidth / resolvedImg.width;
        //         container.style.width = context.maxWidth + 'px';
        //         container.style.height = resolvedImg.height * rate + 'px';
        //     } else {
        //         rate = context.maxHeight / resolvedImg.height;
        //         container.style.height = context.maxHeight + 'px';
        //         container.style.width = resolvedImg.width * rate + 'px';
        //     }
        // }
        //

        //
        // for (let img of imgTargets) {
        //     img.src = imageURL;
        //     if (isWider) {
        //         img.width = context.maxWidth;
        //         img.height = resolvedImg.height * rate;
        //     } else {
        //         img.height = context.maxHeight;
        //         img.width = resolvedImg.width * rate;
        //     }
        // }

        let width = inputImage.width && inputImage.width > 0 ? inputImage.width : context.maxWidth;
        let height = inputImage.height && inputImage.height > 0 ? inputImage.height : context.maxHeight;

        for (let container of imgContainers) {
            container.style.width = width + 'px';
            container.style.height = height + 'px';
        }

        for (let img of imgTargets) {
            img.src = inputImage.src;
            img.width = width;
            img.height = height;
        }

        mainDiv.style.width = width * 0.1 + 'px';
        mainDiv.style.height = height * 0.1 + 'px';

        const scaleRate = 0.75;
        preview.style.height = preview.clientHeight * scaleRate + 'px';
        preview.style.width = preview.clientWidth * scaleRate + 'px';

        //鼠标按下状态
        rightDiv.onmousedown = (e) => {
            //阻止冒泡
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.right;
        };
        upDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.up;
        };
        leftDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.left;
        };
        downDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.down;
        };
        leftupDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.left_up;
        };
        rightupDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.right_up;
        };
        rightdownDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.right_down;
        };
        leftdownDiv.onmousedown = (e) => {
            e.stopPropagation();
            ifKeyDown = true;
            contact = context.left_down;
        };

        //鼠标松开状态
        window.onmouseup = function () {
            ifKeyDown = false;
        };

        //鼠标移动事件
        window.onmousemove = function (e) {
            if (ifKeyDown === true) {

                switch (contact) {
                    case context.right:
                        rightMove(e);
                        break;
                    case context.up:
                        upMove(e);
                        break;
                    case context.left:
                        leftMove(e);
                        break;
                    case context.down:
                        downMove(e);
                        break;
                    case context.left_up:
                        leftMove(e);
                        upMove(e);
                        break;
                    case context.right_up:
                        rightMove(e);
                        upMove(e);
                        break;
                    case context.right_down:
                        rightMove(e);
                        downMove(e);
                        break;
                    case context.left_down:
                        leftMove(e);
                        downMove(e);
                        break;
                }

            }
            setChoice();
            setPreview();
            setObjectMovable(mainDiv);
        };

        confirmCrop.onclick = () => {
            let left = getPosition(mainDiv).left - getPosition(canvasBox).left;
            let top = getPosition(mainDiv).top - getPosition(mainDiv).top;
            let width = mainDiv.clientWidth;
            let height = mainDiv.clientHeight;
            centralContainer.style.display = "none";
            canvasContainer.style.display = "flex";
            crop(left, top, width, height);
        };

        //右边移动
        function rightMove(e) {
            let x = e.clientX; //鼠标x坐标
            let left = getPosition(mainDiv).left;
            let newWidth = x - left; //鼠标移动后增加的宽度
            if (x < getPosition(img2).left + img2.width) {
                mainDiv.style.width = newWidth + "px"; //选取框变化后的宽度
            }
        }

        //上边移动
        function upMove(e) {
            let topBefore = mainDiv.offsetTop;
            let y = e.clientY;//鼠标纵坐标
            let mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
            let deltaHeight = mainY - y;
            let heightBefore = mainDiv.offsetHeight - 2;
            let bottom = topBefore + heightBefore;

            let heightAfter = heightBefore + deltaHeight;
            let topAfter = mainDiv.offsetTop - deltaHeight;

            if (topAfter < bottom && topAfter > -2) {
                mainDiv.style.height = heightAfter + "px";
                mainDiv.style.top = topAfter + "px";
            }

        }

        //左边移动
        function leftMove(e) {
            // 左边框变化前距离父元素左边的距离
            let leftBefore = mainDiv.offsetLeft;
            // 鼠标按下停止后鼠标距离浏览器左边界的距离
            let x = e.clientX;
            // 定义增加的宽度
            let addWidth;
            // 变化之前剪辑框的宽度
            let widthBefore = mainDiv.offsetWidth - 2;
            // 变化之前左边框距离浏览器左边界的距离
            let mainDivLeft = getPosition(mainDiv).left;
            // 右边框距离父元素的左边的距离
            let right = leftBefore + widthBefore;
            // 增加的宽度
            addWidth = mainDivLeft - x;
            // 变化之后剪辑框的宽度
            let widthAfter = widthBefore + addWidth;
            // 变化之后剪辑框离左边的距离
            let leftAfter = mainDiv.offsetLeft - addWidth;
            // 防止左边框移到右边框以外区域
            if (leftAfter < right && leftAfter > -2) {
                // 定义变化后的宽度
                mainDiv.style.width = widthAfter + "px";
                // 定义变化后距离左边父元素的距离
                mainDiv.style.left = leftAfter + "px";
            }

        }

        //下边移动
        function downMove(e) {
            let y = e.clientY;
            let top = getPosition(mainDiv).top;
            let newHeight = y - top;
            if (y <= getPosition(img2).top + img2.height) {
                mainDiv.style.height = newHeight + "px";
            }

        }

        let mouseDownX, mouseDownY, initX, initY, isPressed = false;

        function setObjectMovable(obj) {

            obj.onmousedown = function (e) {
                //鼠标按下时的鼠标所在的X，Y坐标
                mouseDownX = e.pageX;
                mouseDownY = e.pageY;

                //初始位置的X，Y 坐标
                initX = obj.offsetLeft;
                initY = obj.offsetTop;

                //表示鼠标已按下
                isPressed = true;
            };
            document.onmousemove = function (e) {
                // 确保鼠标已按下
                if (isPressed) {
                    let mouseMoveX = e.pageX, mouseMoveY = e.pageY;
                    let left = mouseMoveX - mouseDownX + initX;
                    let top = mouseMoveY - mouseDownY + initY;
                    let right = left + obj.offsetWidth;
                    let bottom = top + obj.offsetHeight;
                    // console.log(left, top, right, bottom);
                    //以下条件分开判断，否则会卡顿
                    if (left > 0 && right < img2.width) {
                        obj.style.left = mouseMoveX - mouseDownX + initX + "px";

                    }
                    if (top > 0 && bottom < img2.height) {
                        obj.style.top = mouseMoveY - mouseDownY + initY + "px";
                    }
                }

            };
            document.onmouseup = function () {
                //标识已松开鼠标
                isPressed = false;
            }
        }


        //设置选取区域高亮可见
        function setChoice() {
            let top = mainDiv.offsetTop;
            let right = mainDiv.offsetLeft + mainDiv.offsetWidth;
            let bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
            let left = mainDiv.offsetLeft;
            img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px" + ")";
        }

        //预览函数
        function setPreview() {
            let top = mainDiv.offsetTop;
            let right = mainDiv.offsetLeft + mainDiv.offsetWidth;
            let bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
            let left = mainDiv.offsetLeft;
            let img3 = document.getElementById("img3");
            img3.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px" + ")";
            img3.style.top = -(top) + "px";
            img3.style.left = -(left) + "px";
        }
    }
}