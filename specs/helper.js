/** @jsx React.DOM */
assert = require('assert');
React = require('react/addons');
TestUtils = React.addons.TestUtils;
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
  return React.renderComponent((
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
  React.unmountComponentAtNode(container);
};

