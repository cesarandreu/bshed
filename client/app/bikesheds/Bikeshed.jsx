var React = require('react'),
  {Link} = require('react-router')

var Bikeshed = React.createClass({
  render: function () {
    return (
      <div>
        <Link to='/bikesheds'>BIKESHEDS</Link>
        <Link to='/bikesheds/1'>BIKESHED 1</Link>
        <Link to='/bikesheds/2'>BIKESHED 2</Link>
      </div>
    )
  }
})

module.exports = Bikeshed
