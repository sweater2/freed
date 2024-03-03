// ==UserScript==
// @name         pony_jable
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jable.tv/videos/*
// @icon         https://www.google.com/s2/favicons?domain=jable.tv
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function add_btn2() {
        function _btn(value, func) {
            var btn_div = document.createElement('div')
            var btn = document.createElement('input')
            btn.className = 'ponybtn'
            btn.type = 'button'
            btn.id = value
            btn.value = value
            btn.onclick = func
            btn_div.appendChild(btn)
            return btn_div
        }

        var parent_node = document.createElement('div')
        parent_node.style = 'position: fixed; z-index: 99'
        document.getElementById('site-content').prepend(parent_node)

        parent_node.appendChild(_btn('pony_video_page', function () {
            var url = 'http://127.0.0.1:5009/video?jable=' + hlsUrl.split('/').slice(2).join('/')
            window.location.href = url
        }))
        parent_node.appendChild(_btn('pony_thumb_page', function () {
            var url = 'http://127.0.0.1:5009/m3u8_thumb/jable/' + hlsUrl.split('/').slice(2).join('_sep_')
            window.location.href = url
        }))
    }

    function _tmp() {
        function _init() {
            [
                "https://cdn.plyr.io/3.6.12/plyr.polyfilled.js",
                "https://cdn.jsdelivr.net/npm/hls.js@latest"
            ].forEach(u => {
                const script_node = document.createElement('script')
                script_node.src = u
                document.body.prepend(script_node)
            })
            const style_node = document.createElement('link')
            style_node.rel = "stylesheet"
            style_node.href = "https://cdn.plyr.io/3.6.12/plyr.css"
            document.body.prepend(style_node)
        }

        _init()
        setTimeout(function () {
            const video_node = document.createElement('video')
            video_node.crossorigin = "anonymous"
            video_node.playsinline = true
            video_node.style = '--plyr-range-thumb-height: 2px;'
            const prev_vnode = document.querySelectorAll('div.plyr--video')[0]
            prev_vnode.parentElement.appendChild(video_node)
            const player = new Plyr(video_node,
                {
                    // captions: { active: true, update: true, language: 'en' },
                    previewThumbnails: { enabled: true, src: vttUrl },
                    fullscreen: { enabled: true, fallback: 'force' },
                    seekTime: 10,
                    invertTime: false
                });
            const hls = new Hls({
                maxBufferLength: 1200,
                maxBufferSize: 524288000,
                maxLoadingDelay: 20,
            }
            );
            const new_hlsurl = hlsUrl.replace(hlsUrl.match(/https:\/\/.+?\//g), "https://unbanna-shoot.alonestreaming.com")
            hls.loadSource(hlsUrl);
            hls.attachMedia(video_node);
            // window.hls = hls;
            prev_vnode.remove()
        }, 1000)
    }

    function _tmp2() {
        function _init() {
            [
                "https://cdn.plyr.io/3.6.12/plyr.polyfilled.js",
                "https://cdn.jsdelivr.net/npm/hls.js@latest"
            ].forEach(u => {
                const script_node = document.createElement('script')
                script_node.src = u
                document.body.prepend(script_node)
            })
            const style_node = document.createElement('link')
            style_node.rel = "stylesheet"
            style_node.href = "https://cdn.plyr.io/3.6.12/plyr.css"
            document.body.prepend(style_node)
        }

        function _init_plyr(start_sec, prev_vnode) {
            const div_node = document.createElement('div')
            const video_node = document.createElement('video')
            const node_id = 'ponyplyr'+start_sec
            video_node.id = node_id
            video_node.crossorigin = "anonymous"
            video_node.playsinline = true
            video_node.style = '--plyr-range-thumb-height: 2px;'
            prev_vnode.parentElement.appendChild(div_node)
            div_node.appendChild(video_node)
            console.log(node_id)
            const player = new Plyr('#'+node_id,
                {
                    previewThumbnails: { enabled: true, src: vttUrl },
                    // fullscreen: { enabled: true, fallback: 'force' },
                    seekTime: 10,
                    invertTime: false
                });
            const hls = new Hls({
                maxBufferLength: 20,
                maxBufferSize: 524288000
            }
            );
            hls.loadSource(hlsUrl);
            hls.attachMedia(video_node);
            // window.hls = hls;
            // player.currentTime = start_sec
        }

        function _set_time(start_sec) {
            const node_id = 'ponyplyr'+start_sec
            document.querySelectorAll('#'+node_id)[0].currentTime = start_sec
        }

        const itid = setInterval(function () {
            let prev_vnode = document.querySelectorAll('div.plyr--video')
            if (prev_vnode.length === 0) return
            _init()
            prev_vnode = prev_vnode[0]
            const slice_num = Math.ceil(prev_vnode.querySelectorAll('video')[0].duration / 600)
            if (slice_num > 0) {
                setTimeout(function () {
                    for (let _i=0; _i<slice_num; _i++) {
                        _init_plyr(_i*600, prev_vnode)
                    }

                    setTimeout(function () {
                        for (let _i=0; _i<slice_num; _i++) {
                            _set_time(_i*600)
                        }
                    }, 2000)

                    prev_vnode.remove()
                }, 1000)
                clearInterval(itid)
            }
        }, 1000)
    }

    function _play_btns() {
        const plyr_obj = document.querySelectorAll('div.plyr--video video')[0].plyr

        function _btn(value, func) {
            var btn_div = document.createElement('div')
            var btn = document.createElement('input')
            btn.className = 'ponybtn'
            btn.type = 'button'
            btn.id = value
            btn.value = value
            btn.onclick = func
            btn_div.appendChild(btn)
            return btn_div
        }

        var parent_node = document.createElement('div')
        parent_node.style = 'z-index: 99; float: right'
        document.querySelectorAll('div.plyr--video')[0].parentNode.prepend(parent_node)
        parent_node.appendChild(_btn('+10s', function () {
            plyr_obj.currentTime = plyr_obj.currentTime + 10
            plyr_obj.play()
        }))
        parent_node.appendChild(_btn('+1m', function () {
            plyr_obj.currentTime = plyr_obj.currentTime + 60
        }))
        parent_node.appendChild(_btn('+10m', function () {
            plyr_obj.currentTime = plyr_obj.currentTime + 600
        }))
        parent_node.appendChild(_btn('----', function () {
        }))
        parent_node.appendChild(_btn('-10s', function () {
            plyr_obj.currentTime = plyr_obj.currentTime - 10
        }))
        parent_node.appendChild(_btn('-1m', function () {
            plyr_obj.currentTime = plyr_obj.currentTime - 60
        }))
        parent_node.appendChild(_btn('-10m', function () {
            plyr_obj.currentTime = plyr_obj.currentTime - 600
        }))
    }

    add_btn2()
    _tmp2()
    _play_btns()
    // _tmp()
})();
