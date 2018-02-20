/*global require*/
import './../../main.js';
import Message from './../../src/js/message';

const initDemos = () => {
	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

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
	});
}

initDemos();
