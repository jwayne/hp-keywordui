(function($) {
	$.widget("ui.kwac", {
		
		options: {
			autoFocus: true,
			width: '420px',
			source: [
				{
					value: "jquery",
					label: "jQuery",
					type: "asdf",
					icon: "http://jqueryui.com/resources/demos/autocomplete/images/jquery_32x32.png",
				},
				{
					value: "jqueryadf",
					label: "jQueryasdf",
					type: "asdf",
					icon: "http://jqueryui.com/resources/demos/autocomplete/images/jquery_32x32.png",
				},
			],
			onSelect: function(item) {
				/*$.ajax({
					method: 'GET',
					params: ui.item,
				});*/
				console.log(item);
			}
		},
		
		_create: function() {
			var self = this,
				o = self.options,
				el = self.element.addClass('kwac');
				imgdiv = $('<div>').addClass('kwac-imgbox')
					.button()
					.removeClass('ui-corner-all')
					.addClass('ui-corner-left'),
				imgspan = imgdiv.find('span');
				input = $('<input type="text">').addClass('kwac-input')
					.button()
					.removeClass('ui-corner-all')
					.addClass('ui-corner-right')
					.css('width', o.width);
			el.append(imgdiv).append(input);
			
			var oAc = {
				appendTo: o.appendTo,
				autoFocus: o.autoFocus,
				delay: o.delay,
				disabled: o.disabled,
				minLength: o.minLength,
				position: o.position,
				source: o.source,
			};
			if (o.onSelect) {
				oAc.select = function(event, ul) {
					imgspan.html('<img src="'+ul.item.icon+'"/>');
					o.onSelect(ul.item);
				};
			}
			oAc.open = function(event, ui) {
				input.removeClass('ui-corner-right').addClass('ui-corner-tr');
				ac.removeClass('ui-corner-all').addClass('ui-corner-bottom');
			};
			oAc.close = function(event, ui) {
				input.removeClass('ui-corner-tr').addClass('ui-corner-right');
				ac.removeClass('ui-corner-bottom').addClass('ui-corner-all');
			};
			input.autocomplete(oAc)
				.data("ui-autocomplete")._renderItem = function(ul, item) {
					var re = new RegExp(input.val(), 'gi');
					var label = $('<span>').addClass('kwac-ac-label')
						.html(item.label.replace(re, '<b>'+input.val()+'</b>'));
					var div = $('<span>').addClass('kwac-ac-img')
						.append('<img src="'+item.icon+'"/>');
					var a = $('<a>').append(div).append(label);
					return $('<li>')
						.append(a)
						.appendTo(ul);
			};
			input.keydown(function(event) {
				if (event.keyCode == 8 || event.keyCode == 46)
			        imgspan.html('');
			});
			input.keypress(function(event) {
				imgspan.html('');
			});
			var ac = el.next().addClass('kwac-ac');
			
		},
		
		destroy: function() {
			this.element.next().remove();
		},
		
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			this.destroy();
			this._create();
		},
		
	});

})(jQuery);
