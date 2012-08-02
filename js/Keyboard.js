'use strict';

var Keyboard = (function() {
	function init() {
		document.onkeydown = key_down;
		document.onkeyup = key_up;
	}

	function build_cmd(dir, key, shift) {
		return 'Keyboard.' + dir + (shift ? '.shift.' : '.') + key;
	}

	var key_names = {'space': 32, 'esc': 27};

	function split_key(key) {
		var ary = key.split('+');
		var shift = false;
		var key = ary[0];
		if(ary[0] === 'shift') {
			key = ary[1];
			shift = true;
		}
		key = key_names[key] || key.toUpperCase().charCodeAt(0);
		return {'key': key, 'shift': shift};
	}

	function on_down(key, fn) {
		var k = split_key(key);
		Events.on(build_cmd('down', k['key'], k['shift']), fn);
	}
	
	function on_up(key, fn, shift) {
		var k = split_key(key);
		Events.on(build_cmd('up', k['key'], k['shift']), fn);
	}

	function key_down(ev) {
		Events.emit(build_cmd('down', ev.keyCode, ev.shiftKey));
	}
	
	function key_up(ev) {
		Events.emit(build_cmd('up', ev.keyCode, ev.shiftKey));
	}

	return {
		'init': init,
		'on_down': on_down,
		'on_up': on_up
	};
})();
