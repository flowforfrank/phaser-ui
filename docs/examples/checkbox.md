# Checkbox

*Toggle a state on and off, or toggle multiple values from several options*

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
const checkbox = new Checkbox('Checkbox', true, false)
    .create(x, y, scene);

checkbox.setDisabled(true);
checkbox.setDisabled(false);
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
| `create` | Creates a new checkbox at a given position | `x:number`, `y:number`, `scene:object` | `null` | 
| `setStyle` | Sets the styles of a checkbox | `styles:object` | [`defaultStyles`](#styles) |
| `setDisabled` | Disable or enable a checkbox | `isDisabled:boolean` | `false` |
| `onChange` | Sets a callback function for the checkbox | `callback:function` | `(state) => {}` |
| `setVisible` | Sets the visibility of a checkbox | `isVisible:boolean` | `true` |
| `setState` | Sets the state of a checkbox | `state:boolean` | `null` |
| `destroy` | Destroys the checkbox. Can be recreated by calling `create` | - | - |

## Styles

The styles are separated into three different groups: `checkbox`, `label`, `icon`.
The list of available styles that you can pass to `setStyle`:

```javascript
{
    checkbox: {
        color: '#f39c12',
        size: 25,
        strokeWidth: 1,
        hoverOpacity: .25,
        // Disabled state can take up any value you would normally add
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
        // can be any property from:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/#add-text-object
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
        translateY: -1
        // Omit scale to auto-resize icon to size of the checkbox
        scale: 1
    }
}
```

