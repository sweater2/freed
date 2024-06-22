// ==UserScript==
// @name         py_kemono
// @namespace    http://tampermonkey.net/
// @version      2024-06-22
// @description  try to take over the world!
// @author       You
// @match        https://kemono.su/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kemono.su
// @downloadURL  https://raw.githubusercontent.com/sweater2/freed/master/kemono.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function _load_imgs() {
        let imgcount = 0

        Array.from(document.querySelectorAll('div.post__thumbnail a')).map(n => {
            if (imgcount >= 10) return
            const imgclass = 'ponyimgtmp'
            let imgs = Array.from(n.querySelectorAll('img'))
            if (imgs.length === 1) {
                const imgnode = document.createElement('img')
                imgnode.className = imgclass
                imgnode.src = imgs[0].src
                n.append(imgnode)
                imgs[0].click()
                imgs[0].style['display'] = 'none'
                imgcount++
                return n
            }

            const orig_imgs = Array.from(
                imgs.filter(n2 => !n2.outerHTML.includes('display: none') && !n2.outerHTML.includes('loading="lazy"') && n2.className!==imgclass))
            if (orig_imgs.length!==0) {
                orig_imgs.slice(1).map(n => n.remove())
                if (orig_imgs[0].complete) {
                    Array.from(n.querySelectorAll('img.'+imgclass)).map(n => {n.style['max-height'] = window.innerHeight*0.5+'px'})
                }
                return
            }

            imgs[0].click()
            imgcount++
            return n
        })
    }

    // 去广告
    setInterval(() => {
        Array.from(document.querySelectorAll('div.ad-container,div#player-container')).map(n => {n.style['display']='none'})
    }, 1000);

    // 统计
    const itid = setInterval(function () {
        if (document.querySelectorAll('article').length<1) return
    
        let user_stat = Object()
        Array.from(document.querySelectorAll('article')).map(n => {
            const is_favo_user = n.querySelectorAll('header.post-card__header--fav').length > 0
            if (is_favo_user) return
    
            let imgnum = n.innerText.match(/(\d+) attachment/)
            imgnum = (imgnum === null) ? 0 : parseInt(imgnum[1])
            const user_url = n.querySelectorAll('a')[0].href.split('/post/')[0]
            if (!user_stat.hasOwnProperty(user_url)) {
                user_stat[user_url] = Array()
            }
            user_stat[user_url].push(imgnum)
        })
    
        user_stat = Object.entries(user_stat).map(kv => [kv[0], kv[1].length, kv[1].reduce((a, b) => a + b)])
        user_stat.sort((a, b) => {
            if (a[2] !== b[2]) return a[2] - b[2]
            if (a[1] !== b[1]) return a[1] - b[1]
            return a[0] < b[0] ? 1 : -1
        }).reverse()
    
        let btn_div = document.createElement('div')
        const page_node = document.querySelectorAll('div.card-list')[0]
        page_node.parentNode.insertBefore(btn_div, page_node)
    
        user_stat.map(n => {
            let divnode = document.createElement('div')
            divnode.style = 'border: 2px solid black; z-index: 99; color: white'
            let anode = document.createElement('a')
            anode.text = n[0] + ': img' + n[2] + ', topic' + n[1]
            anode.href = n[0]
            // anode.style = 'border: 2px solid black; z-index: 99;'
            anode.target = '_blank'
    
            divnode.appendChild(anode)
            btn_div.appendChild(divnode)
        })
    
        clearInterval(itid)
    }, 1000)

    // 自动加载
    if (document.location.href.includes('/post/')) {
        _load_imgs()
        setInterval(() => {
            _load_imgs()

            if (document.querySelectorAll('footer.post__footer div.post__actions').length===0) {
                document.querySelectorAll('footer.post__footer')[0].prepend(document.querySelectorAll('div.post__actions')[0])
            }

        }, 5000);
    }
})();
