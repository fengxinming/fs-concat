'use strict';

const { join } = require('path');
const { statSync, readdirSync, unlinkSync } = require('fs');
const concat = require('../src/index');

describe('测试 concat', () => {
  it('对比文件大小', () => {
    let size = 0;
    const fileList = [];
    readdirSync(join(__dirname, 'files'), 'utf8').filter((n) => n !== 'index.js').forEach((file) => {
      file = join(__dirname, 'files', file);
      fileList.push(file);
      size += statSync(file).size;
    });

    const dest = join(__dirname, 'files/index.js');
    try {
      unlinkSync(dest);
    }
    catch (e) {}

    return concat(fileList, dest).then(() => {
      expect(statSync(dest).size).toBe(size);
    });
  });

  it('测试异常情况', () => {
    expect(concat()).rejects.toThrow();
    expect(concat([])).rejects.toThrow();
    expect(concat([123])).rejects.toThrow();
  });
});
