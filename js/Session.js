"use strict";

var Session = (function() {
	var solves = [];

	function getSolves() {
		return solves;
	}

	function add(solve) {
		solves.push(solve);
	}

	return {
		'getSolves': getSolves,
		'add': add
	};
})();
