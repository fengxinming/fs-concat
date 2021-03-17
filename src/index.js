'use strict';

const { EOL } = require('os');
const { isAbsolute, join } = require('path');
const { createWriteStream, createReadStream } = require('fs');

const { isArray } = Array;

/**
 * 文件合并
 *
 * @param {string[]} files
 * @param {string} dest
 * @param {object=} options
 * @returns {Promise}
 */
function concat(files, dest, options = {}) {
  if (!isArray(files) || !files.length) {
    return Promise.reject(new Error('files can not be empty'));
  }

  if (typeof dest !== 'string' || !dest) {
    return Promise.reject(new Error('dest can not be empty'));
  }

  const {
    readable = 'utf8', writable = 'utf8', lineFeed = false, cwd = process.cwd()
  } = options;

  if (!isAbsolute(dest)) {
    dest = join(cwd, dest);
  }

  return new Promise((resolveReadable, rejectReadable) => {
    const writeStream = createWriteStream(dest, readable)
      .on('finish', () => {
        resolveReadable(dest);
      })
      .on('error', (err) => {
        rejectReadable(err);
      });

    files
      .reduce((prev, p) => {
        if (!isAbsolute(p)) {
          p = join(cwd, p);
        }

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
