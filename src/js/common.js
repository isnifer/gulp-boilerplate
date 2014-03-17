function Slide (opts) {

    this.elem = opts;
    this.init();
}

Slide.prototype.fullScreen = function () {
    if(this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
    } else if(this.elem.mozRequestFullScreen) {
        this.elem.mozRequestFullScreen();
    } else if(this.elem.webkitRequestFullscreen) {
        this.elem.webkitRequestFullscreen();
    } else if(this.elem.msRequestFullscreen) {
        this.elem.msRequestFullscreen();
    }
};

Slide.prototype.init = function () {

    var self = this;

    this.elem.addEventListener('click', function (e) {
        self.fullScreen();
    });

};

function Slides (selector) {

    this.name = 'Hello';

    var slideShow = document.querySelectorAll(selector),
        slides = [];

    for (var i = 0; i < slideShow.length; i++) {
        slides.push(new Slide(slideShow[i]));
    }

    console.log('hello world');

}

/*var page = document.querySelector('.slides');
page.style.width = document.body.offsetWidth + 'px';
page.style.height = document.body.offsetHeight + 'px';

console.log(page);

console.log(document.body.offsetWidth);
console.log(document.body.offsetHeight);*/