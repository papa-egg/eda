import { hasClass, addClass, removeClass, hasSvgClass, addSvgClass, removeSvgClass } from './plugin';

const DomConfig = (() => {

  const domObj = {};

  const getDomById = (id) => {
    return document.getElementById(id);
  };

  return {
    getDom (id) {
      if (!domObj['D_' + id]) {
        domObj['D_' + id] = getDomById(id);
      }

      return getDomById(id);//domObj['D_' + id]
    },

    setAttrs (id, attrs) {
      const domStuff = this.getDom(id);

      for (let attr in attrs) {
        domStuff.setAttribute(attr, attrs[attr]);
      }

    },

    hasClass (id, className) {
      const domStuff = this.getDom(id);

      if (domStuff && domStuff.className && domStuff.className.baseVal) {
        hasSvgClass(domStuff, className);
      } else {
        hasClass(domStuff, className);
      }
    },

    addClass (id, className) {
      const domStuff = this.getDom(id);

      if (domStuff && domStuff.className && domStuff.className.baseVal) {
        addSvgClass(domStuff, className);
      } else {
        addClass(domStuff, className);
      }
    },

    removeClass (id, className) {
      const domStuff = this.getDom(id);

      if (domStuff && domStuff.className && domStuff.className.baseVal) {
        removeSvgClass(domStuff, className);
      } else {
        removeClass(domStuff, className);
      }
    }
  }
})();

export default DomConfig;
