const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let features = [];

app.post('/api/add-feature', (req, res) => {
    const newFeature = req.body.feature;
    features.push({ name: newFeature, votes: 0 });
    saveFeatures();
    res.json({ message: 'Feature added successfully.' });
});

app.get('/api/features', (req, res) => {
    res.json(features);
});

app.post('/api/vote', (req, res) => {
    const featureName = req.body.feature;
    const feature = features.find(f => f.name === featureName);
    if (feature) {
        feature.votes++;
        saveFeatures();
        res.json({ message: 'Vote counted successfully.' });
    } else {
        res.status(404).json({ error: 'Feature not found.' });
    }
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
