'use strict';

var React = require('react'),
  ApplicationStore = require('../stores/ApplicationStore');

var Html = React.createClass({
  render: function () {
    var title = this.props.context.getStore(ApplicationStore).getPageTitle(),
      scripts = this.props.assets.scripts
        .map((src, key) => <script src={src} key={key}></script>),
      styles = this.props.assets.styles
        .map((href, key) => <link href={href} key={key} rel='stylesheet'></link>);

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <meta name='description' content='An app for bikeshedding'/>
          <title>{title}</title>
          <link href='//fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet'/>
          {styles}
        </head>
        <body id='bshed' dangerouslySetInnerHTML={{__html: this.props.markup}}>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        {scripts}
      </html>
    );
  }
});

module.exports = Html;
