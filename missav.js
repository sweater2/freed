// ==UserScript==
// @name         pony_missav
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
// @description  try to take over the world!
// @author       You
// @match        https://missav.com/*cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=missav.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
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
            div_node.appendChild(video_node)
            document.querySelectorAll('h1.text-base')[0].append(div_node)
            console.log(node_id)
            const player = new Plyr('#'+node_id,
                {
                    // previewThumbnails: { enabled: true, src: vidorev_jav_js_object.single_media_vod_metadata.thumbnail_vtt },
                    // fullscreen: { enabled: true, fallback: 'force' },
                    seekTime: 10,
                    invertTime: false
                });
            const hls = new Hls({
                maxBufferLength: 10,
                maxBufferSize: 524288000
            }
            );
            // const hlsUrl = vidorev_jav_js_object.single_media_sources.slice(-1)[0]['source_file']
            const hlsUrl = window.hls.url.replace('playlist.m3u8', '1280x720/video.m3u8')
            hls.loadSource(hlsUrl);
            hls.attachMedia(video_node);
            // window.hls = hls;
            player.currentTime = start_sec
            // player.setPreviewThumbnails(prev_vnode.querySelectorAll('video')[0].plyr.thumbnails)
        }

        const itid = setInterval(function () {
            var prev_vnode = document.querySelectorAll('div.plyr--video')
            if (prev_vnode.length === 0) return
            _init()
            setTimeout(function () {
                prev_vnode = prev_vnode[0]
                const slice_num = Math.ceil(prev_vnode.querySelectorAll('video')[0].duration / 300)
                if (slice_num > 0) {
                    for (let _i=0; _i<slice_num; _i++) {
                        _init_plyr(_i*300, prev_vnode)
                    }
                    prev_vnode.remove()
                    clearInterval(itid)
                }
            }, 2000)
        }, 1000)
    }

    _tmp2()
})();