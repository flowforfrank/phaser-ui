# Checkbox

*Toggle a state on and off, or toggle multiple values from several options*

## 🗃️ Table of Contents

1. **📚 [Examples](#examples)**  
    1.1. [Create a default checkbox](#create-a-default-checkbox)  
    1.2. [Modify the default styles of a checkbox](#modify-the-default-styles-of-a-checkbox)  
    1.3. [Create a disabled checkbox](#create-a-disabled-checkbox)  
    1.4. [Create a checkbox using an image](#create-a-checkbox-using-an-image)  
    1.5. [Set the visibility of a checkbox](#set-the-visibility-of-a-checkbox)  
    1.6. [Set the state of a checkbox dynamically](#set-the-state-of-a-checkbox-dynamically)  
    1.7. [Destroy an existing checkbox](#destroy-an-existing-checkbox)
2. **👨‍💻 [API](#api)**
3. **🎨 [Styles](#styles)**

## Examples

#### Create a default checkbox:

```javascript
import { Checkbox } from 'phaser-uikit'

new Checkbox('Checkbox', false)
    .onChange(state => console.log(`State changed to ${state}`))
    .create(x, y, scene);

// Make the checkbox checked by default
new Checkbox('Checkbox', true)
    .create(x, y, scene);
```

#### Modify the default styles of a checkbox:
> For the full list of available styles, see the [Styles](#styles) section below

```javascript
new Checkbox('Checkbox', false)
    .setStyle({checkbox: { ... }, label: { ... }, icon: { ... }})
    .create(x, y, scene);
```

#### Create a disabled checkbox:

```javascript
new Checkbox('Checkbox', true, false)
    .create(x, y, scene);

// Or set the checkbox disabled dynamically
const checkbox = new Checkbox('Checkbox', true)
    .create(x, y, scene);

checkbox.setDisabled(true);
checkbox.setDisabled(false);
```

#### Create a checkbox using an image:

```javascript
// Make sure you preload your images before you use them
preload() {
    this.load.image('checkboxImage', 'assets/checkbox.png');
    ...
}

new Checkbox('Checkbox', true)
    .setStyle({
        checkbox: {
            image: 'checkboxImage'
        }
    })
    .create(x, y, scene);

// You can also define a hover state using the `hoverImage` property
new Checkbox('Checkbox', true)
    .setStyle({
        checkbox: {
            image: 'checkboxImage',
            hoverImage: 'checkboxHovered'
        }
    })
    .create(x, y, scene);

// You can define a disabled state using the `disabled.image` property
new Checkbox('Checkbox', true)
    .setStyle({
        checkbox: {
            image: 'checkboxImage',
            hoverImage: 'checkboxHovered',
            disabled: {
                image: 'checkboxDisabled'
            }
        }
    })
    .create(x, y, scene);
```

#### Set the visibility of a checkbox:
> Note that this will only make the checkbox invisible. If you want to get rid of the checkbox entirely, you can use [`destroy`](#destroy-an-existing-checkbox)

```javascript
const checkbox = new Checkbox('Checkbox', false)
    .create(x, y, scene);

checkbox.setVisible(false);
checkbox.setVisible(true);
```

#### Set the state of a checkbox dynamically:

```javascript
const dynamic = new Checkbox('Dynamic', false).create(x, y, scene);
const toggle  = new Checkbox('Toggle', false)
    .onChange(state => dynamic.setState(state))
    .create(x1, y2, scene);
```

#### Destroy an existing checkbox:
> You can always recreate components by calling `create`

```javascript
const checkbox = new Checkbox('Checkbox', false)
    .create(x, y, scene);

checkbox.destroy();
checkbox.create(x, y, scene);
```

## API

| Method | Description | Params | Default | 
| ------ | ----------- | ------ | ------- |
| `constructor` | Initializes a new checkbox | `label:string`, `state:boolean`, `enabled:boolean` | `null`, `null`, `false` |
| `create` | Creates a new checkbox at a given position | `x:number`, `y:number`, `scene:object` | - | 
| `setStyle` | Sets the styles of a checkbox | `styles:object` | [`defaultStyles`](#styles) |
| `setDisabled` | Disable or enable a checkbox | `isDisabled:boolean` | - |
| `onChange` | Sets a callback function for the checkbox | `callback:function` | `(state) => {}` |
| `setVisible` | Sets the visibility of a checkbox | `isVisible:boolean` | - |
| `setState` | Sets the state of a checkbox | `state:boolean` | - |
| `destroy` | Destroys the checkbox. Can be recreated by calling `create` | - | - |

## Styles

- The styles are separated into three different groups: `checkbox`, `label`, and `icon`.
- For the `label`, you can pass any style you would normally define for a [Text GameObject](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/#add-text-object).
- The list of available styles that you can pass to `setStyle` are:

```javascript
{
    checkbox: {
        color: '#f39c12',
        size: 25,
        strokeWidth: 1,
        hoverOpacity: .25,
        disabled: {
            color: '#9e6100'
        }
    },
    label: {
        color: '#f39c12',
        margin: 5,
        disabled: {
            color: '#9e6100'
        }
    },
    icon: {
        color: '#f39c12',
        /** 
         * Shape, that defines the geometric shape of the check mark can be a valid polygon:
         * - An array of number,  eg.: [x0, y0, x1, y1]
         * - An array of objects, eg.: [{x: 0, y: 0}, {x: 1, y: 1}]
         * - A string,            eg.: 'x0 y0 x1 y1'
         **/
        shape: '20.285 2.000, 9.000 13.567, 3.714 8.556, 0.000 12.272, 9.000 21.000, 24.000 5.715',
        // You can use `translateX` and `translateY` to fine-tune the position of the icon
        translateY: -1,
        // Omit scale to auto-resize icon to the size of the checkbox
        scale: 1,
        disabled: {
            color: '#9e6100'
        }
    }
}
```