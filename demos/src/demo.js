/*global require*/
import './../../main.js';
import Message from './../../src/js/message';


const demoEl = document.querySelector('.demo-inline-message');

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
		content: {
			highlight: 'Highlight!',
			detail: 'Details about the message go here.',
			additionalInfo: 'If there is more to say about this, please feel free to say it here.'
		}
	})

	setUpDemo('alert-success', null, options, {theme: 'success'});
	setUpDemo('alert-neutral', null, options, {theme: 'neutral'});
	setUpDemo('alert-error', null, options, {theme: 'error'});
	setUpDemo('alert-error-bleed', null, options, {theme: 'error', bleed: true});

	setUpDemo('inline-success', demoEl, inlineOptions, {theme: 'success'});




	// document.getElementById('inline-success').addEventListener('click', () => {
	// 	deleteElementsByClassName('o-message');
	// 	new Message(demoEl, Object.assign({}, inlineOpts, {theme: 'success'}));
	// });
// 			new Message(demoEl, {
// 				theme: 'success',
// 				inline: 'inline',
// 				content: {
// 					highlight: 'YAY!',
// 					detail: 'The quick brown fox jumped over the lazy dogs!',
// 					additionalInfo: 'Did you know that that sentence uses all of the letters in the alphabet at least once?'
// 				},
// 				link: {
// 					text: 'Text link'
// 				},
// 				button: {
// 					text: 'Button'
// 				}
// 			});
// 		});
// //
// 		document.getElementById('inline-neutral').addEventListener('click', () => {
// 			deleteElementsByClassName('o-message');
// 			new Message(demoEl, {
// 				theme: 'neutral',
// 				inline: true,
// 				content: {
// 					highlight: 'Meh',
// 					detail: 'There\'s a fox, and some lazy dogs',
// 					additionalInfo: 'Everything is going to be alright'
// 				},
// 				link: {
// 					text: 'Text link'
// 				},
// 				button: {
// 					text: 'Button'
// 				}
// 			});
// 		});
//
// 		document.getElementById('inline-failure').addEventListener('click', () => {
// 			deleteElementsByClassName('o-message');
// 			new Message(demoEl, {
// 				theme: 'error',
// 				inline: true,
// 				content: {
// 					highlight: 'Oops...',
// 					detail: 'The quick brown fox did not jump over the lazy dogs.',
// 					additionalInfo: 'But that sentence still uses all of the letters in the alphabet at least once!'
// 				},
// 				link: {
// 					text: 'Text link'
// 				},
// 				button: {
// 					text: 'Button'
// 				}
// 			});
// 		});
// 	});
}


function deleteElementsByClassName (className) {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
}
document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
