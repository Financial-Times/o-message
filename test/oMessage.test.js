/* eslint-env mocha */

import Message from '../src/js/message';
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import mainFixture from './fixture/main';

describe("Message", () => {
	let testElement;

	before(() => {
		document.body.innerHTML += '<div id="test-element"></div>';
		testElement = document.getElementById('test-element');
	});

	afterEach(() =>{
		testElement.innerHTML = '';
	});

	describe('new Message', () => {
		let message;
		let messageElement;
		let stubs = {};
		let options;

		beforeEach(() => {
			testElement.innerHTML = mainFixture;

			stubs.render = sinon.stub(Message.prototype, 'render');
			stubs.open = sinon.stub(Message.prototype, 'open');
			stubs.close = sinon.stub(Message.prototype, 'close');

			messageElement = document.querySelector('[data-o-component=o-message]');
			options = {};
			message = new Message(messageElement, options);

			Message.prototype.render.restore();
			Message.prototype.open.restore();
			Message.prototype.close.restore();
		});
	});
});
