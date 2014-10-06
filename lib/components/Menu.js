/** @jsx React.DOM */

var React = require('react');

var cloneWithProps = require('react/lib/cloneWithProps')
var MenuTrigger = require('./MenuTrigger');
var MenuOptions = require('./MenuOptions');
var MenuOption = require('./MenuOption');
var injectCSS = require('../helpers/injectCSS');


var Menu = module.exports = React.createClass({

  displayName: 'Menu',

  statics: {
    injectCSS: injectCSS
  },

  getInitialState: function(){
    return {
      active: false,
      selectedIndex: 0
    };
  },

  moveSelectionUp: function() {
    this.focusOption(-1);
  },

  moveSelectionDown: function() {
    this.focusOption(1);
  },

  closeMenu: function() {
    this.setState({active: false}, this.focusTrigger);
  },

  focusTrigger: function() {
    this.refs.trigger.getDOMNode().focus();
  },

  handleKeys: function(e) {
    var options = {
      'ArrowDown': this.moveSelectionDown,
      'ArrowUp': this.moveSelectionUp,
      'Escape': this.closeMenu
    }
    if(options[e.key]){
      options[e.key].call(this);
    }
  },

  handleTriggerToggle: function() {
    this.setState({active: !this.state.active}, this.attemptOptionsFocus);
  },

  normalizeSelectedBy: function(delta, numOptions){
    this.selectedIndex += delta;
    if (this.selectedIndex > numOptions - 1) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex < 0) {
      this.selectedIndex = numOptions - 1;
    }
  },

  focusOption: function(delta) {
    // open menu if it's closed, and retry focus
    if (!this.state.active) {
      this.selectedIndex = 0;
      this.setState({active: true}, this.focusOption.bind(this, 0));
      return
    }
    var optionNodes = this.refs.options.getDOMNode().querySelectorAll('.Menu__MenuOption');
    this.normalizeSelectedBy(delta, optionNodes.length);
    this.refs.options.setState({activeIndex: this.selectedIndex});
    optionNodes[this.selectedIndex].focus();
  },

  attemptOptionsFocus: function() {
    if (this.state.active){
      this.selectedIndex = 0;
      this.focusOption(0);
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
        className='Menu'
        role='menu'
        onKeyUp={this.handleKeys}
      >
        {this.renderTrigger()}
        {this.renderMenuOptions()}
      </div>
    )
  }

});
