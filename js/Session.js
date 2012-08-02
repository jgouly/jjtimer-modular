"use strict";

var Session = (function() {
	var solves = [];

	function reset() {
		solves = [];
	}

	function getSolves() {
		return solves;
	}

	function add(solve) {
		solves.push(solve);
	}

	function get_trim_count(n) {
		return Math.ceil((n/10)/2);
	}

	function solve_sort(a, b) {
		return a - b;
	}

	function average(start, length) {
		if(solves.length < 3) return -1;

		start = start || 0;
		length = length || solves.length;
		if(length - start > solves.length) return -1;
		var end = start + length;

		var trim = get_trim_count(length);

		var copy = solves.slice(start, end);
		copy.sort(solve_sort);
		copy.splice(0, trim);
		copy.splice(copy.length - trim, trim);

		//if(copy[copy.length-1]['DNF']) return -1;

		var sum = 0;
		for(var i = 0; i < copy.length; ++i)
		{
			sum += copy[i];
		}
		return sum / (length - (2 * trim));
	}

	function session_average() {
		return average(0, solves.length);
	}

	return {
		'reset': reset,
		'getSolves': getSolves,
		'add': add,
		'average': average,
		'session_average': session_average
	};
})();
