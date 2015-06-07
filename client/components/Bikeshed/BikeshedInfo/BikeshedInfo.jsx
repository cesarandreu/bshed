require('./BikeshedInfo.less')

const cn = require('classnames')
const moment = require('moment')
const React = require('react/addons')
const {Link} = require('react-router')
const Immutable = require('immutable')
const inflection = require('inflection')
const Paper = require('../../general/Paper')
const PureRenderMixin = React.addons.PureRenderMixin

const BikeshedInfo = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {bikeshed, user} = this.props

    const registered = user.get('registered')
    const author = user.get('name')

    const description = bikeshed.get('description')
    const createdAt = bikeshed.get('createdAt')
    const votes = bikeshed.get('votes')

    return (
      <Paper className='bikeshed-info'>

        {/* Tagline and votes */}
        <div className='bikeshed-info-head'>
          <span className='bikeshed-info-tagline'>
            {'Created '}
            <time
              title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              className='bikeshed-info-timestamp'
              dateTime={createdAt}
            >
              {moment(createdAt).fromNow()}
            </time>
            {' by '}
            <span className={cn('bikeshed-info-author', {registered})}>
              {author || 'anonymous'}
            </span>
          </span>

          <span className='bikeshed-info-votes'>
            {`${votes} ${inflection.inflect('votes', votes)}`}
          </span>
        </div>

        {/* Description */}
        {/* @TODO: update style to be more similar to text input */}
        <p className='bikeshed-info-description'>
          {description}
        </p>

        {/* Actions */}
        <div className='bikeshed-info-actions'>
          <Link
            to='bikeshed'
            className='bikeshed-info-permalink'
            params={{bikeshedId: bikeshed.get('id')}}
          >
            permalink
          </Link>
        </div>

      </Paper>
    )
  }
})

module.exports = BikeshedInfo
