/*jslint indent: 4, maxlen: 100 */
/*globals angular, L */

(function (ng, L) {
    'use strict';

    var // Constants
        MAP_URL,

    // Variables
        app = ng.module('app', []);

    MAP_URL = 'https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png' +
        '?access_token=pk.eyJ1Ijoic2hhbXNnb2xhcCIsImEiOiJ1LVdRemlzIn0.5eXoqE6_a8YE1zLKmKtKAg';

    app.controller('map', ['$scope', function (self) {
        self.truc = 'salut';

        var // Private functions
            initMap,
            generateCoordinates,
            generateRandomFeature,

        // Variables
            map,
            travelLayerGroup,
            searchLayerGroup,
            newIcon;

        initMap = function () {
            /*global document */

            map = L.map(document.getElementById('map'), {
                maxBounds: [[-85, -180.0], [85, 180.0]]
            }).setView([0, 0], 2);

            L.tileLayer(MAP_URL, {
                attribution: '&copy OpenStreetMaps Contributors',
                mapId: 'shamsgolap.f02331bb',
                minZoom: 2,
                maxZoom: 18
            }).addTo(map);

            travelLayerGroup = L.geoJson(null, {
                pointToLayer: function (feature, latLng) {
                    /*jslint unparam: true */
                    return L.marker(latLng, {icon: newIcon});
                }
            }).addTo(map);
            searchLayerGroup = L.geoJson(null).addTo(map);
        };

        generateCoordinates = function () {
            return {
                type: 'Point',
                coordinates: [
                    (Math.random() * 100 - 50),
                    (Math.random() * 100 - 50)
                ]
            };
        };

        generateRandomFeature = function () {
            return {
                type: 'Feature',
                geometry: generateCoordinates(),
                properties: {
                    name: Date.now().toString()
                }
            };
        };

        newIcon = L.icon({
            iconUrl: "img/leaf-green.png",
            iconSize: [38, 95]
        });

        (function () {
            /*global setInterval */
            initMap();

            travelLayerGroup.addData(generateRandomFeature());
            travelLayerGroup.addData(generateRandomFeature());
            travelLayerGroup.addData(generateRandomFeature());

            searchLayerGroup.addData(generateRandomFeature());
            searchLayerGroup.addData(generateRandomFeature());
            searchLayerGroup.addData(generateRandomFeature());

            setInterval(function () {
                var ts = Date.now() % 2;
                if (ts) {
                    map.fitBounds(searchLayerGroup.getBounds());
                } else {
                    map.fitBounds(travelLayerGroup.getBounds());
                }
            }, 1000);
        }());
    }]);
}(angular, L));