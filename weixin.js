// ==UserScript==
// @name         pony_weixin
// @namespace    http://tampermonkey.net/
// @version      2024-03-19
// @description  try to take over the world!
// @author       You
// @match        https://mp.weixin.qq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qq.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const itid = setInterval(function () {
        document.querySelectorAll('div#js_article')[0].style['max-width'] = '60%'
        document.querySelectorAll('div#js_article')[0].style['margin'] = '0 auto'
        clearInterval(itid)
    }, 1000)

    function _insertAfter(parentElement, newElement, targetElement) {
        // let parentElement = targetElement.parentNode
        if (parentElement.lastChild == targetElement)
        {
            parentElement.appendChild(newElement)
        } else {
            parentElement.insertBefore(newElement, targetElement.nextSibling)
        }
    }

    function _split_lines_bak(n) {
        // use $1 as regex group: https://stackoverflow.com/questions/1234712/javascript-replace-with-reference-to-matched-group
        const lines = n.innerText.replace(/(，|。|：|；|？|！|、)/g, '$1\n').split('\n').filter(t => t.length>0)
        if (lines.length>1) {
            n.innerText = ''
            n.style['margin-bottom'] = '15px'

            const par_node = n.parentNode
            lines.slice(0,-1).map(t => {
                // let new_node = n.cloneNode()
                let new_node = document.createElement('p')
                new_node.style['margin-bottom'] = '15px'
                new_node.innerText = t
                par_node.insertBefore(new_node, n)
            })
            n.innerText = lines.slice(-1)[0]
            par_node.append(document.createElement('p'))
            par_node.append(document.createElement('p'))
        } 
    }

    function _split_lines(n) {
        n.setAttribute('ponyproc', 'y')

        // use $1 as regex group: https://stackoverflow.com/questions/1234712/javascript-replace-with-reference-to-matched-group
        const lines = n.innerText.replace(/(，|。|：|；|？|！|、)/g, '$1\n').split('\n').filter(t => t.length>0)
        if (lines.length>1) {
            n.innerText = ''

            const par_node = n
            lines.map(t => {
                let new_node = document.createElement('p')
                new_node.setAttribute('ponyproc', 'y')
                new_node.setAttribute('style', n.getAttribute('style'))
                new_node.style['margin-bottom'] = '15px'
                new_node.innerText = t
                par_node.append(new_node)
            })
            par_node.append(document.createElement('hr'))
        } 
    }
    
    setInterval(() => {
        Array.from(document.querySelectorAll('p:not([ponyproc]')).map(n => {
            // if (n.getAttribute('ponyproc')==='y') {return}

            let childs = Array.from(n.querySelectorAll('span'))
            if (childs.length==0) {childs = [n]}
            childs.map(_split_lines)
            n.setAttribute('ponyproc', 'y')
        })

        Array.from(document.querySelectorAll('span:not([ponyproc]')).map(_split_lines)
    }, 2000)
})();