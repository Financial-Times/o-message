/* eslint-env mocha, sinon, proclaim */

import construct from '../src/js/construct-element';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

const flatten = string => string.replace(/\s/g, '');

describe("constructElement", () => {
	let options;
	beforeEach(() =>  {
		options = {
			messageClass: 'my-message',
			typeClass: 'my-message--alert',
			theme: 'success',
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
	})

	describe('.alertMessage', () => {
		it('returns an HTML element', () => {
			assert.instanceOf(construct.alertMessage(options), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.constructedForAlert));
		});

		it('throws an error if no theme is defined', () => {
			options.theme = null;

			let error = "*** o-message error: Alert type messages require a theme. The options are 'success', 'error', or 'neutral' ***";
			assert.throws(() => construct.alertMessage(options), error);
		});

		describe('builds an inline version of component if an inline option is true', () => {
			beforeEach(() => {
				options.inline = true;
			})

			it.only('if additional info is provided', () => {
				options.content.additionalInfo = 'Additional info'
				assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.constructedForInlineAlert));
			});

			it('if additional info is not provided', () => {
				options.content.additionalInfo = false;
				assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.constructedForInlineAlertNoAdditionalInfo));
			});
		});
	});
});
