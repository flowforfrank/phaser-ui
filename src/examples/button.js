import Button from '../components/Button'

let disabled = false;

const customTextStyles = {
    backgroundImage: 'customButtonText',
    backgroundColor: null,
    padding: 0,
    fontFamily: 'Helvetica',
    fontStyle: 'bold',
    fontSize: 24,
    color: '#FFBF58',
    shadow: {
        offsetX: -1,
        offsetY: -1,
        color: '#FFCF82',
        fill: true
    }
};

export const button = new Button('Button')
    .setStyle({})
    .onClick(id => console.log(`Clicked button: ${id}`));

export const customButton = new Button()
    .onClick(id => console.log(`Clicked button: ${id}`))
    .setStyle({
        backgroundImage: 'customButton',
        backgroundHoverImage: 'customButtonHover',
        backgroundDisabledImage: 'customButtonDisabled'
    });

export const toggleButton = new Button('Toggle')
    .setStyle({})
    .onClick(() => {
        button.setDisabled(disabled = !disabled);
        customButton.setDisabled(disabled);
    });

export const customButtonText = new Button('Custom Text')
    .onClick(id => console.log(`Clicked button: ${id}`))
    .setStyle(customTextStyles);
