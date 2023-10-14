const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle data writing
app.post('/write', (req, res) => {
    const newData = req.body;
    try {
        const data = JSON.parse(fs.readFileSync('data.json'));
        data.push(newData);
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        res.json({ message: 'Data written successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Endpoint to handle data reading
app.get('/read', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('data.json'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
