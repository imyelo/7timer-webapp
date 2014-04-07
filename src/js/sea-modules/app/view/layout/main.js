/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  module.exports = function () {
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
    React.renderComponent(
      Layout(null, "content"),
      document.getElementById('main')
      );
  };
});