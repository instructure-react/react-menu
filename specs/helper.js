/** @jsx React.DOM */
var assert = require('assert');
var React = require('react');
var ReactDOM = require('react-dom');
TestUtils =  require('react-addons-test-utils');
var Menu = require('../lib/components/Menu');
var MenuTrigger = require('../lib/components/MenuTrigger');
var MenuOptions = require('../lib/components/MenuOptions');
var MenuOption = require('../lib/components/MenuOption');

ok = assert.ok;
equal = assert.equal;
strictEqual = assert.strictEqual;
throws = assert.throws;

var _menuNode;
renderMenu = function(container) {
  container = container || document.body;
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

unmountMenu = function(container) {
  container = container || document.body;
  ReactDOM.unmountComponentAtNode(container);
};

