import Checkbox from '../components/Checkbox'

const checkbox = new Checkbox('Checkbox', false)
    .setStyle({checkbox: {}, label: {}, icon: {}})
    .onChange(state => console.log(`State changed to ${state}`));

// checkbox.setVisible(false);
// checkbox.setVisible(true);

export default checkbox;