const fs = require("fs");
const path = require("path");
const stream = path.join(__dirname, "secret-folder");
const { stdout } = process;

fs.readdir(stream, { withFileTypes: true }, (err, data) => {
  if (err) throw err;

  data.forEach((element) => {
    if (element.isFile()) {
      const pathFile = path.join(__dirname, "secret-folder", `${element.name}`);
      const fileName = element.name.split(".")[0];
      const extFile = path.extname(element.name).split(".")[1];
      fs.stat(path.join(pathFile), (err, stats) => {
        if (err) throw err;
        stdout.write(`${fileName} - ${extFile} - ${stats.size / 1000} Kb\n`);
      });
    }
  });
});
