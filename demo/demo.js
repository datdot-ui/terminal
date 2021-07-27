const bel = require('bel')
const csjs = require('csjs-inject')
const message_maker = require('../src/node_modules/message_maker')
const logs = require('..')
const head = require('head')()
const button = require('datdot-ui-button')

function demo () {
    const recipients = []
    let is_checked = false
    let is_selected = false
    const log_list = logs(protocol('logs'))
    const make = message_maker(`demo / demo.js`)
    const message = make({to: 'demo / demo.js', type: 'ready', refs: ['old_logs', 'new_logs']})
    recipients['logs'](message)
    recipients['logs'](make({to: '*', type: 'info'}))
    recipients['logs'](make({to: '*', type: 'extrinsic'}))
    recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
    recipients['logs'](make({to: '*', type: 'register'}))
    recipients['logs'](make({to: '*', type: 'current-block'}))
    recipients['logs'](make({to: '*', type: 'eventpool'}))
    recipients['logs'](make({to: '*', type: 'keep-alive'}))
    recipients['logs'](make({to: '*', type: 'user'}))
    recipients['logs'](make({to: '*', type: 'peer'}))
    recipients['logs'](make({to: '*', type: '@todo'}))
    recipients['logs'](make({to: '*', type: 'hoster'}))
    recipients['logs'](make({to: '*', type: 'encoder'}))
    recipients['logs'](make({to: '*', type: 'attestor'}))
    const click = button({name: 'click', body: 'Click', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('click'))
    const open = button({name: 'open', body: 'Open', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('open'))
    const close = button({name: 'close', body: 'Close', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('close'))
    const error = button({name: 'error', body: 'Error', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('error'))
    const warning = button({name: 'warning', body: 'Warning', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('warning'))
    const select = button({name: 'select', role: 'button', body: 'Select', selected: is_selected, 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('select'))
    const toggle = button({name: 'toggle', role: 'switch', body: 'Toggle',
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('toggle'))
            
    const container = bel`
    <div class="${css.container}">
        <div class="${css.actions}">${click}${open}${close}${error}${warning}${toggle}${select}</div>
    </div>`

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${container}${log_list}
    </div>`

    return app

    function click_event (target) {
        const make = message_maker(`${target} / button / PLAN / handle_click_event`)
        const message = make({type: 'click'})
        recipients['logs'](message)
        trigger_event(target)
    }
    function trigger_event(target) {
        const make = message_maker(`${target} / button / PLAN / handle_trigger_event`)
        const message = make({type: 'triggered'})
        recipients['logs'](message)
    }
    function open_event (target) {
        const make = message_maker(`${target} / button / PLAN / handle_open_event`)
        const message = make({type: 'opened'})
        recipients['logs'](message)
    }
    function close_event (target) {
        const make = message_maker(`${target} / button / USER / handle_error_event`)
        const message = make({type: 'closed'})
        recipients['logs'](message)
    }
    function error_event (target) {
        const make = message_maker(`${target} / button / USER / handle_error_event`)
        const message = make({type: 'error'})
        recipients['logs'](message)
    }
    function warning_event (target) {
        const make = message_maker(`${target} / button / PLAN / handle_warning_event`)
        const message = make({type: 'warning'})
        recipients['logs'](message)
    }
    function toggle_event(target) {
        is_checked = !is_checked
        const type = is_checked === true ? 'checked' : 'unchecked'
        toggle.ariaChecked = is_checked
        const make = message_maker(`${target} / button / JOBS / handle_toggle_event`)
        const message = make({type})
        recipients['logs'](message)
    }
    function selected_event (target) {
        is_selected = !is_selected
        const type = is_selected === true ? 'selected' : 'unselected'
        select.ariaSelected = is_selected
        const make = message_maker(`${target} / button / PLAN / handle_selected_event`)
        const message = make({type})
        recipients['logs'](message)
    }
    function handle_click (from) {
        const [target, type, flow] = from.split(" ").join("").split("/")
        if (target === 'select') return selected_event(target)
        if (target === 'open') return open_event(target)
        if (target === 'close') return close_event(target)
        if (target === 'error') return error_event(target)
        if (target === 'warning') return warning_event(target)
        if (type === 'button') return click_event(target)
        if (type === 'switch') return toggle_event(target)
    }
    function protocol (name) {
        return sender => {
            recipients[name] = sender
            return (msg) => {
                const {head, type, data, refs, meta} = msg
                // console.table( msg )
                // console.log( `type: ${type}, file: ${file}, line: ${line}`);
                if (type === 'click') return handle_click(head[0])
                recipients['logs'](msg)
            }
        }
    }
}

const css = csjs`
:root {
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 127, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green-pigment: 136, 81%, 34%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --color-green: 136, 81%, 34%;
    --transparent: transparent;
    --define-font: *---------------------------------------------*;
    --size12: 1.2rem;
    --size14: 1.4rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size36: 3.6rem;
    --size40: 4rem;
    --define-primary: *---------------------------------------------*;
    --primary-color: var(--color-black);
    --primary-bgColor: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-font-size: var(--size16);
}
* {
    box-sizing: border-box;
}
html {
    font-size: 62.5%;
    height: 100%;
}
body {
    font-size: var(--primary-font-size);
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bgColor) );
    margin: 0;
    padding: 0;
    height: 100%;
}
button {
    --color: var(--color-black);
    --bgColor: var(--color-white);
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    color: hsl( var(--color) );
    background-color: hsl( var(--bgColor) );
    transition: background-color .3s, color .3s ease-in-out;
    cursor: pointer;
}
button:hover {
    --color: var(--color-white);
    --bgColor: var(--color-dark);
}
.wrap {
    display: grid;
    height: 100%;
}
.container {
}
[data-state="debug"] {
    grid-template-rows: 40px 1fr;
    grid-template-columns: auto;
}
.actions {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fit, minmax(60px, auto));
    gap: 2px;
}
[data-state="debug"] i-log {
    height: 100%;
}
[aria-selected="true"] {
    color: hsl(var(--color-white));
    background-color: hsl(var(--primary-color));
}
`

document.body.append( demo() )