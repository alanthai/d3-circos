'use strict';

function range(len) {
  return Array(len).fill().map((_, i) => i);
}

function randomInteger(min, max) {
  return Math.floor((Math.random() * max - min + 1) + min);
}

function randomNumber(min, max) {
  return Math.random() * max - min;
}

function mod(n, m) {
    return ((n%m)+m)%m;
};

// GEOEMTRY

const toDegrees = r => {
  return r * 180 / Math.PI;
}

const rotate = (p, angle) => ({
  x: p.x * Math.cos(angle) - p.y * Math.sin(angle),
  y: p.x * Math.sin(angle) + p.y * Math.cos(angle),
});

const scale = (p, r) => ({x: p.x * r, y: p.y * r})

const translate = (p, cx, cy) => ({x: p.x + cx, y: p.y + cy});

// get point of unit circle, given angle
const circlePoint = angle => rotate({x: 1, y: 0}, angle);

const partition = numArcs => 2 * Math.PI / numArcs;

const slope = (p1, p2) => ((p2.y - p1.y)/(p2.x - p1.x));

/**
 * Get a point in a circle given an angle
 * @param r {number} radius
 * @param cx {number} x center coordinate
 * @param cy {number} y center coordinate
 * @param a {number} angle in radians
 */

function transform(s, x, y, a, p) {
  return translate(scale(rotate(p, a), s), x, y);
}

// CURVE DRAWING

function spread(p) {return `${p.x} ${p.y}`;}

/**
 * Returns SVG path of a circle arc from one angle to another
 */
function getCircleArc(r, p1, p2) {
  return `M ${p1.x} ${p1.y} A ${r} ${r}, 0, 0, 1, ${p2.x} ${p2.y}`;
}

/**
 * Returns SVG path of a bezier curve
 */
function getBezier(p1, b1, b2, p2) {
  return `M ${spread(p1)} C ${[b1, b2, p2].map(spread).join(', ')}`;
}

function getLine(p1, p2) {
  return `M ${spread(p1)} L ${spread(p2)}`;
}