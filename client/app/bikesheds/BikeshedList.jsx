var React = require('react'),
  {Link} = require('react-router')

var BikeshedList = React.createClass({
  render: function () {
    return (
      <div>
        <h1>BIKESHED LIST</h1>
        <Link to='/bikesheds'>BIKESHEDS</Link>
        <Link to='/bikesheds/1'>BIKESHED 1</Link>
        <Link to='/bikesheds/2'>BIKESHED 2</Link>
        {this.props.list.map((bikeshed, idx) => {
          return <div key={idx}>{JSON.stringify(bikeshed)}</div>
        })}
      </div>
    )
  }
})

module.exports = BikeshedList
