/*
 * UI zoom for large screens (2K, 4K…).
 *
 * On wide monitors the UI looks small and leaves big margins. This script adds the zoom CSS
 * (`html { zoom: z }` depending on the window size, see vite-plugin.ts) and makes the page see the
 * same coordinates it would see under browser zoom at z·100 %: mouse/touch/wheel events,
 * getBoundingClientRect, innerWidth/innerHeight, devicePixelRatio and window scrolling.
 * That keeps Konva, Pixi, Leaflet, Three and Naive UI popovers working untouched.
 *
 * Injected inline at the top of <head>, before any other script. At zoom 1 every
 * conversion is the identity.
 */
(function () {
  if (window.__uiZoom) return;

  // The zoom CSS is inlined here at build time (vite-plugin.ts), so the zoom only ever
  // applies together with this shim, and is in place before the first read below.
  var css = "__UI_ZOOM_CSS__";
  if (css.charAt(0) === "@") {
    var style = document.createElement("style");
    style.id = "ui-zoom";
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  var Z = 1;
  window.__uiZoom = { get factor() { return Z; } };

  var desc = function (o, k) {
    return Object.getOwnPropertyDescriptor(o, k) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(o), k);
  };
  var isRoot = function (el) { return el === document.documentElement; };

  function update() {
    var root = document.documentElement;
    if (root) Z = parseFloat(getComputedStyle(root).zoom) || 1;
  }

  // Getter that divides by the zoom (visual coordinates -> page CSS px).
  function divideGetter(target, key, onlyIf) {
    var d = desc(target, key);
    if (!d || !d.get) return;
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: d.enumerable,
      get: function () {
        var v = d.get.call(this);
        return Z === 1 || (onlyIf && !onlyIf(this)) ? v : v / Z;
      },
      set: d.set && function (v) {
        d.set.call(this, Z === 1 || (onlyIf && !onlyIf(this)) ? v : v * Z);
      },
    });
  }

  // Pointer, touch and wheel events
  ['clientX', 'clientY', 'pageX', 'pageY', 'x', 'y', 'movementX', 'movementY'].forEach(function (k) {
    divideGetter(MouseEvent.prototype, k);
  });
  if (window.Touch) ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function (k) { divideGetter(Touch.prototype, k); });
  ['deltaX', 'deltaY'].forEach(function (k) {
    divideGetter(WheelEvent.prototype, k, function (e) { return e.deltaMode === 0; });
  });

  // Rects in viewport coordinates
  function scaleRect(r) {
    return Z === 1 ? r : new DOMRect(r.x / Z, r.y / Z, r.width / Z, r.height / Z);
  }
  [Element.prototype, Range.prototype].forEach(function (proto) {
    var bcr = proto.getBoundingClientRect;
    var cr = proto.getClientRects;
    proto.getBoundingClientRect = function () { return scaleRect(bcr.call(this)); };
    proto.getClientRects = function () {
      var list = cr.call(this);
      if (Z === 1) return list;
      var out = Array.prototype.map.call(list, scaleRect);
      out.item = function (i) { return out[i] || null; };
      return out;
    };
  });
  var efp = Document.prototype.elementFromPoint;
  var efps = Document.prototype.elementsFromPoint;
  Document.prototype.elementFromPoint = function (x, y) { return efp.call(this, x * Z, y * Z); };
  Document.prototype.elementsFromPoint = function (x, y) { return efps.call(this, x * Z, y * Z); };

  // Window metrics
  ['innerWidth', 'innerHeight', 'scrollX', 'scrollY', 'pageXOffset', 'pageYOffset'].forEach(function (k) {
    var d = desc(window, k);
    if (d && d.get) Object.defineProperty(window, k, { configurable: true, get: function () { return d.get.call(window) / Z; } });
  });
  var dpr = desc(window, 'devicePixelRatio');
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, get: function () { return dpr.get.call(window) * Z; } });

  // Root scrolling is in visual px (inner scroll containers already use CSS px)
  function scaleScrollArgs(args) {
    if (Z === 1) return args;
    var a = Array.prototype.slice.call(args);
    if (a[0] !== null && typeof a[0] === 'object') {
      var o = Object.assign({}, a[0]);
      if (typeof o.top === 'number') o.top *= Z;
      if (typeof o.left === 'number') o.left *= Z;
      return [o];
    }
    return a.map(function (v) { return typeof v === 'number' ? v * Z : v; });
  }
  ['scrollTo', 'scroll', 'scrollBy'].forEach(function (k) {
    var w = window[k];
    window[k] = function () { return w.apply(window, scaleScrollArgs(arguments)); };
    var e = Element.prototype[k];
    if (e) Element.prototype[k] = function () {
      return e.apply(this, isRoot(this) ? scaleScrollArgs(arguments) : arguments);
    };
  });
  ['scrollTop', 'scrollLeft', 'scrollHeight', 'scrollWidth', 'clientHeight', 'clientWidth'].forEach(function (k) {
    divideGetter(Element.prototype, k, isRoot);
  });

  update();
  window.addEventListener('resize', update, true);
  document.addEventListener('DOMContentLoaded', update);
  window.addEventListener('load', update);
})();
