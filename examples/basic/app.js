/** @jsx React.DOM */

var React = require('react');
var Menu = require('../../lib/index');
var MenuTrigger = require('../../lib/components/MenuTrigger');
var MenuOptions = require('../../lib/components/MenuOptions');
var MenuOption = require('../../lib/components/MenuOption');


Menu.injectCSS();


var App = React.createClass({

  handleSecondOption: function() {
    alert('SECOND OPTION CLICKED');
  },

  render: function() {
    return (
      <div>

        <Menu>
          <MenuTrigger>
            trigger
          </MenuTrigger>

          <MenuOptions>
            <MenuOption>
              an option
            </MenuOption>
            <div>
              this is not an option
            </div>
            <MenuOption onSelect={this.handleSecondOption}>
              2nd option
            </MenuOption>
            <MenuOption>
              <a href='#'>3rd - link</a>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </div>
    )
  }

});


React.renderComponent(<App/>, document.body);
