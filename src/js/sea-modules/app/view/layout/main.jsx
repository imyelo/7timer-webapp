/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  module.exports = function () {
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
    React.renderComponent(
      <Layout>content</Layout>,
      document.getElementById('main')
      );
  };
});