/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  module.exports = function () {
    var LeftAside = React.createClass({displayName: 'LeftAside',
      render: function () {
        return (
          React.DOM.aside( {className:"left-aside"})
        );
      }
    });

    var RightAside = React.createClass({displayName: 'RightAside',
      render: function () {
        return (
          React.DOM.aside( {className:"right-aside"})
        );
      }
    });

    var Stage = React.createClass({displayName: 'Stage',
      render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
          stage: true,
          isShow: this.props.isShow
        });
        return (
          React.DOM.div( {className:classes}, React.DOM.div(null, this.props.children))
        );
      }
    });

    var App = React.createClass({displayName: 'App',
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
            Stage( {isShow:currentStage === stage}, stage)
          );
        });
        return (
          React.DOM.div( {className:"app"}, 
            LeftAside(null),
            stages,
            RightAside(null)
          )
        );
      }
    });

    var Layout = React.createClass({displayName: 'Layout',
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
          React.DOM.div( {className:"layout"}, 
            React.DOM.header(null, this.state.title),
            React.DOM.div( {className:"content"}, this.props.children),
            React.DOM.footer(null)
          )
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