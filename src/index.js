const bel = require('bel')
const style_sheet = require('support-style-sheet')
const message_maker = require('message-maker')
const {int2hsla, str2hashint} = require('generator-color')

module.exports = terminal
function terminal ({to = 'terminal', mode = 'compact', expanded = false}, protocol) {
    let is_expanded = expanded
    let types = []
    const send = protocol(get)
    const make = message_maker(`terminal / index.js`)
    const message = make({to, type: 'ready', refs: ['old_logs', 'new_logs']})
    send(message)
    const el = document.createElement('i-terminal')
    const shadow = el.attachShadow({mode: 'closed'})
    const log_list = document.createElement('log-list')
    log_list.setAttribute('aria-label', mode)
    style_sheet(shadow, style)
    shadow.append(log_list)
    return el

    function get (msg) {
        const {head, refs, type, data, meta} = msg
        types.push(type)
        const unique_type = [...new Set(types)]
        const colors = Array.from(unique_type, t => {
            const int = str2hashint(t)
            const color = int2hsla(int)
            return {type: t, color}
        })
        let bg_color = null
        colors.map( obj => {
            if (type.match(/ready|click|triggered|opened|closed|checked|unchecked|selected|unselected|error|warning|toggled/)) return
            obj.type === type ? bg_color = obj.color : bg_color = bg_color
        })
        try {
            const from = bel`<span aria-label=${head[0]} class="from">${head[0]}</span>`
            const to = bel`<span aria-label="to" class="to">${head[1]}</span>`
            const data_info = bel`<span aira-label="data" class="data">data: ${typeof data === 'object' ? JSON.stringify(data) : data}</span>`
            const type_info = bel`<span aria-type="${type}" aria-label="${type}" class="type">${type}</span>`
            const refs_info = bel`<div class="refs"><span>refs:</span></div>`
            refs.map( (ref, i) => refs_info.append(
                bel`<span>${ref}${i < refs.length - 1 ? ',  ' : ''}</span>`
            ))
            const info = bel`<div class="info">${data_info}${refs_info}</div>`
            const header = bel`
            <div class="head">
                ${type_info}
                ${from}
                <span class="arrow">=＞</span>
                ${to}
            </div>`
            const log = bel`<div class="log">${header}</div>`
            if (mode === 'compact') log.append(data_info, refs_info)
            if (mode === 'comfortable') log.append(info)
            const file = bel`
            <div class="file">
                <span>${meta.stack[0]}</span>
                <span>${meta.stack[1]}</span>
            </div>`
            var list = bel`<section class="list" aria-expanded="${is_expanded}">${log}${file}</section>`
            list.onclick = (e) => handle_accordion_event(list)
            if (bg_color) {
                type_info.style.color = `hsl(var(--color-dark))`
                type_info.style.backgroundColor = bg_color
            }
            log_list.append(list)
            el.scrollTop = el.scrollHeight
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => log_list.append(list))
            return false
        }
    }

    function handle_accordion_event (e) {
        const status = !is_expanded
        is_expanded = status
        e.setAttribute('aria-expanded', is_expanded)
    }
}

const style = `
:host(i-terminal) {
    --bg-color: var(--color-dark);
    --opacity: 1;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bg-color), var(--opacity));
    height: 100%;
    overflow: hidden auto;
    padding-top: 4px;
}
h4 {
    --bg-color: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bg-color), var(--opacity) );
}
log-list {
    height: 100%;
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
log-list .list:last-child {
    --bg-color: var(--color-viridian-green);
    --opacity: .3;
}
[aria-label="compact"] [aria-expanded="false"] .log {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
[aria-label="compact"] [aria-expanded="false"] .data {
    display: line-block;
}
.log {
    line-height: 1.8;
    word-break: break-all;
    white-space: pre-wrap;
}
.log span {
    --size: var(--size12);
    font-size: var(--size);
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
    display: flex;
    gap: 10px;
}
.file > span {
    display: inline-block;
}
.function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
.data {
    padding-left: 8px;
}
.refs {
    --color: var(--color-white);
    display: inline-block;
    color: var(--color);
    padding-left: 8px;
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
[aria-type="info"] {
    --bg-color: var(--color-dodger-blue);
    --opacity: 1;
}
[aria-type="extrinsic"] {
    --bg-color: var(--color-persian-rose);
    --opacity: .5;
}
[aria-type="execute-extrinsic"] {
    --bg-color: var(--color-persian-rose);
    --opacity: 1;
}
[aria-type="register"] {
    --color: var(--color-dark);
    --bg-color: var(--color-amaranth-pink);
    --opacity: 1;
}
[aria-type="current-block"] {
    --color: var(--color-dark);
    --bg-color: var(--color-maximum-blue-green);
    --opacity: 1;
}
[aria-type="eventpool"] {
    --bg-color: var(--color-blue);
    --opacity: 1;
}
[aria-type="keep-alive"] {
    --color: var(--color-dark);
    --bg-color: var(--color-lime-green);
    --opacity: 1;
}
[aria-type="user"] {
    --bg-color: var(--color-medium-purple);
    --opacity: 1;
}
[aria-type="peer"] {
    --color: var(--color-dark);
    --bg-color: var(--color-yellow);
    --opacity: 1;
}
[aria-type="@todo"] {
    --color: var(--color-grey33);
    --bg-color: var(--color-orange);
    --opacity: 1;
}
[aria-type="hoster"] {
    --bg-color: var(--color-slate-blue);
    --opacity: 1;
}
[aria-type="encoder"] {
    --bg-color: var(--color-medium-purple);
    --opacity: 1;
}
[aria-type="attestor"] {
    --bg-color: var(--color-ultra-red);
    --opacity: 1;
}
log-list .list:last-child .type {}
log-list .list:last-child .arrow {
    --color: var(--color-white);
}
log-list .list:last-child .to {
    --color: var(--color-blue-jeans);
}
log-list .list:last-child .file {
    --color: var(--color-white);
}
log-list .list:last-child [aria-type="ready"] {
    --bg-color: var(--color-deep-black);
    --opacity: 0.3;
}
log-list .list:last-child .function {
    --color: var(--color-white);
}
[aria-label="comfortable"] .info {
    padding: 8px;
}
[aria-label="comfortable"] [aria-expanded="false"] .info {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
[aria-label="comfortable"] .data {
    padding: 0 8px 0 0;
}
[aria-label="comfortable"] .refs {
    padding-left: 0;
}
[aria-label="comfortable"] [aria-expanded="true"] .refs {
    padding-top: 6px;
}
[aria-label="comfortable"] [aria-expanded="true"] .refs span:nth-child(1) {
    padding-right: 5px;
}
`