const bel = require('bel')
const style_sheet = require('support-style-sheet')
const message_maker = require('message_maker')

module.exports = terminal
function terminal (protocol, to = 'terminal') {
    let is_expanded = false
    const send = protocol(get)
    const make = message_maker(`terminal / index.js`)
    const message = make({to, type: 'ready', refs: ['old_logs', 'new_logs']})
    send(message)
    const el = document.createElement('i-terminal')
    const shadow = el.attachShadow({mode: 'closed'})
    const log_list = document.createElement('log_list')
    style_sheet(shadow, style)
    shadow.append(log_list)
    document.addEventListener('DOMContentLoaded', () => { log_list.scrollTop = log_list.scrollHeight })

    return el

    function get (msg) {
        const {head, refs, type, data, meta} = msg
        try {
            const from = bel`<span aria-label=${head[0]} class="from">${head[0]}</span>`
            const to = bel`<span aria-label="to" class="to">${head[1]}</span>`
            const data_info = bel`<span aira-label="data" class="data">data: ${typeof data === 'object' ? JSON.stringify(data) : data}</span>`
            const type_info = bel`<span aria-type="${type}" aria-label="${type}"  class="type">${type}</span>`
            const refs_info = bel`<div class="refs">refs: </div>`
            refs.map( (ref, i) => refs_info.append(bel`<span aria-label="${ref}">${ref}${i < refs.length - 1 ? ', ' : ''}</span>`))
            const log = bel`
            <div class="log">
                <span class="head">
                    ${from}
                    ${type_info}
                    ${to}
                </span>
                ${data_info}
                ${refs_info}
            </div>`
            var list = bel`
            <section class="list" aria-expanded="false" onclick=${(e) => handle_accordion_event(list)}>
                ${log}
                <div class="file">
                    <span>${meta.stack[0]}</span>
                    <span>${meta.stack[1]}</span>
                </div>
            </section>
            `
            log_list.append(list)
            log_list.scrollTop = log_list.scrollHeight
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
    --bgColor: var(--color-dark);
    --opacity: 1;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bgColor), var(--opacity));
    height: 100%;
    overflow: hidden auto;
    padding-top: 4px;
}
h4 {
    --bgColor: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bgColor), var(--opacity) );
}
log_list {}
.list {
    --bgColor: 0, 0%, 30%;
    --opacity: 0.25;
    --border-radius: 0;
    padding: 6px 10px;
    margin-bottom: 4px;
    background-color: hsla( var(--bgColor), var(--opacity) );
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
}
log_list .list:last-child {
    --bgColor: var(--color-verdigris);
    --opacity: 0.5;
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
.from {
    --color: var(--color-maximum-blue-green);
    color: hsl( var(--color) );
    justify-content: center;
    align-items: center;
}
.to {}
.type {
    --color: var(--color-greyD9);
    --bgColor: var(--color-greyD9);
    --opacity: .25;
    color: hsl( var(--color) );
    background-color: hsla( var(--bgColor), var(--opacity) );
    padding: 2px 10px;
    border-radius: 8px;
    justify-self: center;
    align-self: center;
}
log_list .list:last-child .type {}
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
log_list .list:last-child .file {
    --color: var(--color-white);
}
[aria-type="click"] {
    --color: var(--color-dark);
    --bgColor: var(--color-yellow);
    --opacity: 1;
}
[aria-type="triggered"] {
    --color: var(--color-white);
    --bgColor: var(--color-blue-jeans);
    --opacity: .5;
}
[aria-type="opened"] {
    --bgColor: var(--color-slate-blue);
    --opacity: 1;
}
[aria-type="closed"] {
    --bgColor: var(--color-ultra-red);
    --opacity: 1;
}
[aria-type="error"] {
    --color: var(--color-white);
    --bgColor: var(--color-red);
    --opacity: 1;
}
[aria-type="warning"] {
    --color: var(--color-white);
    --bgColor: var(--color-deep-saffron);
    --opacity: 1;
}
[aria-type="checked"] {
    --color: var(--color-dark);
    --bgColor: var(--color-blue-jeans);
    --opacity: 1;
}
[aria-type="unchecked"] {
    --bgColor: var(--color-blue-jeans);
    --opacity: .3;
}
[aria-type="selected"] {
    --color: var(--color-dark);
    --bgColor: var(--color-lime-green);
    --opacity: 1;
}
[aria-type="unselected"] {
    --bgColor: var(--color-lime-green);
    --opacity: .25;
}

log_list .list:last-child [aria-type="ready"] {
    --bgColor: var(--color-deep-black);
    --opacity: 0.3;
}
.function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
log_list .list:last-child .function {
    --color: var(--color-white);
}
.head {
}
.refs {
    display: inline-flex;
    gap: 5px;
    color: white;
}
`