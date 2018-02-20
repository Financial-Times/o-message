/*global require*/
import './../../main.js';
import Message from './../../src/js/message';

const initDemos = () => {
	document.addEventListener('DOMContentLoaded', () => {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

		if(document.getElementById('alert-message-success-demo')) {
			document.getElementById('alert-message-success-demo').addEventListener('click', () => {
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

		// document.getElementById('demo-div-to-put-alert-in')

		if(inlineMessageSuccess) {
			inlineMessageSuccess.addEventListener('click', () => {
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
