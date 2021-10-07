// 3rd dependances
const bel = require('bel')
const csjs = require('csjs-inject')
// init
const head = require('head')()
const fullScreen = require('fullScreen')()
// modules
const message_maker = require('../src/node_modules/message-maker')
const make_grid = require('../src/node_modules/make-grid')
const logs = require('..')
const {i_button} = require('datdot-ui-button')

function demo () {
    const recipients = []
    let is_checked = false
    let is_selected = false
    const log_list = logs({expanded: 'false'}, protocol('logs'))
    const make = message_maker(`demo / demo.js`)
    const message = make({to: 'demo / demo.js', type: 'ready', refs: ['old_logs', 'new_logs']})
    
    setInterval(()=> {
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'register'}))
        recipients['logs'](make({to: '*', type: 'current-block'}))
        recipients['logs'](make({to: '*', type: 'eventpool'}))
        recipients['logs'](make({to: '*', type: 'keep-alive'}))
        // todo: for testing only, after remove
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
    }, 1200)
    setInterval(()=> { 
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
        // todo: for testing only, after remove
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["New user: poppy, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'info', data: ["Old user: Sharon Septimus, {\"address\":\"5HQyG6vukenbLDPFBsnHkLHpX8rBaHyWi5WD8cy4uUvsSKnE\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[8,94,61,252,227,5,211,20,255,248,162,237,241,237,238,88,226,240,104,226,168,119,35,35,188,81,92,25,228,226,253,61]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[172,229,161,118,201,45,60,40,217,146,238,23,93,212,161,31,176,194,119,44,139,186,111,39,203,198,158,184,154,206,131,29]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":46}"]  }))
        recipients['logs'](make({to: '*', type: 'extrinsic'}))
        recipients['logs'](make({to: '*', type: 'execute-extrinsic'}))
        recipients['logs'](make({to: '*', type: 'user'}))
        recipients['logs'](make({to: '*', type: 'peer'}))
        recipients['logs'](make({to: '*', type: '@todo'}))
        recipients['logs'](make({to: '*', type: 'hoster'}))
        recipients['logs'](make({to: '*', type: 'encoder'}))
        recipients['logs'](make({to: '*', type: 'attestor'}))
        recipients['logs'](make({to: '*', type: 'chat', data: `[eve] says: {"feedkey":{"type":"Buffer","data":[76,160,52,198,102,163,249,71,227,149,111,218,4,197,117,167,124,176,47,176,225,53,187,139,207,121,189,202,71,102,84,184]},"topic":{"type":"Buffer","data":[94,32,85,249,12,183,242,125,62,191,244,253,212,164,127,243,199,182,126,35,11,188,176,86,240,42,193,107,71,92,16,193]}}`, refs: ["log1: janice, {\"address\":\"5Exp7NViUbfrRrFNPbH33F6GWXJZGwqzE3tyJucUfnLZza6F\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[246,154,158,32,110,242,75,85,125,75,44,97,87,97,125,84,16,91,223,24,142,49,35,89,3,195,18,50,242,76,232,172]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[112,34,215,111,71,153,9,239,173,159,29,36,39,194,233,89,140,136,238,173,89,202,41,77,201,13,27,92,53,12,140,217]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":32}", "log2: two, {\"address\":\"5Gb39p9GLpL4MxkhqY3oBohva4nnF9FGu9NFSE9vom6jpujW\",\"noiseKey\":{\"type\":\"Buffer\",\"data\":[122,245,207,238,106,50,236,161,87,166,209,147,126,179,75,107,146,252,98,69,66,104,15,202,189,1,166,107,131,149,83,158]},\"signingKey\":{\"type\":\"Buffer\",\"data\":[134,88,213,147,241,23,157,79,167,171,44,123,117,117,173,115,80,29,7,100,174,216,180,56,30,125,45,152,195,9,61,182]},\"form\":{},\"idleStorage\":0,\"rating\":0,\"balance\":0,\"id\":38}"]}))
        recipients['logs'](make({to: '*', type: 'expanded'}))
        recipients['logs'](make({to: '*', type: 'collapsed'}))
    }, 1600)
    const click = i_button({name: 'click', body: 'Click', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('click'))
    const open = i_button({name: 'open', body: 'Open', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('open'))
    const close = i_button({name: 'close', body: 'Close', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('close'))
    const error = i_button({name: 'error', body: 'Error', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('error'))
    const warning = i_button({name: 'warning', body: 'Warning', 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('warning'))
    const select = i_button({name: 'select', role: 'button', body: 'Select', selected: is_selected, 
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('select'))
    const toggle = i_button({name: 'toggle', role: 'switch', body: 'Toggle',
    theme: {
        props: { 
            border_radius: '0'
        }
    }}, protocol('toggle'))
            
    const actions = bel`<div class="${css.actions}">${click}${open}${close}${error}${warning}${toggle}${select}</div>`

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${actions}${log_list}
    </div>`

    const test = bel`
        <div class=${css.test}>
            <div class=${css.article}>
                <section>
                    <h2>What is Lorem Ipsum?</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </section>
                <section>
                    <h2>Why do we use it?</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </section>
                <section>
                    <h2>Beautiy landscape</h2>
                    <img src="https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_960_720.jpg" alt="Landscape">
                </section>
            </div>
            <div class=${css.buttons}>
                <button>Hello</button>
                <button>WOW</button>
                <button>Animals</button>
            </div>
        </div>
    `
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
                let {head, type, data, refs, meta} = msg
                // console.table( msg )
                // console.log( `type: ${type}, file: ${file}, line: ${line}`);
                if (type === 'click') return handle_click(head[0])
                recipients['logs'](msg)
            }
        }
    }
}

const css = csjs`
/* 
.test {
    display: grid;
    grid-template-areas: "actions" "article";
    height: 100%;
}
.actions {
    grid-area: actions;
}
.article {
    grid-area: article;
    height: 100%;
    overflow: scroll;
} */
:root {
    /* define colors ---------------------------------------------*/
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 329, 100%, 65%;
    --color-persian-rose: 323, 100%, 50%;
    --color-orange: 32, var(--r);
    --color-light-orange: 36, 100%, 55%;
    --color-safety-orange: 27, 100%, 50%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-viridian-green: 180, 100%, 63%;
    --color-blue: 214, 100%, 49%;
    --color-heavy-blue: 233, var(--r);
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 97, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-deep-green: 136, 79%, 22%;
    --color-green: 136, 82%, 38%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-green-yellow-crayola: 51, 100%, 83%;
    --color-purple: 283, var(--r);
    --color-heliotrope: 288, 100%, 73%;
    --color-medium-purple: 269, 100%, 70%;
    --color-electric-violet: 276, 98%, 48%;
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
    --transparent: transparent;
    /* define font ---------------------------------------------*/
    --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
    --size12: 1.2rem;
    --size13: 1.3rem;
    --size14: 1.4rem;
    --size15: 1.5rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size34: 3.4rem;
    --size36: 3.6rem;
    --size38: 3.8rem;
    --size40: 4rem;
    --size42: 4.2rem;
    --size44: 4.4rem;
    --size46: 4.6rem;
    --size48: 4.8rem;
    --size50: 5rem;
    --size52: 5.2rem;
    --size54: 5.4rem;
    --size56: 5.6rem;
    --size58: 5.8rem;
    --size60: 6rem;
    --weight100: 100;
    --weight300: 300;
    --weight400: 400;
    --weight600: 600;
    --weight800: 800;
    /* define primary ---------------------------------------------*/
    --primary-body-bg-color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size12);
    --primary-size-hover: var(--primary-size);
    --primary-weight: 300;
    --primary-weight-hover: 300;
    --primary-color: var(--color-black);
    --primary-color-hover: var(--color-white);
    --primary-bg-color: var(--color-white);
    --primary-bg-color-hover: var(--color-black);
    --primary-border-width: 1px;
    --primary-border-style: solid;
    --primary-border-color: var(--color-black);
    --primary-border-opacity: 1;
    --primary-radius: 8px;
    --primary-avatar-width: 100%;
    --primary-avatar-height: auto;
    --primary-avatar-radius: 0;
    --primary-disabled-size: var(--primary-size);
    --primary-disabled-color: var(--color-greyA2);
    --primary-disabled-bg-color: var(--color-greyEB);
    --primary-disabled-icon-size: var(--primary-icon-size);
    --primary-disabled-icon-fill: var(--color-greyA2);
    --primary-listbox-option-icon-size: 20px;
    --primary-list-avatar-width: 30px;
    --primary-list-avatar-height: auto;
    --primary-list-avatar-radius: var(--primary-avatar-radius);
    /* define icon settings ---------------------------------------------*/
    --primary-icon-size: var(--size14);
    --primary-icon-size-hover: var(--size14);
    --primary-icon-fill: var(--primary-color);
    --primary-icon-fill-hover: var(--primary-color-hover);
    /* define current ---------------------------------------------*/
    --current-size: var(--primary-size);
    --current-weight: var(--primary-weight);
    --current-color: var(--color-white);
    --current-bg-color: var(--color-black);
    --current-icon-size: var(--primary-icon-size);
    --current-icon-fill: var(--color-white);
    --current-list-selected-icon-size: var(--list-selected-icon-size);
    --current-list-selected-icon-fill: var(--color-white);
    --current-list-selected-icon-fill-hover: var(--color-white);
    --current-list-size: var(--current-size);
    --current-list-color: var(--current-color);
    --current-list-bg-color: var(--current-bg-color);
    /* role listbox settings ---------------------------------------------*/
    /*-- collapsed --*/
    --listbox-collapsed-bg-color: var(--primary-bg-color);
    --listbox-collapsed-bg-color-hover: var(--primary-bg-color-hover);
    --listbox-collapsed-icon-size: var(--size14);
    --listbox-collapsed-icon-size-hover: var(--listbox-collapsed-icon-size);
    --listbox-collapsed-icon-fill: var(--primary-icon-fill);
    --listbox-collapsed-icon-fill-hover: var(--primary-icon-fill-hover);
    --listbox-collapsed-listbox-size: var(--primary-size);
    --listbox-collapsed-listbox-size-hover: var(--listbox-collapsed-listbox-size);
    --listbox-collapsed-listbox-weight: var(--primary-weight);
    --listbox-collapsed-listbox-weight-hover: var(--primary-weight);
    --listbox-collapsed-listbox-color: var(--primary-color);
    --listbox-collapsed-listbox-color-hover: var(-primary-color-hover);
    --listbox-collapsed-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-size-hover: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-fill: var(--color-blue);
    --listbox-collapsed-listbox-icon-fill-hover: var(--color-yellow);
    /*-- expanded ---*/
    --listbox-expanded-bg-color: var(--current-bg-color);
    --listbox-expanded-icon-size: var(--size14);
    --listbox-expanded-icon-fill: var(--color-light-green);
    --listbox-expanded-listbox-size: var(--listbox-collapsed-listbox-size);
    --listbox-expanded-listbox-weight: var(--primary-weight);
    --listbox-expanded-listbox-color: var(--current-color);
    --listbox-expanded-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-expanded-listbox-icon-fill: var(--color-light-green);
    /* role option settings ---------------------------------------------*/
    --list-bg-color: var(--primary-bg-color);
    --list-bg-color-hover: var(--primary-bg-color-hover);
    --list-selected-icon-size: var(--size16);
    --list-selected-icon-size-hover: var(--list-selected-icon-size);
    --list-selected-icon-fill: var(--primary-icon-fill);
    --list-selected-icon-fill-hover: var(--primary-icon-fill-hover);
}
*, *:before, *:after {
    box-sizing: border-box;
}
html {
    font-size: 62.5%;
    height: 100%;
}
body {
    -webkit-text-size-adjust: 100%;
    font-size: var(--primary-font-size);
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bgColor) );
    margin: 0;
    padding: 0;
    overflow: hidden;
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
    grid-template-rows: auto 1fr;
    grid-template-areas: "actions" "terminal";
}
[data-state="debug"] {
    height: 100%;
}
.actions {
    grid-area: actions;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fit, minmax(60px, auto));
    gap: 2px;
}
[aria-selected="true"] {
    color: hsl(var(--color-white));
    background-color: hsl(var(--primary-color));
}
`

document.body.append( demo() )