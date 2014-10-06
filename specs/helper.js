//assert = require('assert');
//React = require('react/addons');
//var Menu = require('../lib/components/Menu');
//
//ReactTestUtils = React.addons.TestUtils;
//ok = assert.ok;
//equal = assert.equal;
//strictEqual = assert.strictEqual;
//throws = assert.throws;
//
//var _currentDiv = null;
//
//renderModal = function(def) {
//  def.ariaHideApp = false;
//  _currentDiv = document.createElement('div');
//  document.body.appendChild(_currentDiv);
//  return React.renderComponent(Modal.apply(Modal, arguments), _currentDiv);
//};
//
//unmountModal = function() {
//  React.unmountComponentAtNode(_currentDiv);
//  document.body.removeChild(_currentDiv);
//  _currentDiv = null;
//};
