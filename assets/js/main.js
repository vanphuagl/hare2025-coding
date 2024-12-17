"use strict";

// ===== init =====
const init = () => {
  // #
  history.scrollRestoration = "manual";
  // # app-height
  appHeight();
  // # init loading
  initLoading();
};

// ===== appheight =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== swiper top =====
const topSwiper = new Swiper("[data-top-swiper]", {
  effect: "fade",
  speed: 2500,
  allowTouchMove: false,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  on: {
    init: function (swiper) {
      swiper.autoplay.stop();
    },
    slideChange: function (swiper) {
      switch (swiper.activeIndex) {
        case 0:
          break;
        case 1:
          document.querySelectorAll("[data-top-text]").forEach(element => {
            element.classList.add("--show")
          });
          break;
        case 2:
          setTimeout(() => {
            document.querySelector("[data-top-scrolldown]").classList.add("--show");
            swiper.autoplay.stop();
            document.body.classList.add("--auto");
          }, 500);
          break;
        default:
          break;
      }
    },
  },
});

// ===== init loading =====
const [loading, loadingLogo] = [
  document.querySelector("[data-loading]"),
  document.querySelector("[data-loading-logo]"),
];
const initLoading = function () {
  // #
  setTimeout(() => {
    loadingLogo.classList.add("--fadein");
  }, 800);
  // ##
  setTimeout(function () {
    loading.classList.add("--done");
    topSwiper.autoplay.start();
  }, 2400);
  // ###
  setTimeout(() => {
    topSwiper.autoplay.start();
  }, 4000);
};

// ===== artist action =====
const [artistContent, artistToggler, artistAction] = [
  document.querySelector("[data-artist-content]"),
  document.querySelector("[data-artist-toggler]"),
  document.querySelector("[data-artist-action]"),
];
artistToggler.addEventListener("click", function () {
  this.classList.toggle("--active");
  if (artistContent.style.maxHeight) {
    artistContent.style.maxHeight = null;
    artistAction.innerText = "open";
  } else {
    artistContent.style.maxHeight = artistContent.scrollHeight + "px";
    artistAction.innerText = "close";
  }
});

// ===== scroll fade up content =====
const [fadeUpArray, fadeInArray] = [
  document.querySelectorAll("[data-fadeup]"),
  document.querySelectorAll("[data-fadein]"),
];

const addFadeOnElements = function (elements) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      let elem = elements[i];
      let distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 100;
      if (distInView < 0) {
        elem.classList.add("--visible");
      }
    }
  }
};

window.addEventListener("scroll", function () {
  addFadeOnElements(fadeUpArray);
  addFadeOnElements(fadeInArray);
});

// ===== swiper campaign =====
const campaignSwiper = new Swiper("[data-campaign-swiper]", {
  speed: 800,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    clickable: true,
    el: ".swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
      allowTouchMove: true,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 42,
      allowTouchMove: false,
    },
  },
});

// ===== lazy loading =====
const ll = new LazyLoad({
  threshold: 0,
});

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("DOMContentLoaded", init);
