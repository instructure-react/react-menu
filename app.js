/** @jsx React.DOM */

var React = require('react');
var Menu = require('react-menu');
var MenuTrigger = Menu.MenuTrigger;
var MenuOptions = Menu.MenuOptions;
var MenuOption = Menu.MenuOption;

Menu.injectCSS();

var App = React.createClass({

  handleSecondOption: function() {
    alert('SECOND OPTION CLICKED');
  },

  handleDisabledSelect: function() {
    alert('this one is disabled');
  },

  render: function() {
    return (
      <div className='example'>

        <h1>react-menu</h1>
        <p>
          Accessible react menu component
        </p>

        <Menu className='myMenu'>
          <MenuTrigger>
            ⚙
          </MenuTrigger>

          <MenuOptions>

            <MenuOption>
              1st Option
            </MenuOption>

            <MenuOption onSelect={this.handleSecondOption}>
              2nd Option
            </MenuOption>

            <div className='spacer'>
            </div>

            <MenuOption >
              3rd Option
            </MenuOption>

            <MenuOption >
              4th Option
            </MenuOption>

            <MenuOption disabled={true} onDisabledSelect={this.handleDisabledSelect}>
              diabled option
            </MenuOption>

          </MenuOptions>
        </Menu>

        <p>react-menu has keyboard and screen reader support.</p>
        <button>focusable</button>

      </div>
    )
  }

});

React.renderComponent(<App/>, document.body);
