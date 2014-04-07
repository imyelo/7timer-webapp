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
        return (
          React.DOM.div( {className:"stage"})
        );
      }
    });

    var App = React.createClass({displayName: 'App',
      changeStage: function () {
        
      },
      render: function () {
        return (
          React.DOM.div( {className:"app"}, 
            LeftAside(null),
            Stage(null),
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
    React.renderComponent(
      App(null),
      document.getElementById('main')
    );
  };
});