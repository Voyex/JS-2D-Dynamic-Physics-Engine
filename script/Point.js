export class Point {
  xPos;
  yPos;

  // Constructor any values not passed are assumed to be zero
  constructor(xPos = 0, yPos = 0) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}
