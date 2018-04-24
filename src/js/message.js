import construct from './construct-element';
import { throwError } from './helpers';

class Message {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor(messageElement, options) {
		this.messageElement = messageElement;

		//Default options
		const messageClass = options && options.messageClass ? options.messageClass : 'o-message';
		const type = options && options.type ? options.type : 'alert';
		const status = options && options.status ? options.status : null;
		let typeNucleus;

		if (type === 'alert' || type === 'alert-bleed' || type === 'alert-inner') {
			typeNucleus = 'alert';
		} else if (type === 'notice' || type === 'notice-bleed' || type === 'notice-inner') {
			typeNucleus = 'notice';
		} else {
			typeNucleus = null;
		}

		this.opts = Object.assign({}, {
			autoOpen: true,
			messageClass,
			type,
			typeClass: `${messageClass}--${type}`,
			typeNucleus,
			status,
			statusClass: options && options.status ? `${messageClass}--${options.status}` : null,
			parentElement: null,
			content: {
				highlight: null,
				detail: '&hellip;',
				additionalInfo: false
			},
			actions: {
				primary: {
					text: null,
					url: '#'
				},
				secondary: {
					text: null,
					url: '#'
				}
			},
			close: true
		}, options);
		debugger;
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
		// If the message element is not an HTML Element, or if a parent element has been specified, build a new message element
		if (this.opts.parentElement || !(this.messageElement instanceof HTMLElement)) {
			this.messageElement = this.constructMessageElement();

			// attach oMessage to specified parentElement or default to document body
			const element = this.opts.parentElement ? document.querySelector(this.opts.parentElement) : document.body;
			element.appendChild(this.messageElement);
		}

		let closeButtonExists = this.messageElement.querySelector("[class*='__close']");

		if (this.opts.close && !closeButtonExists) {
			this.closeButton = construct.closeButton(this.opts);

			// Add event listeners
			this.closeButton.addEventListener('click', event => {
				event.preventDefault();
				this.close();
			});

			this.messageElement.lastElementChild.appendChild(this.closeButton);
		}
	}

	/**
	* Constructs a type of message based on provided options (alert for now)
	* @returns {HTMLElement} Returns the type specific message element
	*/
	constructMessageElement () {
		if (this.opts.typeNucleus === 'alert') {
			return construct.alertMessage(this.opts);
		} else if (this.opts.typeNucleus === 'notice') {
			return construct.noticeMessage(this.opts);
		} else {
			throwError(`'${this.opts.type}' is not a supported message type. The available options are:\n- alert\n- alert-bleed\n- alert-inner\n- notice\n- notice-bleed\n- notice-inner`);
		}
	}

	/**
	 * Open the message.
	 */
	open () {
		this.messageElement.classList.remove(`${this.opts.messageClass}--closed`);
		this.messageElement.dispatchEvent(new CustomEvent('o.messageOpen'));
	}

	/**
	 * Close the message.
	 */
	close () {
		this.messageElement.classList.add(`${this.opts.messageClass}--closed`);
		this.messageElement.dispatchEvent(new CustomEvent('o.messageClosed'));
	}

	/**
	 * Initialise message component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a message in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the banners
	 */
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
