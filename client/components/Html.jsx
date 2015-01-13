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
          <link rel='stylesheet' href='/assets/client.css'></link>
        </head>
        <body>
          <div id='bshed' dangerouslySetInnerHtml={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHtml={{__html: this.props.state}}></script>
        <script src='/assets/client.js'></script>
      </html>
    );
  }
});

module.exports = Html;
