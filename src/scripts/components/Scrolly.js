export default class Scrolly {
  constructor(element) {
    this.element = element;
    this.options = {
      repeat: true,
    };
    this.setOptions();
    this.init();
  }
  setOptions() {
    if ('noRepeat' in this.element.dataset) {
      this.options.repeat = false;
    }
  }

  init() {
    const observer = new IntersectionObserver(this.watch.bind(this));

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item);
    }
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      const target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('is-active');

        if (this.options.repeat) {
          observer.unobserve(target);
        }
      } else if (this.options.repeat) {
        target.classList.remove('is-active');
      }
    }
  }
}
