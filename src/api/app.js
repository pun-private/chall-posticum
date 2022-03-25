const exec = require('child_process').execSync
const express = require('express')

const app = express()
const port = 42088

app.get('/', async (req, res) => {
    res.send('Check our awesome scripts ! by Bakdyr (<3 to Icelandic folks)')
})

app.get('/systemstats', async (req, res) => {
    const {    html, cache,ㅤㅤ} = req.query
    const checkCommands = [
        /* NOT USED ‮/* GUBED ROF ⁦⁧*/ ,'curl -s http://posticum.bidi/status; > /tmp/status' , //⁩
        'vmstat',
        'mpstat | tail -n+2',
        'iostat -h | tail -n+2',ㅤㅤ
    ];

    try {
        let output = ''
        for (let cmd of checkCommands) {
            if (cmd)
              output += await exec(cmd).toString()
        }
        output = (html == undefined ? output : '<pre>'+output+'</pre>')

        if (cacheǃ=true) /* COMMENT // /* disable cache */
            res.set('Cache-Control', 'no-cache')

        res.send(output)
    } catch(e) {
        res.status(500)
        res.send('An error has occured.')
    }
});

app.listen(port)
