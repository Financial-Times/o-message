o-message
=================

o-message is a messaging component used for alerting and informing. It can include variants on the type of message it delivers, but currently only covers 'alert' type messages.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
		- [Construction](#constructing-an-o-message)
		- [Options](#options)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
`o-message` uses Sass and Javascript to show and hide a message component.  
It can be initialised declaratively if markup is provided on the page, or it can be initialised imperatively when using the [manual build process](http://origami.ft.com/docs/developer-guide/modules/building-modules/).

By default, `o-message` initialises an alert message, which provides information in response to a user action. It currently has three themes, 'success', 'neutral' and 'error', and relies on the markup (or configuration) to determine certain aspects of each theme's styles.

### Markup

This is an example of the declarative way of instantiating an error message that spans **across a viewport**.

```html
<div class="o-message o-message--alert o-message--alert-error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content--highlight">Something went wrong!
				<span class="o-message__content--detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
			<div class="o-message__actions">
				<a href="#" class="o-message__button o-message__action--primary">Button</a>
				<a href="#" class="o-message__link o-message__action--secondary">Text link</a>
			</div>
		</div>
		<a href="#void" class="o-message__close" role="button" aria-label='Close' title='Close'></a>
	</div>
</div>
```
_Note: at different viewport sizes, the message element hides the following elements:_
- `<span class="o-message__content--detail">`
- `<a class="o-message__link o-message__action--secondary">`

A variation of the alert message is an **inline** alert message, which has almost exactly the same markup, with an optional addition of information, and does not have the option to close the message.

```html
<div class="o-message o-message--alert--inline o-message--alert-success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content--highlight">Hooray!
				<span class="o-message__content--detail">The quick brown fox jumped over the lazy dogs!</span>
			</p>
			<p class="o-message__content--additional-info">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__button o-message__action--primary">Button</a>
				<a href="#" class="o-message__link o-message__action--secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

### JavaScript
No code will run automatically unless you are using the Build Service. You must either construct an `o-message` object or fire an o.DOMContentLoaded event, which `o-message` listens for.


#### Constructing an o-message

If you have set up your message declaratively, and are using default o-message classes, use the following:
```js
const oMessage = require('o-message');
const messageElement = document.getElementById('my-message');
const importantMessage = new oMessage(messageElement, { content: { highlight: 'Success' } });
```
The second argument that `oMessage` accepts is an (options object)[#options], which can be used to change some behaviour and some markup of a message.

If you're setting up a message without existing DOM elements, oMessage will construct an element for you when it is set up like this:

```js
const oMessage = require('o-message');
const importantMessage = new oMessage(null, {
	theme: 'error',
	content: {
		highlight: 'Something has gone wrong.'
		detail: 'The quick brown fox did not jump over the lazy dogs.'
	}
});
```

#### Options
`o-message` allows for several configuration options that will change the type of message and its visual styling.

The only required options are listed in the example _above_. These are:
- `theme`: String. The theme to apply to the message. The available themes are 'success', 'error' and 'neutral', which are designed to be used with corresponding messages.
- `content`: Object. Holds the following values for text properties:
	- `highlight`: String. The highlighted text in a message. Defaults to `null`
	-	`detail`: String. The detail about the nature of a message.

The following options are not required, and all have a default value:

- `autoOpen`: Boolean. Whether to open the message automatically, defaults to `true`.
- `messageClass`: String. The base class name for the component's elements, defaults to `o-message`.
- `messageType`: String. The type of message that you want to initialise (e.g. alert, cookie, marketing.) Currently, the only available choice is `'alert'`, which is also the default value.
- `bleed`: Boolean. Whether the message bleeds across the viewport, defaults to `false`,
- `inline`: Boolean. Whether the message exists within another element, defaults to `false`,
- `parentElement`: String. This determines the element that the message will be appended to. If none is declared, it will automatically append to the body, or an element with the data attribute `data-o-component=o-message`, defaults to `null`.
- `content`: Object. Holds the following values for text properties:
	-	`additionalInfo`: String. More information about the message –  only applies to an `inline` message. Defaults to `null`
- `button`: Object. Holds the following values for button properties:
	- `text`: String. text value of the button.
	- `url`: String. The URL the button links to.
- `link`: Object. Holds the following values for link properties:
	- `text`: String. text value of the link.
	- `url`: String. The URL the link links to.
- `close`: Boolean. Whether or not to display the close button. Defaults to `true` for regular messages, to `false` for inline messages.


### Sass
As with all Origami components, o-message has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-message-is-silent: false;` in your Sass before you import the o-message Sass.

o-message includes mixins that you can use if you'd rather _not_ have origami classnames in your page. These are only available if you're not using the Build Service:

```sass
@include oMessage($class: 'my-banner', $theme: 'success');
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-component-boilerplate/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
