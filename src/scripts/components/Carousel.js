import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
      },
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
      breakpoints: {},
    };
    this.init();
  }

  setOptions() {
    const isSplit = this.element.getAttribute('data-split') == 'true';

    this.options.breakpoints = {
      768: {
        slidesPerView: 2,
      },
    };

    const slidesPerViewExiste = this.element.getAttribute('data-slides');
    if (slidesPerViewExiste) {
      const slidesPerViewValue = parseFloat(slidesPerViewExiste);
      if (!isNaN(slidesPerViewValue)) {
        this.options.slidesPerView = 1;
        this.options.breakpoints = {
          768: {
            slidesPerView: slidesPerViewValue,
          },
        };
      }
    }
    const autoplayIsActive = this.element.hasAttribute('data-autoplay');
    if (autoplayIsActive) {
      this.options.autoplay = {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }
    const loopIsActive = this.element.hasAttribute('data-loop');
    if (loopIsActive) {
      this.options.loop = true;
    }
  }

  init() {
    this.setOptions();
    new Swiper(this.element, this.options);
  }
}
