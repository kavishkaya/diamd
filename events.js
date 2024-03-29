
var config = require('./config');

var Commands = [];

function getCMD(info, func) {
    var types = ['photo', 'image', 'text', 'message'];

    var infos = {
        fromMe: info['fromMe'] === undefined ? true : info['fromMe'], 
        onlyGroup: info['onlyGroup'] === undefined ? false : info['onlyGroup'],
        onlyPinned: info['onlyPinned'] === undefined ? false : info['onlyPinned'],
        onlyPm: info['onlyPm'] === undefined ? false : info['onlyPm'],
        deleteCommand: info['deleteCommand'] === undefined ? true : info['deleteCommand'],
        desc: info['desc'] === undefined ? '' : info['desc'],
        usage: info['usage'] === undefined ? '' : info['usage'],
        use: info['use'] === undefined ? '' : info['use'],
        NoListCmd: info['NoListCmd'] === undefined ? false : info['NoListCmd'],
        warn: info['warn'] === undefined ? '' : info['warn'],
        react: info['react'] === undefined ? '' : info['react'],
        function: func
    };

    if (info['on'] === undefined && info['pattern'] === undefined) {
        infos.on = 'message';
        infos.fromMe = false;
    } else if (info['on'] !== undefined && types.includes(info['on'])) {
        infos.on = info['on'];

        if (info['pattern'] !== undefined) {
            infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
        }
    } else {
        infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
    }

    Commands.push(infos);
    return infos;
}

module.exports = {
    getCMD: getCMD,
    commands: Commands
}
