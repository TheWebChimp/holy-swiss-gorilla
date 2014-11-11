/**
 * Holy Swiss Gorilla - Just for the lulz
 * @version   1.0
 * @requires  jQuery 1.8+
 * @author    The WebChimp
 * @license   MIT
 */
;(function($) {
	// Global object
	$.holySwissGorilla = {
		methods: {
			toggleFields: function(options) {
				var opts = $.extend(true, {
					enabled: false
				}, $.fn.holySwissGorilla.defaults, options);
				// Just toggle all the fields
				this.find('input, select, textarea').prop({ disabled: !options.enabled });
			},
			toggleTabs: function(options) {
				var opts = $.extend(true, {
					enabled: false
				}, $.fn.holySwissGorilla.defaults, options);
				// Bind events
				this.on('click', function(e) {
					var el = $(this),
						href = el.attr('href'),
						target = $(href),
						container = target.parent(),
						li = el.closest('li'),
						ul = li.closest('ul');
					e.preventDefault();
					ul.find('li').removeClass('active');
					li.addClass('active');
					// Hide elements
					container.children().hide();
					target.show();
				});
				// Initialize
				this.closest('ul').find('a').first().trigger('click');
			},
			toggleVisibility: function(options) {
				switch ( this.prop('tagName').toLowerCase() ) {
					case 'input':
						var type = this.attr('type');
						switch (type) {
							case 'checkbox':
								// Checkbox case: Visibility depends on the check state
								this.on('change', function(e) {
									var el = $(this),
										target = el.data('target');
									if ( el.prop('checked') ) {
										$(target).removeClass('hide');
									} else {
										$(target).addClass('hide');
									}
									$(target).holySwissGorilla('toggleFields', { enabled: $(target).is(':visible') });
								});
								this.trigger('change');
								break;
							case 'radio':
								// Radio button case: Visibility depends on a given value from the group
								var name = this.attr('name'),
									value = this.data('value'),
									group = $('input[name="' + name + '"]'),
									target = this.data('target');
								group.on('click', function(e) {
									var el = $(this);
									if ( el.val() == value ) {
										$(target).removeClass('hide');
									} else {
										$(target).addClass('hide');
									}
									$(target).holySwissGorilla('toggleFields', { enabled: $(target).is(':visible') });
								});
								group.trigger('change');
								break;
						}
						break;
					case 'select':
						// Select case: Visibility depends on a given value from some <option>
						this.on('change', function(e) {
							e.preventDefault();
							var el = $(this),
								value = el.data('value'),
								target = el.data('target');
							if ( el.val() == value ) {
								$(target).removeClass('hide');
							} else {
								$(target).addClass('hide');
							}
							$(target).holySwissGorilla('toggleFields', { enabled: $(target).is(':visible') });
						});
						this.trigger('change');
						break;
					case 'a':
						// Anchor case: Visibility is toggled on each click
						this.on('click', function(e) {
							e.preventDefault();
							var el = $(this),
								target = el.attr('href');
							$(target).toggleClass('hide');
							$(target).holySwissGorilla('toggleFields', { enabled: $(target).is(':visible') });
						});
						break;
				}
			}
		}
	};
	// Plugin interface
	$.fn.holySwissGorilla = function(method, options) {
		if (!this.length) { return this; }
		var opts = $.extend(true, {}, $.fn.holySwissGorilla.defaults, options);
		if ( typeof $.holySwissGorilla.methods[method] === 'function' ) {
			var fn = $.holySwissGorilla.methods[method];
			this.each(function() {
				var el = $(this);
				fn.call(el, opts);
			});
		}
		return this;
	};
	// Defaults
	$.fn.holySwissGorilla.defaults = {
		//
	};
	// Automagic binding
	jQuery(document).ready(function($) {
		$('[data-toggle=visibility]').holySwissGorilla('toggleVisibility');
		$('[data-toggle=tabs]').holySwissGorilla('toggleTabs');
	});
})(jQuery);