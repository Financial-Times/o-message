const throwError = (message) => {
	throw new Error(`*** o-message error:\n${message}\n***`);
};

const buildActions = (el) => {
	let primaryActionHTML;
	if (el.opts.actions.primary && el.opts.actions.primary.text) {
		primaryActionHTML = `<a href="${el.opts.actions.primary.url}" class="${el.messageClass}__actions__primary" ${el.opts.actions.primary.openInNewWindow ? `target="_blank" aria-label="${el.opts.actions.primary.text} (opens in new window)"` : ''}>${el.opts.actions.primary.text}</a>`;
	}

	let secondaryActionHTML;
	if (el.opts.actions.secondary && el.opts.actions.secondary.text) {
		secondaryActionHTML = `<a href="${el.opts.actions.secondary.url}" class="${el.messageClass}__actions__secondary" ${el.opts.actions.secondary.openInNewWindow ? `target="_blank" aria-label="${el.opts.actions.secondary.text} (opens in new window)"` : ''}>${el.opts.actions.secondary.text}</a>`;
	}

	let actions = `<div class="${el.messageClass}__actions">
		${primaryActionHTML || ''}
		${secondaryActionHTML || ''}
		</div>
	`;

	return actions;
};

export { buildActions, throwError };
