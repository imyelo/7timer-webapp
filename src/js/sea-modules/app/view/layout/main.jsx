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
        var cx = React.addons.classSet;
        var classes = cx({
          stage: true,
          isShow: this.props.isShow
        });
        return (
          <div className={classes}><div>{this.props.children}</div></div>
        );
      }
    });

    var App = React.createClass({
      getInitialState: function() {
        return {stage: ''};
      },
      stage: function (stg) {
        this.setState({stage: stg});
      },
      componentWillMount: function () {
        var stages = this.props.children;
        var i = 0;
        setInterval(function () {
          this.setState({stage: stages[i = ++i % stages.length]});
        }.bind(this), 400);
      },
      render: function () {
        var currentStage = this.state.stage;
        var stages = this.props.children.map(function (stage) {
          return (
            <Stage isShow={currentStage === stage}>{stage}</Stage>
          );
        });
        return (
          <div className="app">
            <LeftAside></LeftAside>
            {stages}
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
    //   
    var stage = ['main.enter', 'city.list', 'city.search', 'city.result'];
    // React.renderComponent(
    //   <App>{stage}</App>,
    //   document.getElementById('main')
    // );
  };
}); 