/*global require*/
import './../../main.js';
import Message from './../../src/js/message';

const initDemos = () => {
	document.addEventListener('DOMContentLoaded', () => {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

		if(document.getElementById('alert-message-success-demo')) {
			document.getElementById('alert-message-success-demo').addEventListener('click', () => {
				deleteElementsByClassName('o-message');
				new Message(null, {
					theme: 'success',
					content: {
						highlight: 'Something went right.',
						detail: 'The quick brown fox jumped over the lazy dogs'
					},
					link: {
						text: 'Relevant Link'
					},
					button: {
						text: 'Button'
					}
				});
			});
		}

		if(document.getElementById('alert-message-neutral-demo')) {
			document.getElementById('alert-message-neutral-demo').addEventListener('click', () => {
				deleteElementsByClassName('o-message');
				new Message(null, {
					theme: 'neutral',
					content: {
						highlight: 'Meh.',
						detail: 'The quick brown fox jumped over the lazy dogs'
					},
					link: {
						text: 'Relevant Link'
					},
					button: {
						text: 'Button'
					}
				});
			});
		}

		if(document.getElementById('alert-message-neutral-bleed-demo')) {
			document.getElementById('alert-message-neutral-bleed-demo').addEventListener('click', () => {
				deleteElementsByClassName('o-message');
				new Message(null, {
					theme: 'neutral',
					bleed: 'true',
					content: {
						highlight: 'Meh.',
						detail: 'The quick brown fox jumped over the lazy dogs'
					},
					link: {
						text: 'Relevant Link'
					},
					button: {
						text: 'Button'
					}
				});
			});
		}

		if(document.getElementById('alert-message-failure-demo')) {
			document.getElementById('alert-message-failure-demo').addEventListener('click', () => {
				deleteElementsByClassName('o-message');
				new Message(null, {
					theme: 'error',
					content: {
						highlight: 'Something went wrong.',
						detail: 'The quick brown fox jumped over the lazy dogs'
					},
					link: {
						text: 'Relevant Link'
					},
					button: {
						text: 'Button'
					}
				});
			});
		}

		const inlineMessageSuccess = document.getElementById('inline-message-success-demo');

		if(inlineMessageSuccess) {
			inlineMessageSuccess.addEventListener('click', () => {
				deleteElementsByClassName('o-message');
				new Message(null, {
					theme: 'success',
					messageType: 'inline',
					content: {
						highlight: 'Well done!',
						detail: 'You have successfully completed this task and this is great news.',
						action: 'Now you should do this, and this, and this, and this.'
					},
					link: {
						text: 'Text link'
					},
					button: {
						text: 'Button'
					}
				});
			});
		}
	});
}

initDemos();

function deleteElementsByClassName (className) {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
}
