/* eslint-env mocha, sinon, proclaim */

import Message from '../src/js/message';
import construct from '../src/js/construct-element';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Message", () => {
	let testArea;
	let message;
	let messageElement;
	let stubs = {};
	let options = {};

	before(() => {
		document.body.innerHTML += '<div id="test-area"></div>';
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('new Message initialised declaratively', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.main;
			stubs.render = sinon.stub(Message.prototype, 'render');
			stubs.open = sinon.stub(Message.prototype, 'open');
			stubs.close = sinon.stub(Message.prototype, 'close');

			options = {};
			messageElement = document.querySelector('[data-o-component=o-message]');
			message = new Message(messageElement);


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
				inline: false,
				typeClass: 'o-message--alert',
				content: {
					highlight: null,
					detail: '&hellip;',
					additionalInfo: null
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

		describe('.render()', () => {
			beforeEach(() => {
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				stubs.constructMessageElement = sinon.stub(Message.prototype, 'constructMessageElement');

				Message.prototype.open.restore();
				Message.prototype.close.restore();
				Message.prototype.constructMessageElement.restore();
			});

			it('does not call `constructMessageElement` if messageEl is an HTML element', () => {
				assert.notCalled(stubs.constructMessageElement);
			});
		});
	});

	describe('new Message initialised imperatively', () => {
		describe('when `opts.autoOpen` is false', () => {
			beforeEach(() => {
				stubs.render = sinon.stub(Message.prototype, 'render');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');

				options.autoOpen = false;
				message = new Message(testArea, options);


				Message.prototype.render.restore();
				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			it('does not open the message', () => {
				assert.notCalled(stubs.open);
			});

			it('closes the message', () => {
				assert.calledOnce(stubs.close);
			});
		});

		describe('accepts a different base class string', () => {
			beforeEach(() => {
				stubs.render = sinon.stub(Message.prototype, 'render');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');

				options.messageClass = 'my-message';
				message = new Message(testArea, options);

				Message.prototype.render.restore();
				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			it('to apply to the element', () => {
				assert.strictEqual(message.opts.messageClass, 'my-message');
			});

			it('to apply to the type class', () => {
				assert.strictEqual(message.opts.typeClass, 'my-message--alert');
			});
		});

		describe('.render()', () => {
			let mockMessageElement;

			beforeEach(() => {
				mockMessageElement = document.createElement('div');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				stubs.constructMessageElement = sinon.stub(Message.prototype, 'constructMessageElement').returns(mockMessageElement);

				message = new Message(null);

				Message.prototype.open.restore();
				Message.prototype.close.restore();
				Message.prototype.constructMessageElement.restore();
			});

			it('calls `constructMessageElement` if messageEl is not an HTML element', () => {
				assert.calledOnce(stubs.constructMessageElement);
			});
		});

		describe('.constructMessageElement()', () => {
			let mockMessageElement;

			beforeEach(() => {
				options = {
					theme: 'success',
					content: {
						highlight: 'Good.'
					}
				};
				mockMessageElement = document.createElement('div');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				sinon.stub(construct, 'alertMessage').returns(mockMessageElement);

				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			afterEach(() => {
				construct.alertMessage.restore();
			});

			it('calls `construct.alertMessage`', () => {
				message = new Message(null, options);
				assert.calledOnce(construct.alertMessage);
			});

			it('throws an error if an incorrect message type is supplied', () => {
				options = {
					messageType: 'marketing'
				};

				const error = "*** o-message error: 'marketing' is not a supported message type. The only available option now is 'alert' ***";
				assert.throws(() => { new Message(null, options); }, error);
			});

			it('throws an error if opts.content.highlight is not declared for an alert type message', () => {
				options.content.highlight = null;
				const error = "*** o-message error: An alert message element requires options.content.highlight ***";

				assert.throws(() => { new Message(null, options); }, error);
			});

			it('throws an error if opts.inline and opts.bleed are true in the same time', () => {
				options.inline = true;
				options.bleed = true;
				const error = "*** o-message error: The message can't bleed and be inline in the same time ***";
				assert.throws(() => { new Message(null, options); }, error);
			});
		});
	});
});
