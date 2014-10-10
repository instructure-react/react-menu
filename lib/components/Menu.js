/** @jsx React.DOM */

var React = require('react');

var cloneWithProps = require('react/lib/cloneWithProps');
var MenuTrigger = require('./MenuTrigger');
var MenuOptions = require('./MenuOptions');
var MenuOption = require('./MenuOption');
var injectCSS = require('../helpers/injectCSS');
var buildClassName = require('../mixins/buildClassName');

var Menu = module.exports = React.createClass({

  displayName: 'Menu',

  statics: {
    injectCSS: injectCSS
  },

  mixins: [buildClassName],

  getInitialState: function(){
    return {
      active: false,
      selectedIndex: 0
    };
  },

  closeMenu: function() {
    this.setState({active: false}, this.focusTrigger);
  },

  focusTrigger: function() {
    this.refs.trigger.getDOMNode().focus();
  },


  handleTriggerToggle: function() {
    this.setState({active: !this.state.active}, this.attemptOptionsFocus);
  },

  attemptOptionsFocus: function() {
    if (this.state.active){
      this.refs.options.focusOption(0);
    }
  },


  handleKeys: function(e) {
    if (e.key === 'Escape') {
      this.closeMenu();
    }
  },

  verifyTwoChildren: function() {
    var ok = (React.Children.count(this.props.children) === 2);
    if (!ok)
      throw 'react-menu can only take two children, a MenuTrigger, and a MenuOptions';
    return ok;
  },

  renderTrigger: function() {
    var trigger;
    if(this.verifyTwoChildren()) {
      React.Children.forEach(this.props.children, function(child){
        if (child.type === MenuTrigger.type) {
          trigger = cloneWithProps(child, {
            onToggleActive: this.handleTriggerToggle,
            ref: 'trigger'
          });
        }
      }.bind(this));
    }
    return trigger;
  },

  renderMenuOptions: function() {
    if (!this.state.active) {
      return null;
    }
    var options;
    if(this.verifyTwoChildren()) {
      React.Children.forEach(this.props.children, function(child){
        if (child.type === MenuOptions.type) {
          options = cloneWithProps(child, {
            ref: 'options',
            onSelectionMade: this.closeMenu
          });
        }
      }.bind(this));
    }
    return options;
  },


  render: function() {
    return (
      <div
        className={this.buildClassName('Menu')}
        role='menu'
        onKeyDown={this.handleKeys}
      >
        {this.renderTrigger()}
        {this.renderMenuOptions()}
      </div>
    )
  }

});
