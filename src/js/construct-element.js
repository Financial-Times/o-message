import { buildActions, throwError } from './helpers';

export default {
	/**
	* Build a full alert message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new alert type message element
	*/
	alertMessage: (el) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.classList.add(el.messageClass, el.opts.typeClass, `${el.opts.messageClass}--closed`);

		if (!el.opts.status) {
			throwError("Alert messages require a status. The options are:\n- success\n- error\n- neutral");
		} else {
			alertMessageEl.classList.add(`${el.opts.statusClass}`);
		}

		let actions = buildActions(el);

		let contentHTML;
		if (!el.opts.content.detail) {
			el.opts.content.detail = '';
		}

		if (el.opts.type === 'alert-inner' && el.opts.content.additionalInfo) {
			contentHTML = `
				<div class="${el.messageClass}__content">
					<p class="${el.messageClass}__content-main">
						<span class="${el.messageClass}__content-highlight">${el.opts.content.highlight}</span>
						<span class="${el.messageClass}__content-detail">${el.opts.content.detail}</span>
					</p>
					<p class="${el.messageClass}__content-additional">${el.opts.content.additionalInfo}</p>
					${actions}
				</div>
			`;
		} else {
			contentHTML = `
				<div class="${el.messageClass}__content">
					<p class="${el.messageClass}__content-main">
						<span class="${el.messageClass}__content-highlight">${el.opts.content.highlight}</span>
						<span class="${el.messageClass}__content-detail">${el.opts.content.detail}</span>
					</p>
					${actions}
				</div>
			`;
		}

		alertMessageEl.innerHTML = `
			<div class="${el.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return alertMessageEl;
	},

	/**
	* Build a full notice message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new notice type message element
	*/
	noticeMessage: (el) => {
		const noticeMessage = document.createElement('div');
		noticeMessage.classList.add(el.messageClass, el.opts.typeClass, `${el.messageClass}--closed`);

		if (!el.opts.status) {
			throwError("Notice messages require a status. The options are:\n- inform\n- warning\n- warning-light");
		} else {
			noticeMessage.classList.add(`${el.opts.statusClass}`);
		}

		let actions = buildActions(el);

		const contentHTML = `
			<div class="${el.messageClass}__content">
				<p class="${el.messageClass}__content-main">
					${el.opts.content.detail}
				</p>
				${actions}
			</div>
		`;

		noticeMessage.innerHTML = `
			<div class="${el.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return noticeMessage;
	},

	/**
	* Build a full action message element.
	* @returns {HTMLElement} Returns the new action type message element
	*/
	actionMessage: (el) => {
		const actionMessage = document.createElement('div');
		actionMessage.classList.add(el.messageClass, el.opts.typeClass);

		if (!el.opts.status) {
			throwError("Action messages require a status. The options are:\n- inform\n- inform-inverse");
		} else {
			actionMessage.classList.add(`${el.opts.statusClass}`);
		}

		let actions = buildActions(el);

		const contentHTML = `
			<div class="${el.messageClass}__content">
				<p class="${el.messageClass}__content-main">
					${el.opts.content.detail}
				</p>
				${actions}
			</div>
		`;

		actionMessage.innerHTML = `
			<div class="${el.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return actionMessage;
	},
	/**
	* Build a close button
	* @returns {HTMLElement} Returns a new element to close the message
	*/
	closeButton: (el) => {
		const closeButton = document.createElement('button');
		closeButton.classList.add(`${el.messageClass}__close`);
		closeButton.setAttribute('aria-label', 'close');
		closeButton.setAttribute('title', 'Close');

		return closeButton;
	}
};
