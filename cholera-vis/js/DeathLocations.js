Plotly.d3.csv('/cholera-vis/data/pumpLocations.csv', function (err, pumpLocation) {
    Plotly.d3.csv('/cholera-vis/data/deathLocations.csv', function (err, deathLocation) {
        let pumpLat = _.map(_.pluck(pumpLocation, 'latitude'), pLat => pLat);
        let pumpLong = _.map(_.pluck(pumpLocation, 'longitude'), pLong => pLong);
        let deathLat = _.map(_.pluck(deathLocation, 'latitude'), dLat => dLat);
        let deathLong = _.map(_.pluck(deathLocation, 'longitude'), dLong => dLong);
        let deathNum = _.map(_.pluck(deathLocation, 'death'), dCount => parseInt(dCount));
        let deathColors = [
            ['0.0', '#fc9272'],
            ['0.2', '#fb6a4a'],
            ['0.4', '#ef3b2c'],
            ['0.6', '#cb181d'],
            ['0.8', '#a50f15'],
            ['1.0', '#67000d']
        ];

        var data = [
            {
                type: "scattermapbox",
                name: "Pump",
                lat: pumpLat,
                lon: pumpLong,
                marker: { color: "blue", size: 15 },
            },
            {
                type: "scattermapbox",
                name: "Death",
                text: _.map(deathNum, (num) => ('Death: ' + num)),
                lat: deathLat,
                lon: deathLong,
                marker: {
                    color: deathNum,
                    colorscale: deathColors,
                    reversescale: false,
                    opacity: 0.9,
                    size: _.map(deathNum, num => Math.sqrt(num) * 6)
                }
            }
        ];

        var layout = {
            dragmode: "zoom",
            mapbox: { style: "stamen-terrain", center: { lat: 51.513, lon: -0.137 }, zoom: 15.2 },
            margin: { r: 0, t: 0, b: 0, l: 0 }
        };

        Plotly.newPlot("DeathLocations", data, layout, { showLink: false });
    })
});