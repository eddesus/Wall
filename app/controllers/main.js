var animation = require('alloy/animation');



function swipeWindow(e) {
	Ti.API.debug('swipe' + JSON.stringify(e));
	Ti.API.debug('Width: ' + Ti.Platform.displayCaps.platformWidth + ' Height: ' + Ti.Platform.displayCaps.platformHeight);
	if (e.direction === "right") {
		$.getView().animate({
			left : 250,
			duration : 200
		});
	} else if (e.direction === "left") {
		$.getView().animate({
			left : 0,
			duration : 200
		});
	}

}
