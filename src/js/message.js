import construct from './construct-element';
import { throwError } from './helpers';

class Message {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageEl] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor(messageEl, options) {
		this.messageEl = messageEl;

		//Default options
		const messageClass = options && options.messageClass ? options.messageClass : 'o-message';
		const messageType = options && options.messageType ? options.messageType : 'alert';

		this.opts = Object.assign({}, {
			autoOpen: true,
			messageClass,
			messageType,
			bleed: false,
			inline: false,
			typeClass: `${messageClass}--${messageType}`,
			content: {
				highlight: null,
				detail: '&hellip;',
				additionalInfo: null
			},
			button: {
				text: null,
				url: '#'
			},
			link: {
				text: null,
				url: '#'
			},
			close: true
		}, options);

		this.render();

		if (this.opts.autoOpen) {
			this.open();
		} else {
			this.close();
		}
	}

	/**
	 * Render the message.
	 */
	render () {
		// If the message element is not an HTML Element, build one
		if (!(this.messageEl instanceof HTMLElement)) {
			this.messageEl = this.constructMessageElement();
			document.body.appendChild(this.messageEl);
		}
	}

	/**
	* Constructs a type of message based on provided options (alert for now)
	* @returns {HTMLElement} Returns the type specific message element
	*/
	constructMessageElement () {
		if (this.opts.bleed === true && this.opts.inline === true) {
			throwError(`The message can't bleed and be inline in the same time`);
		} else {
			if (this.opts.messageType === 'alert') {
				if (!this.opts.content.highlight) {
					throwError(`An ${this.opts.messageType} message element requires options.content.highlight`);
				} else {
					return construct.alertMessage(this.opts);
				}
			} else {
				throwError(`'${this.opts.messageType}' is not a supported message type. The only currently available option is 'alert'`);
			}	
		}
	}

	/**
	 * Open the message.
	 */
	open () {
		this.messageEl.classList.remove(`${this.opts.messageClass}--closed`);
		this.messageEl.dispatchEvent(new CustomEvent('o.messageOpen'));
		this.setEventListeners();
	}

	/**
	 * Close the message.
	 */
	close () {
		this.messageEl.classList.add(`${this.opts.messageClass}--closed`);
		this.messageEl.dispatchEvent(new CustomEvent('o.messageClosed'));
	}

	// add event listeners
	setEventListeners () {
		let closeButton = document.querySelector(`.${this.opts.messageClass}__close`);
		if (closeButton) {
			closeButton.addEventListener('click', event => {
				this.close();
				event.preventDefault();
			});
		}
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-message]')) {
			return new Message(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-message"]'), rootEl => new Message(rootEl, opts));
	}
}

export default Message;
