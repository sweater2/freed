// ==UserScript==
// @name         pony_pixiv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pixiv.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setInterval(function() {
        // Array.from(document.querySelectorAll('div.list-item.column-2')).filter(n => !n.innerHTML.includes('ugoira')).map(n => n.remove())
        Array.from(document.querySelectorAll('a')).filter(n => n.href.includes('pixiv.net/artworks/')).map(n => {
            const url = n.href
            if (url.match(/artworks\/\d+$/g) === null) return
            n.href = url+'#manga'
        })
    }, 1000)
})();