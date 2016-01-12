'use strict';

var graph = (function(svg){

	var	draw_step = .1,
		formulas 	= {
			"a*y=b*x": function(v, x){
				return v.b * x / v.a;
			},
			"y^a=x^b": function(v, x){
				var xb = Math.pow(x, v.b),
					a  = 1 / v.a;

				return Math.pow(xb, a);
			}
		};

	document
		.getElementsByClassName('sidebar')[0]
		.addEventListener('click', startDraw);



	return {
		draw: draw
	}

	function startDraw(event) {
		if (event.target.classList.contains('js-draw-graph')) {
			var parent 		= event.target.parentNode,
				formula_id 	= parent.getAttribute('data-formula-id'),
				fields 		= parent.getElementsByClassName('js-formula-variable'),
				variables 	= {},
				key, val;

			for (var i = 0, len = fields.length; i < len; i++) {
				var key = fields[i].getAttribute('data-variable'),
				 	val = fields[i].value;

				variables[key] = val;
			}

			draw(formula_id, variables);
		}
	}

	function draw(formula_id, variables) {
		var points = getPoints(formula_id, variables, svg.x_min, svg.x_max, draw_step);

		//only points
		// points.forEach(function(point){
		// 	drawPoint(point, formula_id);
		// });

		//path
		drawPath(points, formula_id);
	}

	function getPoints(formula_id, variables, x_from, x_to, step) {
		var ret = [],
			y;

		for (var x = x_from; x <= x_to; x = x + step) {
			y = formulas[formula_id](variables, parseFloat(x.toFixed(2)));

			ret.push({
				x: parseFloat(x.toFixed(2)),
				y: y
			});
		}

		return ret;
	}

	function normalizeCoords(type, val) {
		return type === 'x' ? val * svg.unit + svg.x0 : svg.y0 - val * svg.unit;
	}

	function drawPath(points, formula_id) {
		var p 		= document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			path 	= '';

		points.forEach(function(point, index){

			if ((point.x || point.x === 0) && (point.y || point.y === 0)) {
				path += path === '' ? 'M ' : 'L ';
				path += normalizeCoords('x', point.x) + ' ' +  normalizeCoords('y', point.y) + ' ';
			}
		});

		p.setAttribute('d', path);

		p.setAttribute('data-formula-id', formula_id);

		p.style.stroke = '#d00';
		p.style.fill = 'transparent';

		svg.el.appendChild(p);
	}


})(svg);