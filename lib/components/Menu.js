/** @jsx React.DOM */

var React = require('react');

var cloneWithProps = require('react/lib/cloneWithProps');
var assign = require('react/lib/Object.assign');
var MenuTrigger = require('./MenuTrigger');
var MenuOptions = require('./MenuOptions');
var MenuOption = require('./MenuOption');
var uuid = require('../helpers/uuid');
var injectCSS = require('../helpers/injectCSS');
var constrain = require('../helpers/constrain');
var buildClassName = require('../mixins/buildClassName');

var Menu = module.exports = React.createClass({

  displayName: 'Menu',

  statics: {
    injectCSS: injectCSS
  },

  mixins: [buildClassName],

  propTypes: {
    keepOpenOnSelect: React.PropTypes.bool
  },

  childContextTypes: {
    id: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  getChildContext: function () {
    return {
      id: this.state.id,
      active: this.state.active
    };
  },

  getPreferredPlacement: function() {
    var prefH = constrain(this.props.preferredHorizontal, ['left', 'right'], 'right');
    var prefV = constrain(this.props.preferredVertical,   ['top', 'bottom'], 'bottom');
    return {
      horizontalPlacement: prefH,
      verticalPlacement: prefV
    };
  },

  getInitialState: function() {
    return assign({
      id: uuid(),
      active: false,
      selectedIndex: 0
    }, this.getPreferredPlacement());
  },

  onSelectionMade: function() {
    if (!this.props.keepOpenOnSelect) {
      this.closeMenu()
    }
  },

  closeMenu: function() {
    this.setState({active: false}, this.focusTrigger);
  },

  focusTrigger: function() {
    this.refs.trigger.getDOMNode().focus();
  },

  handleBlur: function(e) {
    // give next element a tick to take focus
    setTimeout(function() {
      if (!this.getDOMNode().contains(document.activeElement) && this.state.active){
        this.closeMenu();
      }
    }.bind(this), 1);
  },

  handleTriggerToggle: function() {
    this.setState({active: !this.state.active}, this.afterTriggerToggle);
  },

  afterTriggerToggle: function() {
    if (this.state.active) {
      this.refs.options.focusOption(0);
      this.updatePositioning();
    }
  },

  updatePositioning: function() {
    var triggerRect = this.refs.trigger.getDOMNode().getBoundingClientRect();
    var optionsRect = this.refs.options.getDOMNode().getBoundingClientRect();
    positionState = this.getPreferredPlacement();
    // Only update preferredPlacement positions if necessary to keep menu from
    // appearing off-screen.
    if (triggerRect.left + optionsRect.width > window.innerWidth) {
      positionState.horizontalPlacement = 'left';
    } else if (optionsRect.left < 0) {
      positionState.horizontalPlacement = 'right';
    }
    if (triggerRect.top + optionsRect.height > window.innerHeight) {
      positionState.verticalPlacement = 'top';
    } else if (optionsRect.top < 0) {
      positionState.verticalPlacement = 'bottom';
    }
    this.setState(positionState);
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
            ref: 'trigger',
            onToggleActive: this.handleTriggerToggle
          });
        }
      }.bind(this));
    }
    return trigger;
  },

  renderMenuOptions: function() {
    var options;
    if(this.verifyTwoChildren()) {
      React.Children.forEach(this.props.children, function(child){
        if (child.type === MenuOptions.type) {
          options = cloneWithProps(child, {
            ref: 'options',
            horizontalPlacement: this.state.horizontalPlacement,
            verticalPlacement: this.state.verticalPlacement,
            onSelectionMade: this.onSelectionMade
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
        onKeyDown={this.handleKeys}
        onBlur={this.handleBlur}
      >
        {this.renderTrigger()}
        {this.renderMenuOptions()}
      </div>
    )
  }

});
