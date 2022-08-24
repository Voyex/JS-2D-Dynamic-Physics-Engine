export class MovementHandler {
  objects; // Array of objects that can collide with each other

  constructor(objects) {
    this.objects = objects;
  }

  handleMovement() {
    for (const object of this.objects.slice(1)) {
      object.xPos += object.xVel;
      object.yPos += object.yVel;
    }
  }
}
