export class Object {
  // The ID of the object
  id;
  // The postion of the mouse in the X and Y axis
  xPos;
  yPos;
  // The velocity of the mouse in the X and Y axis
  xVel;
  yVel;

  color;

  collidedWith;

  constructor(
    id = 0,
    color = "red",
    xPos = 0,
    yPos = 0,
    xVel = 0,
    yVel = 0,
    collidedWith = []
  ) {
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
    this.color = color;
    this.collidedWith = collidedWith;
  }

  resetPosition() {
    this.xPos = -100;
    this.yPos = -100;
  }
}
