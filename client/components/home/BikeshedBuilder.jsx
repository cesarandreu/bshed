var React = require('react'),
  BikeGrid = require('./BikeGrid.jsx');

var BikeshedBuilder = React.createClass({
  render: function () {
    return (
      <div className='bikeshed-builder'>
        <BikeGrid bikes={this.props.bikes}/>
      </div>
    );
  }
});

module.exports = BikeshedBuilder;
