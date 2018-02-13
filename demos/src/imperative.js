
/*global require*/
import Message from '../../src/js/message';

const constructAll = function() {
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

	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
