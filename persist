const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
    const newData = req.body.data;
    // Write data to a JSON file
    fs.writeFileSync('data.json', JSON.stringify(newData));
    res.json({ message: 'Data saved successfully.' });
});

app.get('/api/data', (req, res) => {
    // Read data from the JSON file
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
