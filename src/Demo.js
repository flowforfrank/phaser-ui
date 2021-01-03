import CheckboxExample from './examples/checkbox'
import ButtonExample from './examples/button'
import { LayoutExample1, LayoutExample2 } from './examples/layout'

class Demo extends Phaser.Scene {

    constructor () {
        super('Demo');
    }

    create(data) {
        CheckboxExample.create(50, 50, this);
        ButtonExample.create(50, 100, this);
        LayoutExample1.create(50, 175, this);
        LayoutExample2.create(200, 175, this);
    }
}

export default Demo;