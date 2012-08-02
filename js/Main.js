'use strict';

var Main = (function() {
	function init() {
		Keyboard.init();
		
		Keyboard.on_up('space', Timer.trigger_up);
		Keyboard.on_down('space', Timer.trigger_down);

		Keyboard.on_up('esc', reset);

		Timer.on('running', View.renderTimerLabel);

		Timer.on('stop', View.renderTimerLabel);
		Timer.on('stop', Session.add);
		Timer.on('stop', View.renderSessionLabel);
		Timer.on('stop', View.renderStatsLabel);
	}

	function reset() {
		Timer.reset();
		Session.reset();
		View.renderSessionLabel();
		View.renderStatsLabel();
		View.renderTimerLabelText("ready");
	}

	return {
		'init': init
	};
})();

window.onload = Main.init;
