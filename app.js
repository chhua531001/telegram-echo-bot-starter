let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()
const botimize = require('botimize')('7972PM7L2Z2GWXI0BV0QBP082HQPRZYX', 'telegram');

// https://core.telegram.org/bots#6-botfather
const TOKEN = '440412180:AAGyg6AUBDBWW8KVzL869aL_mYwGVfa4NPU'
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
    console.log(req.body)
    botimize.logIncoming(req.body)
    let chatId = req.body.message.chat.id
    let text = req.body.message.text
    sendMessage(chatId, text)
    res.send()
})

// https://core.telegram.org/bots/api#sendmessage
function sendMessage(chatId, text) {
    let url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    let options = {
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            chat_id: chatId,
            text,
            parse_mode: 'Markdown'
        },
        json: true
    };

    botimize.logOutgoing(options, {parse: 'request'})

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
