const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "styles");
const writeStream = fs.createWriteStream(path.join(__dirname, "project-dist", "bundle.css"),"utf-8");
const { stdout } = process;


(async () => {
  const files = await fs.promises.readdir(dirPath, {withFileTypes: true,});
    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name);
      if (path.extname(filePath) === ".css") {
        const readStream = fs.createReadStream(filePath, "utf-8");
        readStream.pipe(writeStream);
      }
    });
    stdout.write("Success!");
})();
