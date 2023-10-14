let featuresList = JSON.parse(localStorage.getItem('featuresList')) || [];

function renderFeatures() {
    const featureList = document.getElementById('feature-list');
    featureList.innerHTML = '';
    featuresList.forEach(feature => {
        const li = createFeatureElement(feature);
        featureList.appendChild(li);
    });
}

function createFeatureElement(feature) {
    const li = document.createElement('li');
    const featureName = `${feature.name} - Votes: `;
    li.textContent = featureName;
    li.classList.add('feature-item');

    li.addEventListener('click', () => {
        if (!li.classList.contains('voted')) {
            feature.votes += 1;
            li.textContent = featureName + feature.votes;
            li.classList.add('voted');
            updateLocalStorage();
        }
    });

    return li;
}

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

function resetData() {
    featuresList = [];
    updateLocalStorage();
    renderFeatures();
}

function updateLocalStorage() {
    localStorage.setItem('featuresList', JSON.stringify(featuresList));
}

document.getElementById('add-button').addEventListener('click', addFeature);
document.getElementById('reset-button').addEventListener('click', resetData);

// Render existing features on page load
renderFeatures();
