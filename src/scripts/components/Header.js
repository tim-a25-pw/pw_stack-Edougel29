export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: parseFloat(this.element.getAttribute('data-threshold')) || 0.1,
      alwaysshow: this.element.hasAttribute('data-always-show'),
    };

    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;
    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  setOptions() {}

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState();
    this.setDirections();
  }

  setHeaderState() {
    if (this.options.alwaysshow) {
      this.html.classList.remove('header-is-hidden');
    } else {
      if (
        this.scrollPosition >
        document.scrollingElement.scrollHeight * this.options.threshold
      ) {
        this.html.classList.add('header-is-hidden');
      } else {
        this.html.classList.remove('header-is-hidden');
      }
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    document.documentElement.classList.toggle('nav-is-active');
  }
}
