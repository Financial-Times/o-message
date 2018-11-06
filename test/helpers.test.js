/* eslint-env mocha, sinon, proclaim */

import { buildActions } from '../src/js/helpers';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

const flatten = string => string.replace(/\s/g, '');

describe("buildAction helper", () => {
	let mockObj;
	beforeEach(() => {
		mockObj = {
			messageClass: 'o-message',
			opts: {
				type: 'alert',
				status: 'success',
				content: {
					highlight: 'Important'
				},
				actions: {
					primary: {
						text: 'a button',
						url: '#',
						openInNewWindow: false
					},
					secondary: {
						text: 'a link',
						url: '#',
						openInNewWindow: false
					}
				},
				close: true
			}
		};
	});

	context('with `openInNewWindow` as false', () => {
		it('builds an actions element', () => {
			assert.strictEqual(flatten(buildActions(mockObj)), flatten(fixtures.actions));
		});
	});

	context('with `openInNewWindow` as true', () => {
		beforeEach(() => {
			mockObj.opts.actions.primary.openInNewWindow = true;
			mockObj.opts.actions.secondary.openInNewWindow = true;
		});

		it('builds an actions element', () => {
			assert.strictEqual(flatten(buildActions(mockObj)), flatten(fixtures.actionsNewWindow));
		});
	});
});
