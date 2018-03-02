/*global require*/
import './../../main.js';
import Message from './../../src/js/message';

const deleteElementsByClassName  = (className) => {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
}

const setUpDemo = (id, element, opts, variants) => {
	document.getElementById(id).addEventListener('click', () => {
		deleteElementsByClassName('o-message');
		return new Message(element, Object.assign({}, opts, variants));
	});
}

const initDemos = () => {
	let options = {
		content: {
			highlight: 'Highlight!',
			detail: 'Details about the message go here.'
		},
		link: {
			text: 'Relevant Link'
		},
		button: {
			text: 'Button'
		}
	}

	let inlineOptions = Object.assign({}, options, {
		inline: true,
		parentElement: '.demo-inline-message',
		content: {
			highlight: 'Highlight!',
			detail: 'Details about the message go here.',
			additionalInfo: 'If there is more to say about this, please feel free to say it here.'
		}
	});

	setUpDemo('alert-success', null, options, {theme: 'success'});
	setUpDemo('alert-neutral', null, options, {theme: 'neutral'});
	setUpDemo('alert-error', null, options, {theme: 'error'});
	setUpDemo('alert-error-bleed', null, options, {theme: 'error', bleed: true});

	setUpDemo('inline-success', null, inlineOptions, {theme: 'success'});
	setUpDemo('inline-neutral', null, inlineOptions, {theme: 'neutral'});
	setUpDemo('inline-error', null, inlineOptions, {theme: 'error'});
}

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
