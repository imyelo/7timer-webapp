/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  var cityDao = require('app/dao/city');
  var app = require('app/core/app');
  var Region = require('app/core/view').Region;

  var searchBar = React.createClass({displayName: 'searchBar',
    handleSearch: function () {
      this.props.onSearch(this.refs.input.getDOMNode().value.trim());
    },
    handleSubmit: function () {
      this.handleSearch();
      return false;
    },
    render: function () {
      return (
        React.DOM.div( {className:"search-bar"}, 
          React.DOM.form( {ref:"form", onSubmit:this.handleSubmit}, 
            React.DOM.input( {placeholder:"say your city name", ref:"input", onChange:this.handleSearch} )
          )
        )
      );
    }
  });

  var cityItem = React.createClass({displayName: 'cityItem',
    handleClick: function () {
      app.store.set('city', this.props);
      console.log(this.props.name, this.props.longitude, this.props.latitude);
    },
    render: function () {
      return (
        React.DOM.li( {onClick:this.handleClick}, this.props.name)
      );
    }
  });

  var cityList = React.createClass({displayName: 'cityList',
    render: function () {
      var cities = this.props.cities.map(function (city) {
        return cityItem( {name:city.prettyAddress, longitude:city.longitude, latitude:city.latitude})
      });
      return (
        React.DOM.ul( {className:"search-result-list"}, 
          cities
        )
      );
    }
  });

  var searchView = React.createClass({displayName: 'searchView',
    mixins: [Region],
    getInitialState: function() {
      return {cities: []};
    },
    search: function (val) {
      var self = this;
      cityDao.getGPS(val, function (res) {
        self.setState({cities: res});
      });
    },
    render: function () {
      var classes = React.addons.classSet({
        "search-view": true,
        "visible": this.state.visible
      });
      return (
        React.DOM.section( {className:classes}, 
          searchBar( {onSearch:this.search}),
          cityList( {cities:this.state.cities})
        )
      );
    }
  });

  // exports.search = function (el) {
  //   React.renderComponent(
  //     <searchView></searchView>,
  //     el
  //   );
  // };

  exports.search = searchView;
});