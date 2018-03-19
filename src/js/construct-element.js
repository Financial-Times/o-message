import { throwError } from './helpers';

const buildActions = (opts) => {
	let primaryActionHTML;
	if (opts.actions.primary.text) {
		primaryActionHTML = `<a href="${opts.actions.primary.url}" class="${opts.messageClass}__actions__primary">${opts.actions.primary.text}</a>`;
	}

	let secondaryActionHTML;
	if (opts.actions.secondary.text) {
		secondaryActionHTML = `<a href="${opts.actions.secondary.url}" class="${opts.messageClass}__actions__secondary">${opts.actions.secondary.text}</a>`;
	}

	let actions = `<div class="${opts.messageClass}__actions">
		${primaryActionHTML}
		${secondaryActionHTML}
		</div>
	`;

	return actions;
}

export default {
	/**
	* Build a full alert message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new alert type message element
	*/
	alertMessage: (opts) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.setAttribute('data-o-component', 'o-message');
		alertMessageEl.classList.add(opts.messageClass, opts.typeClass, `${opts.messageClass}--closed`);

		if (!opts.status) {
			throwError("Alert messages require a status. The options are 'success', 'error', or 'neutral'");
		} else {
			alertMessageEl.classList.add(`${opts.statusClass}`);
		}

		let actions = buildActions(opts);

		let contentHTML;
		if (!opts.content.detail) {
			opts.content.detail = '';
		}

		if (opts.type === 'alert-inner' && opts.content.additionalInfo) {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content-main">
						<span class="${opts.messageClass}__content-highlight">${opts.content.highlight}</span>
						<span class="${opts.messageClass}__content-detail">${opts.content.detail}</span>
					</p>
					<p class="${opts.messageClass}__content-additional">${opts.content.additionalInfo}</p>
					${actions}
				</div>
			`;
		} else {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content-main">
						<span class="${opts.messageClass}__content-highlight">${opts.content.highlight}</span>
						<span class="${opts.messageClass}__content-detail">${opts.content.detail}</span>
					</p>
					${actions}
				</div>
			`;
		}

		if (opts.type === 'alert-inner') {
			opts.close = false;
		}

		alertMessageEl.innerHTML = `
			<div class="${opts.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return alertMessageEl;
	},

	/**
	* Build a full notice message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new notice type message element
	*/
	noticeMessage: (opts) => {
		const noticeMessage = document.createElement('div');
		noticeMessage.setAttribute('data-o-component', 'o-message');
		noticeMessage.classList.add(opts.messageClass, opts.typeClass, `${opts.messageClass}--closed`);

		if (!opts.status) {
			throwError("Notice messages require a status. The options are 'inform', 'warning' or 'warning-light'");
		} else {
			noticeMessage.classList.add(`${opts.statusClass}`);
		}

		let actions = buildActions(opts);

		const contentHTML = `
			<div class="${opts.messageClass}__content">
				<p class="${opts.messageClass}__content-main">
					${opts.content.detail}
				</p>
				${actions}
			</div>
		`;

		if (opts.type === 'notice-inner') {
			opts.close = false;
		}

		noticeMessage.innerHTML = `
			<div class="${opts.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return noticeMessage;
	},
	/**
	* Build a close button
	* @returns {HTMLElement} Returns a new element to close the message
	*/
	closeButton: (opts) => {
		const closeButton = document.createElement('a');
		closeButton.classList.add(`${opts.messageClass}__close`);
		closeButton.setAttribute('role', 'button');
		closeButton.setAttribute('href', '#void');
		closeButton.setAttribute('aria-label', 'close');
		closeButton.setAttribute('title', 'Close');

		return closeButton;
	}
};
