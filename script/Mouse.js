//An object representing the mouse;
export class Mouse {
  // The position of the mouse in the X and Y axis
  XPos;
  YPos;
  // The velocity of the mouse in the X and Y axis
  XVel;
  YVel;
  //Properties of the mouse
  radius; // the radius of the mouse
  xOffset; // the offset in the x direction for the center of the mouse.
  yOffset; // the offset in the y direction for the center of the mouse.

  constructor() {
    this.XPos = -100;
    this.YPos = -100;
    this.YVel = 0;
    this.XVel = 0;
    this.radius = 10;
    this.xOffset = 0;
    this.yOffset = 0;
  }

  // Moves the mouse of the the way so it is not calculated in the physics simulation
}
