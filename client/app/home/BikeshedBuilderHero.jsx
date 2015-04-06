var React = require('react'),
  Icon = require('../../components/general/Icon.jsx')

var BikeshedBuilderHero = React.createClass({
  propTypes: {
    hasBikes: React.PropTypes.bool.isRequired
  },

  render () {
    if (this.props.hasBikes)
      return null

    return (
      <div className='bikeshed-builder-hero'>
        <div className='bikeshed-builder-hero-logo'>
          <Icon icon='md-directions-bike'/>
        </div>
        <div className='bikeshed-builder-hero-heading'>
          No bikes in your bikeshed yet
        </div>
        <div className='bikeshed-builder-hero-create'>
          Click + to add bikes.
        </div>
      </div>
    )
  }
})

module.exports = BikeshedBuilderHero
