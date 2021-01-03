import Layout from '../components/Layout'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'

export const LayoutExample1 = new Layout()
    .setStyle({})
    .setDraggable(true)
    .onDrag((x, y) => console.log(`Dragged layout to ${x}, ${y}`))
    .add(new Checkbox('Todo 1', false))
    .add(new Checkbox('Todo 2', false))
    .add(new Checkbox('Todo 3', false))
    .add(new Checkbox('Todo 4', false))
    .add(new Checkbox('Todo 5', false))
    .add(new Button('Submit'));

// layout.setVisible(true);
// layout.setVisible(false);

// --- Or ---
const createCheckbox = (label, initialState, callback) => new Checkbox(label, initialState)
    .setStyle({}) // Set global style
    .onChange(state => callback(state));

export const LayoutExample2 = new Layout()
    .add(createCheckbox('Todo 1', false, () => {}))
    .add(createCheckbox('Todo 2', false, () => {}))
    .add(createCheckbox('Todo 3', false, () => {}));