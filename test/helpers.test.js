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

describe("helpers", () => {
	let mockObj;
	beforeEach(() => {
		mockObj = {
			opts: {
				type: 'alert',
				state: 'success',
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

	describe('buildAction', () => {
		context('with `openInNewWindow` as false', () => {
			it('builds an actions element', () => {
				assert.strictEqual(flatten(buildActions(mockObj.opts.actions)), flatten(fixtures.actions));
			});
		});

		context('with `openInNewWindow` as true', () => {
			beforeEach(() => {
				mockObj.opts.actions.primary.openInNewWindow = true;
				mockObj.opts.actions.secondary.openInNewWindow = true;
			});

			it('builds an actions element', () => {
				assert.strictEqual(flatten(buildActions(mockObj.opts.actions)), flatten(fixtures.actionsNewWindow));
			});
		});

		it('returns an empty string if no actions declared', () => {
			beforeEach(() => {
				mockObj.opts.actions = null;
			});

			it('builds an actions element', () => {
				assert.strictEqual(flatten(buildActions(mockObj.opts)), '');
			});
		});
	});
});
