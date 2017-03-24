'use strict';

var svg = (function(){

	var el 		= document.getElementsByClassName('svg-canvas')[0],
		unit 	= 50,
		grid_unit = 50,
		el_width, el_height, el_x_center, el_y_center, x_max,
		tmp, len, i;

    redraw();

	return {
		el: el,
		x0: el_x_center,
		y0: el_y_center,
		x_min: x_max * -1,
		x_max: x_max,
		unit: unit,
		grid_unit: grid_unit,
		redraw: redraw
	};


	function redraw() {
		clearGrid();

		el_width 	= parseInt(el.getBoundingClientRect().width);
		el_x_center = el_width / 2;
		el_height 	= parseInt(el.getBoundingClientRect().height);
		el_y_center = el_height / 2;
		x_max 		= el_x_center / unit;
		xLines();
		yLines();

		drawLine(el_x_center, 0, el_x_center, el_height, true);
		drawLine(0, el_y_center, el_width, el_y_center, true);
	}

	function clearGrid() {
		var elements = el.getElementsByClassName('grid');

		while (elements[0]) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	function xLines(){
		for (i = 1, len = el_x_center / grid_unit; i < len; i++) {
			tmp = el_x_center + i * grid_unit;
			drawLine(tmp, 0, tmp, el_height);
			tmp = el_x_center - i * grid_unit;
			drawLine(tmp, 0, tmp, el_height);
		}
	}

	function yLines(){
		for (i = 1, len = el_y_center / grid_unit; i < len; i++) {
			tmp = el_y_center + i * grid_unit;
			drawLine(0, tmp, el_width, tmp);
			tmp = el_y_center - i * grid_unit;
			drawLine(0, tmp, el_width, tmp);
		}
	}

	function drawLine(x1, y1, x2, y2, is_bold) {
		var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

		line.setAttribute('x1', Math.floor(x1) + .5);
		line.setAttribute('y1', Math.floor(y1) + .5);
		line.setAttribute('x2', Math.floor(x2) + .5);
		line.setAttribute('y2', Math.floor(y2) + .5);

		line.classList.add('grid');

		line.style.stroke 		= is_bold ? '#000' : '#ddd';
		line.style.strokeWidth 	= '1px';

		el.appendChild(line);
	};

})();