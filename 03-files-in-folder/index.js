const fs = require("fs");
const path = require("path");
const stream = path.join(__dirname, "secret-folder");
const { stdout } = process;

fs.readdir(stream, (err, data) => {
  if (err) throw err;

  data.forEach((element) => {
    if (element.isFile()) {
      const pathFile = path.join(stream, element);
      const fileName = path.parse(element).name;
      const extFile = path.extname(element).slice(1);
      fs.stat(path.join(pathFile), (err, stats) => {
        if (err) throw err;
        
          stdout.write(`${fileName} - ${extFile} - ${stats.size / 1000} Kb\n`);
      });
    }
    
  });
});
