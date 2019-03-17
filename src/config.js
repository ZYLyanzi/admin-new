import productConf from '@/config/product.conf'
import devConf from '@/config/dev.conf'
let config = null
if( /^vboss.17weima/.test(window.location.host) ) {
    config = productConf 
}else {
    config = devConf
}

module.exports = {...config}
module.exports.default = module.exports;