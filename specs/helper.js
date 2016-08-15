var assert = require('assert');
var React = require('react');
var ReactDOM = require('react-dom');
window.TestUtils =  require('react-addons-test-utils');
var Menu = require('../lib/components/Menu');
var MenuTrigger = require('../lib/components/MenuTrigger');
var MenuOptions = require('../lib/components/MenuOptions');
var MenuOption = require('../lib/components/MenuOption');

window.ok = assert.ok;
window.equal = assert.equal;
window.strictEqual = assert.strictEqual;
window.throws = assert.throws;

var memorizedContainer;
window.renderMenu = function(container) {
  container = container || document.createElement('div');
  document.body.appendChild(container);
  memorizedContainer = container;
  return ReactDOM.render((
    <Menu>
      <MenuTrigger>I am the trigger, goo goo goo joob</MenuTrigger>
      <MenuOptions>
        <MenuOption>Foo</MenuOption>
        <MenuOption>Bar</MenuOption>
        <MenuOption>Baz</MenuOption>
        <MenuOption disabled={true}>Disabled</MenuOption>
      </MenuOptions>
    </Menu>
  ), container);
};

window.unmountMenu = function(container) {
  container = container || memorizedContainer;
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
};

