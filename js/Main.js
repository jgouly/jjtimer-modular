'use strict';

var Main = (function() {
	function init() {
		Keyboard.init();
		
		Keyboard.on_up('space', Timer.trigger_up);
		Keyboard.on_down('space', Timer.trigger_down);

		Timer.on('running', View.renderTimerLabel);

		Timer.on('stop', View.renderSessionLabel);
		Timer.on('stop', Session.add);
		Timer.on('stop', View.renderTimerLabel);
	}

	return {
		'init': init
	};
})();

window.onload = Main.init;
