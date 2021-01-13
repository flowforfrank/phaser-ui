import Element from './core/Element'

import privates from './private/button'
import styles from '../styles/button'

class Button extends Element {
    /**
     * @summary Generates a new button
     * 
     * @param {string}   label
     * @param {boolean}  enabled
     * 
     * @example
     * new Button('Button').create(x, y, scene);
     * new Button('Button', false).create(x, y, scene);
     *
     * @returns {object} Button
     */
    constructor(label, enabled) {
        super();

        this.label = label;
        this.styles = styles;
        this.disabled = typeof enabled !== 'undefined' ? !enabled : false;
        this.callback = () => console.error('Missing onClick event for', this.label || this.styles.backgroundImage);

        return this;
    }

    /**
     * @summary Creates a new button at a given position
     * 
     * @param {number} x
     * @param {number} y
     * @param {object} scene
     * 
     * @example
     * new Button('Button').create(x, y, scene);
     * new Button('Button').create(10, 10, this);
     * 
     * @returns {object} Button
     */
    create(x, y, scene, layout) {
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.layout = layout;

        if (this.styles.backgroundImage) {
            privates.setButtonImage.call(this);
        } else {
            this.container = scene.add.text(x, y, this.label, this.styles)
                .setOrigin(0)
                .setPadding(styles.padding)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.callback(`#${this.label}${x}${y}`))
                .on('pointerover', () => this.container.setStyle({ fill: this.styles.hoverColor, backgroundColor: this.styles.hoverBackgroundColor }))
                .on('pointerout', () => this.container.setStyle({ fill: this.styles.color, backgroundColor: this.styles.backgroundColor  }));
        }

        if (this.disabled) {
            this.styles.backgroundImage
                ? this.container.disableInteractive()
                : this.container.disableInteractive().setStyle(this.styles.disabled);
        }

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }
}

export default Button;