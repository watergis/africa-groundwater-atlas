const path = require('path');
const fs = require('fs')
const glob = require('glob')
const Shp2GeoJSON = require('./shp2geojson');

const getDirectories = (dataDir) => {
    const files = fs.readdirSync(dataDir)
    const dirList = files.filter((file) => {
        return fs.statSync(path.join(dataDir, file)).isDirectory()
    })
    return dirList
}

const getShapefilePath = (dataDir, country) => {
    return new Promise((resolve, reject)=>{
        glob(path.resolve(dataDir, '*.shp') , function(err, files){
            if(err) reject(err)
            if (files.length > 0) {
                resolve({
                    layer: country,
                    shp: files[0]
                })
            } else {
                reject(`No shapefile in ${dataDir}`)
            }
        });
    })
}

const convert = async(shpList) => {
    shpList.forEach(shp => {
        const converter = new Shp2GeoJSON();
        converter.convert(shp.shp, shp.layer);
    })
  }

(async()=>{
    const dataDir = path.resolve(__dirname, './data/AllMaps')
    const directories = getDirectories(dataDir)
    const shpListPromises = directories.map(country=>{
        const countryDir = path.resolve(dataDir, country)
        
        return getShapefilePath(countryDir, country)
    })
    const shpList = await Promise.all(shpListPromises)
    // console.log(shpList)
    convert(shpList)

})();