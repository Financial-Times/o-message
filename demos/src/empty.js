
/*global require*/
import oMessage from '../../src/js/oMessage'

const constructAll = function() {
	new oMessage(null, {
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
		}
	);

	new oMessage(null, {
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
		}
	);
	
	new oMessage(null, {
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
		}
	);
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
