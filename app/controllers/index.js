//var animation = require('alloy/animation');



var animateRight = Ti.UI.createAnimation({
	left : 250,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var animateReset = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var animateLeft = Ti.UI.createAnimation({
	left : -250,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var touchStartX = 0;
var touchRightStarted = false;
var touchLeftStarted = false;
var buttonPressed = false;
var hasSlided = false;
var direction = "reset";

$.movableview.addEventListener('touchstart', function(e) {
	touchStartX = e.x;
});

$.movableview.addEventListener('touchend', function(e) {
	if (buttonPressed) {
		buttonPressed = false;
		return;
	}
	if ($.movableview.left >= 250 && touchRightStarted) {
		direction = "right";
		Ti.API.info('hacia la derecha');
		//$.leftButton.touchEnabled = false;
		$.movableview.animate(animateRight);
		hasSlided = true;
	}
	else if ($.movableview.left <= -250 && touchLeftStarted) {
		direction = "left";
		Ti.API.info('hacia la izquierda');
		//$.rightButton.touchEnabled = false;
		/*$.movableview.animate(animateLeft);/*/
		hasSlided = false;
	} else {
		direction = "reset";
		//$.leftButton.touchEnabled = true;
		//$.rightButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
	});
	touchRightStarted = false;
	touchLeftStarted = false;
});

$.movableview.addEventListener('touchmove', function(e) {
	var coords = $.movableview.convertPointToView({
		x : e.x,
		y : e.y
	}, $.containerview);
	var newLeft = coords.x - touchStartX;
	Ti.API.info(newLeft);
	if ((touchRightStarted && newLeft <= 250 && newLeft >= 0) /*|| (touchLeftStarted && newLeft <= 0 && newLeft >= -250)*/) {
		$.movableview.left = newLeft;
	}
	else {
		// Sometimes newLeft goes beyond its bounds so the view gets stuck.
		// This is a hack to fix that.
		// Uncomment to use with two views left and right
		if (/*(touchRightStarted && newLeft < 0) ||*/ (touchLeftStarted && newLeft > 0)) {
			$.movableview.left = 0;
		}
		else if (touchRightStarted && newLeft > 250) {
			$.movableview.left = 250;
		}
		else if (touchLeftStarted && newLeft < -250) {
			$.movableview.left = -250;
		}
	}
	if (newLeft > 5 && !touchLeftStarted && !touchRightStarted) {
		touchRightStarted = true;
		Ti.App.fireEvent("sliderToggled", {
			hasSlided : false,
			direction : "right"
		});
	}
	// Uncomment to use with two views left and right
	else  if (newLeft < -5 && !touchRightStarted && !touchLeftStarted) {
		touchLeftStarted = true;
		Ti.App.fireEvent("sliderToggled", {
			hasSlided : false,
			direction : "left"
		});
	}
});


$.menuButton.addEventListener('touchend', function(e) {
	if (!touchRightStarted && !touchLeftStarted) {
		buttonPressed = true;
		$.toggleLeftSlider();
	}
});

/*$.menuButton.addEventListener('touchend', function(e) {
	if (!touchRightStarted && !touchLeftStarted) {
		buttonPressed = true;
		$.toggleRightSlider();
	}
});*/

exports.toggleLeftSlider = function() {
	if (!hasSlided) {
		direction = "right";
		//$.leftButton.touchEnabled = false;
		$.movableview.animate(animateRight);
		hasSlided = true;
	} else {
		direction = "reset";
		//$.leftButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
	});
};

exports.toggleRightSlider = function() {
	if (!hasSlided) {
		direction = "left";
		//$.rightButton.touchEnabled = false;
		$.movableview.animate(animateLeft);
		hasSlided = true;
	} else {
		direction = "reset";
		//$.rightButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
    });
};

exports.handleRotation = function() {
/*
  	Add the orientation handler in the controller that loads this widget. Like this:
	Ti.Gesture.addEventListener('orientationchange', function() {
		$.ds.handleRotation();
	});
*/
	$.movableview.width = Ti.Platform.displayCaps.platformWidth;
	$.movableview.height = Ti.Platform.displayCaps.platformHeight;
};


$.index.open();

/*var menu = Alloy.createController('menu').getView();
menu.open();*/



// se crea el controlador de la ventana que contendrá el timeline
//var main = Alloy.createController('main').getView();
//main.open();
//
