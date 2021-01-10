import { checkbox, toggleCheckbox }  from './examples/checkbox'
import { button, toggleButton } from './examples/button'
import RadioButtonExample from './examples/radio'
import { LayoutExample1, LayoutExample2 } from './examples/layout'

class Demo extends Phaser.Scene {

    constructor () {
        super('Demo');
    }

    create(data) {
        checkbox.create(50, 50, this);
        toggleCheckbox.create(200, 50, this);
        button.create(50, 100, this);
        toggleButton.create(160, 100, this);
        LayoutExample1.create(50, 175, this);
        LayoutExample2.create(200, 175, this);
        RadioButtonExample.create(220, 350, this);
    }
}

export default Demo;