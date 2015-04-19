var React = require('react'),
  StoreMixin = require('../utils/mixins/StoreMixin'),
  ApplicationStore = require('../app/Application/stores/ApplicationStore')

var Html = React.createClass({
  mixins: [StoreMixin],
  propTypes: {
    assets: React.PropTypes.object.isRequired,
    markup: React.PropTypes.string.isRequired,
    BSHED: React.PropTypes.string.isRequired
  },
  render: function () {
    var title = this.getStore(ApplicationStore).getPageTitle(),
      {scripts, styles} = this.props.assets

    return (
      <html lang="en">
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
          <meta name='description' content='An app for bikeshedding'/>
          <title>{title}</title>
          {styles.map((href, key) => <link href={href} key={key} rel='stylesheet'></link>)}
        </head>
        <body>
          <div id='bshed' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script dangerouslySetInnerHTML={{__html: this.props.BSHED}}></script>
          {scripts.map((src, key) => <script src={src} key={key}></script>)}
        </body>
      </html>
    )
  }
})

module.exports = Html
