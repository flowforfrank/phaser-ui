import Checkbox from '../components/Checkbox'

let disabled = false;

export const checkbox = new Checkbox('Checkbox', false)
    .setStyle({checkbox: {}, label: {}, icon: {}})
    .onChange(state => console.log(`State changed to ${state}`));

export const toggleCheckbox = new Checkbox('Checkbox', false)
    .setStyle({checkbox: {}, label: {}, icon: {}})
    .onChange(state => checkbox.setDisabled(disabled = !disabled));

// checkbox.setVisible(false);
// checkbox.setVisible(true);