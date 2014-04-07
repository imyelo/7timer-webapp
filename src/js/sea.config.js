seajs.config({

  "plugins": ["text", "shim"],

  "debug": true,

  "base": "./js/sea-modules/",

  "charset": "utf-8",

  "alias": {
    "$": "gallery/zepto/1.1.3/zepto",
    "zepto": "gallery/zepto/1.1.3/zepto",
    "underscore": "gallery/underscore/1.5.2/underscore",
    "backbone": "gallery/backbone/1.1.0/backbone",
  }

});