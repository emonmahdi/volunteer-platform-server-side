const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/',(req, res) => {
    res.send('Volunteer Platform Node server.')
});


app.listen(port, () => {
    console.log('My server is Running.......');
})