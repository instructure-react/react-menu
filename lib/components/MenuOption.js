/** @jsx React.DOM */

var React = require('react');
var buildClassName = require('../mixins/buildClassName');

var MenuOption = module.exports = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },

  mixins: [buildClassName],

  onSelect: function() {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    this.props._internalSelect();
  },

  handleKeyUp: function(e) {
    if (e.key === ' ') {
      this.onSelect();
    }
  },

  handleKeyDown: function(e) {
    if (e.key === 'Enter') {
      this.onSelect();
    }
  },

  handleClick: function() {
    this.onSelect();
  },

  handleHover: function() {
    this.props._internalFocus(this.props.index);
  },

  buildName: function() {
    var name = this.buildClassName('Menu__MenuOption');
    if (this.props.active)
      name += ' Menu__MenuOption--active';
    return name;
  },

  render: function() {
    return (
      <div
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleHover}
        className={this.buildName()}
        role='menuitem'
        tabIndex='-1'
      >
        {this.props.children}
      </div>
    )
  }

});
