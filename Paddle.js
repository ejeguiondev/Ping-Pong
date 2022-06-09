const SPEED = 0.02
export default class Paddle {
    constructor(paddleElemnt) {
      this.paddleElemnt = paddleElemnt;
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElemnt).getPropertyValue("--position"))
      }
  
      set position(value) {
        this.paddleElemnt.style.setProperty("--position", value)
  
      }

      reset() {
        this.position = 50
      }

      rect() {
        return this.paddleElemnt.getBoundingClientRect()
      }


      update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
      }



}
