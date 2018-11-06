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
						url: '#'
					},
					secondary: {
						text: 'a link',
						url: '#'
					}
				}
			}
		};
	});

	describe('.alertMessage', () => {
		it('returns an HTML element', () => {
			assert.instanceOf(construct.alertMessage(mockObj), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			assert.strictEqual(flatten(construct.alertMessage(mockObj).innerHTML), flatten(fixtures.alert));
		});

		it('throws an error if no status is defined', () => {
			mockObj.opts.status = null;

			let error = "*** o-message error:\nAlert messages require a status. The options are:\n- success\n- error\n- neutral\n***";
			assert.throws(() => construct.alertMessage(mockObj), error);
		});

		describe('builds an inline version of component if an inline option is true', () => {
			beforeEach(() => {
				mockObj.opts.type = 'alert-inner';
			});

			it('if additional info is provided', () => {
				mockObj.opts.content.additionalInfo = 'Additional info';
				assert.strictEqual(flatten(construct.alertMessage(mockObj).innerHTML), flatten(fixtures.innerAlert));
			});

			it('if additional info is not provided', () => {
				mockObj.opts.content.additionalInfo = false;
				assert.strictEqual(flatten(construct.alertMessage(mockObj).innerHTML), flatten(fixtures.innerAlertWithOutAdditionalInfo));
			});
		});
	});

	describe('.noticeMessage', () => {
		beforeEach(() => {
			mockObj = {
				messageClass: 'o-message',
				opts: {
					type: 'notice',
					status: 'inform',
					content: {
						detail: 'Many things are here to be said about this message'
					},
					actions: {
						primary: {
							text: 'a button',
							url: '#'
						},
						secondary: {
							text: 'a link',
							url: '#'
						}
					}
				}
			};
		});

		it('returns an HTML element', () => {
			assert.instanceOf(construct.noticeMessage(mockObj), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			assert.strictEqual(flatten(construct.noticeMessage(mockObj).innerHTML), flatten(fixtures.notice));
		});

		it('throws an error if no status is defined', () => {
			mockObj.opts.status = null;

			let error = "*** o-message error:\nNotice messages require a status. The options are:\n- inform\n- warning\n- warning-light\n***";
			assert.throws(() => construct.noticeMessage(mockObj), error);
		});
	});

	describe('.closeButton', () => {
		it('returns an HTML element', () => {
			assert.instanceOf(construct.closeButton(mockObj), HTMLElement);
		});

		it('builds a close button component', () => {
			assert.strictEqual(flatten(construct.closeButton(mockObj).outerHTML), flatten(fixtures.closeButton));
		});
	});
});
