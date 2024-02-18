// ==UserScript==
// @name         pony_pixiv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pixiv.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/sweater2/freed/master/pxv.js
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...

    setInterval(function () {
        // Array.from(document.querySelectorAll('div.list-item.column-2')).filter(n => !n.innerHTML.includes('ugoira')).map(n => n.remove())

        // 换成下面的点击按钮了
        // const durl = document.location.href
        // if (durl.match(/pixiv\.net\/artworks\/\d+$/g) !== null) {
        //     window.location.replace(durl + '#manga')
        // }
        // const btn = document.querySelectorAll('a div.button-link')
        // if (btn.length > 0) { btn[0].click() }

        Array.from(document.querySelectorAll('div.list-item.column-2')).map(n => {
            if (n.getAttribute('ponyproc') !== null) return
            n.style['width'] = '51%'
            n.style['float'] = 'right'
            n.setAttribute('ponyproc', 1)
        })

        Array.from(document.querySelectorAll('a')).filter(n => n.href.includes('pixiv.net/artworks/')).map(n => {
            if (n.getAttribute('ponyimgproc') !== 'y') {
                // const username = Array.from(n.querySelectorAll('img[alt]')).map(n => n.alt).join('').split(' - ').slice(-1)[0].split('的插画')[0]
                const username = Array.from(n.querySelectorAll('img[alt]')).map(n => n.alt).join('')
                if (username.length > 0) {
                    const tnode = document.createElement('p')
                    tnode.innerText = username
                    n.parentNode.append(tnode)
                    // tnode.append(n)
                    n.setAttribute('ponyimgproc', 'y')
                }
            }

            if (n.getAttribute('ponyurlproc') !== 'y') {
                const url = n.href
                if (url.match(/artworks\/\d+$/g) !== null) {
                    n.href = url + '#manga'
                    n.target = '_blank'
                    n.setAttribute('ponyurlproc', 'y')
                }
            }
        })
    }, 1000)
})();