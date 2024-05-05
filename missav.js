// ==UserScript==
// @name         pony_missav
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
// @description  try to take over the world!
// @author       You
// @match        https://missav.com/*cn*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=missav.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function _add_btn() {
        const itid = setInterval(function () {
            let jcodes = Array.from(document.querySelectorAll('a')).map(n => n.href).filter(n => ['-watch-', '#'].every(n2 => n.includes(n2))).map(n => n.split('/cn/').slice(-1)[0].split('#')[0].replace('-uncensored-leak', ''))
            if (jcodes.length < 10) return

            const jcodestr = Array.from((new Set(jcodes))).join(',')
            let anode = document.createElement('a')
            anode.text = 'PONY_SEHT_SEARCH'
            anode.href = 'http://127.0.0.1:5009/main/1?init_arg=seht,seht/37_and_104,100&name=' + jcodestr
            anode.style = 'border: 2px solid black; position: fixed; z-index: 99;'
            document.querySelectorAll('div.mt-4')[0].prepend(anode)

            clearInterval(itid)
        }, 1000)

        let btn_div = document.createElement('div')
        btn_div.style = 'border: 2px solid black; position: fixed; z-index: 99;'
        let btn = document.createElement('input')
        btn.className = 'ponybtn'
        btn.type = 'button'
        btn.value = '清除所有video'
        btn.onclick = function () {
            Array.from(document.querySelectorAll('video.ponyplyrcls')).map(n => [window.hls_dict[n.id].destroy(), n.remove()])
            Object.values(window.hls_dict).map(n => n.destroy())
        }
        btn_div.appendChild(btn)
        Array.from(document.querySelectorAll('div.mt-4 h1')).slice(0, 1).map(n => n.prepend(btn_div))


        const itid2 = setInterval(function () {
            let jcodes = Array.from(document.querySelectorAll('a')).map(n => n.href).filter(n => ['-watch-', '#'].every(n2 => n.includes(n2))).map(n => n.split('/cn/').slice(-1)[0].split('#')[0].replace('-uncensored-leak', ''))
            jcodes = Array.from((new Set(jcodes)))
            if (jcodes.length < 10) return

            let jcode_d = Object()

            jcodes.map(n => {
                const jcode = n.split('-')[0]
                if (!jcode_d.hasOwnProperty(jcode)) { jcode_d[jcode] = 0 }
                jcode_d[jcode]++
            })

            Object.entries(jcode_d).map(n => [n[1], n[0]]).sort().map(n => {
                let btn_div = document.createElement('div')
                btn_div.style = 'border: 2px solid black; z-index: 99; color: white'
                let anode = document.createElement('a')
                anode.text = n[1] + '_' + n[0]
                anode.href = 'https://javdb.com/video_codes/' + n[1] + '?f=download'
                // anode.style = 'border: 2px solid black; z-index: 99;'
                anode.target = '_blank'

                btn_div.appendChild(anode)
                document.querySelectorAll('div.mb-4.border-b')[0].prepend(btn_div)
            })

            clearInterval(itid2)
        }, 1000)
    }

    function _search_redirect() {
        if (!document.location.href.includes('/search/')) return
        const nodes = Array.from(document.querySelectorAll('div.thumbnail.group img')).filter(n => !n.parentNode.href.includes('uncensored-leak'))

        if (nodes.length === 1) {
            nodes[0].parentNode.click()
        }
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
            div_node.style = 'max-height: 800px'
            const video_node = document.createElement('video')
            const node_id = 'ponyplyr' + start_sec
            video_node.id = node_id
            video_node.className = 'ponyplyrcls'
            video_node.crossorigin = "anonymous"
            video_node.playsinline = true
            video_node.style = '--plyr-range-thumb-height: 2px; max-height: 800px'
            div_node.appendChild(video_node)
            document.querySelectorAll('h1.text-base')[0].append(div_node)
            console.log(node_id)
            const player = new Plyr('#' + node_id,
                {
                    // previewThumbnails: { enabled: true, src: vidorev_jav_js_object.single_media_vod_metadata.thumbnail_vtt },
                    // fullscreen: { enabled: true, fallback: 'force' },
                    seekTime: 10,
                    invertTime: false
                });
            const hls = new Hls({
                maxBufferLength: 1,
                maxBufferSize: 52428800 * 0.1
            }
            );
            // const hlsUrl = vidorev_jav_js_object.single_media_sources.slice(-1)[0]['source_file']
            const hlsUrl = window.hls.url//.replace('playlist.m3u8', '1280x720/video.m3u8')
            hls.loadSource(hlsUrl);
            hls.attachMedia(video_node);
            window.hls_dict[node_id] = hls
            // window.hls = hls;
            // player.currentTime = start_sec
            // player.setPreviewThumbnails(prev_vnode.querySelectorAll('video')[0].plyr.thumbnails)
        }

        function _node_flag(elem) {
            const bound_rect = elem.getBoundingClientRect()
            const top = bound_rect['top']
            const height = bound_rect['height']
            const flag = (top + height / 2 >= 0) && (top + height / 2 <= window.innerHeight)
            return flag
        }

        const itid = setInterval(function () {
            var prev_vnode = Array.from(document.querySelectorAll("div.plyr--video")).filter(n => n.getAttribute('ponyproc') !== 'y')
            if (prev_vnode.length !== 1) return
            if (window.hls.url.length < 1) return
            console.log('==== ' + window.hls.url)
            _init()
            prev_vnode = prev_vnode[0]
            const duration = prev_vnode.querySelectorAll('video')[0].duration
            const slice_num = Math.min(90, Math.ceil(duration / 30))
            const slice_sec = duration / slice_num
            if (slice_num > 0) {
                setTimeout(function () {
                    window.hls_dict = Object()
                    for (let _i = 0; _i < slice_num; _i++) {
                        _init_plyr(parseInt(_i * slice_sec), prev_vnode)
                    }

                    console.log('== remove ==')
                    prev_vnode.remove()
                }, 500)

                prev_vnode.setAttribute('ponyproc', 'y')
                clearInterval(itid)
            }
        }, 1000)

        setInterval(function () {
            Array.from(document.querySelectorAll('video.ponyplyrcls')).map(n => {
                if (n.getAttribute('ponysettime') !== '2') {
                    const start_time = parseInt(n.id.replace('ponyplyr', ''))

                    if (n.getAttribute('ponysettime') !== '1') {
                        n.currentTime = start_time
                        n.plyr.currentTime = start_time
                        n.setAttribute('ponysettime', '1')
                        n.plyr.volume = 0.8
                    }

                    n.currentTime = start_time + 1
                    n.plyr.currentTime = start_time + 1
                    n.setAttribute('ponysettime', '2')
                }
            })
        }, 3000)

        setInterval(function () {
            Array.from(document.querySelectorAll('video.ponyplyrcls')).map(n => {
                const hls_obj = window.hls_dict[n.id]
                if (n.plyr.playing) {
                    // hls_obj.userConfig.maxBufferLength = 120
                    // hls_obj.config.maxBufferLength = 120
                }
                else {
                    // hls_obj.userConfig.maxBufferLength = 1
                    // hls_obj.config.maxBufferLength = 1
                }

                if (_node_flag(n)) { n.plyr.play() }
                else { n.plyr.pause() }
            })
        }, 1000)
    }

    function _style() {
        setInterval(() => {
            Array.from(document.querySelectorAll('a')).filter(n => n.href.includes('-uncensored-leak')).map(n => { n.href = n.href.replace('-uncensored-leak', '') })
        }, 2000)
        setInterval(() => {
            Array.from(document.querySelectorAll('a.text-secondary')).filter(n => n.href.includes('/cn/')).map(n => {
                if (n.parentNode.parentNode.querySelectorAll('p.ponysearch').length>0) return
                const jcode = n.href.split('/').slice(-1)[0].split('#')[0].split('-').slice(0, 2).join('-')
                console.log(jcode)
                if (jcode.length <= 4) return
                const url = 'https://javdb.com/search?f=all&q=' + jcode
                n.parentNode.parentNode.appendChild([1].map(x => {
                    let pnode = document.createElement('p')
                    pnode.style = 'border: 2px solid black;'
                    pnode.className = 'ponysearch'
                    let anode = document.createElement('a')
                    anode.text = 'JAVDB ' + jcode
                    anode.href = url
                    anode.target = '_blank'
                    pnode.appendChild(anode)
                    return pnode
                })[0])
            })
        }, 1000)
        setTimeout(() => {
            ['div.grid[x-data]', 'div.relative div.grid'].map(n => {
                const node = document.querySelectorAll(n)
                if (node.length > 0) { node[0].style['display'] = 'inline' }
            })
            document.querySelectorAll('div.relative div.grid')[0].parentNode.appendChild(document.querySelector('div.hidden.order-last'))
            Array.from(document.querySelectorAll('div.relative div.grid a,div.hidden.order-last a')).map(n => n.href)
        }, 5000);
    }

    _add_btn()
    _search_redirect()
    _tmp2()
    _style()
})();