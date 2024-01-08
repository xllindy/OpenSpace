document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([51.4416, 5.4697], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var centerCoordinates = [51.438, 5.478];
    
    var geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false,
    }).addTo(map);

    geocoderControl.on('markgeocode', function (event) {
        var latlng = event.geocode.center;
        var marker = L.marker(latlng).addTo(map);
        map.on('click', function () {
            map.removeLayer(marker);
        });
        map.setView(latlng, 15);
    });

    // Zones
    var centerMarker = L.circle(centerCoordinates, { color: 'red', radius: 600 }).addTo(map);
    var orangeZone = L.circle(centerCoordinates, { color: 'orange', radius: 1400 }).addTo(map);
    var greenZone = L.circle(centerCoordinates, { color: 'green', radius: 2500 }).addTo(map);

    // Markers
    var markersData = [
        { coordinates: [51.4416, 5.4697], text: "Parking garage Philips Stadion (Orange Zone)" },
        { coordinates: [51.445, 5.475], text: "Parking garage Centraal Station (Orange Zone)" },
        { coordinates: [51.437, 5.464], text: "Parking de Vonder (Orange Zone)" },
        { coordinates: [51.449, 5.459], text: "Parking garage Strijp (Green Zone)" },
        { coordinates: [51.438, 5.478], text: "Parking garage Eindhoven Centrum (Red Zone)" }
    ];

    markersData.forEach(function (marker) {
        var popup = L.popup().setContent(marker.text);
        L.marker(marker.coordinates).addTo(map).bindPopup(popup);
    });

    function toggleZones() {
        var zonesVisible = centerMarker.options.opacity !== 0;
    
        [centerMarker, orangeZone, greenZone].forEach(function (zone) {
            zone.setStyle({ opacity: zonesVisible ? 0 : 1, fillColor: zonesVisible ? 'none' : zone.options.color });
        });
    }

    var ToggleZonesControl = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            var button = L.DomUtil.create('button', '', container);
            button.innerHTML = 'Toggle Zones';
            button.onclick = toggleZones;
            return container;
        }
    });
    
    var LocateUserControl = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            var button = L.DomUtil.create('button', '', container);
            button.innerHTML = 'Locate Me';
            button.onclick = function () { map.locate({ setView: true, maxZoom: 15 }); };
            return container;
        }
    });

    map.addControl(new ToggleZonesControl());
    map.addControl(new LocateUserControl());

    map.on('locationfound', function (e) { map.setView(e.latlng, 15); });
    map.on('locationerror', function (e) { alert("Location access denied or not available."); });
});
