/**
 * Build an alert message element.
 * @returns {HTMLElement} Returns the new close button element
 */

export default {

	alertMessage: (opts) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.setAttribute('data-o-component', 'o-message');
		alertMessageEl.classList.add(opts.messageClass, opts.typeClass);

		if (!opts.theme) {
			throw new Error("Alert type messages require a theme. The options are 'success', 'error', or 'neutral'")
		} else {
			alertMessageEl.classList.add(`${opts.typeClass}-${opts.theme}`);
		}

		let contentHTML;
		if (opts.content.detail) {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<span class="${opts.messageClass}__content--highlight">${opts.content.highlight}/span>
					<p class="${opts.messageClass}__content--detail">${opts.content.detail}</p>
				</div>
			`
		} else {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<span class="${opts.messageClass}__content--highlight">${opts.content.highlight}</span>
				</div>
			`
		}

		let primaryActionHTML;
		if (opts.button.text) {
			primaryActionHTML = `<a href="${opts.button.url}" class="${opts.messageClass}__button ${opts.messageClass}__action--primary">${opts.button.text}</a>`
		}

		let secondaryActionHTML;
		if (opts.link.text) {
			secondaryActionHTML = `<a href="${opts.link.url}" class="${opts.messageClass}__link ${opts.messageClass}__action--secondary">${opts.link.text}</a>`
		}

		let closeButton;
		if (opts.close) {
			closeButton = `<a href="#void" class="${opts.messageClass}__close" role="button" aria-label='Close' title='Close'></a>`;
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
}
