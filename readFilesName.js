const fs = require('fs');
const path = require('path');

const folderPath = './selected/';
const outputFilePath = './selectedIds.js';

// 读取目录下的所有文件
fs.readdir(folderPath, function (err, files) {
  if (err) {
    console.error("读取目录失败：", err);
    return;
  }

  const selectedIds = [];

  // 遍历每个文件名，并提取数字后存入 selectedIds 数组
  files.forEach(function (file) {
    const regExpResult = /\d+/.exec(file);
    if (regExpResult === null) {
      console.warn("文件名格式错误：", file);
    } else {
      const id = regExpResult[0];
      selectedIds.push(`'${id}'`);
    }
  });

  // 生成导出文件名数组的 JS 文件
  const fileContent = "const selectedIds = [" + selectedIds.join(",") + "];\nmodule.exports = selectedIds;";
  fs.writeFile(outputFilePath, fileContent, function (err) {
    if (err) {
      console.error("写入文件失败：", err);
    } else {
      console.log("选中文件的 ID 已保存到文件：", outputFilePath);
    }
  });

});