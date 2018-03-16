export default {
	main: `
		<div class="o-message o-message--alert o-message--alert-error" data-o-component="o-message">
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content--main">
						<span class="o-message__content--highlight">Highlighted content</span>
						<span class="o-message__content--detail">Content detail</span>
					</p>
					<div class="o-message__action">
						<a href="#" class="o-message__action--primary">Button</a>
						<a href="#" class="o-message__link o-message__action--secondary">Text link</a>
					</div>
				</div>
			</div>
		</div>
	`,
	alert: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__content--main">
						<span class="my-message__content--highlight">Important</span>
						<span class="my-message__content--detail"></span>
					</p>
					<div class="my-message__actions">
						<a href="#" class="my-message__action--primary">a button</a>
						<a href="#" class="my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	notice: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__content--main">Many things are here to be said about this message</p>
					<div class="my-message__actions">
						<a href="#" class="my-message__action--primary">a button</a>
						<a href="#" class="my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	innerAlert: `
	<div class="my-message__container">
		<div class="my-message__content">
			<p class="my-message__content--main">
				<span class="my-message__content--highlight">Important</span>
				<span class="my-message__content--detail"></span>
			</p>
			<p class="my-message__content--additional">Additional info</p>
			<div class="my-message__actions">
				<a href="#" class="my-message__action--primary">a button</a>
				<a href="#" class="my-message__action--secondary">a link</a>
			</div>
		</div>
	</div>
		`,
	innerAlertWithOutAdditionalInfo: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__content--main">
						<span class="my-message__content--highlight">Important</span>
						<span class="my-message__content--detail"></span>
					</p>
					<div class="my-message__actions">
						<a href="#" class="my-message__action--primary">a button</a>
						<a href="#" class="my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	closeButton: `<a class="my-message__close" role="button" href="#void" aria-label="close" title="Close"></a>`,
	actions: `<div class="my-message__actions">
			<a href="#" class="my-message__action--primary">a button</a>
			<a href="#" class="my-message__action--secondary">a link</a>
			</div>
		`
};
