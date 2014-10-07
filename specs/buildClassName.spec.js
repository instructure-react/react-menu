require('./helper');
var React = require('react');
var buildClassName = require('../lib/mixins/buildClassName');

var MockComponent = React.createClass({
  mixins: [buildClassName],

  render: function (){
    return (
      React.DOM.div({
        className: this.buildClassName('foo')
      })
    )
  }
});

describe('buildClassName', function () {

  it('includes the name passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = React.renderComponent(MockComponent(), _currentDiv);
    equal(menu.getDOMNode().className, 'foo');
  });

  it('concatenates existing classNames passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = React.renderComponent(MockComponent({
      className: 'bar'
    }), _currentDiv);
    equal(menu.getDOMNode().className, 'foo bar');
  });

});
