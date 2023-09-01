import 'preline';
import Glide, { Controls,Swipe } from '@glidejs/glide/dist/glide.modular.esm'
import mediumZoom from 'medium-zoom';
import toc from './toc';

// Initialize table of contents
toc();

// Initialize image zoom
mediumZoom(".kg-image-card > img, .kg-gallery-image > img, img.kg-product-card-image");

/* Preline Plugin */
/**
     * Vanilla JS fork of Preline UI
     * https://github.com/htmlstreamofficial/preline
     *
     * (c) 2023 Html Stream, MIT License, https://github.com/htmlstreamofficial/preline/blob/main/LICENSE
     */

/* Glidejs */
/**
     * Vanilla JS fork of Jędrzej Chałubekt
     * https://github.com/glidejs/glide
     *
     * (c) 2013 Jędrzej Chałubek, MIT License, https://github.com/glidejs/glide/blob/master/LICENSE
     */

document.querySelectorAll('.glide').forEach((element) => {
  let glideInstance = new Glide(element, {
  })
  glideInstance.mount({ Controls, Swipe })
})

/* Gallery layout */

var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function(image) {
  var container = image.closest('.kg-gallery-image');
  var width = image.attributes.width.value;
  var height = image.attributes.height.value;
  var ratio = width / height;
  container.style.flex = ratio + ' 1 0%';
})

/* External links in new tabs */

function externalLinks() {
  const links = Array.from(document.getElementsByTagName("a"));
  links.forEach(link => {
    if (link.getAttribute("href") && link.hostname !== location.hostname) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}
externalLinks();

/* Load more button */

const loadMoreButton = document.querySelector('[data-loadmore]')

if (loadMoreButton) {
  const postsList = document.getElementById('posts')

  var nextPage = null;
  let nextLink = document.querySelector('link[rel="next"]')
  if (nextLink) {
    nextPage = getPage(nextLink);
  } else {
    loadMoreButton.remove()
  }

  loadMoreButton.addEventListener('click', function(e) {
    e.preventDefault()
    loadPosts(nextPage)
  })

  function loadPosts(page) {

    if (!page) {
      return
    }

    fetch(`page/${page}`)
      .then(response => response.text())
      .then(result => {
        var parser = new DOMParser();
        var html = parser.parseFromString(result, "text/html");
        postsList.insertAdjacentHTML('beforeend', html.querySelector('#posts').innerHTML)

        nextLink = html.querySelector('link[rel="next"]')
        if (nextLink) {
          nextPage = getPage(nextLink);
        } else {
          loadMoreButton.parentElement.innerHTML = 'You have reached the last post.'
        }
      })
      .catch(function(err) {
        console.log('Failed to fetch page: ', err);
      });
  }

  function getPage(url) {
    let paths = url.href.split('/')
    return paths[paths.length - 2]
  }
}

/* FitVids */
/**
     * Vanilla JS fork of fitVids.js by Dave Rupert
     * https://github.com/davatron5000/FitVids.js
     *
     * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
     */
var FitVids = (function() {
  'use strict';

  var Constructor = function(selectors) {
    var defaults = 'iframe[src*="player.vimeo.com"], iframe[src*="youtube.com"]';
    var publicAPIs = {};
    var vids;
    var stylesAdded = false;
    var paddingTopCache = {};

    var addStyles = function() {
      if (stylesAdded) return;

      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fitvids{width:100%;position:relative;padding:0;}.fitvids iframe,.fitvids object,.fitvids embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fitvids-styles">' + css + '</style>';
      head.appendChild(div.childNodes[1]);

      stylesAdded = true;
    };

    var wrapVids = function() {
      vids.forEach(function(vid) {
        if ((vid.tagName.toLowerCase() === 'embed' && vid.closest('object')) || vid.closest('.fitvids')) return;

        var height = parseFloat(vid.height);
        var width = parseFloat(vid.width);
        if (!height || !width || isNaN(height) || isNaN(width)) return;

        var paddingTop = paddingTopCache[width] || ((height / width) * 100);
        paddingTopCache[width] = paddingTop;

        var wrapper = document.createElement('div');
        wrapper.className = 'fitvids';
        wrapper.style.paddingTop = paddingTop + '%';

        vid.parentNode.insertBefore(wrapper, vid);
        wrapper.appendChild(vid);
      });
    };

    var init = function() {
      vids = Array.from(document.querySelectorAll(selectors || defaults));
      if (!vids.length) return;

      addStyles();
      wrapVids();
    };

    publicAPIs.render = function() {
      init();
    };

    init();
    return publicAPIs;
  };

  return Constructor;
})();

new FitVids();