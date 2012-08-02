'use strict';

var Timer = (function() {
	var Waiting = 0, Inspecting = 1, Ready = 2, Running = 3, Stopped = 4;
	var state = Waiting;

	var start_time, end_time;
	var running_timer;
	
	function set_running() {
		start_time = Date.now();
		state = Running;
		running_timer = setInterval(function() { Events.emit('Timer.running', get_time()); }, 10);
	}

	function set_stopped() {
		end_time = Date.now();
		state = Stopped;
		clearInterval(running_timer);
		Events.emit('Timer.stop', end_time - start_time);
		setTimeout(function() { state = Waiting; }, 500);
	}

	function trigger_down() {
		if(state === Running) {
			set_stopped();
		} else if(state === Waiting) {
			state = Ready;
		}
	}

	function trigger_up() {
		if(state === Ready) {
			set_running();
		}
	}

	function get_time() {
		return Date.now() - start_time;
	}

	function on(cmd, fn) {
		Events.on('Timer.'+cmd, fn);
	}

	return {
		'trigger_down': trigger_down,
		'trigger_up': trigger_up,
		'get_time': get_time,
		'on': on
	};
})();
