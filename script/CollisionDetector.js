import { Collision } from "./Collision.js";
import { Point } from "./Point.js";

export class CollisionDetector {
  objects; // Array of objects that can collide with each other

  constructor(objects, canvasBounds) {
    this.objects = objects;
    this.rightWallPos = canvasBounds.width;
    this.bottomWallPos = canvasBounds.height;
  }

  // Looks for any circles that intersect
  handleCollisions() {
    // This can defenitely be optimized for performance.
    for (const firstCircle of this.objects.slice(1)) {
      for (const secondCircle of this.objects) {
        // Don't look for collisions on the same circle.
        if (firstCircle == secondCircle) continue;

        //Check to see if circles are colliding.
        if (isCirclesColliding(firstCircle, secondCircle)) {
          handleCirclesCollision(firstCircle, secondCircle);
          console.log("Collision detected");
        }
      }
      handleCircleWallCollision(
        firstCircle,
        [0, this.rightWallPos],
        [0, this.bottomWallPos]
      );
    }

    // Returns true if circles are colliding, false if they are not.
    function isCirclesColliding(circle1, circle2) {
      let actualSquaredDist =
        (circle1.xPos - circle2.xPos) ** 2 + (circle1.yPos - circle2.yPos) ** 2;
      let minSquaredDist = (circle1.radius + circle2.radius) ** 2;

      return actualSquaredDist <= minSquaredDist;
    }

    // This can likely be optimized
    function handleCircleWallCollision(circle, wallsXPos, wallsYPos = NaN) {
      for (const wallX of wallsXPos) {
        if (
          (wallX != wallsXPos[0] && circle.xPos + circle.radius >= wallX) ||
          (wallX != wallsXPos[1] && circle.xPos - circle.radius <= wallX)
        ) {
          circle.xVel *= -1; // Invert the X velocity
        }
      }
      for (const wallY of wallsYPos) {
        if (
          (wallY != wallsYPos[0] && circle.yPos + circle.radius >= wallY) ||
          (wallY != wallsYPos[1] && circle.yPos - circle.radius <= wallY)
        ) {
          circle.yVel *= -1; // Invert the Y velocity
        }
      }
    }

    /**
     * Handles the collision between two circles.
     *
     * @param {Circle} circle1
     * @param {Circle} circle2
     */
    function handleCirclesCollision(circle1, circle2) {}

    /**
     * Finds the location and time of the initial collision
     *
     * @param {Circle} circle1
     * @param {Circle} circle2
     */
    function findCircleCollision(circle1, circle2) {
      const collision = new Collision();

      return collision;
    }

    /**
     * Finds the closest point on a line to a point in 2D space.
     *
     * For more information on this method visit https://ericleong.me/research/circle-circle/
     *
     * @param {*} lx1
     * @param {*} ly1
     * @param {*} lx2
     * @param {*} ly2
     * @param {*} x0
     * @param {*} y0
     *
     * @returns {Point} an object that represents a point on the line closest to the point (x0, y0).
     */
    function closestPointOnLine(lx1, ly1, lx2, ly2, x0, y0) {
      const A1 = ly2 - ly1;
      const B1 = lx1 - lx2;

      const C1 = (ly2 - ly1) * lx1 + (lx1 - lx2) * ly1;
      const C2 = -B1 * x0 + A1 * y0;

      const Determinant = A1 * A1 - -B1 * B1;

      let cx = 0.0;
      let cy = 0.0;

      // Check that the determinant is non-zero before calculating.
      if (Determinant != 0) {
        cx = (A1 * C1 - B1 * C2) / Determinant;
        cy = (A1 * C2 - B1 * C1) / Determinant;
      } else {
        // The determinant is 0. Therefore, the closest point on the line is (x0, y0)
        cx = x0;
        cy = y0;
      }
      return new Point(cx, cy);
    }
  }
}
