require('./BikeshedInfo.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const moment = require('moment')
const {Link} = require('react-router')
import Immutable from 'immutable'
const inflection = require('inflection')
const Paper = require('../../general/Paper')
import ImmutableRenderMixin from 'react-immutable-render-mixin'
const LabeledActionButton = require('../../general/Buttons/LabeledActionButton')

const BikeshedInfo = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    bikeshed: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {bikeshed, user} = this.props
    const votes = bikeshed.get('votes')
    const createdAt = bikeshed.get('createdAt')
    const authorClassNames = cn('bikeshed-info-author', {
      'bikeshed-info-author-is-registered': user.get('registered')
    })

    return (
      <Paper className='bikeshed-info'>

        {/* Tagline and votes */}
        <div className='bikeshed-info-head'>
          <span className='bikeshed-info-tagline'>
            {'Created '}
            <Link
              to='bikeshed'
              params={{bikeshedId: bikeshed.get('id')}}
            >
              <time
                title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                className='bikeshed-info-timestamp'
                dateTime={createdAt}
              >
                {moment(createdAt).fromNow()}
              </time>
            </Link>
            {' by '}
            <span className={authorClassNames}>
              {user.get('name') || 'anonymous'}
            </span>
          </span>

          <span className='bikeshed-info-votes'>
            {`${votes} ${inflection.inflect('votes', votes)}`}
          </span>
        </div>

        {/* Description */}
        <p className='bikeshed-info-description'>
          {bikeshed.get('description')}
        </p>

        <LabeledActionButton
          className='bikeshed-info-rate-bikes-button'
          label='Rate bikes'
          icon='md-directions-bike'
          onClick={this._onRate}
        />
      </Paper>
    )
  },

  _onRate () {

  }
})

module.exports = BikeshedInfo
