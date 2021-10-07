const bel = require('bel')
const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
const make_grid = require('make-grid')
const {int2hsla, str2hashint} = require('generator-color')
const i_footer = require('footer')
const {i_button} = require('datdot-ui-button')

module.exports = logs

function logs ({name = 'terminal', mode = 'compact', expanded = false, init = 15, limit = 15}, protocol) {
    let is_expanded = expanded
    let types = {}
    let range = init
    let store_msg = []
    let len = store_msg.length
    const recipients = []
    const send = protocol(get)
    const make = message_maker(`${name} / index.js`)
    const message = make({to: name, type: 'ready', refs: ['old_logs', 'new_logs']})
    const el = document.createElement('i-terminal')
    const shadow = el.attachShadow({mode: 'closed'})
    const container = document.createElement('div')
    const i_logs = document.createElement('i-logs')
    const load_more = i_button({
        name: 'load-more', 
        body: 'Load more',
        classlist: 'load-more',
        theme: {
            props: {
                width: '50vw',
            }
        }
    }, load_more_protocol('load-more'))
    const footer = i_footer({name}, footer_protocol(`${name}-footer`))
    send(message)
    container.classList.add('container')
    i_logs.setAttribute('aria-label', mode)
    container.append(i_logs, load_more)
    style_sheet(shadow, style)
    shadow.append(container, footer)

    const intersection_config = {
        root: i_logs,
        rootMargin: '0px',
        threshold: 0
    }
    const intersection_observer = new IntersectionObserver( (entries) => {
        entries.forEach( entry => {
            const {boundingClientRect, intersectionRatio, intersectionRect, isIntersecting, isVisible, rootBounds, target} = entry
            // target.childElementCount
            // console.log(target.scrollHeight);
            // console.log(target.offsetHeight)
        })
    }, intersection_config)

    const mutation_config = {
        attributes: true,
        childList: true,
        characterData: true
    }
    const mutation_observer = new MutationObserver(list_observer)

    mutation_observer.observe(i_logs, mutation_config)
    return el

    function list_observer (entries, observer) {
        entries.forEach( (entry) => {
            const {target, type, attributeName, attributeNamespace, addedNodes, removedNodes, nextSibling, previousSibling, oldValue } = entry
        })
    }
    // handle log list
    function add_log (msg) {
        if (!msg) return
        const {head, refs, type, data, meta} = msg
        try {
            // make an object for type, count, color
            const init = t => ({type: t, count: 0, color: type.match(/ready|click|triggered|opened|closed|checked|unchecked|selected|unselected|expanded|collapsed|error|warning|toggled|changed/) ? null : int2hsla(str2hashint(t)) })
            // to check type is existing then do count++, else return new type
            const add = t => ((types[t] || (types[t] = init(t))).count++, types[t])
            add(type)
            const from = bel`<span aria-label=${head[0]} class="from">${head[0]}</span>`
            const to = bel`<span aria-label="to" class="to">${head[1]}</span>`
            const data_info = bel`<span aira-label="data" class="data">data: ${typeof data === 'object' ? JSON.stringify(data) : data}</span>`
            const type_info = bel`<span aria-type="${type}" aria-label="${type}" class="type">${type}</span>`
            const refs_info = bel`<div class="refs"><span>refs:</span></div>`
            refs.map( (ref, i) => 
                refs_info.append(bel`<span>${ref}${i < refs.length - 1 ? ',  ' : ''}</span>`)
            )
            const info = bel`<div class="info">${data_info}${refs_info}</div>`
            const header = bel`
            <div class="head">
                ${type_info}
                ${from}
                <span class="arrow">=＞</span>
                ${to}
            </div>`
            const log = bel`<div class="logs">${header}${info}</div>`
            const file = bel`
            <div class="file">
                <span>${meta.stack[0]}</span>
                <span>${meta.stack[1]}</span>
            </div>`
            generate_type_color(type, type_info)
            var list = bel`<section class="list" aria-label="${type}" data-id=${i_logs.childElementCount+1} aria-expanded="${is_expanded}" onclick=${() => handle_accordion_event(list)}>${log}${file}</section>`
            if (i_logs.childElementCount < range) i_logs.append(list)
            load_more.style.visibility = i_logs.childElementCount < len ? 'visible' : 'hidden'
            // have an issue with i-footer, it would be return as a msg to make_logs, so make footer_get to saprate make_logs from others
            recipients[`${name}-footer`](make({type: 'messages-count', data: len}))
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => i_logs.append(list))
            return false
        }
    }
    // check logs and store logs as data
    function make_logs (msg) {
        store_msg.push(msg)
        len = store_msg.length
        add_log(msg)
    }
    function generate_type_color (type, el) {
        for (let t in types) { 
            if (t === type && types[t].color) {
                el.style.color = `hsl(var(--color-dark))`
                el.style.backgroundColor = types[t].color
            }   
        }
    }
    function handle_accordion_event (target) {
        const status = target.ariaExpanded === 'false' ? 'true' : 'false'
        target.ariaExpanded = status
    }
    function handle_change_layout (data) {
        const {mode, expanded} = data
        const { childNodes } = i_logs
        if (mode) i_logs.setAttribute('aria-label', mode)
        if (expanded !== void 0) {
            is_expanded = expanded
            childNodes.forEach( list => {
                list.setAttribute('aria-expanded', expanded)
            })
        }
    }
    function handle_selected (args) {
        const selected = args.filter( obj => obj.selected )
        const result = selected[0].text.split(' ')[0].toLowerCase()
        handle_change_layout({mode: result})
    }
    function handle_search_filter (letter) {
        const {childNodes} = i_logs
        childNodes.forEach( item => {
            const from = item.querySelector('.from')
            const to = item.querySelector('.to')
            const data = item.querySelector('.data')
            const refs = item.querySelector('.refs')
            const file = item.querySelector('.file')
            element_match (from, letter)
            element_match (to, letter)
            element_match (data, letter)
            element_match (refs, letter)
            element_match (file, letter)
        })
        const mark = i_logs.querySelectorAll('mark')[0]
        if (mark) mark.classList.add('current')

        const current = i_logs.querySelector('.current')
        if (current) {
            const scrollHeight = i_logs.scrollHeight
            const height = i_logs.offsetHeight
            const offsetTop = current.offsetTop
            if (scrollHeight < height) return i_logs.scrollTop = offsetTop
            if (scrollHeight > height) return i_logs.scrollTop = offsetTop - height
        }
    }
    function element_match (target, letter) {
        // need to add insenstive for regex
        const regex = new RegExp(`${letter}`, 'gi')
        // check target includes letter, add mark inside
        // !important make sure all texts are lowercase to compare from letter
        if (target.textContent.toLowerCase().includes(`${letter}`)) {
            return target.innerHTML = target.textContent.replace(regex, text => `<mark>${text}</mark>`)
        }
        // if not return normal text
        return target.innerHTML = target.textContent.replace(regex, text => text)
    }

    function handle_load_more (args) {
        const start = range
        range = start + limit
        args.filter( (msg, index) => index >= start && index < (start + limit))
            .forEach( msg => add_log(msg) )
    }

    function load_more_protocol (name) {
        return send => {
            recipients[name] = send
            return load_more_get
        }   
    }
    function load_more_get (msg) {
        const {head, refs, type, data, meta} = msg
        const from = head[0].split('/')[0].trim()
        if (type === 'click') handle_load_more(store_msg)
    }
    function footer_protocol (name) {
        return send => {
            recipients[name] = send
            return footer_get
        }   
    }
    // make i-footer not count into logs list
    function footer_get (msg) {
        const {head, refs, type, data, meta} = msg
        const from = head[0].split('/')[0].trim()
        if (type.match(/messages-count/)) return
        if (type === 'layout-mode') return handle_change_layout(data)
        if (type === 'selected') return handle_selected(data.selected)
        if (type === 'search-filter') return handle_search_filter(data.letter)
        if (type === 'cleared-search') return handle_search_filter(data)
    }
    function get (msg) {
        const {head, refs, type, data, meta} = msg
        const from = head[0].split('/')[0].trim()
        make_logs(msg)
    }
}

