const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "files");
const filePathCopy = path.join(__dirname, "files-copy");
const { stdout } = process;

(async () => {
  await fs.rm(filePathCopy, { recursive: true, force: true });
  await fs.mkdir(filePathCopy, { recursive: true });
  const files = await fs.readdir(filePath, {withFileTypes: true,});
  files.forEach(async (file) => {
    await fs.copyFile(
      path.join(filePath, file.name),
      path.join(filePathCopy, file.name)
    );
  });
  stdout.write("Success!");
})();
