const { llog } = require('../../ll-modules/ll-utilities')
const marxResponseV1 = require('../elle-responses/marx-response-v1');


exports.testing = async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`the Marx bot is running, <@${message.user}>. We have nothing to lose but our chains!`);
}

exports.parseAll = async ({ client, message, say }) => {
    llog.magenta(`parsing all messages, including this one from ${message.channel}`)
    if (BOT_CONFIG.channels.includes(message.channel)) {
        llog.blue(`handling message because ${message.channel} is one of \n${JSON.stringify(BOT_CONFIG.channels, null, 4)}`)
        llog.yellow(message)
    } else if ( message.channel_type == "im" ) {
        llog.magenta(`handling message because ${message.channel} is a DM`)
        llog.yellow(message)
        let result = await client.conversations.history({channel: message.channel, limit: 10})
        llog.magenta(result)
        let openAiResult = await marxResponseV1({ text: message.text, messages: result.messages });
        llog.magenta(openAiResult)
        let slackResult = await say(openAiResult.choices[0].message.content);
    } else {
        llog.magenta(`some other message we aren't handling now--uncomment message-handler line 27 to get the json`)
        llog.blue(`message wasn't in array ${JSON.stringify(BOT_CONFIG.channels, null, 4)}`)
        llog.yellow(message)
    }
}

