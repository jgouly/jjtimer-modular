'use strict';

var Events = (function() {
	var fns = [];

	function on(name, fn) {
		if(!fns[name]) fns[name] = [];
		fns[name].push(fn);
	}

	function emit(name, args) {
		var fns_ = fns[name];
		if(!fns_) return;
		
		for(var i = 0, l = fns_.length; i < l; i++) {
			fns_[i](args);
		}
	}

	return {
		'on': on,
		'emit': emit
	};
})();
