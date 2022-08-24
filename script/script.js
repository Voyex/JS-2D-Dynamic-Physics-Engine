import { Mouse } from "./Mouse.js";
import { Circle } from "./Circle.js";
import { CollisionDetector } from "./CollisionDetector.js";
import { MovementHandler } from "./MovementHandler.js";

const canvas = document.getElementById("sim-window");
canvas.width = 1200;
canvas.height = 700;
const ctx = canvas.getContext("2d");

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.xPos, circle.yPos, circle.radius, 0, 2 * Math.PI);
  ctx.fillStyle = circle.color;
  ctx.fill();
}

let objects = [];

// The mouse is just a circle
const mouse = new Circle();
objects.push(mouse);

let isOverCanvas = false;

const centerCircle = new Circle("blue", 20, 200, 200, 5, 3);
objects.push(centerCircle);

const anotherCircle = new Circle("green", 15, 800, 200, 4, 7);
objects.push(anotherCircle);

let rect = canvas.getBoundingClientRect();
// Draws an individual frame on a canvas and then
function draw() {
  // Clear the canvas first before doing anything
  ctx.clearRect(0, 0, rect.width, rect.height);

  // Get the new bouds
  canvas.onresize = function () {
    rect = canvas.getBoundingClientRect();
  };

  getMousePosition(objects[0]); // Gets the information about the mouse position

  const detector = new CollisionDetector(objects, rect);
  detector.handleCollisions();

  const mover = new MovementHandler(objects);
  mover.handleMovement();

  for (const object of objects) {
    drawCircle(object);
  }

  window.requestAnimationFrame(draw);
}

function getMousePosition(mouse) {
  // Gets the mouse's position everytime the mouse moves.
  canvas.onmousemove = function (e) {
    mouse.xPos = e.clientX - rect.left;
    mouse.yPos = e.clientY - rect.top;
    mouse.xVel = e.movementX;
    mouse.yVel = e.movementY;
  };

  canvas.onmouseenter = function () {
    isOverCanvas = true;
  };

  canvas.onmouseleave = function () {
    isOverCanvas = false;
    mouse.resetPosition();
  };
}

window.requestAnimationFrame(draw);
