var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  {Link} = require('react-router'),
  cn = require('classnames')

var Sidebar = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    sidebar: React.PropTypes.object.isRequired,
    closeSidebar: React.PropTypes.func.isRequired
  },

  render: function () {
    var {sidebar, closeSidebar} = this.props
    var links = [{
      path: '/',
      text: 'Home'
    }, {
      path: '/bikesheds',
      text: 'Bikesheds'
    }, {
      path: '/about',
      text: 'About'
    }]

    return (
      <div className={cn('sidebar-container', {'is-open': sidebar.open})}>
        <nav className='sidebar'>
          <div className='sidebar-section'>
            {links.map((link, idx) =>
              <Link key={idx} onClick={this._checkState} to={link.path}>{link.text}</Link>
            )}
          </div>
        </nav>
        <div className='sidebar-overlay' onClick={closeSidebar}></div>
      </div>
    )
  },

  _checkState: function (e) {
    if (e.currentTarget.classList.contains('active'))
      e.preventDefault()
  }
})

module.exports = Sidebar
