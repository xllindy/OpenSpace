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
        { coordinates: [51.43955377879621, 5.475480268411852], text: "Q-Park Centrum de Admirant" },
        { coordinates: [51.43796461568124, 5.476700305478944], text: "Q-Park Hooghuis" },
        { coordinates: [51.44259896534542, 5.4858499464668204], text: "Q-Park Fuutlaan" },
        { coordinates: [51.44333684022071, 5.475408293601361], text: "Q-Park de Bijenkorf" },
        { coordinates: [51.44435946540521, 5.480428804323349], text: "Q-Park Kennedyplein" },
        { coordinates: [51.435754714643956, 5.480559812892882], text: "Q-Park Stadhuisplein" },
        { coordinates: [51.43809428775349, 5.4812688858320975], text: "Q-Park Heuvel" },
        { coordinates: [51.44129258985489, 5.473643838558927], text: "Q-Park Mathildelaan" },
        { coordinates: [51.44010399321429, 5.474561433118369], text: "Q-Park Witte Dame" },
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
