import { checkbox, toggleCheckbox, imageCheckbox }  from './examples/checkbox'
import { button, toggleButton, customButton, customButtonText } from './examples/button'
import RadioButtonExample from './examples/radio'
import { LayoutExample1, LayoutExample2 } from './examples/layout'

class Demo extends Phaser.Scene {

    constructor () {
        super('Demo');
    }

    preload() {
        this.load.image('customButton', 'assets/custom-button.png');
        this.load.image('customButtonHover', 'assets/custom-button-hover.png');
        this.load.image('customButtonDisabled', 'assets/custom-button-disabled.png');
        this.load.image('customButtonText', 'assets/custom-button-text.png');

        this.load.image('checkboxImage', 'assets/custom-checkbox.png');
        this.load.image('checkboxHovered', 'assets/custom-checkbox-hover.png');
        this.load.image('checkboxDisabled', 'assets/custom-checkbox-disabled.png');
    }

    create(data) {
        checkbox.create(50, 50, this);
        toggleCheckbox.create(200, 50, this);
        imageCheckbox.create(400, 50, this);

        button.create(50, 100, this);
        toggleButton.create(160, 100, this);
        customButton.create(270, 93, this);
        customButtonText.create(475, 100, this);

        LayoutExample1.create(50, 175, this);
        LayoutExample2.create(200, 175, this);

        RadioButtonExample.create(220, 350, this);
    }
}

export default Demo;