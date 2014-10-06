/** @jsx React.DOM */

var React = require('react');
var MenuOption = require('./MenuOption');
var cloneWithProps = require('react/lib/cloneWithProps')

var MenuOptions = module.exports = React.createClass({

  getInitialState: function() {
    return {activeIndex: 0}
  },

  onSelectionMade: function() {
    this.props.onSelectionMade();
  },

  renderOptions: function() {
    var index = 0;
    return React.Children.map(this.props.children, function(c){
      var clonedOption = c;
      if (c.type === MenuOption.type) {
        var active = this.state.activeIndex === index;
        clonedOption = cloneWithProps(c, {
          active: active,
          _internalSelect: this.onSelectionMade
        });
        index++;
      }
      return clonedOption;
    }.bind(this));
  },

  render: function() {
    return (
      <div className='Menu__MenuOptions'>
        {this.renderOptions()}
      </div>
    )
  }

});
