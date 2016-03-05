export default function getScreenSize () {
  const windowHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  const windowWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

  return {
    height: windowHeight,
    width: windowWidth
  }
}
