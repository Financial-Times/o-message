export default Message;
/**
 * An object of options to configure a message instance.
 */
export type MessageOptions = {
    /**
     * - The o-message type e.g. 'action', 'alert' and 'notice'.
     */
    type: string;
    /**
     * - The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`.
     */
    state: string;
    /**
     * [true] - Whether to show the message automatically.
     */
    autoOpen: boolean;
    /**
     * [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element.
     */
    parentElement: string;
    /**
     * - Configuration for the message copy.
     */
    content: {
        detail: string;
        highlight: string;
        additionalInfo: string;
    };
    /**
     * - Links to display on the message.
     */
    actions?: {
        primary: {
            text: string;
            url: string;
            openInNewWindow: boolean;
        };
        secondary: {
            text: string;
            url: string;
            openInNewWindow: boolean;
        };
    };
    /**
     * [true] -  Whether or not to display a close button.
     */
    close: boolean;
};
/**
 * An object of options to configure a message instance.
 * @typedef {Object} MessageOptions
 * @property {String} type - The o-message type e.g. 'action', 'alert' and 'notice'.
 * @property {String} state - The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`.
 * @property {Boolean} autoOpen [true] - Whether to show the message automatically.
 * @property {String} parentElement [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element.
 * @property {Object} content - Configuration for the message copy.
 * @property {String} content.detail - Copy for of the message e.g "Thing saved to the place you requested.".
 * @property {String} content.highlight [null] - Highlighted copy to prepend the main message copy "Success!".
 * @property {String} content.additionalInfo [null] - More copy with additional information – only applies to a message with an `inner` layout.
 * @property {Object} [actions] - Links to display on the message.
 * @property {Object} [actions.primary] - Show a link in the style of a primary button within the message.
 * @property {String} actions.primary.text - The copy for the link.
 * @property {String} actions.primary.url - The url for the link.
 * @property {Boolean} actions.primary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
 * @property {Object} [actions.secondary] - Show a link with less emphasis that the primary action.
 * @property {String} actions.secondary.text - The copy for the link.
 * @property {String} actions.secondary.url - The url for the link.
 * @property {Boolean} actions.secondary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
 * @property {Boolean} close [true] -  Whether or not to display a close button.
 */
declare class Message {
    /**
     * Get the data attributes from the messageElement. If the message is being set up
     * declaratively, this method is used to extract the data attributes from the DOM.
     * @param {HTMLElement} messageElement - The message element in the DOM
     * @returns {Object} - An object of options defined via data attributes on the message element
     */
    static getDataAttributes(messageElement: HTMLElement): any;
    /**
     * Initialise message component.
     * @param {(HTMLElement|String)} rootElement - The root element to intialise a message in, or a CSS selector for the root element
     * @typedef {Object} MessageOptions - An options object for configuring the messages
     * @returns {Message|Message[]} The newly constructed message components
     */
    static init(rootEl: any, opts: any): Message | Message[];
    /**
     * Initialises an `o-message` component.
     *
     * @access public
     * @param {HTMLElement} messageElement [undefined] - The `o-message` element (optional).
     * @param {MessageOptions} options - An options object for configuring the message.
     *
     * @example To construct all elements on the page with the `data-o-component="o-message"` attribute.
     *      Message.init();
     *
     * @example To construct a specifc o-message on the page.
     * 		const myMessageElement = document.querySelector('.my-message');
     *      const myMessage = new Message(myMessageElement, {});
     *
     * @example To construct a message which does not already exist on the page.
     *      const errorAlert = new Message(null, {
     *      	type: 'alert',
     *      	state: 'error',
     *      	content: {
     *      		highlight: 'Something has gone wrong.',
     *      		detail: 'The quick brown fox did not jump over the lazy dogs.'
     *      	}
     *      });
     */
    constructor(messageElement: HTMLElement, options: any);
    messageElement: HTMLElement;
    opts: any;
    /**
     * Render the message.
     * @returns {void}
     */
    render(): void;
    closeButton: HTMLElement;
    /**
     * Open the message.
     * @returns {void}
     */
    open(): void;
    /**
     * Close the message.
     * @returns {void}
     */
    close(): void;
}
