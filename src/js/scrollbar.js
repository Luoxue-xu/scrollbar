/*
 * 模拟滚动条
 * author: Luoxue-xu.github.io
 * date: 2017.03.22
 */

export default class Scrollbar {

    constructor(options) {
        if(!options.element) {
            throw new Error('请设置需要添加滚动条的元素');
        }
        this.ele = this.$(options.element);
        this.scrollY = options.scrollY || 0; // Y轴滚动的距离
        this.speed = options.speed || 80; // 滚动内容速度
        this.direction = 1; // 滚动方向， 0 向上 1 向下
        this.createBar();
    }

    // 简写获取元素
    $(arg) {
        let el = document.querySelectorAll(arg);
        if(el.length === 1) return el[0];
        return el;
    }

    // 创建滚动条
    createBar() {
        let eleChild = this.ele.innerHTML;
        this.ele.classList.add('lx-scroller');

        // 创建滚动容器
        this.scroller = document.createElement('div');
        this.scroller.className = 'lx-scroller-contain';
        this.scroller.innerHTML = eleChild;

        // 创建滚动bar
        this.scrollerbar = document.createElement('div');
        this.scrollerbar.className = 'lx-scroller-bar';
        this.scrollerbar.innerHTML = '<span class="lx-scroller-bars"></span>';
        this.scrollerbars = this.scrollerbar.querySelector('.lx-scroller-bars');
        this.ele.innerHTML = '';

        this.ele.appendChild(this.scroller);
        this.ele.appendChild(this.scrollerbar);
        setTimeout(() => {
            this.countStyle();
        }, 100);
        this.events();
    }

    // 获取样式
    css(arg, attr) {
        return window.getComputedStyle(arg, null)[attr];
    }

    // 计算样式
    countStyle() {
        // 内容样式
        this.scrollStyle = {
            height: parseInt(this.css(this.ele, 'height')), // 容器高度
            cHeight: parseInt(this.css(this.scroller, 'height')), // 内容高度
            scale: parseInt(this.css(this.ele, 'height')) / parseInt(this.css(this.scroller, 'height')) // 高度比例
        };

        // 滚动条样式
        this.barStyle = {
            height: this.scrollStyle.height * this.scrollStyle.scale
        };

        if(this.scrollY <= this.speed && this.direction === 0) {
            // 向上滚动到顶点则不滚动
            this.scrollY = 0;
        }else if(this.scrollStyle.cHeight - this.scrollStyle.height - this.scrollY <= this.speed && this.direction === 1) {
            // 向下滚动到底部则不滚动
            this.scrollY = this.scrollStyle.cHeight - this.scrollStyle.height;
        }

        this.setContainStyle();
        this.setBarStyle();
    }

    // 设置滚动内容样式
    setContainStyle() {
        this.scroller.style.transform = `translate3d(0, -${this.scrollY}px, 0)`;
    }

    // 设置滚动条样式
    setBarStyle() {
        this.scrollerbars.style.height = this.barStyle.height + 'px';
        this.scrollerbars.style.transform = `translate(0, ${this.scrollY * this.scrollStyle.scale}px)`;
    }

    // 销毁
    destroy() {

    }

    // 控制室
    events() {

        this.scroller.addEventListener('mousewheel', (event) => {
            if(event.wheelDelta > 0) {
                // 向上滚动
                this.direction = 0;
                this.scrollY -= this.speed;
            }else if(event.wheelDelta < 0) {
                // 向下滚动
                this.direction = 1;
                this.scrollY += this.speed;
            }
            this.countStyle();
        }, false);


    }

}
