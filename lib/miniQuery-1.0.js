/*!
 * minQuery v1.0
 *
 * Released under the SHADI license
 *
 * show, hide, addClass and removeClass from DOM elements
 * usage: same as jQuery ;)
 */
var miniQuery = (function(pubsub) {
  var _$ = function(selector) {
    var element = document.querySelector(selector);
    if(element) return new MiniQuery(element);
  };

  var MiniQuery = function(element) {
    this.element = element;
  }
  MiniQuery.prototype = {
    show: function() {
      this.element.setAttribute('style', 'display: block;');
    },
    hide: function() {
      this.element.setAttribute('style', 'display: none;');
    },
    addClass: function(name) {
      var klass = this.element.className + ' ' + name;
      this.element.setAttribute('class', klass.trim());
    },
    removeClass: function(name) {
      var klass = this.element.className.replace(name, '').trim();
      this.element.setAttribute('class', klass);
    }
  }
  return function(global) {
    global.$ = _$;
  }
}());


(function(global, miniQuery) {
  if (!global) throw new Error( "we need a window!" );
  miniQuery(global);
}(window, miniQuery));

