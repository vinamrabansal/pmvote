// Load existing features from local storage or initialize an empty array
let featuresList = JSON.parse(localStorage.getItem('featuresList')) || [];

// Function to render features on the page
function renderFeatures() {
    const featureList = document.getElementById('feature-list');
    featureList.innerHTML = '';
    featuresList.forEach(feature => {
        const li = createFeatureElement(feature);
        featureList.appendChild(li);
    });
}

// Function to create a feature element
function createFeatureElement(feature) {
    const li = document.createElement('li');
    li.className = 'feature-item';
    li.textContent = feature.name;
    li.addEventListener('click', () => {
        if (!li.classList.contains('voted')) {
            feature.votes += 1;
            li.classList.add('voted');
            li.innerHTML += `<div class="vote-count">Votes: ${feature.votes}</div>`;
            updateLocalStorage();
        }
    });
    return li;
}

// Function to add a new feature
function addFeature() {
    const newFeatureInput = document.getElementById('new-feature');
    const featureName = newFeatureInput.value.trim();
    if (featureName !== '') {
        featuresList.push({ name: featureName, votes: 0 });
        updateLocalStorage();
        renderFeatures();
        newFeatureInput.value = '';
    }
}

// Function to reset all votes
function resetVotes() {
    featuresList.forEach(feature => {
        feature.votes = 0;
    });
    updateLocalStorage();
    renderFeatures();
}

// Function to reset all features
function resetFeatures() {
    featuresList = [];
    updateLocalStorage();
    renderFeatures();
}

// Function to update local storage with features data
function updateLocalStorage() {
    localStorage.setItem('featuresList', JSON.stringify(featuresList));
}

// Event listeners
document.getElementById('add-button').addEventListener('click', addFeature);
document.getElementById('reset-votes-button').addEventListener('click', resetVotes);
document.getElementById('reset-features-button').addEventListener('click', resetFeatures);

// Render existing features on page load
renderFeatures();
