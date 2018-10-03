/*
 * Fasih Carousel (tcs.js)
 * Version     : 1.0
 * Author      : Fathi “fsc” Anshory, David "dvlwj" Valentino
 * Description : A jQuery plugin to make a image slider that cascades its child element, like accordion.
 * License     : MIT
*/

(function($) {
	$.fn.theCascadingSlider = function(options) {
		var jqObj, jObj, el;
		jqObj = this;
		jqObj.toggleClass("nrm-slider");

		options = $.extend({
			"pauseDuration": 4800 // The default waiting time before the slide slides. If DATA-PAUSE attribute is present in the slide element, then this option is deferred.
		}, options);

		jObj = jqObj[0];
		jObj.nrmSlider = {
			"length": jqObj.find("td").length, // number of the slides
			"index": 0,
			"goTo": function(goTo) {
				goTo = goTo || jqObj.find("td:first-child");

				jqObj.off("click", "td:not(.shown)");

				jObj.nrmSlider.index = goTo.index();

				el = jqObj.find("td.shown");
				el.animate({"width": ((jObj.offsetWidth * (20 / 100)) / (jObj.nrmSlider.length - 1)) + "px"}, 480, function() {
					el.css("background-position-x", el.data("folded-centre") ? el.data("folded-centre") : "50%").removeClass("shown");
				});

				goTo.animate({"width": (jObj.offsetWidth * (80 / 100)) + "px"}, 640, function() {
					goTo.css("background-position-x", "50%").addClass("shown");
				});

				jObj.nrmSlider.timeout = setTimeout(jObj.nrmSlider.goTo, goTo.data("pause") ? goTo.data("pause") : options.pauseDuration, goTo.next().length > 0 ? goTo.next() : jqObj.find("td").first());
			}, 
			"timeout": null
		};

		jqObj.hover(function(event) {
			clearTimeout(jObj.nrmSlider.timeout);
			jqObj.on("click", "td:not(.shown)", function(event) {
				jObj.nrmSlider.goTo($(this));
				clearTimeout(jObj.nrmSlider.timeout);
			});
		}, function(event) {
			var target = $(this).find("td.shown");
			jObj.nrmSlider.timeout = setTimeout(jObj.nrmSlider.goTo, target.data("pause") ? target.data("pause") : options.pauseDuration, target.next().length > 0 ? target.next() : jqObj.find("td:first-child"));
			jqObj.off("click", "td:not(.shown)");
		});

		jObj.nrmSlider.timeout = setTimeout(jObj.nrmSlider.goTo, options.pauseDuration); // init the slide
	};
})(jQuery);