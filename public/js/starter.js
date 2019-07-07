import {getPosition} from "./utils/pos.js";
import {clearCanvas} from "./utils/panel.js";
import {loadImageAsync} from "./utils/imageLoader.js";
import {context} from "./utils/context.js";
import {startCropService} from "./cropper.js";

export class Drawer {
    constructor(url) {
        this.type = 'pen';  //默认为铅笔
        this.penal = null;
        this.pen = null;
        this.isDraw = false;
        this.penal = document.getElementById('penal');
        this.pen = this.penal.getContext('2d');
        this.color = document.getElementById('color');
        this.lineWidth = document.getElementById('lineWidth');
        this.img = new Image();//用于动态绘制指向，矩形，原型
        this.bg = document.getElementById('bg');
        if (url) {
            loadImageAsync(url).then((img) => {
                this.loadOneImage(img);
            })
        }
    }

    adjustPanel(width, height) {
        this.penal.style.width = width + 'px';
        this.penal.style.height = height + 'px';
        this.penal.width = width;
        this.penal.height = height;
        this.bg.style.width = width + 'px';
        this.bg.style.height = height + 'px';
    }

    loadOneImage(img) {
        let rate;
        let isWider = img.width > img.height;
        this.pen.drawImage(img, 0, 0);
        if (isWider) {
            rate = context.maxWidth / img.width;
            img.width = context.maxWidth;
            img.height = img.height * rate;
        } else {
            rate = context.maxHeight / img.height;
            img.height = context.maxHeight;
            img.width = img.width * rate;
        }
        // initPanel(img.width, img.height);
        this.adjustPanel(img.width, img.height);
        this.pen.drawImage(img, 0, 0, img.width, img.height);
        this.img.src = this.penal.toDataURL();
    }

    async init() {
        let self = this;
        let originX = null;
        let originY = null;


        self.penal.onmousedown = (event) => {
            self.isDraw = true;
            if (self.type !== 'robber') {
                self.img.src = self.penal.toDataURL();
            }
            originX = event.clientX - getPosition(self.penal).left;    //原点x坐标
            originY = event.clientY - getPosition(self.penal).top;     //原点y坐标
            self.pen.moveTo(originX, originY);
            self.pen.strokeStyle = self.color.value;
            self.pen.lineWidth = self.lineWidth.value / 20;
        };

        self.penal.onmousemove = (event) => {
            if (self.isDraw) {
                let x = event.clientX - getPosition(self.penal).left;
                let y = event.clientY - getPosition(self.penal).top;

                let newOriginX = originX, newOriginY = originY;
                if (self.type === 'pen') {
                    self.pen.lineTo(x, y);
                    self.pen.stroke();
                } else if (self.type === 'robber') {

                    self.pen.strokeStyle = 'transparent';
                    self.pen.clearRect(x - 10, y - 10, 20, 20);

                } else if (self.type === 'line') {

                    clearCanvas(self.penal);
                    self.pen.drawImage(self.img, 0, 0);
                    self.pen.beginPath();
                    self.pen.moveTo(originX, originY);
                    self.pen.lineTo(x, y);
                    self.pen.stroke();
                    self.pen.closePath();

                } else if (self.type === 'rect') {
                    clearCanvas(self.penal);
                    self.pen.drawImage(self.img, 0, 0);
                    self.pen.beginPath();

                    if (x < originX) {
                        newOriginX = x;
                    }
                    if (y < originY) {
                        newOriginY = y;
                    }
                    self.pen.rect(newOriginX, newOriginY, Math.abs(x - originX), Math.abs(y - originY));
                    self.pen.stroke();
                    self.pen.closePath();

                } else if (self.type === 'arc') {

                    clearCanvas(self.penal);
                    self.pen.drawImage(self.img, 0, 0);
                    self.pen.beginPath();
                    if (x < originX) {
                        newOriginX = x;
                    }
                    if (y < originY) {
                        newOriginY = y;
                    }
                    let r = Math.sqrt(Math.abs(x - originX) * Math.abs(x - originX) + Math.abs(y - originY) * Math.abs(y - originY));
                    self.pen.arc(Math.abs(x - originX) + newOriginX, Math.abs(y - originY) + newOriginY, r, 0, 2 * Math.PI);
                    self.pen.fillStyle = self.color.value;
                    self.pen.fill();
                    self.pen.closePath();
                }
            }
        };

        self.penal.onmouseleave = () => {
            if (self.isDraw) {
                self.isDraw = false;
                if (self.type === "line") {
                    self.pen.closePath();
                }
                self.img.src = self.penal.toDataURL();
            }
        };

        self.penal.onmouseup = () => {
            self.isDraw = false;
        };


        document.getElementById('pen').onclick = () => {
            self.type = 'pen';
        };

        document.getElementById('line').onclick = () => {
            self.type = 'line';
        };

        document.getElementById('rect').onclick = () => {
            self.type = 'rect';
        };

        document.getElementById('arc').onclick = () => {
            self.type = 'arc';
        };

        document.getElementById('robber').onclick = () => {
            self.type = 'robber';
        };

        document.getElementById('clear').onclick = () => {
            self.pen.beginPath();
            clearCanvas(self.penal);
            self.img = new Image();
        };

        document.getElementById('crop').onclick = () => {
            self.img.src = self.penal.toDataURL();
            self.img.width = self.penal.width;
            self.img.height = self.penal.height;
            if (self.img.src) {
                startCropService(self.img, self.crop.bind(self)); //注意把this指针传过去
            } else {
                alert("请做出修改或导入图片后进行截取");
            }
        };


        document.getElementById('file').onchange = (e) => {
            let reader = new FileReader();
            try {
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = async (ent) => {
                    self.pen.beginPath();
                    let fileTarget = ent.target;
                    let img = await loadImageAsync(fileTarget.result);
                    this.loadOneImage(img);
                }
            } catch (err) {
                alert(err);
            }
        };

        document.getElementById('img').onclick = () => {
            document.getElementById('file').click();
        };

        document.getElementById('save').onclick = () => {
            let a = document.createElement('a');
            a.href = self.penal.toDataURL();
            a.download = 'image.jpg';
            a.click();
        };
    };

    crop(left, top, width, height) {
        let imgData = this.pen.getImageData(left, top, width, height);
        clearCanvas(this.penal);
        this.adjustPanel(width, height);
        //先调整 后放置
        this.pen.putImageData(imgData, 0, 0);
    };
}