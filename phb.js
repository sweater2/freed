// ==UserScript==
// @name         phb_test1
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  try to take over the world!
// @author       You
// @match        https://www.pornhub.com/view_video.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pornhub.com
// @downloadURL  https://raw.githubusercontent.com/sweater2/freed/master/phb.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function _add_btn() {
        const url = eval('flashvars_' + FLAG_COMMENT_DATA['itemId'])['mediaDefinitions'].filter(n => parseInt(n['quality']) === 720)[0]['videoUrl']
        const pnode = document.createElement('p')
        const anode = document.createElement('a')
        anode.style = 'border: 2px solid black;'
        anode.text = 'M3U8'
        anode.href = url
        anode.target = '_blank'
        pnode.appendChild(anode)
        document.querySelectorAll('div.title-container')[0].prepend(pnode)
    }
    _add_btn()
})();
