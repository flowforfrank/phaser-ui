import Element from './core/Element'

import privates from './private/checkbox'
import styles from '../styles/checkbox'

class Checkbox extends Element {
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
        super();

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
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.layout = layout;
        this.container = scene.add.container(x, y, []);

        const checkbox = this.styles.checkbox.image
            ? privates.createCheckboxImage.call(this)
            : privates.createCheckbox.call(this);

        const label = privates.createLabel.call(this, checkbox);

        if (this.state) {
            privates.createIcon.call(this, checkbox);
        }

        if (this.disabled) {
            const disabledCheckboxColor = this.styles.checkbox.disabled.color
                ? parseInt(this.styles.checkbox.disabled.color.substring(1), 16)
                : parseInt(this.styles.label.disabled.color.substring(1), 16);

            if (!this.styles.checkbox.image) {
                checkbox.setStrokeStyle(this.styles.checkbox.strokeWidth, disabledCheckboxColor);
            }

            label.setStyle(this.styles.label.disabled);

            this.container.disableInteractive();
        }

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }
}

export default Checkbox;