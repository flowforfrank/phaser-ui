class Element {

    /**
     * @summary Sets an onClick callback function for the component
     * 
     * @param {function} callback
     * 
     * @example
     * new Button('Button').onClick(id => console.log(`clicked on ${id}`));
     *
     * @returns {object} Component
     */
    onClick(callback) {
        this.callback = callback;

        return this;
    }

    /**
     * @summary Sets an onChange callback function for the component
     * 
     * @param {function} callback
     * 
     * @example
     * new Checkbox('Checkbox').onChange(state => console.log(`State changed to ${state}`));
     *
     * @returns {object} Component
     */
    onChange(callback) {
        this.callback = callback;

        return this;
    }

    /**
     * @summary Sets the styles of a component
     * 
     * @param {object} styles
     * 
     * @example
     * new Button('Button').setStyle({ backgroundColor: '#f39c12' });
     *
     * @returns {object} Component
     */
    setStyle(styles) {
        this.styles = {
            ...this.styles,
            ...styles
        };

        return this;
    }

    /**
     * @summary Disable or enable a component.
     * The component must be created
     * before you can call setDisabled
     * 
     * @param {boolean} isDisabled
     * 
     * @example
     * component.setDisabled(true);
     * component.setDisabled(false);
     *
     * @returns {object} Component
     */
    setDisabled(isDisabled) {
        this.disabled = isDisabled;
        this.destroy();

        this.create(this.x, this.y, this.scene, this.layout);

        return this;
    }

    /**
     * @summary Sets the visibility of a component
     * 
     * @param {boolean} visible
     * 
     * @example
     * component.setVisible(false);
     * component.setVisible(true);
     */
    setVisible(visible) {
        this.container.setVisible(visible);
    }

    /**
     * @summary Destroys the component
     * 
     * @example
     * component.destroy();
     */
    destroy() {
        if (!this.container) {
            console.error('Cannot destroy component that hasn\'t been created', this);
        }

        this.container.destroy();
    }
}

export default Element;