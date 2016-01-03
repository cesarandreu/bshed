import raf from 'raf'

/**
 * Create a raf-based animation class
 * paint is a callback that takes a value between [0, 1]
 * duration is how long the animation should be, in milliseconds
 * onStart is called when the animation starts
 * onComplete is called when the animation completes
 */
export function createAnimation (paint, duration, onStart, onComplete) {
  function loop (currentTime) {
    const delta = (currentTime - animation._startTime) / duration
    if (delta < 1) {
      paint(delta)
      animation._animationFrame = raf(loop)
    } else {
      paint(1)
      animation._startTime = null
      animation._animationFrame = null
      onComplete()
    }
  }

  const animation = {
    _animationFrame: null,
    _startTime: null,
    start () {
      animation.stop()
      onStart()
      animation._startTime = global.performance.now()
      loop(animation._startTime)
    },
    stop () {
      if (animation._animationFrame) {
        raf.cancel(animation._animationFrame)
        animation._animationFrame = null
        animation._startTime = null
        onComplete()
      }
    }
  }

  return animation
}
