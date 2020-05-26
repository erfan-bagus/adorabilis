const glob = require('glob');

class Filefinder {
    getAllfile(path,ext){
       ext = ext !== '' ? ext : '.*' ;
       var file = glob.sync(path+'**/*'+ext,{}).map((item,idex)=>{
         return {
             path:gpath.dirname(item),
             name:gpath.basename(item),
             namenotext:gpath.basename(item).replace(gpath.extname(item),''),
             ext:gpath.extname(item)
         }; 
       });
      return file;
    }
}

module.exports = new Filefinder();