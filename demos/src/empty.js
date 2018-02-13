
/*global require*/
import oMessage from '../../src/js/oMessage'

const constructAll = function() {
	new oMessage(null, {
			theme: 'success',
			content: {
				highlight: 'something big'
			},
			link: {
				text: 'click click'
			},
			button: {
				text: 'buttoooon'
			}
		}
	);
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
