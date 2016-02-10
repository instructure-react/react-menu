require('./helper');
var React = require('react');
var render = require('react-dom').render;
var findDOMNode = require('react-dom').findDOMNode;
var buildClassName = require('../lib/mixins/buildClassName');

var MockComponent = React.createFactory(React.createClass({
  mixins: [buildClassName],

  render: function (){
    return (
      React.DOM.div({
        className: this.buildClassName('foo')
      })
    )
  }
}));

describe('buildClassName', function () {

  it('includes the name passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = render(MockComponent(), _currentDiv);
    equal(findDOMNode(menu).className, 'foo');
  });

  it('concatenates existing classNames passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = render(MockComponent({
      className: 'bar'
    }), _currentDiv);
    equal(findDOMNode(menu).className, 'foo bar');
  });

});
