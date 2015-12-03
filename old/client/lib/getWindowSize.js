/**
 * Get window size
 * @flow
 */
export default function getWindowSize (): { windowWidth: number, windowHeight: number } {
  return {
    windowWidth: getWindowWidth(),
    windowHeight: getWindowHeight()
  }
}

export function getWindowWidth (): number {
  return window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
}

export function getWindowHeight (): number {
  return window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
}
