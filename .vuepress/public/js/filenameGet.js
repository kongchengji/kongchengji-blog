const fs = require('fs');
const path = require('path');

let namearr = []
const readDir = (url) => {
  const dirInfo = fs.readdirSync(url);

  dirInfo.map(item=>{
    const location = path.join(url, item);
    const info = fs.statSync(location);
    
    if(info.isDirectory()){
      readDir(location);
    }else{
        //   console.log(`${item}`);
        namearr.push(item);
    }
  });
  console.log(namearr);
}

readDir('../../../docs/threeJs')