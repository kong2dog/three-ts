const packageJson = require('../package.json');

const umdName = packageJson.name;
exports.replaceExample = (code) => {
	return code
		.replace(/(\.\.\/){1,}examples/g, `${umdName}/three-extends`)
		.replace(/(\.\.\/){1,}three/g, `${umdName}/three`);
};
