#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const process = require('process');
const TemplateEngine = require('./lib/template_engine').default;

const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

program
  .version(version)
  .option('-o, --out <path>', '类型文件输出目录')
  .option('-i, --in <path>', '路由文件输入路径')
  .option('-m --module [name]', '自定义模块名称');

const argv = program.parse(process.argv);

const input = argv.in.replace(/\/$/, '');
const output = argv.out;
const moduleName = argv.module || 'http-rpc-client';

glob(`${input}/**/*.ts`, (er, files) => {
  files = files.filter((path) => {
    const subfix = /\.d\.ts$/;
    // 忽略 route 中间件
    const index = /\/index\.ts$/;
    return !path.match(subfix) && !path.match(index);
  });

  const engine = new TemplateEngine(files, output, input);
  engine.compile(moduleName, version);

  console.info('[Route-Type-Compiler] Route Type Compile success!');
  console.info('[Route-Type-Compiler] Route Type Compile path:', output);
});
