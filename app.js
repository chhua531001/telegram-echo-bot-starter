let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

// https://core.telegram.org/bots#6-botfather
const TOKEN = 'AAGyg6AUBDBWW8KVzL869aL_mYwGVfa4NPU'
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

// handler receiving messages
app.post('/', function (req, res) {
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

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}
