import Button from '../components/Button'

const button = new Button('Button')
    .setStyle({})
    .onClick(id => console.log(`Clicked button: ${id}`));
        
// button.setVisible(false);
// button.setVisible(true);

export default button;