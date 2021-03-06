/**
 * @jsx React.DOM
 */
define(function (require, exports, module) {
  var cityDao = require('app/dao/city');
  var app = require('app/core/app');
  var Region = require('app/core/view').Region;

  var searchBar = React.createClass({
    handleSearch: function () {
      this.props.onSearch(this.refs.input.getDOMNode().value.trim());
    },
    handleSubmit: function () {
      this.handleSearch();
      return false;
    },
    render: function () {
      return (
        <div className="search-bar">
          <form ref="form" onSubmit={this.handleSubmit}>
            <input placeholder="say your city name" ref="input" onChange={this.handleSearch} />
          </form>
        </div>
      );
    }
  });

  var cityItem = React.createClass({
    handleClick: function () {
      app.store.set('city', this.props);
      console.log(this.props.name, this.props.longitude, this.props.latitude);
    },
    render: function () {
      return (
        <li onClick={this.handleClick}>{this.props.name}</li>
      );
    }
  });

  var cityList = React.createClass({
    render: function () {
      var cities = this.props.cities.map(function (city) {
        return <cityItem name={city.prettyAddress} longitude={city.longitude} latitude={city.latitude}></cityItem>
      });
      return (
        <ul className="search-result-list">
          {cities}
        </ul>
      );
    }
  });

  var searchView = React.createClass({
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
        <section className={classes}>
          <searchBar onSearch={this.search}></searchBar>
          <cityList cities={this.state.cities}></cityList>
        </section>
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