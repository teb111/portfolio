const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
tl.to(".text", { y: "0%", duration: 2, stagger: 0.25 });
tl.to(".intro", { y: "100%", duration: 1.5 });
tl.fromTo(".about", { y: "-130%" }, { y: "0", duration: 1 }, "-=1");
tl.fromTo(".links", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=1");
tl.fromTo(".about-me", { opacity: 0 }, { opacity: 1, duration: 0.5 });
tl.fromTo(".project-1", { opacity: 0 }, { opacity: 1, duration: 0.7 });
tl.fromTo(".project-2", { opacity: 0 }, { opacity: 1, duration: 0.7 });
tl.fromTo(".project-3", { opacity: 0 }, { opacity: 1, duration: 0.7 });
tl.fromTo(".social-links", { opacity: 0 }, { opacity: 1, duration: 0.7 });
tl.fromTo(".copyright", { opacity: 0 }, { opacity: 1, duration: 0.7 });

const yearSpan = document.querySelector(".year");

const year = new Date().getFullYear();

yearSpan.textContent = year;

// typewrting animation

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
