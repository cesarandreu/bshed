'use strict';

var React = require('react'),
  ApplicationStore = require('../stores/ApplicationStore'),
  RouterMixin = require('flux-router-component').RouterMixin,
  StoreMixin = require('fluxible').StoreMixin;

var Layout = require('./Layout.jsx'),
  Header = require('./Header.jsx'),
  Main = require('./Main.jsx'),
  Footer = require('./Footer.jsx'),
  Navigation = require('./Navigation.jsx');

var Pages = {
  home: require('./Home.jsx')
};

var Application = React.createClass({
  displayName: 'Application',
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },

  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },

  render: function () {
    var Page = Pages[this.state.currentPageName];
    var {context} = this.props;

    return (
      <Layout context={context}>
        <Navigation context={context}/>
        <Header context={context}/>
        <Main context={context}>
          <Page context={context}/>
        </Main>
        <Footer context={context}/>
      </Layout>
    );
  },

  componentDidUpdate: function (prevPops, prevState) {
    if (this.state.pageTitle !== prevState.pageTitle)
      document.title = this.state.pageTitle;
  }
});

module.exports = Application;
