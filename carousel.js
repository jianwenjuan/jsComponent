;(function ($) {
	var carousel = function(container) {
		this.container = $('#' + container);
		var settings = this.container.attr('settings');

		this.settings = eval('('+settings+')');
		this.options = $.extend({},this.settings);

		this.imgArr = this.options.data;

		if (this.imgArr.length < 3) {
			alert('需要配置3张以上的图片');
		}
		this.width = this.options.width;
		this.height = this.options.height;
        
        this.firstDom = '';
		this.lastDom = '';

		this.flag = true;





		this.creatDom();

	}

	carousel.prototype.creatDom = function() {
		var imgs = this.imgArr;
		var liHtml = '';
		if (imgs.length >0) {
			for (var i = 0; i < imgs.length; i++) {
				liHtml += '<li><img src="' + imgs[i] + '"></li>';
			}
		}
		var html = '<div class="poster-btn poster-pre-btn"></div><ul>';
		html += liHtml;
		html += '</ul><div class="poster-btn poster-next-btn"></div>';
		this.container.html(html);
		this.container.css({
			width: this.width,
			height: this.height
		});

		this.liArr = this.container.find('li');

		this.firstDom = this.liArr.first();
		this.lastDom = this.liArr.last();


	
		this.setStyle();
		this.bindEvent();
		this.autoPlay();

	}

	carousel.prototype.setStyle = function() {
		var conW = this.width;
		var liArr = this.liArr;
		var imgW = liArr[0].clientWidth;
		var marL = (conW - imgW) / 2;

		


		if (liArr.length >= 3) {
			var middleNum = Math.floor(liArr.length / 2) + 1;

			for (var i = 0; i < liArr.length; i++) {
				if (i < middleNum) {
					liArr.eq(i).css({
						left: (marL / (middleNum - 1)) * i,
						zIndex: i,
						top: 10 * (middleNum - 1 - i)
					});
				} else {
					liArr.eq(i).css({
						right: (marL / (middleNum - 1)) * (liArr.length - 1 - i),
						zIndex: liArr.length - 1 - i,
						top: 10 * (i - middleNum + 1)
					});
				}
			}
		}

	}

	carousel.prototype.bindEvent = function() {
		var  ts = this;
		this.container.on('click', '.poster-pre-btn', function(){
			if (ts.flag) {
				ts.flag = false;
				ts.preFn();
			}

		});

		this.container.on('click', '.poster-next-btn', function(){

			if (ts.flag) {
				ts.flag = false;
				ts.nextFn();
			}
		});

		this.container.on('mousemove', function(){
			clearInterval(ts.timer);
		});

		this.container.on('mouseout', function(){
			ts.autoPlay();
		});

	}

	carousel.prototype.preFn = function() {
		var ts = this;

		var liItems = this.liArr;
		liItems.each(function(){

			var self = $(this);

			if (self.next().length > 0) {
				next = self.next();
			} else {
				next =  ts.firstDom;
			}

			var zIndex = next.css('zIndex'),
			    top = next.css('top'),
			    left = next.css('left');

			self.animate({
				zIndex:zIndex,
				top:top,
				left:left
			},function(){
				ts.flag = true;

			});
		});

	};

	carousel.prototype.nextFn = function() {

		var ts = this;

		var liItems = this.liArr;
		liItems.each(function(){

			var self = $(this);

			if (self.prev().length > 0) {
				pre = self.prev();
			} else {
				pre =  ts.lastDom;
			}

			var zIndex = pre.css('zIndex'),
			    top = pre.css('top'),
			    left = pre.css('left');

			self.animate({
				zIndex:zIndex,
				top:top,
				left:left
			},function(){
				ts.flag = true;

			});
		});

	};

	carousel.prototype.autoPlay = function() {
		var ts = this;
		var liItems = this.liArr;
		this.timer = setInterval(function(){
			liItems.each(function(){

			var self = $(this);

			if (self.prev().length > 0) {
				pre = self.prev();
			} else {
				pre =  ts.lastDom;
			}

			var zIndex = pre.css('zIndex'),
			    top = pre.css('top'),
			    left = pre.css('left');

			self.animate({
				zIndex:zIndex,
				top:top,
				left:left
			},function(){
				ts.flag = true;

			});
		});


		},2000);

	}



	window.carousel = window.carousel || carousel;


	// body...
})(jQuery)