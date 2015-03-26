var DEFAULT_CHANGE_HANDLER = 'onChange',
  React = require('react')

var StoreMixin = {
  contextTypes: {
    getStore: React.PropTypes.func.isRequired
  },

  /**
   * Registers staticly declared listeners
   * @method componentDidMount
   */
  componentDidMount: function componentDidMount () {
    this.listeners = []

    // Register static listeners
    this.getListeners().forEach(listener => {
       this._attachStoreListener(listener)
    })
  },

  /**
   * Gets a store instance from the context
   * @param {Function|String} store The store to get
   * @returns {Object}
   * @method getStore
   */
  getStore: function getStore (store) {
    if (!this.context.getStore)
      throw new Error('getStore was called but was not found in the context')
    return typeof store !== 'object' ? this.context.getStore(store) : store
  },

  /**
   * Gets from the context all store instances required by this component
   * @returns {Object}
   * @method getStores
   */
  getStores: function getStores () {
    var storesByName = this.getListeners().reduce((accum, listener) => {
      accum[listener.store.constructor.storeName] = listener.store
      return accum
    }, {})
    return Object.keys(storesByName).map(storeName => storesByName[storeName])
  },

  /**
   * Gets a store-change handler from the component
   * @param {Function|String} handler The handler to get
   * @returns {Function}
   * @method getHandler
   */
  getHandler: function getHandler (handler) {
    if (typeof handler === 'string')
      handler = this[handler]

    if (!handler)
      throw new Error('storeListener attempted to add undefined handler')

    return handler
  },

  /**
   * Gets a listener descriptor for a store and store-change handler
   * @param {Function|String} store Store
   * @param {Function|String} handler The handler function or method name
   * @returns {Object}
   * @method getListener
   */
  getListener: function getListener (store, handler) {
    return {
      handler: this.getHandler(handler),
      store: this.getStore(store)
    }
  },

  /**
   * Gets all store-change listener descriptors from the component
   * @returns {Object}
   * @method getListeners
   */
  getListeners: function getListeners () {
    var storeListeners = this.constructor.storeListeners // Static property on component

    if (!storeListeners)
      return []

    if (Array.isArray(storeListeners))
      return storeListeners.map(store => this.getListener(store, DEFAULT_CHANGE_HANDLER))

    return Object.keys(storeListeners).reduce((accum, handler) => {
      var stores = storeListeners[handler]
      if (!Array.isArray(stores))
        stores = [stores]
      return accum.concat(stores.map(store => this.getListener(store, handler)))
    }, [])

  },

  /**
   * If provided with events, will attach listeners to events on EventEmitter objects(i.e. Stores)
   * If the component isn't mounted, events aren't attached.
   * @param {Object} listener
   * @param {Object} listener.store Store instance
   * @param {Object} listener.handler Handler function or method name
   * @method _attachStoreListener
   * @private
   */
  _attachStoreListener: function _attachStoreListener (listener) {
    if (this.isMounted && !this.isMounted())
      throw new Error(`storeListener mixin called listen when component wasn't mounted`)

    listener.store.addChangeListener(listener.handler)
    this.listeners.push(listener)
  },

  /**
   * Removes all listeners
   * @method componentWillUnmount
   */
  componentWillUnmount: function componentWillUnmount () {
    this.listeners.forEach((listener) => {
      listener.store.removeChangeListener(listener.handler)
    })
    this.listeners = []
  }

}

module.exports = StoreMixin
