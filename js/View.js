'use strict';

var View = (function() {
	function $(id) {
		return document.getElementById(id);
	}

	function render(id, text) {
		$(id).innerHTML = text;
	}

	function renderTimerLabel(text) {
		render('timer_label', text);
	}

	function renderSessionLabel() {
		var solves = Session.getSolves();
		var str = "";
		solves.forEach(function(s) {
			str += s + " ";
		});

		render('session_label', str);
	}

	return {
		'renderTimerLabel': renderTimerLabel,
		'renderSessionLabel': renderSessionLabel
	};
})();
