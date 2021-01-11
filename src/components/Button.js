import styles from '../styles/button'

class Button {
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
        this.label = label;
        this.styles = styles;
        this.disabled = typeof enabled !== 'undefined' ? !enabled : false;
        this.callback = () => { console.error('Missing onClick event for', this.label) };

        return this;
    }

    /**
     * @summary Sets the styles of a button
     * 
     * @param {object} styles
     * 
     * @example
     * new Button('Button').setStyle({ backgroundColor: '#f39c12' });
     *
     * @returns {object} Button
     */
    setStyle(styles) {
        this.styles = {
            ...this.styles,
            ...styles
        };

        return this;
    }

    /**
     * @summary Disable or enable a button
     * 
     * @param {boolean} isDisabled
     * 
     * @example
     * button.setDisabled(true);
     * button.setDisabled(false);
     *
     * @returns {object} Button
     */
    setDisabled(isDisabled) {
        this.disabled = isDisabled;
        this.destroy();

        this.create(this.x, this.y, this.scene, this.layout);

        return this;
    }

    /**
     * @summary Sets a callback function for the button
     * 
     * @param {function} callback
     * 
     * @example
     * new Button('Button').onClick(id => console.log(`clicked on ${id}`));
     *
     * @returns {object} Button
     */
    onClick(callback) {
        this.callback = callback;

        return this;
    }

    /**
     * @summary Sets the visibility of a button
     * 
     * @param {boolean} visible
     * 
     * @example
     * button.setVisible(false);
     * button.setVisible(true);
     */
    setVisible(visible) {
        this.container.setVisible(visible);
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

        this.container = scene.add.text(x, y, this.label, this.styles)
            .setOrigin(0)
            .setPadding(styles.padding)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.callback(`#${this.label}${x}${y}`))
            .on('pointerover', () => this.container.setStyle({ fill: this.styles.hoverBackgroundColor }))
            .on('pointerout', () => this.container.setStyle({ fill: this.styles.color }));

        if (this.disabled) {
            this.container.disableInteractive()
                .setStyle(this.styles.disabled);
        }

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }

    /**
     * @summary Destroys the button
     * 
     * @example
     * button.destroy();
     */
    destroy() {
        this.container.destroy();
    }
}

export default Button;