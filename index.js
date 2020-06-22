const express = require('express')
const spawn = require("child_process").spawn
const app = express()
const port = 3000

app.get('/call', (req, res) => {
    let dataRes;
    const process = spawn('python', ["./hello.py",
        // query | body
        req.query.firstname,
        req.query.lastname])

    process.stdout.on('data', (data) => {
        dataRes = data.toString()

    })

    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataRes)
    });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})