const init_grid = {
    rows: '1fr auto',
    areas: ['logs', 'footer']
}
const style = `
:host(i-terminal) {
    --bg-color: var(--color-dark);
    --opacity: 1;
    --size: var(--size12);
    --color: var(--color-white);
    grid-area: terminal;
    display: grid;
    ${make_grid(init_grid)}
    font-size: var(--size);
    color: hsl(var(--color));
    background-color: hsla( var(--bg-color), var(--opacity));
    padding-top: 4px;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
}
h4 {
    --bg-color: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bg-color), var(--opacity) );
}
.container {
    grid-area: logs;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    max-width: 100%;
    overflow: hidden scroll;
}
i-logs {
    
}
.load-more {
    margin: 0 auto;
}
i-footer {
    grid-area: footer;
}
.list {
    --bg-color: 0, 0%, 30%;
    --opacity: 0.25;
    --border-radius: 0;
    padding: 2px 10px 2px 0px;
    margin-bottom: 1px;
    background-color: hsla( var(--bg-color), var(--opacity) );
    border-radius: var(--border-radius);
    transition: background-color 0.6s ease-in-out;
    width: 100%;
    max-width: 100%;
}
.list[aria-expanded="false"] .file {
    height: 0;
    opacity: 0;
    transition: opacity 0.3s, height 0.3s ease-in-out;
}
.list[aria-expanded="true"] .file {
    opacity: 1;
    height: auto;
    padding: 4px 8px;
}
i-logs .list:last-child {
    --bg-color: var(--color-viridian-green);
    --opacity: .3;
}
[aria-label="compact"] .list[aria-expanded="false"] .logs {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
[aria-label="compact"] .list[aria-expanded="false"] .head, [aria-label="compact"] .list[aria-expanded="false"] .info {
    display: inline;
}
[aria-label="compact"] .list[aria-expanded="true"] .logs {
    padding-left: 8px;
    oveflow: auto;
}
[aria-label="compact"] .list[aria-expanded="true"] .logs .head {
    margin-left: -8px;
}
[aria-label="compact"] .list[aria-expanded="true"] .data {
    display: inlne-block;
}
[aria-label="compact"] .refs {
    padding-left: 8px;
}
[aria-label="compact"] .info {
    display: inline;
}
.logs {
    line-height: 1.8;
    word-break: break-all;
    white-space: pre-wrap;
}
.head {
    display: inline-block;
}
.type {
    --color: var(--color-greyD9);
    --bg-color: var(--color-greyD9);
    --opacity: .25;
    display: inline-grid;
    color: hsl( var(--color) );
    background-color: hsla( var(--bg-color), var(--opacity) );
    padding: 0 2px;
    justify-self: center;
    align-self: center;
    text-align: center;
    min-width: 92px;
}
.from {
    --color: var(--color-maximum-blue-green);
    display: inline-block;
    color: hsl( var(--color) );
    justify-content: center;
    align-items: center;
    margin: 0 12px;
}
.to {
    --color: var(--color-dodger-blue);
    color: hsl(var(--color));
    display: inline-block;
    margin: 0 12px;
}
.arrow {
    --color: var(--color-grey88);
    color:  hsl(var(--color));
}
.file {
    --color: var(--color-greyA2);
    color: hsl( var(--color) );
    line-height: 1.6;
}
.file > span {
    display: inline-block;
}
.function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
.refs {
    --color: var(--color-white);
    display: inline-block;
    color: var(--color);
}
[aria-type="click"] {
    --color: var(--color-dark);
    --bg-color: var(--color-yellow);
    --opacity: 1;
}
[aria-type="triggered"] {
    --color: var(--color-white);
    --bg-color: var(--color-blue-jeans);
    --opacity: .5;
}
[aria-type="opened"] {
    --bg-color: var(--color-slate-blue);
    --opacity: 1;
}
[aria-type="closed"] {
    --bg-color: var(--color-ultra-red);
    --opacity: 1;
}
[aria-type="error"] {
    --color: var(--color-white);
    --bg-color: var(--color-red);
    --opacity: 1;
}
[aria-type="warning"] {
    --color: var(--color-white);
    --bg-color: var(--color-deep-saffron);
    --opacity: 1;
}
[aria-type="checked"] {
    --color: var(--color-dark);
    --bg-color: var(--color-blue-jeans);
    --opacity: 1;
}
[aria-type="unchecked"] {
    --bg-color: var(--color-blue-jeans);
    --opacity: .3;
}
[aria-type="selected"] {
    --color: var(--color-dark);
    --bg-color: var(--color-lime-green);
    --opacity: 1;
}
[aria-type="unselected"] {
    --bg-color: var(--color-lime-green);
    --opacity: .25;
}
[aria-type="changed"] {
    --color: var(--color-dark);
    --bg-color: var(--color-safety-orange);
    --opacity: 1;
}
[aria-type="expanded"] {
    --bg-color: var(--color-electric-violet);
    --opacity: 1;
}
[aria-type="collapsed"] {
    --bg-color: var(--color-heliotrope);
    --opacity: 1;
}
i-logs .list:last-child .type {}
i-logs .list:last-child .arrow {
    --color: var(--color-white);
}
i-logs .list:last-child .to {
    --color: var(--color-blue-jeans);
}
i-logs .list:last-child .file {
    --color: var(--color-white);
}
i-logs .list:last-child [aria-type="ready"] {
    --bg-color: var(--color-deep-black);
    --opacity: 0.3;
}
i-logs .list:last-child .function {
    --color: var(--color-white);
}
[aria-label="comfortable"] .list[aria-expanded="false"] .logs {
    
}
[aria-label="comfortable"] .data {
    display: block;
    padding: 8px 8px 0px 8px;
}
[aria-label="comfortable"] .list[aria-expanded="false"] .data {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis; 
}
[aria-label="comfortable"] .list[aria-expanded="false"] .refs {
    display: none;
}
[aria-label="comfortable"] .list[aria-expanded="true"] .refs {
    display: block;
    padding-left: 8px;
}
mark {
    --mark: var(--color-light-green);
    background-color: hsl(var(--mark));
}
mark.current {
    --mark: var(--color-orange);
}
/* for smart device */
@media (max-width: 960px) {
    [aria-label="compact"] .list[aria-expanded="false"] .logs {
        width: 100vw;
    }
    [aria-label="compact"] .list[aria-expanded="false"] .list {
        width: 100vw;
    }
}
`