import Button from '../components/Button'

let disabled = false;

export const button = new Button('Button')
    .setStyle({})
    .onClick(id => console.log(`Clicked button: ${id}`));

export const toggleButton = new Button('Toggle')
    .setStyle({})
    .onClick(() => button.setDisabled(disabled = !disabled));
        
// enabledButton.setVisible(false);
// enabledButton.setVisible(true);
// disabledButton = new Button('Disabled by default', false);