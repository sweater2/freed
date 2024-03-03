// ==UserScript==
// @name         javdb
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://javdb.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Your code here...
    var site_url = document.location['href']

    if (site_url.includes('/v/')) {
        function _tmp() {
            const node = document.createElement('div')
            node.id = 'ponydiv'
            Array.from(document.querySelectorAll('video source')).forEach(n => {
                var vnode = document.createElement('video')
                vnode.className = 'ponyvideo'
                vnode.autoplay = true
                vnode.controls = true
                vnode.src = n.src
                // vnode.defaultPlaybackRate = 2.0
                // vnode.playbackRate = 2
                // vnode.width = '100%'
                node.append(vnode)
            })

            Array.from(document.querySelectorAll('div.preview-images a.tile-item')).forEach(n => {
                var tmpnode = document.createElement('img')
                tmpnode.src = n.href
                tmpnode.width = 570
                node.append(tmpnode)
            })

            const oldnode = document.querySelectorAll('div.columns')[5]
            oldnode.parentNode.insertBefore(node, oldnode.nextElementSibling)
            document.querySelectorAll('div.columns')[4].remove()
        }
        _tmp()

        function _tmp2() {
            const itid = setInterval(function () {
                const nodes = Array.from(document.querySelectorAll('div.magnet-name a'))
                if (nodes.length == 0) {
                    return
                }
                const illu_id = site_url.match(/\/v\/(\w+)/)[1]
                nodes.forEach(n => {
                    var anode = document.createElement('a')
                    const magnet = n.href.match(/btih:(\w+)/)[1]
                    anode.href = `http://127.0.0.1:5009/upload_to_oof?cid=2318350689785406064&magnet=${magnet}&id=jdb__${illu_id}__${magnet}`
                    anode.text = 'upload_to_oof'
                    anode.className = 'ponylink'
                    anode.style = 'border: 2px solid black;'
                    n.append(anode)
                })
                clearInterval(itid)
            }, 1000)
        }
        _tmp2()
    }
    else {
        function _tmp3() {
            //alert(Array.from(document.querySelectorAll('div.item a')).map(n=>n.href).join('\t'))
            var divnode = document.createElement('div')
            document.querySelectorAll('div.container')[1].prepend(divnode)

            var anode = document.createElement('a')
            anode.text = 'PONY_GET_PAGE'
            anode.href = 'http://127.0.0.1:5009/img/?init_arg=javtest,_&url=' + encodeURIComponent(window.location.href)
            anode.style = 'border: 2px solid black; position: fixed; z-index: 99;'
            divnode.prepend(anode)

            var anode = document.createElement('a')
            anode.text = 'PONY_SORT_PAGE'
            anode.href = window.location.href + '?t=d,s&sort_type=4'
            anode.style = 'border: 2px solid black;'
            divnode.prepend(anode)

            var anode = document.createElement('a')
            anode.text = 'PONY_VR_PAGE'
            anode.href = window.location.href + '?t=d,212&sort_type=0'
            anode.style = 'border: 2px solid black;'
            divnode.prepend(anode)

            var anode = document.createElement('a')
            anode.text = 'PONY_SEHT_PAGE'
            const vcodes = Array.from(document.querySelectorAll('div.item strong')).map(n => n.innerText).join(',')
            anode.href = 'http://127.0.0.1:5009/main/1?init_arg=seht,seht/37_and_104/,100&name=' + vcodes
            anode.style = 'border: 2px solid black;'
            divnode.prepend(anode)

            Array.from(document.querySelectorAll('div.item>a')).map(n => {
                let jcode = n.querySelectorAll('span[data-code]')
                if (jcode.length > 0) {
                    jcode = jcode[0].getAttribute('data-code')
                }
                else {
                    jcode = n.querySelectorAll('div.video-title strong')[0].innerText
                }
                let pnode = document.createElement('p')

                pnode.appendChild([1].map(n => {
                    let anode = document.createElement('a')
                    anode.style = 'border: 2px solid black;'
                    anode.text = 'MISSAV ' + jcode
                    anode.href = 'https://missav.com/cn/search/' + jcode.replace('-', '')
                    anode.target = '_blank'
                    return anode
                })[0])

                pnode.appendChild([1].map(n => {
                    let anode = document.createElement('a')
                    anode.style = 'border: 2px solid black;'
                    anode.text = 'JABLE ' + jcode
                    anode.href = 'https://jable.tv/search/' + jcode + '/'
                    anode.target = '_blank'
                    return anode
                })[0])

                pnode.appendChild([1].map(n => {
                    let anode = document.createElement('a')
                    anode.style = 'border: 2px solid black;'
                    anode.text = 'JMENU ' + jcode
                    anode.href = 'https://javmenu.com/search?wd=' + jcode
                    anode.target = '_blank'
                    return anode
                })[0])
                n.parentNode.appendChild(pnode)
            })
        }
        _tmp3()
    }
    return

    function f1() {
        var blob = new Blob([site_url]);
        var url = URL.createObjectURL(blob);
        var filename = document.title.split(' | ')[0] + '.ponyinfo.txt'
        var node = document.createElement('a')
        $(node).attr("target", "_blank").attr("download", filename).attr("href", url);
        node.click()
    }

    // f1(); window.close()

    if (!site_url.includes('/v/')) {
        return
        $('a.box').map(function () {
            var url = $(this).attr('href')
            // $(this).attr('href', url + '?pony_down=1')
        })
    }

    if (!site_url.includes('pony_down=1')) {
        return
        Array.from(document.getElementsByTagName('source')).forEach(n => {
            var url = n.src
            var title = site_url.split('/v/').slice(-1)[0] + '.mp4'
            if (!url.includes('.mp4')) return
            url = 'http://127.0.0.1:5009/img/?type=aria_download&aria_name=' + title + '&url=' + encodeURI(url)
            window.location.href = url
        })
    }

    function func() {
        if (!site_url.includes('#gallery-')) return
        var url = 'http:' + $('video>source').attr('src')
        window.open(url)
        clearInterval(tid)
    }

    // var tid = setInterval(func, 2000)
})();
