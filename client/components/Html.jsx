'use strict';

var React = require('react'),
  ApplicationStore = require('../stores/ApplicationStore');

var Html = React.createClass({
  render: function () {
    var title = this.props.context.getStore(ApplicationStore).getPageTitle();
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <meta name='description' content='An app for bikeshedding'/>
          <title>{title}</title>
        </head>
        <body>
          <div id='bshed' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={this.props.assets.scripts}></script>
      </html>
    );
  }
});

module.exports = Html;
