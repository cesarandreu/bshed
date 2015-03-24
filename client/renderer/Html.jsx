var React = require('react'),
  ApplicationStore = require('../stores/ApplicationStore')

var Html = React.createClass({
  contextTypes: {
    getStore: React.PropTypes.func.isRequired
  },
  propTypes: {
    context: React.PropTypes.object.isRequired,
    assets: React.PropTypes.object.isRequired,
    markup: React.PropTypes.string.isRequired,
    BSHED: React.PropTypes.string.isRequired
  },
  render: function () {
    var title = this.context.getStore(ApplicationStore).getPageTitle(),
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
          <link href='//fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet'/>
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
