import Element from './core/Element'

import privates from './private/layout'
import styles from '../styles/layout'

class Layout extends Element {
    /**
     * @summary Generates a new layout
     * 
     * @example
     * new Layout()
     *     .add(new Button('Start'))
     *     .add(new Button('Exit'))
     *     .create(x, y, scene);
     *
     * @returns {object} Layout
     */
    constructor() {
        super();

        this.styles = styles;
        this.elements = [];
        this.containers = [];
        this.elementsTotalHeight = 0;

        if (this.styles.width === 'auto') {
            this.useAutoWidth = true;
            this.styles.width = 0;
        }

        if (this.styles.height === 'auto') {
            this.useAutoHeight = true;
            this.styles.height = 0;
        }

        return this;
    }

    /**
     * @summary Sets the layout to be draggable
     * 
     * @param {boolean} isDraggable
     * 
     * @example
     * layout.setDraggable(true);
     * layout.setDraggable(false);
     *
     * @returns {object} Layout
     */
    setDraggable(isDraggable) {
        this.isDraggable = isDraggable;

        return this;
    }

    /**
     * @summary Sets an onDrag callback function for the layout
     * 
     * @param {function} callback
     * 
     * @example
     * new Layout().onDrag((x, y) => console.log(`dragged to ${x}, ${y}`));
     *
     * @returns {object} Layout
     */
    onDrag(callback) {
        this.callback = callback;

        return this;
    }

    /**
     * @summary Adds an element to the layout.
     * You don't need to call `create` on the element.
     * 
     * @param {function} callback
     * 
     * @example
     * new Layout().add(new Button('Start'));
     *
     * @returns {object} Layout
     */
    add(element) {
        this.elements.push(element);

        return this;
    }

    /**
     * @summary Creates a new layout at a given position
     * 
     * @param {number} x
     * @param {number} y
     * @param {object} scene
     * 
     * @example
     * new Layout()
     *     .add(new Button('Start'))
     *     .add(new Button('Exit'))
     *     .create(x, y, scene);
     * 
     * @returns {object} Layout
     */
    create(x, y, scene) {
        this.x = x;
        this.y = y;
        this.scene = scene;

        this.layout = scene.add.container(x, y, []);

        let index = 0;
        let numberOfElements = this.elements.length;

        while(index < numberOfElements) {
            privates.createElement.call(this, {
                element: this.elements[index],
                scene,
                index
            });

            index++;
        }
    
        if (this.useAutoWidth) {
            privates.setAutoWidth.call(this);
        }

        if (this.useAutoHeight) {
            privates.setAutoHeight.call(this);
        }

        if (this.styles.opacity) {
            privates.setLayoutBackground.call(this);
        }

        this.layout.setSize(this.styles.width, this.styles.height);

        if (this.isDraggable) {
            privates.setLayoutDraggable.call(this);
        }

        return this;
    }

    /**
     * @summary Destroys the Layout
     * 
     * @example
     * layout.destroy();
     */
    destroy() {
        this.containers = [];
        this.elementsTotalHeight = 0;
        this.layout.destroy();
    }
}

export default Layout;