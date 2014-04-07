/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  module.exports = function () {
    var LeftAside = React.createClass({
      render: function () {
        return (
          <aside className="left-aside"></aside>
        );
      }
    });

    var RightAside = React.createClass({
      render: function () {
        return (
          <aside className="right-aside"></aside>
        );
      }
    });

    var Stage = React.createClass({
      render: function () {
        return (
          <div className="stage"></div>
        );
      }
    });

    var App = React.createClass({
      changeStage: function () {
        
      },
      render: function () {
        return (
          <div className="app">
            <LeftAside></LeftAside>
            <Stage></Stage>
            <RightAside></RightAside>
          </div>
        );
      }
    });

    var Layout = React.createClass({
      getInitialState: function () {
        return {title: 'title'};
      },
      componentWillMount: function () {
        var i = 0;
        this.setState({title: 'ready'});
        setInterval(function () {
          this.setState({title: 'new message (' + ++i + ')'});
        }.bind(this), 100);
      },
      render: function () {
        return (
          <div className="layout">
            <header>{this.state.title}</header>
            <div className="content">{this.props.children}</div>
            <footer></footer>
          </div>
        );
      }
    });
    // React.renderComponent(
    //   <Layout>content</Layout>,
    //   document.getElementById('main')
    //   );
    React.renderComponent(
      <App></App>,
      document.getElementById('main')
    );
  };
});