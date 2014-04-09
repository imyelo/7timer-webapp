/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  var _ = require('underscore');

  var Region = {
    show: function () {
      console.log('show');
      this.setState({visible: true});
    },
    hide: function () {
      console.log('hide');
      this.setState({visible: false});
    }
  };

  var App = React.createClass({displayName: 'App',
    getInitialState: function() {
      return {view: ''};
    },
    show: function (region) {
      if (region in this.refs) {
        this.refs[region].show();
      }
    },
    hide: function (region) {
      if (region in this.refs) {
        this.refs[region].hide();
      }
    },
    componentWillMount: function () {
      setTimeout(function () {
        var refs = this.refs;
        var keys = _.keys(refs);
        var i = 0;
        setInterval(function () {
          this.show(keys[(i = ++i % keys.length)]);
        }.bind(this), 400);
      }.bind(this), 0);
    },
    render: function () {
      var views = _.map(this.props.children, function (Tag, index) {
        return Tag( {ref:index});
      });
      return (
        React.DOM.div( {className:"app"}, 
          views
        )
      );
    }
  });

  exports.Region = Region;

  exports.render = function (views) {
    React.renderComponent(
      App(null, views),
      document.getElementById('main')
    );
  };

}); 