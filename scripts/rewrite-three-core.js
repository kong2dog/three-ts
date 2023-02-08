const fs = require('fs');
const path = require('path');
const glob = require('glob');
const packageJson = require('../package.json');

const umdName = packageJson.name;

const jsPaths = glob.sync(
	path.resolve(__dirname, '../three-extends/jsm/**/*.js')
);
const tsPaths = glob.sync(
	path.resolve(__dirname, '../three-extends/jsm/**/*.ts')
);
const reWriteUrl = (p) => {
	const content = fs.readFileSync(p, { encoding: 'utf8' });
	const bareContent = content.replace(
		/(\.\.\/){2,}three\/three-core\/Three(\.js)?/g,
		`${umdName}/three`
	);
	fs.writeFileSync(p, bareContent, { encoding: 'utf8' });
};
jsPaths.forEach(reWriteUrl);
tsPaths.forEach(reWriteUrl);
