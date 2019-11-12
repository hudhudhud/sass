// 通过设置device-width,initial-scale来适配移动端，这样开发就可直接用px
// 缺点：
// 如果有一些需要地方不需要等比缩放而需要设置固定尺寸，
// 比如要求在不同尺寸屏幕上显示固定大小的文字，或者你引进了一个库，
// 里面的有样式你也不知道人家是按照怎样的适配方案进行适配的，
// 那么到了你的项目里由于全局的viewport缩放，可能会影响到这个库的显示效果。
export default function init(initWidth = 375) {
    clear();
    let curWidth = window.screen.width;
    let scale = curWidth / initWidth;
    let meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = `width=${initWidth},initial-scale=${scale},minimum-scale=${scale},maximum-scale=${scale},user-scalable=no`;
    document.head.appendChild(meta);
}

function clear() {
    let meta = document.querySelectorAll('meta[name="viewport"]'),
        length = meta.length;
    for (let i = length - 1; i >= 0; i--) {
        document.head.removeChild(meta[i])
    }
}

init();