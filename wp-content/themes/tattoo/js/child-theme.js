/*!
  * Understrap v1.1.0 (https://understrap.com)
  * Copyright 2013-2022 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var button$2 = {exports: {}};

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/event-handler.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	  const stripNameRegex = /\..*/;
	  const stripUidRegex = /::\d+$/;
	  const eventRegistry = {}; // Events storage

	  let uidEvent = 1;
	  const customEvents = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	  };
	  const customEventsRegex = /^(mouseenter|mouseleave)/i;
	  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	  /**
	   * ------------------------------------------------------------------------
	   * Private methods
	   * ------------------------------------------------------------------------
	   */

	  function getUidEvent(element, uid) {
	    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	  }

	  function getEvent(element) {
	    const uid = getUidEvent(element);
	    element.uidEvent = uid;
	    eventRegistry[uid] = eventRegistry[uid] || {};
	    return eventRegistry[uid];
	  }

	  function bootstrapHandler(element, fn) {
	    return function handler(event) {
	      event.delegateTarget = element;

	      if (handler.oneOff) {
	        EventHandler.off(element, event.type, fn);
	      }

	      return fn.apply(element, [event]);
	    };
	  }

	  function bootstrapDelegationHandler(element, selector, fn) {
	    return function handler(event) {
	      const domElements = element.querySelectorAll(selector);

	      for (let {
	        target
	      } = event; target && target !== this; target = target.parentNode) {
	        for (let i = domElements.length; i--;) {
	          if (domElements[i] === target) {
	            event.delegateTarget = target;

	            if (handler.oneOff) {
	              EventHandler.off(element, event.type, selector, fn);
	            }

	            return fn.apply(target, [event]);
	          }
	        }
	      } // To please ESLint


	      return null;
	    };
	  }

	  function findHandler(events, handler, delegationSelector = null) {
	    const uidEventList = Object.keys(events);

	    for (let i = 0, len = uidEventList.length; i < len; i++) {
	      const event = events[uidEventList[i]];

	      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	        return event;
	      }
	    }

	    return null;
	  }

	  function normalizeParams(originalTypeEvent, handler, delegationFn) {
	    const delegation = typeof handler === 'string';
	    const originalHandler = delegation ? delegationFn : handler;
	    let typeEvent = getTypeEvent(originalTypeEvent);
	    const isNative = nativeEvents.has(typeEvent);

	    if (!isNative) {
	      typeEvent = originalTypeEvent;
	    }

	    return [delegation, originalHandler, typeEvent];
	  }

	  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    if (!handler) {
	      handler = delegationFn;
	      delegationFn = null;
	    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


	    if (customEventsRegex.test(originalTypeEvent)) {
	      const wrapFn = fn => {
	        return function (event) {
	          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	            return fn.call(this, event);
	          }
	        };
	      };

	      if (delegationFn) {
	        delegationFn = wrapFn(delegationFn);
	      } else {
	        handler = wrapFn(handler);
	      }
	    }

	    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	    const events = getEvent(element);
	    const handlers = events[typeEvent] || (events[typeEvent] = {});
	    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	    if (previousFn) {
	      previousFn.oneOff = previousFn.oneOff && oneOff;
	      return;
	    }

	    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	    fn.delegationSelector = delegation ? handler : null;
	    fn.originalHandler = originalHandler;
	    fn.oneOff = oneOff;
	    fn.uidEvent = uid;
	    handlers[uid] = fn;
	    element.addEventListener(typeEvent, fn, delegation);
	  }

	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	    const fn = findHandler(events[typeEvent], handler, delegationSelector);

	    if (!fn) {
	      return;
	    }

	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	    delete events[typeEvent][fn.uidEvent];
	  }

	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	    const storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(handlerKey => {
	      if (handlerKey.includes(namespace)) {
	        const event = storeElementEvent[handlerKey];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  }

	  function getTypeEvent(event) {
	    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	    event = event.replace(stripNameRegex, '');
	    return customEvents[event] || event;
	  }

	  const EventHandler = {
	    on(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, false);
	    },

	    one(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, true);
	    },

	    off(element, originalTypeEvent, handler, delegationFn) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	      const inNamespace = typeEvent !== originalTypeEvent;
	      const events = getEvent(element);
	      const isNamespace = originalTypeEvent.startsWith('.');

	      if (typeof originalHandler !== 'undefined') {
	        // Simplest case: handler is passed, remove that listener ONLY.
	        if (!events || !events[typeEvent]) {
	          return;
	        }

	        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	        return;
	      }

	      if (isNamespace) {
	        Object.keys(events).forEach(elementEvent => {
	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	        });
	      }

	      const storeElementEvent = events[typeEvent] || {};
	      Object.keys(storeElementEvent).forEach(keyHandlers => {
	        const handlerKey = keyHandlers.replace(stripUidRegex, '');

	        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	          const event = storeElementEvent[keyHandlers];
	          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	        }
	      });
	    },

	    trigger(element, event, args) {
	      if (typeof event !== 'string' || !element) {
	        return null;
	      }

	      const $ = getjQuery();
	      const typeEvent = getTypeEvent(event);
	      const inNamespace = event !== typeEvent;
	      const isNative = nativeEvents.has(typeEvent);
	      let jQueryEvent;
	      let bubbles = true;
	      let nativeDispatch = true;
	      let defaultPrevented = false;
	      let evt = null;

	      if (inNamespace && $) {
	        jQueryEvent = $.Event(event, args);
	        $(element).trigger(jQueryEvent);
	        bubbles = !jQueryEvent.isPropagationStopped();
	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	        defaultPrevented = jQueryEvent.isDefaultPrevented();
	      }

	      if (isNative) {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(typeEvent, bubbles, true);
	      } else {
	        evt = new CustomEvent(event, {
	          bubbles,
	          cancelable: true
	        });
	      } // merge custom information in our event


	      if (typeof args !== 'undefined') {
	        Object.keys(args).forEach(key => {
	          Object.defineProperty(evt, key, {
	            get() {
	              return args[key];
	            }

	          });
	        });
	      }

	      if (defaultPrevented) {
	        evt.preventDefault();
	      }

	      if (nativeDispatch) {
	        element.dispatchEvent(evt);
	      }

	      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	        jQueryEvent.preventDefault();
	      }

	      return evt;
	    }

	  };

	  return EventHandler;

	}));

	}(eventHandler));

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/data.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  const elementMap = new Map();
	  const data = {
	    set(element, key, instance) {
	      if (!elementMap.has(element)) {
	        elementMap.set(element, new Map());
	      }

	      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
	      // can be removed later when multiple key/instances are fine to be used

	      if (!instanceMap.has(key) && instanceMap.size !== 0) {
	        // eslint-disable-next-line no-console
	        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	        return;
	      }

	      instanceMap.set(key, instance);
	    },

	    get(element, key) {
	      if (elementMap.has(element)) {
	        return elementMap.get(element).get(key) || null;
	      }

	      return null;
	    },

	    remove(element, key) {
	      if (!elementMap.has(element)) {
	        return;
	      }

	      const instanceMap = elementMap.get(element);
	      instanceMap.delete(key); // free up element references if there are no instances left for an element

	      if (instanceMap.size === 0) {
	        elementMap.delete(element);
	      }
	    }

	  };

	  return data;

	}));

	}(data));

	/*!
	  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, eventHandler.exports) ;
	})(commonjsGlobal, (function (Data, EventHandler) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): base-component.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const VERSION = '5.1.3';

	  class BaseComponent {
	    constructor(element) {
	      element = getElement(element);

	      if (!element) {
	        return;
	      }

	      this._element = element;
	      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
	    }

	    dispose() {
	      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
	      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
	      Object.getOwnPropertyNames(this).forEach(propertyName => {
	        this[propertyName] = null;
	      });
	    }

	    _queueCallback(callback, element, isAnimated = true) {
	      executeAfterTransition(callback, element, isAnimated);
	    }
	    /** Static */


	    static getInstance(element) {
	      return Data__default.default.get(getElement(element), this.DATA_KEY);
	    }

	    static getOrCreateInstance(element, config = {}) {
	      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	    }

	    static get VERSION() {
	      return VERSION;
	    }

	    static get NAME() {
	      throw new Error('You have to implement the static method "NAME", for each component!');
	    }

	    static get DATA_KEY() {
	      return `bs.${this.NAME}`;
	    }

	    static get EVENT_KEY() {
	      return `.${this.DATA_KEY}`;
	    }

	  }

	  return BaseComponent;

	}));

	}(baseComponent));

	/*!
	  * Bootstrap button.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): button.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'button';
	  const DATA_KEY = 'bs.button';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Button extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Button.getOrCreateInstance(this);

	        if (config === 'toggle') {
	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
	    event.preventDefault();
	    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
	    const data = Button.getOrCreateInstance(button);
	    data.toggle();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Button to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Button);

	  return Button;

	}));

	}(button$2));

	var button$1 = button$2.exports;

	var carousel$1 = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/manipulator.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  function normalizeData(val) {
	    if (val === 'true') {
	      return true;
	    }

	    if (val === 'false') {
	      return false;
	    }

	    if (val === Number(val).toString()) {
	      return Number(val);
	    }

	    if (val === '' || val === 'null') {
	      return null;
	    }

	    return val;
	  }

	  function normalizeDataKey(key) {
	    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	  }

	  const Manipulator = {
	    setDataAttribute(element, key, value) {
	      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	    },

	    removeDataAttribute(element, key) {
	      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	    },

	    getDataAttributes(element) {
	      if (!element) {
	        return {};
	      }

	      const attributes = {};
	      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
	        let pureKey = key.replace(/^bs/, '');
	        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	        attributes[pureKey] = normalizeData(element.dataset[key]);
	      });
	      return attributes;
	    },

	    getDataAttribute(element, key) {
	      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	    },

	    offset(element) {
	      const rect = element.getBoundingClientRect();
	      return {
	        top: rect.top + window.pageYOffset,
	        left: rect.left + window.pageXOffset
	      };
	    },

	    position(element) {
	      return {
	        top: element.offsetTop,
	        left: element.offsetLeft
	      };
	    }

	  };

	  return Manipulator;

	}));

	}(manipulator));

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/selector-engine.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const NODE_TEXT = 3;
	  const SelectorEngine = {
	    find(selector, element = document.documentElement) {
	      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	    },

	    findOne(selector, element = document.documentElement) {
	      return Element.prototype.querySelector.call(element, selector);
	    },

	    children(element, selector) {
	      return [].concat(...element.children).filter(child => child.matches(selector));
	    },

	    parents(element, selector) {
	      const parents = [];
	      let ancestor = element.parentNode;

	      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	        if (ancestor.matches(selector)) {
	          parents.push(ancestor);
	        }

	        ancestor = ancestor.parentNode;
	      }

	      return parents;
	    },

	    prev(element, selector) {
	      let previous = element.previousElementSibling;

	      while (previous) {
	        if (previous.matches(selector)) {
	          return [previous];
	        }

	        previous = previous.previousElementSibling;
	      }

	      return [];
	    },

	    next(element, selector) {
	      let next = element.nextElementSibling;

	      while (next) {
	        if (next.matches(selector)) {
	          return [next];
	        }

	        next = next.nextElementSibling;
	      }

	      return [];
	    },

	    focusableChildren(element) {
	      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
	      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
	    }

	  };

	  return SelectorEngine;

	}));

	}(selectorEngine));

	/*!
	  * Bootstrap carousel.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	    }

	    const listLength = list.length;
	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): carousel.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'carousel';
	  const DATA_KEY = 'bs.carousel';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	  const SWIPE_THRESHOLD = 40;
	  const Default = {
	    interval: 5000,
	    keyboard: true,
	    slide: false,
	    pause: 'hover',
	    wrap: true,
	    touch: true
	  };
	  const DefaultType = {
	    interval: '(number|boolean)',
	    keyboard: 'boolean',
	    slide: '(boolean|string)',
	    pause: '(string|boolean)',
	    wrap: 'boolean',
	    touch: 'boolean'
	  };
	  const ORDER_NEXT = 'next';
	  const ORDER_PREV = 'prev';
	  const DIRECTION_LEFT = 'left';
	  const DIRECTION_RIGHT = 'right';
	  const KEY_TO_DIRECTION = {
	    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
	    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
	  };
	  const EVENT_SLIDE = `slide${EVENT_KEY}`;
	  const EVENT_SLID = `slid${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
	  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
	  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
	  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
	  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
	  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
	  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
	  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_CAROUSEL = 'carousel';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_SLIDE = 'slide';
	  const CLASS_NAME_END = 'carousel-item-end';
	  const CLASS_NAME_START = 'carousel-item-start';
	  const CLASS_NAME_NEXT = 'carousel-item-next';
	  const CLASS_NAME_PREV = 'carousel-item-prev';
	  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	  const SELECTOR_ITEM = '.carousel-item';
	  const SELECTOR_ITEM_IMG = '.carousel-item img';
	  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	  const SELECTOR_INDICATORS = '.carousel-indicators';
	  const SELECTOR_INDICATOR = '[data-bs-target]';
	  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	  const POINTER_TYPE_TOUCH = 'touch';
	  const POINTER_TYPE_PEN = 'pen';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Carousel extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._items = null;
	      this._interval = null;
	      this._activeElement = null;
	      this._isPaused = false;
	      this._isSliding = false;
	      this.touchTimeout = null;
	      this.touchStartX = 0;
	      this.touchDeltaX = 0;
	      this._config = this._getConfig(config);
	      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
	      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	      this._pointerEvent = Boolean(window.PointerEvent);

	      this._addEventListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    next() {
	      this._slide(ORDER_NEXT);
	    }

	    nextWhenVisible() {
	      // Don't call next when the page isn't visible
	      // or the carousel or its parent isn't visible
	      if (!document.hidden && isVisible(this._element)) {
	        this.next();
	      }
	    }

	    prev() {
	      this._slide(ORDER_PREV);
	    }

	    pause(event) {
	      if (!event) {
	        this._isPaused = true;
	      }

	      if (SelectorEngine__default.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
	        triggerTransitionEnd(this._element);
	        this.cycle(true);
	      }

	      clearInterval(this._interval);
	      this._interval = null;
	    }

	    cycle(event) {
	      if (!event) {
	        this._isPaused = false;
	      }

	      if (this._interval) {
	        clearInterval(this._interval);
	        this._interval = null;
	      }

	      if (this._config && this._config.interval && !this._isPaused) {
	        this._updateInterval();

	        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	      }
	    }

	    to(index) {
	      this._activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeIndex = this._getItemIndex(this._activeElement);

	      if (index > this._items.length - 1 || index < 0) {
	        return;
	      }

	      if (this._isSliding) {
	        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
	        return;
	      }

	      if (activeIndex === index) {
	        this.pause();
	        this.cycle();
	        return;
	      }

	      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

	      this._slide(order, this._items[index]);
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _handleSwipe() {
	      const absDeltax = Math.abs(this.touchDeltaX);

	      if (absDeltax <= SWIPE_THRESHOLD) {
	        return;
	      }

	      const direction = absDeltax / this.touchDeltaX;
	      this.touchDeltaX = 0;

	      if (!direction) {
	        return;
	      }

	      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
	    }

	    _addEventListeners() {
	      if (this._config.keyboard) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	      }

	      if (this._config.pause === 'hover') {
	        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
	        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
	      }

	      if (this._config.touch && this._touchSupported) {
	        this._addTouchEventListeners();
	      }
	    }

	    _addTouchEventListeners() {
	      const hasPointerPenTouch = event => {
	        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	      };

	      const start = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchStartX = event.clientX;
	        } else if (!this._pointerEvent) {
	          this.touchStartX = event.touches[0].clientX;
	        }
	      };

	      const move = event => {
	        // ensure swiping with one touch and not pinching
	        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
	      };

	      const end = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchDeltaX = event.clientX - this.touchStartX;
	        }

	        this._handleSwipe();

	        if (this._config.pause === 'hover') {
	          // If it's a touch-enabled device, mouseenter/leave are fired as
	          // part of the mouse compatibility events on first tap - the carousel
	          // would stop cycling until user tapped out of it;
	          // here, we listen for touchend, explicitly pause the carousel
	          // (as if it's the second time we tap on it, mouseenter compat event
	          // is NOT fired) and after a timeout (to allow for mouse compatibility
	          // events to fire) we explicitly restart cycling
	          this.pause();

	          if (this.touchTimeout) {
	            clearTimeout(this.touchTimeout);
	          }

	          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	        }
	      };

	      SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
	        EventHandler__default.default.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
	      });

	      if (this._pointerEvent) {
	        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => end(event));

	        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	      } else {
	        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => move(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => end(event));
	      }
	    }

	    _keydown(event) {
	      if (/input|textarea/i.test(event.target.tagName)) {
	        return;
	      }

	      const direction = KEY_TO_DIRECTION[event.key];

	      if (direction) {
	        event.preventDefault();

	        this._slide(direction);
	      }
	    }

	    _getItemIndex(element) {
	      this._items = element && element.parentNode ? SelectorEngine__default.default.find(SELECTOR_ITEM, element.parentNode) : [];
	      return this._items.indexOf(element);
	    }

	    _getItemByOrder(order, activeElement) {
	      const isNext = order === ORDER_NEXT;
	      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
	    }

	    _triggerSlideEvent(relatedTarget, eventDirectionName) {
	      const targetIndex = this._getItemIndex(relatedTarget);

	      const fromIndex = this._getItemIndex(SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));

	      return EventHandler__default.default.trigger(this._element, EVENT_SLIDE, {
	        relatedTarget,
	        direction: eventDirectionName,
	        from: fromIndex,
	        to: targetIndex
	      });
	    }

	    _setActiveIndicatorElement(element) {
	      if (this._indicatorsElement) {
	        const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	        activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
	        activeIndicator.removeAttribute('aria-current');
	        const indicators = SelectorEngine__default.default.find(SELECTOR_INDICATOR, this._indicatorsElement);

	        for (let i = 0; i < indicators.length; i++) {
	          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
	            indicators[i].classList.add(CLASS_NAME_ACTIVE);
	            indicators[i].setAttribute('aria-current', 'true');
	            break;
	          }
	        }
	      }
	    }

	    _updateInterval() {
	      const element = this._activeElement || SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      if (!element) {
	        return;
	      }

	      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

	      if (elementInterval) {
	        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	        this._config.interval = elementInterval;
	      } else {
	        this._config.interval = this._config.defaultInterval || this._config.interval;
	      }
	    }

	    _slide(directionOrOrder, element) {
	      const order = this._directionToOrder(directionOrOrder);

	      const activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeElementIndex = this._getItemIndex(activeElement);

	      const nextElement = element || this._getItemByOrder(order, activeElement);

	      const nextElementIndex = this._getItemIndex(nextElement);

	      const isCycling = Boolean(this._interval);
	      const isNext = order === ORDER_NEXT;
	      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

	      const eventDirectionName = this._orderToDirection(order);

	      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
	        this._isSliding = false;
	        return;
	      }

	      if (this._isSliding) {
	        return;
	      }

	      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

	      if (slideEvent.defaultPrevented) {
	        return;
	      }

	      if (!activeElement || !nextElement) {
	        // Some weirdness is happening, so we bail
	        return;
	      }

	      this._isSliding = true;

	      if (isCycling) {
	        this.pause();
	      }

	      this._setActiveIndicatorElement(nextElement);

	      this._activeElement = nextElement;

	      const triggerSlidEvent = () => {
	        EventHandler__default.default.trigger(this._element, EVENT_SLID, {
	          relatedTarget: nextElement,
	          direction: eventDirectionName,
	          from: activeElementIndex,
	          to: nextElementIndex
	        });
	      };

	      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	        nextElement.classList.add(orderClassName);
	        reflow(nextElement);
	        activeElement.classList.add(directionalClassName);
	        nextElement.classList.add(directionalClassName);

	        const completeCallBack = () => {
	          nextElement.classList.remove(directionalClassName, orderClassName);
	          nextElement.classList.add(CLASS_NAME_ACTIVE);
	          activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
	          this._isSliding = false;
	          setTimeout(triggerSlidEvent, 0);
	        };

	        this._queueCallback(completeCallBack, activeElement, true);
	      } else {
	        activeElement.classList.remove(CLASS_NAME_ACTIVE);
	        nextElement.classList.add(CLASS_NAME_ACTIVE);
	        this._isSliding = false;
	        triggerSlidEvent();
	      }

	      if (isCycling) {
	        this.cycle();
	      }
	    }

	    _directionToOrder(direction) {
	      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
	        return direction;
	      }

	      if (isRTL()) {
	        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	      }

	      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	    }

	    _orderToDirection(order) {
	      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
	        return order;
	      }

	      if (isRTL()) {
	        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	      }

	      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	    } // Static


	    static carouselInterface(element, config) {
	      const data = Carousel.getOrCreateInstance(element, config);
	      let {
	        _config
	      } = data;

	      if (typeof config === 'object') {
	        _config = { ..._config,
	          ...config
	        };
	      }

	      const action = typeof config === 'string' ? config : _config.slide;

	      if (typeof config === 'number') {
	        data.to(config);
	      } else if (typeof action === 'string') {
	        if (typeof data[action] === 'undefined') {
	          throw new TypeError(`No method named "${action}"`);
	        }

	        data[action]();
	      } else if (_config.interval && _config.ride) {
	        data.pause();
	        data.cycle();
	      }
	    }

	    static jQueryInterface(config) {
	      return this.each(function () {
	        Carousel.carouselInterface(this, config);
	      });
	    }

	    static dataApiClickHandler(event) {
	      const target = getElementFromSelector(this);

	      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	        return;
	      }

	      const config = { ...Manipulator__default.default.getDataAttributes(target),
	        ...Manipulator__default.default.getDataAttributes(this)
	      };
	      const slideIndex = this.getAttribute('data-bs-slide-to');

	      if (slideIndex) {
	        config.interval = false;
	      }

	      Carousel.carouselInterface(target, config);

	      if (slideIndex) {
	        Carousel.getInstance(target).to(slideIndex);
	      }

	      event.preventDefault();
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);

	    for (let i = 0, len = carousels.length; i < len; i++) {
	      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
	    }
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Carousel to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Carousel);

	  return Carousel;

	}));

	}(carousel$1));

	var carousel = carousel$1.exports;

	var modal$1 = {exports: {}};

	/*!
	  * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE$1 = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE$1);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): modal.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'modal';
	  const DATA_KEY = 'bs.modal';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    focus: true
	  };
	  const DefaultType = {
	    backdrop: '(boolean|string)',
	    keyboard: 'boolean',
	    focus: 'boolean'
	  };
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
	  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_OPEN = 'modal-open';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_STATIC = 'modal-static';
	  const OPEN_SELECTOR = '.modal.show';
	  const SELECTOR_DIALOG = '.modal-dialog';
	  const SELECTOR_MODAL_BODY = '.modal-body';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Modal extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();
	      this._isShown = false;
	      this._ignoreBackdropClick = false;
	      this._isTransitioning = false;
	      this._scrollBar = new ScrollBarHelper();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown || this._isTransitioning) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;

	      if (this._isAnimated()) {
	        this._isTransitioning = true;
	      }

	      this._scrollBar.hide();

	      document.body.classList.add(CLASS_NAME_OPEN);

	      this._adjustDialog();

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
	        EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
	          if (event.target === this._element) {
	            this._ignoreBackdropClick = true;
	          }
	        });
	      });

	      this._showBackdrop(() => this._showElement(relatedTarget));
	    }

	    hide() {
	      if (!this._isShown || this._isTransitioning) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = false;

	      const isAnimated = this._isAnimated();

	      if (isAnimated) {
	        this._isTransitioning = true;
	      }

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      this._focustrap.deactivate();

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
	      EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

	      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
	    }

	    dispose() {
	      [window, this._dialog].forEach(htmlElement => EventHandler__default.default.off(htmlElement, EVENT_KEY));

	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    }

	    handleUpdate() {
	      this._adjustDialog();
	    } // Private


	    _initializeBackDrop() {
	      return new Backdrop({
	        isVisible: Boolean(this._config.backdrop),
	        // 'static' option will be translated to true, and booleans will keep their value
	        isAnimated: this._isAnimated()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _showElement(relatedTarget) {
	      const isAnimated = this._isAnimated();

	      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

	      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	        // Don't move modal's DOM position
	        document.body.append(this._element);
	      }

	      this._element.style.display = 'block';

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.scrollTop = 0;

	      if (modalBody) {
	        modalBody.scrollTop = 0;
	      }

	      if (isAnimated) {
	        reflow(this._element);
	      }

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const transitionComplete = () => {
	        if (this._config.focus) {
	          this._focustrap.activate();
	        }

	        this._isTransitioning = false;
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(transitionComplete, this._dialog, isAnimated);
	    }

	    _setEscapeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	          if (this._config.keyboard && event.key === ESCAPE_KEY) {
	            event.preventDefault();
	            this.hide();
	          } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
	            this._triggerBackdropTransition();
	          }
	        });
	      } else {
	        EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
	      }
	    }

	    _setResizeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
	      } else {
	        EventHandler__default.default.off(window, EVENT_RESIZE);
	      }
	    }

	    _hideModal() {
	      this._element.style.display = 'none';

	      this._element.setAttribute('aria-hidden', true);

	      this._element.removeAttribute('aria-modal');

	      this._element.removeAttribute('role');

	      this._isTransitioning = false;

	      this._backdrop.hide(() => {
	        document.body.classList.remove(CLASS_NAME_OPEN);

	        this._resetAdjustments();

	        this._scrollBar.reset();

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      });
	    }

	    _showBackdrop(callback) {
	      EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, event => {
	        if (this._ignoreBackdropClick) {
	          this._ignoreBackdropClick = false;
	          return;
	        }

	        if (event.target !== event.currentTarget) {
	          return;
	        }

	        if (this._config.backdrop === true) {
	          this.hide();
	        } else if (this._config.backdrop === 'static') {
	          this._triggerBackdropTransition();
	        }
	      });

	      this._backdrop.show(callback);
	    }

	    _isAnimated() {
	      return this._element.classList.contains(CLASS_NAME_FADE);
	    }

	    _triggerBackdropTransition() {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const {
	        classList,
	        scrollHeight,
	        style
	      } = this._element;
	      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

	      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
	        return;
	      }

	      if (!isModalOverflowing) {
	        style.overflowY = 'hidden';
	      }

	      classList.add(CLASS_NAME_STATIC);

	      this._queueCallback(() => {
	        classList.remove(CLASS_NAME_STATIC);

	        if (!isModalOverflowing) {
	          this._queueCallback(() => {
	            style.overflowY = '';
	          }, this._dialog);
	        }
	      }, this._dialog);

	      this._element.focus();
	    } // ----------------------------------------------------------------------
	    // the following methods are used to handle overflowing modals
	    // ----------------------------------------------------------------------


	    _adjustDialog() {
	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	      const scrollbarWidth = this._scrollBar.getWidth();

	      const isBodyOverflowing = scrollbarWidth > 0;

	      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
	        this._element.style.paddingLeft = `${scrollbarWidth}px`;
	      }

	      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
	        this._element.style.paddingRight = `${scrollbarWidth}px`;
	      }
	    }

	    _resetAdjustments() {
	      this._element.style.paddingLeft = '';
	      this._element.style.paddingRight = '';
	    } // Static


	    static jQueryInterface(config, relatedTarget) {
	      return this.each(function () {
	        const data = Modal.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](relatedTarget);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
	      if (showEvent.defaultPrevented) {
	        // only register focus restorer if modal will actually get shown
	        return;
	      }

	      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	        if (isVisible(this)) {
	          this.focus();
	        }
	      });
	    }); // avoid conflict when clicking moddal toggler while another one is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen) {
	      Modal.getInstance(allReadyOpen).hide();
	    }

	    const data = Modal.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  enableDismissTrigger(Modal);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Modal to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Modal);

	  return Modal;

	}));

	}(modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(selectorEngine.exports, manipulator.exports, eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (SelectorEngine, Manipulator, EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): offcanvas.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'offcanvas';
	  const DATA_KEY = 'bs.offcanvas';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    scroll: false
	  };
	  const DefaultType = {
	    backdrop: 'boolean',
	    keyboard: 'boolean',
	    scroll: 'boolean'
	  };
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	  const OPEN_SELECTOR = '.offcanvas.show';
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Offcanvas extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._isShown = false;
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();

	      this._addEventListeners();
	    } // Getters


	    static get NAME() {
	      return NAME;
	    }

	    static get Default() {
	      return Default;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;
	      this._element.style.visibility = 'visible';

	      this._backdrop.show();

	      if (!this._config.scroll) {
	        new ScrollBarHelper().hide();
	      }

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const completeCallBack = () => {
	        if (!this._config.scroll) {
	          this._focustrap.activate();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(completeCallBack, this._element, true);
	    }

	    hide() {
	      if (!this._isShown) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._focustrap.deactivate();

	      this._element.blur();

	      this._isShown = false;

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._backdrop.hide();

	      const completeCallback = () => {
	        this._element.setAttribute('aria-hidden', true);

	        this._element.removeAttribute('aria-modal');

	        this._element.removeAttribute('role');

	        this._element.style.visibility = 'hidden';

	        if (!this._config.scroll) {
	          new ScrollBarHelper().reset();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._queueCallback(completeCallback, this._element, true);
	    }

	    dispose() {
	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _initializeBackDrop() {
	      return new Backdrop({
	        className: CLASS_NAME_BACKDROP,
	        isVisible: this._config.backdrop,
	        isAnimated: true,
	        rootElement: this._element.parentNode,
	        clickCallback: () => this.hide()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _addEventListeners() {
	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (this._config.keyboard && event.key === ESCAPE_KEY) {
	          this.hide();
	        }
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Offcanvas.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	      // focus on trigger when it is closed
	      if (isVisible(this)) {
	        this.focus();
	      }
	    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen && allReadyOpen !== target) {
	      Offcanvas.getInstance(allReadyOpen).hide();
	    }

	    const data = Offcanvas.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => SelectorEngine__default.default.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
	  enableDismissTrigger(Offcanvas);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  defineJQueryPlugin(Offcanvas);

	  return Offcanvas;

	}));

	}(offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	          element;

	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }

	      element = document.getElementById(id);

	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }

	        element.focus();
	      }
	    }, false);
	  }
	})();

	const button = document.createElement("button");
	button.innerHTML = "Посмотреть всё";
	button.setAttribute("class", "btn btn-outline-light rounded-0 d-block mt-4 m-auto");
	const port = document.getElementById("portfolio");
	const div_p = document.getElementById("div_2");

	if (window.matchMedia("(max-width: 575.98px)").matches) {
	  port.appendChild(button);
	} else {
	  div_p.appendChild(button);
	}

	button.addEventListener("click", function () {
	  window.open("/portfolio/", "_self");
	});

	if (window.matchMedia("(max-width: 575.98px)").matches) {
	  const a_links = document.body.querySelectorAll('.nav-link');

	  for (let i = 0; i < a_links.length; i++) {
	    a_links[i].addEventListener("click", function () {
	      a_links[i].setAttribute("target", "_blank");
	      close();
	    });
	  }

	  const img = document.getElementById("soul-img");
	  const gal = document.getElementById("gallery-2");

	  if (gal && img) {
	    img.after(gal);
	  } // Добавим класс в футер


	  const divFooter = document.getElementById("text-2");
	  divFooter.classList.add("pt-5"); // Добавление изображения в галерею на JS

	  const imgPort = new Image();
	  imgPort.src = 'https://tattoo.msk.ru/wp-content/uploads/2022/06/SAVE_20220615_084408.jpg';
	  const divPort = document.getElementById("div_1"); //const divCont = document.createElement("div");

	  divPort.after(divCont); //divCont.setAttribute("class", "col-6 col-md-4");

	  divPort.appendChild(imgPort);
	}

	exports.Button = button$1;
	exports.Carousel = carousel;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=child-theme.js.map
