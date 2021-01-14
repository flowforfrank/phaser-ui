import Checkbox from '../components/Checkbox'

let disabled = false;

export const checkbox = new Checkbox('Checkbox', false)
    .setStyle({checkbox: {}, label: {}, icon: {}})
    .onChange(state => console.log(`State changed to ${state}`));

export const imageCheckbox = new Checkbox('Checkbox with Image', false)
    .setStyle({checkbox: {
        image: 'checkboxImage',
        hoverImage: 'checkboxHovered',
        disabled: {
            image: 'checkboxDisabled'
        }
    },
    icon: {
        color: '#221f22',
        disabled: {
            color: '#cccccc'
        }
    }})
    .onChange(state => console.log(`State changed to ${state}`));

export const toggleCheckbox = new Checkbox('Toggle Checkbox', false)
    .setStyle({checkbox: {}, label: {}, icon: {}})
    .onChange(state => {
        checkbox.setDisabled(disabled = !disabled);
        imageCheckbox.setDisabled(disabled);
    });
