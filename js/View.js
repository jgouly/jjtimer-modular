'use strict';

var View = (function() {
	function $(id) {
		return document.getElementById(id);
	}

	function render(id, text) {
		$(id).innerHTML = text;
	}

	function renderTime(time) {
		if(time < 0) return "DNF";
		var use_milli = false;

		time = Math.round(time / (use_milli ? 1 : 10));
		var bits = time % (use_milli ? 1000 : 100);
		time = (time - bits) / (use_milli ? 1000 : 100);
		var secs = time % 60;
		var mins = ((time - secs) / 60) % 60;
		var hours = (time - secs - 60 * mins) / 3600;
		var s = "" + bits;
		if(bits < 10) s = "0" + s;
		if(bits < 100 && use_milli) s = "0" + s;
		s = secs + "." + s;
		if(secs < 10 && (mins > 0 || hours > 0)) s = "0" + s;
		if(mins > 0 || hours > 0) s = mins + ":" + s;
		if(mins < 20 && hours > 0) s = "0" + s;
		if(hours > 0) s = hours + ":" + s;
		return s;

	}

	function renderTimerLabelText(text) {
		render('timer_label', text);
	}

	function renderTimerLabel(time) {
		render('timer_label', renderTime(time));
	}

	function renderSessionLabel() {
		var solves = Session.getSolves();
		var str = "";
		solves.forEach(function(s) {
			str += renderTime(s) + ", ";
		});

		render('session_label', str.substr(str, str.length - 2));
	}

	function renderStatsLabel() {
		var n = Session.getSolves().length;
		render('stats_label_times', n + " / " + n);
		render('stats_label_session_average', renderTime(Session.session_average()));
	}

	return {
		'renderTimerLabel': renderTimerLabel,
		'renderTimerLabelText': renderTimerLabelText,
		'renderSessionLabel': renderSessionLabel,
		'renderStatsLabel': renderStatsLabel
	};
})();
