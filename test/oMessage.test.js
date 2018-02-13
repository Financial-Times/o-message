/* eslint-env mocha, sinon, proclaim */

import Message from '../src/js/message';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import mainFixture from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Message", () => {
	let testElement;
	let message;
	let messageElement;
	let stubs = {};
	let options = {};

	before(() => {
		document.body.innerHTML += '<div id="test-element"></div>';
		testElement = document.getElementById('test-element');
	});

	afterEach(() =>{
		testElement.innerHTML = '';
	});

	describe('new Message initialised declaratively', () => {
		beforeEach(() => {
			testElement.innerHTML = mainFixture;

			stubs.render = sinon.stub(Message.prototype, 'render');
			stubs.open = sinon.stub(Message.prototype, 'open');
			stubs.close = sinon.stub(Message.prototype, 'close');

			messageElement = document.querySelector('[data-o-component=o-message]');
			message = new Message(messageElement, options);

			Message.prototype.render.restore();
			Message.prototype.open.restore();
			Message.prototype.close.restore();
		});

		it('stores `messageElement` in a `messageEl` property', () => {
			assert.strictEqual(message.messageEl, messageElement);
		});

		it('has default options, and stores them in an `opts` property', () => {
			assert.isObject(message.opts);
			assert.notStrictEqual(message.opts, options);
			assert.deepEqual(message.opts, {
				autoOpen: true,
				messageClass: 'o-message',
				messageType: 'alert',
				bleed: false,
				typeClass: 'o-message--alert',
				content: {
					highlight: null,
					detail: '&hellip;'
				},
				button: {
					text: null,
					url: '#'
				},
				link: {
					text: null,
					url: '#'
				},
				close: true
			});
		});

		it('opens the message by default', () => {
			assert.calledOnce(stubs.open);
		});

		it('does not close the message', () => {
			assert.notCalled(stubs.close);
		});

		it('renders the message', () => {
			assert.calledOnce(stubs.render);
		});
	});

	describe('new Message initialised imperatively', () => {
		beforeEach(() => {
			testElement.innerHTML = mainFixture;

			stubs.render = sinon.stub(Message.prototype, 'render');
			stubs.open = sinon.stub(Message.prototype, 'open');
			stubs.close = sinon.stub(Message.prototype, 'close');

			messageElement = document.querySelector('[data-o-component=o-message]');

			Message.prototype.render.restore();
			Message.prototype.open.restore();
			Message.prototype.close.restore();
		});

		describe('when `opts.autoOpen` is false', () =>  {
			beforeEach(() => {
				options.autoOpen = false;
				message = new Message(messageElement, options);
			});

			it('does not open the message', () => {
				assert.notCalled(stubs.open);
			});

			it('closes the message', () => {
				console.log(stubs);
				assert.calledOnce(stubs.close);
			})
		});
	});
});
