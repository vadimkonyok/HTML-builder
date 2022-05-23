const path = require("path");
const fs = require("fs");
const { stdin, stdout } = process;
const stream = fs.createWriteStream(path.join(__dirname, "text.txt"), "utf-8");

stdout.write("Hi. Please enter any text to write to the file.\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    process.exit();
  }
  stream.write(data);
});

process.on("exit", () => {
  stdout.write("Goodbye! See you soon.");
});

process.on("SIGINT", () => {
  process.exit();
});
