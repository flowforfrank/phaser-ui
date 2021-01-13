# Button

*Trigger a user action*

## 🗃️ Table of Contents

1. **📚 [Examples](#examples)**  
    1.1. [Create a default button](#create-a-default-button)  
    1.2. [Modify the default styles of a button](#modify-the-default-styles-of-a-button)  
    1.3. [Create a disabled button](#create-a-disabled-button)  
    1.4. [Create a button using an image](#create-a-button-using-an-image)  
    1.5. [Set the visibility of a button](#set-the-visibility-of-a-button)  
    1.6. [Destroy an existing button](#destroy-an-existing-button)
2. **👨‍💻 [API](#api)**
3. **🎨 [Styles](#styles)**

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

#### Create a button using an image:
> Note that you need to pass the asset key as the value to the properties. Also make sure you preload them before use.

```javascript
// Make sure you preload your images before you use them
preload() {
    this.load.image('buttonImage', 'assets/button.png');
    ...
}

// Note that you don't have to pass a label if the image contains it
new Button()
    .setStyle({ backgroundImage: 'buttonImage' })
    .create(x, y, scene);

// Do pass a label if your image doesn't contain it
new Button('Button Label')
    .setStyle({ backgroundImage: 'buttonImageWithoutLabel' })
    .create(x, y, scene);

// You can also define a hover state using the `backgroundHoverImage` property
new Button('Button Label')
    .setStyle({
        backgroundImage: 'buttonImage',
        backgroundHoverImage: 'buttonHoverImage'
    })
    .create(x, y, scene);

// You can define a disabled state using the `backgroundDisabledImage` property
new Button('Button Label')
    .setStyle({
        backgroundImage: 'buttonImage',
        backgroundHoverImage: 'buttonHoverImage',
        backgroundDisabledImage: 'buttonDisabledImage'
    })
    .create(x, y, scene);
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
| `create` | Creates a new button at a given position | `x:number`, `y:number`, `scene:object` | - | 
| `setStyle` | Sets the styles of a button | `styles:object` | [`defaultStyles`](#styles) |
| `setDisabled` | Disable or enable a button | `isDisabled:boolean` | - |
| `onClick` | Sets a callback function for the button | `callback:function` | `(id) => {}` |
| `setVisible` | Sets the visibility of a button | `isVisible:boolean` | - |
| `destroy` | Destroys the button. Can be recreated by calling `create` | - | - |

## Styles

- You can pass any style you would normally define for a [Text GameObject](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/#add-text-object).
- On top of that, you can pass the following custom properties to `setStyle`:

```javascript
{   
    // Set each padding to the same size
    padding: 20,

    // Sets the hover color of the button text
    hoverColor: '#f39c12',

    // Sets the hover color of the button background
    hoverBackgroundColor: '#221f22',

    // Sets an image for the button
    backgroundImage: 'customButton',

    // Sets a hover image for the button
    backgroundHoverImage: 'customButtonHover',

    // Sets a disabled image for the button
    backgroundDisabledImage: 'customButtonDisabled',

    // Sets the styles for a disabled button
    // Can take up any property from a Text GameObject
    disabled: {
        backgroundColor: '#111111',
        color: '#555'
    }
}
```
