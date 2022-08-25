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
    let initTotalVel = 0;
    for (const object of this.objects) {
      initTotalVel += Math.abs(object.xVel);
      initTotalVel += Math.abs(object.yVel);
    }

    // This can defenitely be optimized for performance.
    for (const firstCircle of this.objects.slice(1)) {
      for (const secondCircle of this.objects) {
        // Don't look for collisions on the same circle.
        if (firstCircle == secondCircle) continue;

        // Don't look for collisions if one just occured
        if (firstCircle.collidedWith.includes(secondCircle.id)) continue;

        const closestPoint = closestPointOnLine(
          firstCircle.xPos,
          firstCircle.yPos,
          firstCircle.xPos + firstCircle.xVel,
          firstCircle.yPos + firstCircle.yVel,
          secondCircle.xPos,
          secondCircle.yPos
        );

        const nearestDistSquared =
          (secondCircle.xPos - closestPoint.xPos) ** 2 +
          (secondCircle.yPos - closestPoint.yPos) ** 2;
        const minDistSquared = (firstCircle.radius + secondCircle.radius) ** 2;

        //Check to see if circles are colliding.
        if (nearestDistSquared <= minDistSquared) {
          firstCircle.collidedWith.push(secondCircle.id);
          secondCircle.collidedWith.push(firstCircle.id);

          const newVelocities = handleCirclesCollision(
            firstCircle,
            secondCircle,
            closestPoint,
            nearestDistSquared
          );

          firstCircle.xVel = newVelocities.xVel1;
          firstCircle.yVel = newVelocities.yVel1;
          secondCircle.xVel = newVelocities.xVel2;
          secondCircle.yVel = newVelocities.yVel2;
        }
      }
      handleCircleWallCollision(
        firstCircle,
        [0, this.rightWallPos],
        [0, this.bottomWallPos]
      );
    }
    // Reset the circles that have been collided with so that collisions can occur again
    let finalTotalVel = 0;
    for (const circle of this.objects) {
      circle.collidedWith = [];
      finalTotalVel += Math.abs(circle.xVel);
      finalTotalVel += Math.abs(circle.yVel);
    }

    // Warns the user if the toal velocity in the system ever changes
    if (finalTotalVel != initTotalVel)
      console.warn(
        `The System is Accelerating! | Previous Total Velocity: ${initTotalVel} | New Total Velocity: ${finalTotalVel}`
      );

    /**
     * Handles the collision between two circles.
     * NOTE: Rename this function
     *
     * @param {Circle} circle1
     * @param {Circle} circle2
     */
    function handleCirclesCollision(
      circle1,
      circle2,
      closestPoint,
      nearestDistSquared
    ) {
      const collisionPoint1 = calculateCollisionPoint(circle1, circle2);
      const collisionPoint2 = calculateCollisionPoint(circle2, circle1);

      // NOTE: Refactor this to remove the use of square roots.
      const collisionDist = Math.sqrt(
        (collisionPoint1.xPos - collisionPoint2.xPos) ** 2 +
          (collisionPoint1.yPos - collisionPoint2.yPos) ** 2
      );

      let normalX =
        (collisionPoint1.xPos - collisionPoint2.xPos) / collisionDist;
      let normalY =
        (collisionPoint1.yPos - collisionPoint2.yPos) / collisionDist;

      if (collisionDist == 0) {
        normalX = 0;
        normalY = 0;
      }

      const pValue =
        (2 *
          (circle1.xVel * normalX +
            circle1.yVel * normalY -
            circle2.xVel * normalX -
            circle2.yVel * normalY)) /
        (circle1.mass + circle2.mass);

      const xVel1 = circle1.xVel - pValue * circle1.mass * normalX;
      const yVel1 = circle1.yVel - pValue * circle1.mass * normalY;
      const xVel2 = circle2.xVel + pValue * circle2.mass * normalX;
      const yVel2 = circle2.yVel + pValue * circle2.mass * normalY;

      return { xVel1, yVel1, xVel2, yVel2 };

      /**
       * Helper function to calculate the collision point between two circles
       * NOTE: This function should be refactored to remove/reduce use of square roots.
       *
       * @param {*} firstCircle
       * @param {*} secondCircle
       */
      function calculateCollisionPoint(firstCircle, secondCircle) {
        const backupDistance = Math.sqrt(
          (firstCircle.radius + secondCircle.radius) ** 2 - nearestDistSquared
        );
        const movemnetVectorLength = Math.sqrt(
          firstCircle.xVel ** 2 + firstCircle.yVel ** 2
        );
        const collisionXPos =
          closestPoint.xPos -
          backupDistance * (firstCircle.xVel / movemnetVectorLength);
        const collisionYPos =
          closestPoint.yPos -
          backupDistance * (firstCircle.yVel / movemnetVectorLength);

        return new Point(collisionXPos, collisionYPos);
      }
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
     * Finds the closest point on a line to a point in 2D space.
     *
     * For more information on this method visit https://ericleong.me/research/circle-circle/
     *
     * NOTE: This method should be refactored for increased readability.
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

      const C1 = A1 * lx1 + B1 * ly1;
      const C2 = -B1 * x0 + A1 * y0;

      const Determinant = A1 ** 2 + B1 ** 2;

      let closestPoint = new Point();

      // Check that the determinant is non-zero before calculating.
      if (Determinant != 0) {
        closestPoint.xPos = (A1 * C1 - B1 * C2) / Determinant;
        closestPoint.yPos = (A1 * C2 + B1 * C1) / Determinant;
      } else {
        // The determinant is 0. Therefore, the closest point on the line is (x0, y0)
        closestPoint.xPos = x0;
        closestPoint.yPos = y0;
      }
      // Check if the result is not a valid point on the line segment. If this is true, then one needs to find the endpoint which the line is closest to.
      if (
        closestPoint.xPos > Math.max(lx1, lx2) ||
        closestPoint.xPos < Math.min(lx1, lx2) ||
        closestPoint.yPos > Math.max(ly1, ly2) ||
        closestPoint.yPos < Math.min(ly1, ly2)
      ) {
        const initialPoint = new Point(x0, y0);
        const point1 = new Point(lx1, ly1);
        const point2 = new Point(lx2, ly2);

        // If the initial point is closer to the first point then the first point is the closest point. Otherwise, it must be the second point.
        if (
          getSquaredDistance(initialPoint, point1) <
          getSquaredDistance(initialPoint, point2)
        ) {
          closestPoint = point1;
        } else {
          closestPoint = point2;
        }
      }

      function getSquaredDistance(point1, point2) {
        return (
          (point1.xPos - point2.xPos) ** 2 + (point1.yPos - point2.yPos) ** 2
        );
      }

      return closestPoint;
    }
  }
}
