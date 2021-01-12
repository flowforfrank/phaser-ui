# Button

*Trigger a user action*

## Examples

#### Create a default button:

```javascript
import { Button } from 'phaser-uikit'

new Button('Button')
    .onClick(id => console.log(`Clicked button: ${id}`))
    .create(x, y, scene);
```

#### Modify the default styles of a button:
> For the full list of available styles, see the [Styles](#styles) section below

```javascript
new Button('Button')
    .setStyle({})
    .create(x, y, scene);
```

#### Create a disabled button:

```javascript
new Button('Button', false)
    .create(x, y, scene);

// Or set the button disabled dynamically
const button = new Button('Button')
    .create(x, y, scene);

button.setDisabled(true);
```

#### Set the visibility of a button:
> Note that this will only make the button invisible. If you want to get rid of the button entirely, you can use [`destroy`](#destroy-an-existing-button)

```javascript
const button = new Button('Button')
    .create(x, y, scene);

button.setVisible(false);
button.setVisible(true);
```

#### Destroy an existing button:
> You can always recreate components by calling `create`

```javascript
const button = new Button('Button')
    .create(x, y, scene);

button.destroy();
button.create(x, y, scene);
```

## API

| Method | Description | Params | Default | 
| ------ | ----------- | ------ | ------- |
| `constructor` | Initializes a new button | `label:string`, `enabled:boolean` | `null`, `true` |
| `create` | Creates a new button at a given position | `x:number`, `y:number`, `scene:object` | `null` | 
| `setStyle` | Sets the styles of a button | `styles:object` | [`defaultStyles`](#styles) |
| `setDisabled` | Disable or enable a button | `isDisabled:boolean` | `false` |
| `onClick` | Sets a callback function for the button | `callback:function` | `(id) => {}` |
| `setVisible` | Sets the visibility of a button | `isVisible:boolean` | `true` |
| `destroy` | Destroys the button. Can be recreated by calling `create` | - | - |

## Styles

The list of available styles that you can pass to `setStyle`:

```javascript
{
    width: 200,
    height: 100,
    padding: 20,
    margin: 20,
    border: 0,
    color: '#FFF',
    backgroundColor: '#221f22',
    borderColor: '#f39c12',
    hoverBackgroundColor: '#f39c12',
    borderWidth: 1,
    borderOpacity: 1.75,
    opacity: .25,
    disabled: {
        backgroundColor: '#111111',
        color: '#555'
    }
}
```

