import Radio from '../components/Radio'

const radioButton = new Radio()
    .setStyle({radio: {}, label: {}})
    .add('Option 1')
    .add('Option 2')
    .add('Option 3', true)
    .add('Option 4')
    .onChange(index => console.log(`Active option is: ${index}`));
        
// radioButton.setVisible(false);
// radioButton.setVisible(true);

export default radioButton;