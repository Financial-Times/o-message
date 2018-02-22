/* eslint-env mocha, sinon, proclaim */

import construct from '../src/js/construct-element';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("constructElement", () => {
	const options = {
		messageClass: 'my-message',
		typeClass: 'my-message--alert',
		content: {
			highlight: 'Important',
			action: 'action',
			additionalInfo: 'Additional info'
		},
		link: {
			text: 'a link',
			url: '#'
		},
		button: {
			text: 'a button',
			url: '#'
		},
		close: true
	};

	describe('.alertMessage', () => {
		it('throws an error if no theme is defined', () => {
			let error = "*** o-message error: Alert type messages require a theme. The options are 'success', 'error', or 'neutral' ***";
			options.theme = null;
			assert.throws(() => construct.alertMessage(options), error);
		});

		it('returns an HTML element', () => {
			options.theme = 'neutral';
			assert.instanceOf(construct.alertMessage(options), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			options.theme = 'neutral';
			assert.strictEqual(construct.alertMessage(options).innerHTML, fixtures.constructedForAlert);
		});

		describe('builds an inline version of component if an inline option is true', () => {
			it('in case of additional info is provided', () => {
				options.inline = true;
				assert.strictEqual(construct.alertMessage(options).innerHTML, fixtures.constructedForInlineAlert);
			});
			
			it('and in case if it is not provided', () => {
				options.inline = true;
				options.content.additionalInfo = null;
				assert.strictEqual(construct.alertMessage(options).innerHTML, fixtures.constructedForInlineAlertNoAdditionalInfo);
			});
		});
	});
});
