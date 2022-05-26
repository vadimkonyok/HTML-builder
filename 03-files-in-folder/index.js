const fs = require("fs");
const path = require("path");
const stream = path.join(__dirname, "secret-folder");
const { stdout } = process;

fs.readdir(stream, { withFileTypes: true }, (err, data) => {
  if (err) throw err;

  data.forEach((element) => {
    if (element.isFile()) {
      const pathFile = path.join(stream, element.name);
      const fileName = path.parse(element.name).name;
      const extFile = path.extname(element.name).slice(1);
      fs.stat(path.join(pathFile), (err, stats) => {
        if (err) throw err;

        stdout.write(`${fileName} - ${extFile} - ${stats.size / 1000} Kb\n`);
      });
    }
  });
});
