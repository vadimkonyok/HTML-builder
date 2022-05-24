const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const dirProject = path.join(__dirname, 'project-dist');


const htmlTemplates = async function() {
    const res = {};
    const componentsPath = path.join(__dirname, 'components');
    const components = await fs.promises.readdir(componentsPath, { withFileTypes: true });
    for (const file of components) {
      const filePath = path.join(componentsPath, file.name);
      if (file.isFile() && (path.extname(filePath) === '.html')) {
        const data = await fs.promises.readFile(filePath);
        res[file.name] = data.toString();
      }
    }
    return res;
  };
  
  // Create index.html  & replace tags with templates
  async function makeIndex() {
    const components = await htmlTemplates();
    const stream = fs.createWriteStream(path.join(dirProject, 'index.html'));
  
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
      if (err) throw err.message;
      let res = data;
      for (const comp of Object.keys(components)) {
        res = res.replace(`{{${comp.split('.')[0]}}}`, components[comp]);
      }
      stream.write(res);
    }); 
  }

  
  async function copyBundleStyle (){
    const writeStream = fs.createWriteStream(path.join(dirProject, 'style.css'), 'utf-8');
    const files = await fs.promises.readdir(path.join(__dirname, "styles"), {withFileTypes: true,});
      files.forEach((file) => {
        const filePath = path.join(path.join(__dirname, "styles"), file.name);
        if (path.extname(filePath) === ".css") {
          const readStream = fs.createReadStream(filePath, "utf-8");
          readStream.pipe(writeStream);
        }
      });
  };

  async function copyFile (filePath, filePathCopy) {
    await fsPromises.rm(filePathCopy, { recursive: true, force: true });
    await fsPromises.mkdir(filePathCopy, { recursive: true });
    const files = await fsPromises.readdir(filePath, {withFileTypes: true,});
    files.forEach(async (file) => {
        if (file.isFile()) {
      await fsPromises.copyFile(path.join(filePath, file.name),path.join(filePathCopy, file.name));
        }else{
            copyFile(path.join(filePath, file.name),path.join(filePathCopy, file.name));
        }
    });
  };


  (async function () {
    await fsPromises.rm(dirProject, {recursive: true, force: true});
    await fsPromises.mkdir(dirProject, {recursive: true});
  
    copyBundleStyle();
    copyFile(path.join(__dirname, 'assets'), path.join(dirProject, 'assets'));
    makeIndex();
  
  }());