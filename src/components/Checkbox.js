import styles from '../styles/checkbox'

class Checkbox {
    /**
     * @summary Generates a new checkbox
     * 
     * @param {string}   label
     * @param {boolean}  state
     * @param {boolean}  enabled
     * 
     * @example
     * new Checkbox('Checkbox', false).create(x, y, scene);
     * new Checkbox('Checkbox', true, false).create(x, y, scene);
     *
     * @returns {object} Checkbox
     */
    constructor(label, state, enabled) {
        this.label = label;
        this.state = state;
        this.styles = styles;
        this.disabled = typeof enabled !== 'undefined' ? !enabled : false;
        this.callback = () => { console.error('Missing onChange event for', this.label) };

        return this;
    }

    /**
     * @summary Sets the styles of a checkbox
     * 
     * @param {object} styles
     * 
     * @example
     * new Checkbox('Checkbox').setStyle({ checkbox: {}, label: {}, icon: {} });
     *
     * @returns {object} Checkbox
     */
    setStyle(styles) {
        this.styles = {
            checkbox: {
                ...this.styles.checkbox,
                ...styles.checkbox
            },
            label: {
                ...this.styles.label,
                ...styles.label
            },
            icon: {
                ...this.styles.icon,
                ...styles.icon
            }
        };

        return this;
    }

    /**
     * @summary Disable or enable a checkbox
     * 
     * @param {boolean} isDisabled
     * 
     * @example
     * checkbox.setDisabled(true);
     * checkbox.setDisabled(false);
     *
     * @returns {object} Checkbox
     */
    setDisabled(isDisabled) {
        this.disabled = isDisabled;
        this.destroy();

        this.create(this.x, this.y, this.scene, this.layout);

        return this;
    }

    /**
     * @summary Sets a callback function for the checkbox
     * 
     * @param {function} callback
     * 
     * @example
     * new Checkbox('Checkbox').onChange(state => console.log(`State changed to ${state}`));
     *
     * @returns {object} Checkbox
     */
    onChange(callback) {
        this.callback = callback;

        return this;
    }

    /**
     * @summary Sets the state of a checkbox
     * 
     * @param {boolean} state
     * 
     * @example
     * checkbox.setState(false);
     * checkbox.setState(true);
     *
     * @returns {object} Checkbox
     */
    setState(state) {
        this.state = state;
        this.destroy();

        this.create(this.x, this.y, this.scene, this.layout);
        this.callback(state);        

        return this;
    }

    /**
     * @summary Sets the visibility of a checkbox
     * 
     * @param {boolean} visible
     * 
     * @example
     * checkbox.setVisible(false);
     * checkbox.setVisible(true);
     */
    setVisible(visible) {
        this.container.setVisible(visible);
    }

    /**
     * @summary Creates a new checkbox at a given position
     * 
     * @param {number} x
     * @param {number} y
     * @param {object} scene
     * 
     * @example
     * new Checkbox('Checkbox').create(x, y, scene);
     * new Checkbox('Checkbox').create(10, 10, this);
     * 
     * @returns {object} Checkbox
     */
    create(x, y, scene, layout) {
        const checkboxColor = parseInt(this.styles.checkbox.color.substring(1), 16);
        const disabledCheckboxColor = parseInt(this.styles.checkbox.disabled.color.substring(1), 16);

        this.x = x;
        this.y = y;
        this.scene = scene;
        this.layout = layout;

        const element = scene.add.rectangle(0, 0, this.styles.checkbox.size, this.styles.checkbox.size, checkboxColor, 0)
            .setOrigin(0)
            .setStrokeStyle(this.styles.checkbox.strokeWidth, checkboxColor)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.setState(!this.state))
            .on('pointerover', () => element.setFillStyle(checkboxColor, this.styles.checkbox.hoverOpacity))
            .on('pointerout', () => element.setFillStyle(checkboxColor, 0));

        const labelX = element.width + (this.styles.label.margin || 0);
        const labelY = element.height / 2;
        const label = scene.add.text(labelX, labelY, this.label, this.styles.label)
            .setOrigin(0, .5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.setState(!this.state))
            .on('pointerover', () => element.setFillStyle(checkboxColor, this.styles.checkbox.hoverOpacity))
            .on('pointerout', () => element.setFillStyle(checkboxColor, 0));

        label.setPadding((this.styles.checkbox.size - label.height) / 2);

        const checkboxWidth = this.styles.checkbox.size
            + (this.styles.label.margin || 0)
            + label.width;

        this.container = scene.add.container(x, y, [element, label])
            .setSize(checkboxWidth, this.styles.checkbox.size);

        if (this.state) {
            const defaultCheckboxSize = 50;
            const checkIconColor = parseInt(this.styles.icon.color.substring(1), 16);
            
            const checkIconX = element.width / 2 + (this.styles.icon.translateX || 0);
            const checkIconY = element.height / 2 + (this.styles.icon.translateY || 0);

            const checkIcon = scene.add.polygon(checkIconX, checkIconY, this.styles.icon.shape, checkIconColor)
                .setScale(this.styles.icon.scale || this.styles.checkbox.size / defaultCheckboxSize);
        
            this.container.add(checkIcon);
        }

        if (this.disabled) {
            element.disableInteractive()
                .setStrokeStyle(this.styles.checkbox.strokeWidth, disabledCheckboxColor);
            label.disableInteractive()
                .setStyle(this.styles.label.disabled);
        }

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }

    /**
     * @summary Destroys the checkbox
     * 
     * @example
     * checkbox.destroy();
     */
    destroy() {
        this.container.destroy();
    }
}

export default Checkbox;