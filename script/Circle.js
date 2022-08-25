import { Object } from "./Object.js";

export class Circle extends Object {
  /**
   *
   * @param {number} id
   * @param {string} color
   * @param {number} radius
   * @param {float} xPos
   * @param {float} yPos
   * @param {float} xVel
   * @param {float} yVel
   * @param {float} density
   * @param {array} collidedWith an array of IDs that correspond to other objects that have been collided with.
   */
  constructor(
    id = 0,
    color = "red",
    radius = 10,
    xPos = 0,
    yPos = 0,
    xVel = 0,
    yVel = 0,
    density = 1,
    collidedWith = []
  ) {
    super(id, color, xPos, yPos, xVel, yVel, collidedWith);
    this.radius = radius;
    this.mass = density * Math.PI * radius ** 2;
  }
}
