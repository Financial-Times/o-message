
import oMessage from './src/js/oMessage';

const constructAll = function() {
	oMessage.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oMessage;
