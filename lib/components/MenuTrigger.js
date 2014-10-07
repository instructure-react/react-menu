/** @jsx React.DOM */

var React = require('react');
var buildClassName = require('../mixins/buildClassName');

var MenuTrigger = module.exports = React.createClass({

  getInitialState: function() {
    return {
      active: false
    };
  },

  mixins: [buildClassName],

  notifyParent: function() {
    if (this.props.onToggleActive)
      this.props.onToggleActive(this.state.active);
  },

  toggleActive: function() {
    this.setState({
      active: !this.state.active
    }, this.notifyParent);
  },

  handleKeyUp: function(e) {
    if (e.key === ' ')
      this.toggleActive();
    return true;
  },

  handleKeyDown: function(e) {
    if (e.key === 'Enter')
      this.toggleActive();
    return true;
  },

  handleClick: function() {
    this.toggleActive();
  },

  render: function() {
    return (
      <div
        className={this.buildClassName('Menu__MenuTrigger')}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        tabIndex='0'
      >
        {this.props.children}
      </div>
    )
  }

});
