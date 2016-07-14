require('./helper');
var findDOMNode = require('react-dom').findDOMNode;

describe('Menu', function () {
  describe('a single menu', function() {

    var menu;

    beforeEach(function () {
      menu = renderMenu();
    });

    afterEach(function () {
      unmountMenu();
    });

    it('should hide menu options by default', function () {
      equal(findDOMNode(menu.refs.options).style.visibility, 'hidden');
      equal(findDOMNode(menu.refs.options).getAttribute('aria-expanded'), 'false');
      equal(findDOMNode(menu.refs.options).style.visibility, 'hidden');
      ok(!menu.state.active);
    });

    it('should show menu options when trigger is clicked', function () {
      TestUtils.Simulate.click(findDOMNode(menu.refs.trigger));
      equal(findDOMNode(menu.refs.options).getAttribute('aria-expanded'), 'true');
      equal(findDOMNode(menu.refs.options).style.visibility, 'visible');
      ok(menu.state.active);
    });

    it('should toggle menu options trigger on enter key', function () {
      TestUtils.Simulate.keyDown(findDOMNode(menu.refs.trigger), {key: 'Enter'});
      ok(menu.state.active);
    });

    it('should focus first option', function () {
      TestUtils.Simulate.click(findDOMNode(menu.refs.trigger));
      equal(findDOMNode(menu.refs.options).children[0], document.activeElement);
    });

    it('should have roles and aria attributes', function () {
      var trigger = findDOMNode(menu.refs.trigger);
      var options = findDOMNode(menu.refs.options);
      equal(trigger.getAttribute('aria-owns'), options.getAttribute('id'));
      equal(trigger.getAttribute('role'), 'button');
      equal(trigger.getAttribute('aria-haspopup'), 'true');
      equal(options.getAttribute('role'), 'menu');
      equal(options.getAttribute('aria-expanded'), 'false');
      equal(options.children[0].getAttribute('role'), 'menuitem');
    });

    // TODO: These tests aren't working for some reason
    // it('should change selectedIndex on keydown', function () {
    //   TestUtils.Simulate.click(findDOMNode(menu.refs.trigger));
    //   TestUtils.Simulate.keyDown(findDOMNode(menu.refs.options), {key: 'ArrowDown'});
    //   equal(menu.state.selectedIndex, 1);
    // });

    // it('should select menu option on enter', function () {
    //   TestUtils.Simulate.click(findDOMNode(menu.refs.trigger));
    //   TestUtils.Simulate.keyDown(findDOMNode(menu.refs.options).children[1], {key: 'Enter'});
    //   equal(menu.state.selectedIndex, 1);
    // });

    it('should make menu option disabled', function () {
      equal(findDOMNode(menu.refs.options).children[3].getAttribute('aria-disabled'), 'true');
    });
  });

  describe('multiple menus', function () {

    var menuA, menuB, containerA, containerB;

    beforeEach(function () {
      containerA = document.createElement("div");
      containerB = document.createElement("div");

      menuA = renderMenu(containerA);
      menuB = renderMenu(containerB);
    });

    afterEach(function () {
      unmountMenu(containerA);
      unmountMenu(containerB);
    });

    it('should close the active menu when clicking another menu', function (done) {
      TestUtils.Simulate.click(findDOMNode(menuA.refs.trigger));
      ok(menuA.state.active);

      TestUtils.Simulate.click(findDOMNode(menuB.refs.trigger));
      // Unfortunate implementation detail that `active` is not reset until the next execution cycle
      setTimeout(function() {
        ok(!menuA.state.active);
        ok(menuB.state.active);
        done();
      }, 1);
    });
  });

});
