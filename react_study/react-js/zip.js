// 插件打包 zip
const { zip } = require("compressing");
const { resolve } = require("path");
const fs = require("fs");
const zipPath = `./dist.zip`

zip
    .compressDir(resolve("dist/"), zipPath)
    .then(compressDone)
    .catch(handleError);

// success ~
function compressDone() {
    console.log("zip success~~");
    console.log("zip 包路径 == ", __dirname + zipPath);
}
function handleError(err) {
    console.log(err);
}
