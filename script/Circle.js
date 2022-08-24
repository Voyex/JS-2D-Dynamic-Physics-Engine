import { Object } from "./Object.js";

export class Circle extends Object {
  /**
   *
   * @param {string} color
   * @param {number} radius
   * @param {float} xPos
   * @param {float} yPos
   * @param {float} xVel
   * @param {float} yVel
   * @param {float} density
   */
  constructor(
    color = "red",
    radius = 10,
    xPos = 0,
    yPos = 0,
    xVel = 0,
    yVel = 0,
    density = 1
  ) {
    super(color, xPos, yPos, xVel, yVel);
    this.radius = radius;
    this.mass = density * Math.PI * radius ** 2;
  }
}
