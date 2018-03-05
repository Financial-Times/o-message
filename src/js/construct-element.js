import { throwError } from './helpers';
export default {

	/**
	* Build a full alert message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new alert type message element
	*/

	alertMessage: (opts) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.setAttribute('data-o-component', 'o-message');
		alertMessageEl.classList.add(opts.messageClass, opts.typeVariant, `${opts.messageClass}--closed`);

		if (!opts.status) {
			throwError("Alert messages require a status. The options are 'success', 'error', or 'neutral'");
		} else {
			alertMessageEl.classList.add(`${opts.statusVariant}`);
		}

		let primaryActionHTML;
		if (opts.button.text) {
			primaryActionHTML = `<a href="${opts.button.url}" class="${opts.messageClass}__action--primary">${opts.button.text}</a>`;
		}

		let secondaryActionHTML;
		if (opts.link.text) {
			secondaryActionHTML = `<a href="${opts.link.url}" class="${opts.messageClass}__action--secondary">${opts.link.text}</a>`;
		}

		let actions = `<div class="${opts.messageClass}__actions">
			${primaryActionHTML}
			${secondaryActionHTML}
			</div>
		`;

		let contentHTML;
		if (!opts.content.detail) {
			opts.content.detail = '';
		}

		if (opts.type === 'alert-inner' && opts.content.additionalInfo) {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content--highlight">${opts.content.highlight}<span class="${opts.messageClass}__content--detail">${opts.content.detail}</span></p>
					<p class="${opts.messageClass}__content--additional-info">${opts.content.additionalInfo}</p>
					${actions}
				</div>
			`;
		} else {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__content--highlight">${opts.content.highlight}<span class="${opts.messageClass}__content--detail">${opts.content.detail}</span></p>
					${actions}
				</div>
			`;
		}

		if (opts.variant === 'inline') {
			opts.close = false;
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
				${closeButton}
			</div>
		`;

		return alertMessageEl;
	}
};
