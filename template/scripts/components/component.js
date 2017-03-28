'use strict';
/* global require, module */

var Mustache = require('mustache');
var pretty = require('pretty');
var slugify = require('../libs/slugify');
var prev = require('../libs/previous-selector');
var constants = require('../constants');

/**
 * Renders the components
 * based on keys found in the contents list.
 * Simply renders a mustache template
 * with date from window.COMPONENTS.
 */

// parse template
var $template = document.getElementById('component-template');
var $emptyTemplate = document.getElementById('component-empty-template');

if($template){
  var TEMPLATE = $template.innerHTML;
  var EMPTY_TEMPLATE = $emptyTemplate.innerHTML;
  Mustache.parse(TEMPLATE);
  Mustache.parse(EMPTY_TEMPLATE);

  // create lookup
  var components = [];
  window.COMPONENTS.forEach(function(component){
    components[component.meta.name] = component;
  });
}


function Component($el){

  var queue = [];

  // get all slugs inside the list items
  var keys = Array.prototype.map.call($el.querySelectorAll('li'), function(item){
    return item.textContent;
  });

  var $sectionWrapper = document.createElement('div');
  $sectionWrapper.className = 'component-wrapper';


  // append div with rendered mustache component
  keys.forEach(function(key){

    // create container
    var slug = prev($el, 'h2').id +'-'+ slugify(key);
    var section = document.createElement('section');
    section.id = slug;
    section.className = 'js-section component';

    if(!components[key]){
      section.innerHTML = Mustache.render(EMPTY_TEMPLATE, { key: key });
      $sectionWrapper.appendChild(section);
      return;
    }

    section.classList.add(constants.LOADING_CLASS);

    // make html look pretty with indents and all that
    components[key].output = pretty(components[key].output);

    // create slug from key
    components[key].slug = slug;

    // render template
    queue.push({
      $el: section,
      $wrapper: $sectionWrapper,
      html: Mustache.render(TEMPLATE, components[key])
    });
  });

  $el.parentNode.insertBefore($sectionWrapper, $el.nextSibling);

  return queue;
}

module.exports = Component;