// Standaardinstellingen
var defaultSettings = {
    notifications: true,
    backgroundColor: '#cce6ff',
    fontFamily: "'Calibri', sans-serif"
};

// Om instellingen op te slaan
var settings = { ...defaultSettings };

// Laadt opgeslagen instellingen
window.onload = function () {
    loadSettings();
};

function loadSettings() {
    // Haal instellingen op uit localStorage
    var savedSettings = localStorage.getItem('settings');

    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        // Pas de instellingen toe
        applySettings();
    }
}

function saveSettings() {
    // Update de instellingen
    settings.notifications = document.getElementById('notifications').checked;
    settings.backgroundColor = document.getElementById('background-color').value;
    settings.fontFamily = document.getElementById('font-family').value;

    // Sla instellingen op in localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    // Pas de instellingen toe
    applySettings();

    alert('Settings saved!');
}

function restoreDefaultSettings() {
    // Zet instellingen terug naar standaardinstellingen
    settings = { ...defaultSettings };

    // Sla standaardinstellingen op in localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    // Pas de standaardinstellingen toe
    applySettings();

    alert('Default settings restored!');
}

function applySettings() {
    // Pas de instellingen toe op de pagina
    document.body.style.backgroundColor = settings.backgroundColor;
    document.body.style.fontFamily = settings.fontFamily;
}
