export default function uuid(
	length = 8,
	chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
	let result = '';
	for (let i = length; i > 0; --i) {
		let char = chars[Math.floor(Math.random() * chars.length)];
		while (result.indexOf(char) >= 0) {
			char = chars[Math.floor(Math.random() * chars.length)];
		}
		result += char;
	}
	return result;
}
