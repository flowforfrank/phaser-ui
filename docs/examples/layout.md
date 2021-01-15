# Button

*Order multiple elements into a layout*

## 🗃️ Table of Contents

1. **📚 [Examples](#examples)**  
    1.1. [Create a default layout](#create-a-default-layout)  
    1.2. [Add elements to a layout](#add-elements-to-a-layout)  
    1.3. [Modify the default styles of a layout](#modify-the-default-styles-of-a-layout)  
    1.4. [Set a layout draggable](#set-a-layout-draggable)  
    1.5. [Set the visibility of a layout](#set-the-visibility-of-a-layout)  
    1.6. [Destroy an existing layout](#destroy-an-existing-layout)
2. **👨‍💻 [API](#api)**
3. **🎨 [Styles](#styles)**

## Examples

#### Create a default layout:

```javascript
import { Layout } from 'phaser-uikit'

new Layout().create(x, y, scene);
```

#### Add elements to a layout:

```javascript
import { Button, Layout } from 'phaser-uikit'

new Layout()
    .add(new Button('Start game'))
    .add(new Button('Settings'))
    .add(new Button('Exit'))
    .create(x, y, scene);
```

#### Modify the default styles of a layout:
> For the full list of available styles, see the [Styles](#styles) section below

```javascript
new Layout()
    .setStyle({})
    .create(x, y, scene);
```

#### Set a layout draggable:

```javascript
new Layout()
    .setDraggable(true)
    .onDrag((x, y) => console.log(`Dragged layout to ${x}, ${y}`))
    .create(x, y, scene);
```


#### Set the visibility of a layout:
> Note that this will only make the layout invisible. If you want to get rid of the layout entirely, you can use [`destroy`](#destroy-an-existing-layout)

```javascript
const layout = new Layout()
    .create(x, y, scene);

layout.setVisible(false);
layout.setVisible(true);
```

#### Destroy an existing layout:
> You can always recreate components by calling `create`

```javascript
const layout = new Layout()
    .create(x, y, scene);

layout.destroy();
layout.create(x, y, scene);
```

## API

| Method | Description | Params | Default | 
| ------ | ----------- | ------ | ------- |
| `constructor` | Initializes a new layout | - | - |
| `create` | Creates a new layout at a given position | `x:number`, `y:number`, `scene:object` | - | 
| `setStyle` | Sets the styles of a layout | `styles:object` | [`defaultStyles`](#styles) |
| `setDraggable` | Sets the layout to be draggable | `isDraggable:boolean` | `false` |
| `onDrag` | Sets a callback function for the layout when being dragged | `callback:function` | `(x, y) => {}` |
| `setVisible` | Sets the visibility of a layout | `isVisible:boolean` | - |
| `destroy` | Destroys the layout. Can be recreated by calling `create` | - | - |

## Styles

- The following styles are supported for `setStyle`:

```javascript
{   
    // You can set the `width` to "auto", and it will adapt to the widest element inside the layout
    width: 'auto',

    // You can set the `height` to "auto", and it will adapt to the elements inside the layout
    height: 'auto',

    // Sets the padding of the layout
    padding: 20,
    
    // Sets the margin between elements
    margin: 20,

    // Sets the background color for the layout
    backgroundColor: '#221f22',

    // Sets the border color for the layout
    borderColor: '#f39c12',

    // Sets the width of the border
    borderWidth: 1,

    // Sets the opacity of the border
    borderOpacity: 1.75, // set to 175% because of 25% opacity of overall layout

    // Sets the opacity of the background of the layout. If set to 0, no background will be drawn
    opacity: .75
}
```
