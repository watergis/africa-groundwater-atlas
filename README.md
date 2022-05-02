# africa-groundwater-atlas
This repository is to manage vector tiles for Africa Groundwater Atlas data.

## Data License

This data is using Africa Groundwater Atlas (see [here](http://earthwise.bgs.ac.uk/index.php/Africa_Groundwater_Atlas_Home)).

All data from Africa Groundwater Atlas is under [Creative Commons ‘Attribution/Share Alike’ (CC BY SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/)

## Download data

```bash
curl https://www2.bgs.ac.uk/africagroundwateratlas/downloads/AllMaps.zip --create-dirs -o ./data/AllMaps.zip

unzip ./data/AllMaps.zip -d ./data
```

## convert shp to vectortiles

```
node index.js | \
tippecanoe \
--no-tile-compression \
-n "africa-groundwater-atlas-tiles" \
-N "Vector tiles generated from Africa Groundwater Atlas" \
-A "<a target="_top" rel="noopener" href="https://www2.bgs.ac.uk/africagroundwateratlas/downloadGIS.html">Africa Groundwater Atlas</a>, under <a target="_top" rel="noopener" href="http://earthwise.bgs.ac.uk/index.php/Africa_Groundwater_Atlas_Terms_of_Use">Africa Groundwater Atlas Terms Of Use</a>" \
--maximum-zoom=10 \
--minimum-zoom=0 \
-o ./data/africa-groundwater.mbtiles \
--force
```

## extract mbtiles to pbf

```
tile-join \
--force \
--no-tile-compression \
--output-to-directory=docs/tiles \
--no-tile-size-limit \
./data/africa-groundwater.mbtiles
```

- export vector_layers

```
JSON.stringify(JSON.parse(require('./docs/tiles/metadata.json').json))
```
