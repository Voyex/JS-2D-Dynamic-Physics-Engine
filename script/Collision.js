export class Collision {
  // The position of the first object in the collision.
  firstXPos;
  firstYPos;
  // The position of the second object in the collision.
  secondXPos;
  secondYPos;

  timeAtCollision; // The exact time the collision occured

  constructor(
    firstXPos = 0,
    firstYPos = 0,
    secondXPos = 0,
    secondYPos = 0,
    timeAtCollision = 0
  ) {
    this.firstXPos = firstXPos;
    this.firstYPos = firstYPos;
    this.secondXPos = secondXPos;
    this.secondYPos = secondYPos;
    this.timeAtCollision = timeAtCollision;
  }
}
