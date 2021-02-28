'use strict';

const { EOL } = require('os');
const { createWriteStream, createReadStream } = require('fs');

/**
 * 文件合并
 *
 * @param {string[]} files
 * @param {string} dest
 * @param {object=} options
 */
function concat(files, dest, options = {}) {
  if (!files || !files.length) {
    return Promise.reject(new Error('files can not be empty'));
  }

  if (!dest) {
    return Promise.reject(new Error('dest can not be empty'));
  }

  // 创建 readableStream 和 writableStream 的参数
  const { readable = 'utf8', writable = 'utf8', lineFeed = false } = options;

  return new Promise((resolveReadable, rejectReadable) => {
    const writeStream = createWriteStream(dest, readable)
      .on('finish', () => {
        resolveReadable();
      })
      .on('error', (err) => {
        rejectReadable(err);
      });

    files
      .reduce((prev, p) => {
        return prev.then(() => {
          return new Promise((resolve, reject) => {
            createReadStream(p, writable)
              .on('data', (chunk) => {
                writeStream.write(chunk);
              })
              .on('end', () => {
                if (lineFeed) {
                  writeStream.write(EOL);
                }
                resolve();
              })
              .on('error', (err) => {
                reject(err);
              });
          });
        });
      }, Promise.resolve())
      .then(() => {
        writeStream.end();
      }, (err) => {
        rejectReadable(err);
      });
  });
}

module.exports = concat;
