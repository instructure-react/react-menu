/** @jsx React.DOM */

var React = require('react');

var MenuOption = module.exports = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },

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

  buildClassName: function() {
    var name = 'Menu__MenuOption';
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
        className={this.buildClassName()}
        role='menuitem'
        tabIndex='-1'
      >
        {this.props.children}
      </div>
    )
  }

});
