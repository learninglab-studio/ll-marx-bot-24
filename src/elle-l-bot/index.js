// module.exports.actionHandler = require("./slack-event-handlers/action-handler")
module.exports.messageHandler = require('./slack-event-handlers/message-handler.js');
module.exports.eventHandler = require('./slack-event-handlers/event-handler.js');
module.exports.slashHandler = require('./slack-event-handlers/slash-handler.js');
// module.exports.shortcutHandler = require('./slack-event-handlers/shortcut-handler.js');
