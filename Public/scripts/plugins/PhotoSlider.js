(function() {
	'use strict';
	define(['jquery'], function($) {

		var pluginName = "PhotoSlider",
			defaults = {
				width: 620,
				height: 300,
				currentIndex: 0
			},
			leftArrow = '<a title="previous" action="prev" class="prev" style="display:none;"></a>',
			rightArrow = '<a title="next" action="next" class="next"></a>';

		function Plugin ( el, options ) {
				this.el = el;
				this.$el = $(this.el);
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
			init: function () {
				// Sets main class
				this.$el.addClass('photoslider');

				//Get image count
				this.settings.imgLength = this.$el.find('img').length;

				//Add Navigation html elements

				if(this.settings.imgLength > 1){
					this.addNavigation();
				}
			},
			addNavigation: function () {
				var ul = $('<ul/>'),
					$frame = $('<div/>').css('width', (this.settings.width * this.settings.imgLength) +'px'),
					$imgs = this.$el.find('img');

				
				//add pages to pager, insert pager, set first page as active
				for (var i = 0; i < this.settings.imgLength; i++) {
					ul.append('<li/>');
				}
				this.$el.append(ul);
				this.$el.find('ul li:first').addClass('active');


				//remove images, add image to frame, insert frame
				this.$el.find('img').remove();
				$frame.append($imgs);
				this.$el.prepend($frame);

				//insert next prev
				this.$el.append(leftArrow);
				this.$el.append(rightArrow);
				
				this.wireEvent();

				this.$slider = $(this.el).find('div');
				this.$next = $(this.el).find('.next');
				this.$prev = $(this.el).find('.prev');
			},
			prev: function(){
				if(this.settings.currentIndex != 0){
					this.settings.currentIndex--;
					this.slide();
				} 
			},
			next: function(){
				if(this.settings.currentIndex != (this.settings.imgLength-1)){
					this.settings.currentIndex++;	
					this.slide();
				}
			},
			slide: function(){
				var index = this.settings.currentIndex;

				$(this.el).find('ul li').removeClass('active');
				$(this.el).find('ul li:nth-child(' + (index + 1) + ')').addClass('active');
				
				this.$slider.animate({
					marginLeft: '-' + (this.settings.currentIndex * this.settings.width) + 'px'
				}, 500);

				if(this.settings.currentIndex === 0){
					this.$prev.hide(); 
				} else {
					this.$prev.show(); 
				}

				if(this.settings.currentIndex === (this.settings.imgLength-1)){
					this.$next.hide(); 
				} else {
					this.$next.show(); 
				}

			},
			wireEvent: function(){
				var thiz = this;
				this.$el
					.on('click', '[action="prev"]', function(){
						thiz.prev();
					})
					.on('click', '[action="next"]', function(){
						thiz.next();
					})
					.on('click', 'li', function(){
						thiz.settings.currentIndex = $(this).index();
						thiz.slide();
					});
			}
		};

		$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
						$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
		};

	});

})();
