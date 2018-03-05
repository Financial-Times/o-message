/*global require*/
import Message from './../../main.js';

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
	parentElement: '.demo-inline',
	content: {
		highlight: 'Highlight!',
		detail: 'Details about the message go here.',
		additionalInfo: 'If there is more to say about this, please feel free to say it here.'
	}
});

const deleteElementsByClassName  = (className) => {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
}

const setUpDemo = (id, opts, variants) => {
	document.getElementById(id).addEventListener('click', () => {
		deleteElementsByClassName('o-message');
		return new Message(null, Object.assign({}, opts, variants));
	});
}

const initDemos = () => {
	setUpDemo('alert-success', options, {theme: 'success'});
	setUpDemo('alert-neutral', options, {theme: 'neutral'});
	setUpDemo('alert-error', options, {theme: 'error'});
	setUpDemo('alert-error-bleed', options, {theme: 'error', bleed: true});

	setUpDemo('inline-success', inlineOptions, {theme: 'success'});
	setUpDemo('inline-neutral', inlineOptions, {theme: 'neutral'});
	setUpDemo('inline-error', inlineOptions, {theme: 'error'});
}

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
