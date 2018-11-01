import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should say hello', (done /* Needed for asynchronous tests */) => {
		const index = fs.readFileSync('./src/index.html', "utf-8");
		jsdom.env(index, function(err, window) { // It is asynchronous because it has a callback here.
			const h1 = window.document.getElementsByTagName('h1')[0];
			// console.log(h1.innerHTML);
			expect(h1.innerHTML).to.equal('Bienvenido a Bretico!');//equal('Hello World!');
			done(); // Needed for asynchronous tests, so mocha will know it is ready to be evaluated.
			window.close();
		});
	});
});

describe('index.html', () => {
	it('should have a h2 tag with Users text', (done /* Needed for asynchronous tests */) => {
		const index = fs.readFileSync('./src/index.html', "utf-8");
		jsdom.env(index, function(err, window) { // It is asynchronous because it has a callback here.
			const h2 = window.document.getElementsByTagName('h2')[0];
			// console.log(h1.innerHTML);
			expect(h2.innerHTML).to.equal('This are our Users so far:');//equal('Hello World!');
			done(); // Needed for asynchronous tests, so mocha will know it is ready to be evaluated.
			window.close();
		});
	});
});
