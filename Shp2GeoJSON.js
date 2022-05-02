const shapefile = require('shapefile');
const modify = require('./modify');
const path = require('path');


class Shp2GeoJSON{
    constructor() { }

    convert(target, layer) {
        return new Promise((resolve, reject) => {
            const fileName = path.basename(target).split('.').slice(0, -1).join('.');
            shapefile.read(target, undefined, {
                encoding: "utf-8"
              })
            .then(geojson => {
                geojson.features.forEach(f => {
                    f.file = fileName
                    f.layer = layer
                    let _f = modify(f)   
                    if (!_f) return;
                    process.stdout.write(`\x1e${JSON.stringify(_f)}\n`);
                })
                resolve();
            })
            .catch(err => reject);
        })
        
    }
}

module.exports = Shp2GeoJSON;