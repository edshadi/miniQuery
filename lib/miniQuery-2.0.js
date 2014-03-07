/*!
 * minQuery v2.0
 *
 * Released under the SHADI license
 *
 * diff: pubSub awesomeoness with .on() and .trigger() support
 * usage: same as jQuery ;)
 */
var pubSub = (function() {
  var events = {};
  var subscribe = function(target, evt, callback) {
    if (!events[evt]) {
      events[evt] = [];
    }
    var event = document.createEvent("HTMLEvents");
    event.initEvent(evt, true, true);
    event.eventName = evt;

    target.addEventListener(evt, callback, false);
    events[evt].push({ target: target, evt: event });
    return events;
  }

  var publish = function(evt) {
    if (!events[evt]) {
      return false;
    }
    var subscribers = events[evt];

    var len = subscribers.length
    while (len--) {
      var subscriber = subscribers[len];
      subscriber.target.dispatchEvent(subscriber.evt);
    }

  }
  return {
    subscribe: subscribe,
    publish: publish
  };
}());

var miniQuery = (function(pubsub) {
  var _$ = function(selector) {
    var element = document.querySelector(selector);
    if(element) return new MiniQuery(element);
  }

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
    },
    on: function(topic, callback) {
      pubsub.subscribe(this.element, topic, callback);
    },
    trigger: function(topic) {
      pubsub.publish(topic);
    }
  }
  return function(global) {
    global.$ = _$;
  }
}(pubSub));


(function(global, miniQuery) {
  if (!global) throw new Error( "we need a window!" );
  miniQuery(global);
}(window, miniQuery));

