/**
* Error helper
* @returns {Error} Returns the customised error message
*/
const throwError = (message) => {
	throw new Error(`*** o-message error:\n${message}\n***`);
};

/**
* Constructs action elements
* @returns {HTMLElement} Returns the action elements based on options declared
*/
const buildActions = (actions) => {
	if (!actions) {
		return '';
	}

	let primaryActionHTML;
	if (actions.primary && actions.primary.text) {
		primaryActionHTML = `<a href="${actions.primary.url}" class="o-message__actions__primary" ${actions.primary.openInNewWindow ? `target="_blank" aria-label="${actions.primary.text} (opens in new window)"` : ''}>${actions.primary.text}</a>`;
	}

	let secondaryActionHTML;
	if (actions.secondary && actions.secondary.text) {
		secondaryActionHTML = `<a href="${actions.secondary.url}" class="o-message__actions__secondary" ${actions.secondary.openInNewWindow ? `target="_blank" aria-label="${actions.secondary.text} (opens in new window)"` : ''}>${actions.secondary.text}</a>`;
	}

	let actionElements = `
		<div class="o-message__actions">
			${primaryActionHTML || ''}
			${secondaryActionHTML || ''}
		</div>
	`;

	return actionElements;
};

const buildContent = (content) => {
	if (content.highlight) {
		return `
			<span class="o-message__content-highlight">${content.highlight}</span>
			<span class="o-message__content-detail">${content.detail}</span>
		`;
	} else {
		return content.detail;
	}
};

export { buildActions, buildContent, throwError };
