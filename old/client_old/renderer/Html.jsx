import React, { PropTypes } from 'react'

const Html = React.createClass({
  propTypes: {
    scripts: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.arrayOf(PropTypes.string),
    markup: React.PropTypes.string.isRequired,
    BSHED: React.PropTypes.string.isRequired
  },

  render () {
    const { scripts, styles, markup, BSHED } = this.props

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
          />
          <meta name='description' content='An app for bikeshedding'/>
          <title>
            bshed
          </title>
          {styles.map((href, key) =>
            <link href={href} key={key} rel='stylesheet'></link>
          )}
        </head>
        <body>
          <div id='bshed' dangerouslySetInnerHTML={{__html: markup}}></div>
          <script dangerouslySetInnerHTML={{__html: BSHED}}></script>
          {scripts.map((src, key) =>
            <script src={src} key={key}></script>
          )}
        </body>
      </html>
    )
  }
})

module.exports = Html
