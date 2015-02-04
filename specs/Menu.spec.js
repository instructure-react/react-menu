require('./helper');

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
      equal(menu.refs.options.getDOMNode().style.visibility, 'hidden');
      equal(menu.refs.options.getDOMNode().getAttribute('aria-expanded'), 'false');
      equal(menu.refs.options.getDOMNode().style.visibility, 'hidden');
      ok(!menu.state.active);
    });

    it('should show menu options when trigger is clicked', function () {
      TestUtils.Simulate.click(menu.refs.trigger.getDOMNode());
      equal(menu.refs.options.getDOMNode().getAttribute('aria-expanded'), 'true');
      equal(menu.refs.options.getDOMNode().style.visibility, 'visible');
      ok(menu.state.active);
    });

    it('should toggle menu options trigger on enter key', function () {
      TestUtils.Simulate.keyDown(menu.refs.trigger.getDOMNode(), {key: 'Enter'});
      ok(menu.state.active);
    });

    it('should focus first option', function () {
      TestUtils.Simulate.click(menu.refs.trigger.getDOMNode());
      equal(menu.refs.options.getDOMNode().children[0], document.activeElement);
    });

    it('should have roles and aria attributes', function () {
      var trigger = menu.refs.trigger.getDOMNode();
      var options = menu.refs.options.getDOMNode();
      equal(trigger.getAttribute('aria-owns'), options.getAttribute('id'));
      equal(trigger.getAttribute('role'), 'button');
      equal(trigger.getAttribute('aria-haspopup'), 'true');
      equal(options.getAttribute('role'), 'menu');
      equal(options.getAttribute('aria-expanded'), 'false');
      equal(options.children[0].getAttribute('role'), 'menuitem');
    });

    // TODO: These tests aren't working for some reason
    // it('should change selectedIndex on keydown', function () {
    //   TestUtils.Simulate.click(menu.refs.trigger.getDOMNode());
    //   TestUtils.Simulate.keyDown(menu.refs.options.getDOMNode(), {key: 'ArrowDown'});
    //   equal(menu.state.selectedIndex, 1);
    // });

    // it('should select menu option on enter', function () {
    //   TestUtils.Simulate.click(menu.refs.trigger.getDOMNode());
    //   TestUtils.Simulate.keyDown(menu.refs.options.getDOMNode().children[1], {key: 'Enter'});
    //   equal(menu.state.selectedIndex, 1);
    // });

    it('should make menu option disabled', function () {
      equal(menu.refs.options.getDOMNode().children[3].getAttribute('aria-disabled'), 'true');
    });
  });

  describe('multiple menus', function () {

    var menuA, menuB, containerA, containerB;

    beforeEach(function () {
      containerA = document.createElement("div");
      containerB = document.createElement("div");

      document.body.appendChild(containerA);
      document.body.appendChild(containerB);

      menuA = renderMenu(containerA);
      menuB = renderMenu(containerB);
    });

    afterEach(function () {
      unmountMenu(containerA);
      unmountMenu(containerB);
    });

    it('should close the active menu when clicking another menu', function (done) {
      TestUtils.Simulate.click(menuA.refs.trigger.getDOMNode());
      ok(menuA.state.active);

      TestUtils.Simulate.click(menuB.refs.trigger.getDOMNode());
      // Unfortunate implementation detail that `active` is not reset until the next execution cycle
      setTimeout(function() {
        ok(!menuA.state.active);
        ok(menuB.state.active);
        done();
      }, 1);
    });
  });

});
