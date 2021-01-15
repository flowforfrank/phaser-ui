import Layout from '../components/Layout'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'

class CustomButton {
    constructor(label) {
        const button = new Button(label).setStyle({
            backgroundImage: 'customButtonText',
            backgroundColor: null,
            padding: 0,
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: 24,
            color: '#FFBF58'
        });

        return button;
    }
}

export const LayoutExample1 = new Layout()
    .setStyle({})
    .setDraggable(true)
    .onDrag((x, y) => console.log(`Dragged layout to ${x}, ${y}`))
    .add(new Checkbox('Todo 1', false))
    .add(new Checkbox('Todo 2', false, false))
    .add(new Checkbox('Todo 3', false))
    .add(new Checkbox('Todo 4', false))
    .add(new Checkbox('Todo 5', false))
    .add(new Button('Submit'));

// --- Or ---
const createCheckbox = (label, initialState, callback) => new Checkbox(label, initialState)
    .setStyle({}) // Set global style
    .onChange(state => callback(state));

// Set to draggable to produce a bug
export const LayoutExample2 = new Layout()
    .setStyle({ opacity: 0 })
    .add(createCheckbox('Todo 1', false, () => {}))
    .add(createCheckbox('Todo 2', false, () => {}))
    .add(createCheckbox('Todo 3', false, () => {}));

export const CustomLayout = new Layout()
    .setStyle({ opacity: 0 })
    .add(new CustomButton('Start game'))
    .add(new CustomButton('Settings'))
    .add(new CustomButton('Exit'));