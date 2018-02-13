import construct from './construct-element';

class oMessage {
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
			messageClass,
			messageType,
			typeClass: `${messageClass}--${messageType}`,
			content: {
				highlight: null,
				detail: '&hellip;'
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
		}, options || oMessage._getDOMOptions(messageEl));

		this.render()
	}

	render () {
		// If the message element is not an HTML Element, build one
		if (!(this.messageEl instanceof HTMLElement)) {
			this.messageEl = this.constructMessageElement();
			document.body.appendChild(this.messageEl);
		}
	}

	//type of message: alert / alert--bleed
	//theme of message: error/success/neutral
	//content of message: highlight / detail (highlight required)
	constructMessageElement () {
		if (this.opts.messageType  === 'alert' || this.opts.messageType === 'alert--bleed') {
			if (!this.opts.content.highlight) {
				oMessage.throwError(`An ${this.opts.messageType} message element requires highlight content.`);
			} else {
				return construct.alertMessage(this.opts);
			}
		} else {
			oMessage.throwError(`${this.opts.messageType} is not a supported message type.`)
		}
	}

	/**
	 * Get the data attributes from the messageEl. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from
	 * the DOM.
	 * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
	*/
	static _getDOMOptions(messageEl) {
		if (!(messageEl instanceof HTMLElement)) {
			return {};
		}

		const dataset = messageEl.dataset;
		return Object.keys(dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oMessage(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = dataset[key];
			}

			return options;
		}, {});
	}

	static throwError(message) {
		throw new Error('"o-message error": '+ message);
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-message]')) {
			return new oMessage(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-message"]'), rootEl => new oMessage(rootEl, opts));
	}
}

export default oMessage;
