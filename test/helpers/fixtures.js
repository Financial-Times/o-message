export default {
	main: `
		<div class="o-message o-message--alert o-message--alert-error" data-o-component="o-message">
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content--highlight">Highlighted content<span class="o-message__content--detail">Content detail</span></p>
					<div class="o-message__action">
						<a href="#" class="o-message__button o-message__action--primary">Button</a>
						<a href="#" class="o-message__link o-message__action--secondary">Text link</a>
					</div>
				</div>
				<a href="#" class="o-message__close"></a>
			</div>
		</div>
	`,
	constructedForAlert: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__content--highlight">Important<span class="my-message__content--detail"></span></p>
					<div class="my-message__actions">
						<a href="#" class="my-message__button my-message__action--primary">a button</a>
						<a href="#" class="my-message__link my-message__action--secondary">a link</a>
					</div>
				</div>
				<a href="#void" class="my-message__close" role="button" aria-label="Close" title="Close"></a>
			</div>
		`,
	constructedForInlineAlert: `
	<div class="my-message__container">
		<div class="my-message__content">
			<p class="my-message__content--highlight">Important<span class="my-message__content--detail"></span></p>
			<p class="my-message__content--additional-info">Additional info</p>
			<div class="my-message__actions">
				<a href="#" class="my-message__button my-message__action--primary">a button</a>
				<a href="#" class="my-message__link my-message__action--secondary">a link</a>
			</div>
		</div>
	</div>
		`,
	constructedForInlineAlertNoAdditionalInfo: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__content--highlight">Important<span class="my-message__content--detail"></span></p>
					<div class="my-message__actions">
						<a href="#" class="my-message__button my-message__action--primary">a button</a>
						<a href="#" class="my-message__link my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`
};
