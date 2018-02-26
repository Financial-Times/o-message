import { throwError } from './helpers';
export default {

	/**
	* Build a full alert message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new alert type message element
	*/

	alertMessage: (opts) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.setAttribute('data-o-component', 'o-message');
		alertMessageEl.classList.add(opts.messageClass, `${opts.messageClass}--closed`);

		if (opts.bleed) {
			alertMessageEl.classList.add(`${opts.typeClass}--bleed`);
		} else if (opts.inline) {
			alertMessageEl.classList.add(`${opts.typeClass}--inline`);
		} else {
			alertMessageEl.classList.add(`${opts.typeClass}`);
		}

		if (!opts.theme) {
			throwError("Alert type messages require a theme. The options are 'success', 'error', or 'neutral'");
		} else {
			alertMessageEl.classList.add(`${opts.typeClass}-${opts.theme}`);
		}

		let contentHTML;
		if (!opts.content.detail) {
			opts.content.detail = '';
		}

		if (opts.inline && opts.content.additionalInfo) {
			contentHTML = `<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content--detail">
						<span class="${opts.messageClass}__content--highlight">${opts.content.highlight}</span>
						${opts.content.detail}
					</p>
					<p class="${opts.messageClass}__content--additional-info">${opts.content.additionalInfo}</p>
				</div>
			`;
		} else {
			contentHTML = `<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content--detail">
						<span class="${opts.messageClass}__content--highlight">${opts.content.highlight}</span>
						${opts.content.detail}
					</p>
				</div>
			`;
		}

		if (opts.inline) {
			opts.close = false;
		}

		let primaryActionHTML;
		if (opts.button.text) {
			primaryActionHTML = `<a href="${opts.button.url}" class="${opts.messageClass}__button ${opts.messageClass}__action--primary">${opts.button.text}</a>`;
		}

		let secondaryActionHTML;
		if (opts.link.text) {
			secondaryActionHTML = `<a href="${opts.link.url}" class="${opts.messageClass}__link ${opts.messageClass}__action--secondary">${opts.link.text}</a>`;
		}

		let closeButton;
		if (opts.close) {
			closeButton = `<a href="#void" class="${opts.messageClass}__close" role="button" aria-label='Close' title='Close'></a>`;
		} else {
			closeButton = '';
		}

		alertMessageEl.innerHTML = `
			<div class="${opts.messageClass}__container">
				${contentHTML}
				${primaryActionHTML}
				${secondaryActionHTML}
				${closeButton}
			</div>
		`;

		return alertMessageEl;
	}
};
