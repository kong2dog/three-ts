const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { replaceExample } = require('./rewrite-examples-fun.js');

// 重写d.ts文件中的example & three
const jsPaths = glob.sync(path.resolve(__dirname, '../types/**/*.d.ts'));

const reWriteUrl = (p) => {
	const code = fs.readFileSync(p, { encoding: 'utf8' });
	const newCode = replaceExample(code);
	fs.writeFileSync(p, newCode, { encoding: 'utf8' });
};
jsPaths.forEach(reWriteUrl);
