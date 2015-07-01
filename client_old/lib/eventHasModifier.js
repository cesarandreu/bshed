/**
 * Check if event has modifier
 * @params {Event} [e={}] Keyboard event
 * @returns {boolean} Whether or not the event has a modifier
 */
module.exports = function eventHasModifier (e={}) {
  return ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'].some(key => e[key])
}
