import {Drawer} from "./starter.js";
import {getRequest} from "./utils/url.js";

window.onload = async function () {
    document.onselectstart = new Function('event.returnValue=false;'); //避免闪屏
    let request = getRequest();
    console.log(request);
    let drawer = new Drawer(request && request.src ? request.src : undefined);
    await drawer.init();
};