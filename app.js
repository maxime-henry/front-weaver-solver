// app.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  // Add this line

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/solve', async (req, res) => {
    const { start, end } = req.body;

    try {
        const response = await axios.get(`https://q5zhnwbs3ffm5jqflbwfbodug40supks.lambda-url.us-east-1.on.aws/solver/${start}/${end}`);
        const result = response.data;

        res.json({ result });
    } catch (error) {
        console.error('Error solving puzzle:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
