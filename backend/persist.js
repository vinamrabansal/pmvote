const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

let features = [];

app.post('/api/add-feature', (req, res) => {
    const newFeature = req.body.feature;
    if (!newFeature || newFeature.trim() === '') {
        res.status(400).json({ error: 'Invalid feature.' });
    } else {
        features.push({ name: newFeature, votes: 0 });
        saveFeatures();
        res.json({ message: 'Feature added successfully.' });
    }
});

app.get('/api/features', (req, res) => {
    res.json(features);
});

function saveFeatures() {
    fs.writeFileSync('features.json', JSON.stringify(features));
}

if (fs.existsSync('features.json')) {
    features = JSON.parse(fs.readFileSync('features.json'));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
