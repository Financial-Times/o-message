import { buildActions, buildContent, throwError } from './helpers';

export default {
	/**
	* Build a full message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new message element
	*/
	message: (opts) => {
		const messageElement = document.createElement('div');
		messageElement.classList.add('o-message', `o-message--${opts.type}`, 'o-message--closed');
		if (opts.inner) { messageElement.classList.add('o-message--inner'); }

		if (!opts.state) {
			throwError("Messages require a state.");
		} else {
			messageElement.classList.add(`o-message--${opts.state}`);
		}

		opts.content.detail = opts.content.detail ? opts.content.detail : '';

		let additionalContent = '';

		if (opts.inner && opts.content.additionalInfo) {
			additionalContent = `<p class="o-message__content-additional">${opts.content.additionalInfo}</p>`;
		}

		messageElement.innerHTML = `
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">
						${buildContent(opts.content)}
					</p>
					${additionalContent}
					${buildActions(opts.actions)}
				</div>
			</div>
		`;


		return messageElement;
	},
	/**
	* Build a close button
	* @returns {HTMLElement} Returns a new element to close the message
	*/
	closeButton: () => {
		const closeButton = document.createElement('button');
		closeButton.classList.add(`o-message__close`);
		closeButton.setAttribute('aria-label', 'close');
		closeButton.setAttribute('title', 'Close');

		return closeButton;
	}
};
