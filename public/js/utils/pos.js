export function getPosition(node) {
    let result;
    if (result = node.getBoundingClientRect()) {
        return result;
    } else {
        /*获取元素相对于父元素的左边距*/
        let left = node.offsetLeft;
        /*获取元素相对于父元素的上边距*/
        let top = node.offsetTop;
        /*获取元素的父元素*/
        let parent = node.offsetParent;
        /*判断是否存在父元素,存在则一直加上左边距,一直算出元素相对于浏览器
        左边界的距离*/
        while (parent != null) {
            /*循环累加子元素相对于父元素的左边距*/
            left += parent.offsetLeft;
            /*循环累加子元素相对于父元素的上边距*/
            top += parent.offsetTop;
            /*循环获取父元素的父元素，直至没有父元素为止*/
            parent = parent.offsetParent;
        }
        return {left, top};
    }
}
