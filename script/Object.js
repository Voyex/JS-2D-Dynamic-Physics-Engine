export class Object {
  // The postion of the mouse in the X and Y axis
  xPos;
  yPos;
  // The velocity of the mouse in the X and Y axis
  xVel;
  yVel;

  color;

  constructor(color = "red", xPos = 0, yPos = 0, xVel = 0, yVel = 0) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
    this.color = color;
  }

  resetPosition() {
    this.xPos = -100;
    this.yPos = -100;
  }
}
