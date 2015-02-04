var React = require('react'),
  {Mixin: FluxibleMixin} = require('fluxible'),
  ApplicationStore = require('../stores/ApplicationStore');

var Html = React.createClass({
  mixins: [FluxibleMixin],
  propTypes: {
    assets: React.PropTypes.object.isRequired,
    markup: React.PropTypes.string.isRequired,
    BSHED: React.PropTypes.string.isRequired
  },
  render: function () {
    var title = this.getStore(ApplicationStore).getPageTitle(),
      {scripts, styles} = this.props.assets;

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <meta name='description' content='An app for bikeshedding'/>
          <title>{title}</title>
          <link href='//fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet'/>
          {styles.map((href, key) => <link href={href} key={key} rel='stylesheet'></link>)}
        </head>
        <body id='bshed' dangerouslySetInnerHTML={{__html: this.props.markup}}>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.BSHED}}></script>
        {scripts.map((src, key) => <script src={src} key={key}></script>)}
      </html>
    );
  }
});

module.exports = Html;
