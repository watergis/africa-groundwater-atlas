module.exports = (f) => {
    if (!f.geometry)return null;
  
    f.tippecanoe = {
        layer: 'africa-groundwater-atlas',
        minzoom: 0,
        maxzoom: 10
    }
  
    // property name to be lowercase
    let props = {
        country: f.layer
    };
    Object.keys(f.properties).forEach(k=>{
        const keyNameLC = k.toLowerCase()
        if (keyNameLC.indexOf('glg') > 0) {
            props['glg'] = f.properties[k];
        } else if (keyNameLC.indexOf('hgcomb') > 0) {
            props['hgcomb'] = f.properties[k];
        }
        
    })
    f.properties = props;
    return f
}  