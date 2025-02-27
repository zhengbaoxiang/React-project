/*
 * @Date: 2024-02-22 10:03:21
 * @LastEditors: zbx
 * @LastEditTime: 2024-04-26 13:16:27
 * @descript: 文件描述
 */
// 插件打包 zip 
// npm install compressing

console.log("进行 zip ----");

// const { zip } = require("compressing");
// const { resolve } = require("path");

import { zip } from 'compressing';
import { resolve } from 'path';


const zipPath = `./dist.zip`

zip
    .compressDir(resolve("dist/"), zipPath)
    .then(compressDone)
    .catch(handleError);

// success ~
function compressDone() {
    console.log("zip success~~");
}

function handleError(err) {
    console.log(err);
}
