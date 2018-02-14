/* eslint-env mocha, sinon, proclaim */

import construct from '../src/js/construct-element';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe.only("constructElement", () => {
	let options = {
		messageClass: 'my-message',
		typeClass: 'my-message--alert',
		content: {
			highlight: 'Important'
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
		it.skip('throws an error if no theme is defined', () => {
			let error = "Alert type messages require a theme. The options are 'success', 'error', or 'neutral'";
			options.theme = null;
			assert.throws(construct.alertMessage(options), error);
		});

		it('returns an HTML element', () => {
			options.theme = 'neutral';
			assert.instanceOf(construct.alertMessage(options), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			options.theme = 'neutral';
			assert.strictEqual(construct.alertMessage(options).innerHTML, fixtures.constructed);
		});
	});
});
