import styles from '../styles/layout'

class Layout {
    constructor() {
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

    setStyle(styles) {
        this.styles = {
            ...this.styles,
            ...styles
        };

        return this;
    }

    setVisible(visible) {
        this.layout.setVisible(visible);
    }

    setDraggable(isDraggable) {
        this.isDraggable = isDraggable;

        return this;
    }

    onDrag(callback) {
        this.callback = callback;

        return this;
    }

    add(element) {
        this.elements.push(element);

        return this;
    }

    setAutoHeight() {
        let containersIndex = this.containers.length;
        let calculatedHeight = this.styles.padding * 2;

        while(containersIndex--) {
            calculatedHeight += this.containers[containersIndex].height;

            if (containersIndex) {
                calculatedHeight += this.styles.margin;
            }
        }

        this.styles.height = calculatedHeight;
    }

    setAutoWidth() {
        let containersIndex = this.containers.length;
        let calculatedWidth = 0;

        while(containersIndex--) {
            calculatedWidth = this.containers[containersIndex].width + (this.styles.padding * 2);

            if (this.styles.width < calculatedWidth) {
                this.styles.width = calculatedWidth;
            }
        }
    }

    createElement({ element, scene, index }) {        
        const x = this.styles.padding;
        const y = index === 0
            ? this.styles.padding
            : this.styles.padding
                + (index * this.styles.margin)
                + this.elementsTotalHeight;

        element.create(x, y, scene, this.layout);

        this.elementsTotalHeight += element.container.height;
        this.containers.push(element.container);
        this.layout.add(element.container);
    }

    create(x, y, scene) {
        this.x = x;
        this.y = y;
        this.scene = scene;

        this.layout = scene.add.container(x, y, []);

        let index = 0;
        let numberOfElements = this.elements.length;

        while(index < numberOfElements) {
            this.createElement({
                element: this.elements[index],
                scene,
                index
            });

            index++;
        }
    
        if (this.useAutoWidth) {
            this.setAutoWidth();
        }

        if (this.useAutoHeight) {
            this.setAutoHeight();
        }

        if (this.styles.opacity) {
            const layoutBackgroundColor = parseInt(this.styles.backgroundColor.substring(1), 16);
            const borderColor = parseInt(this.styles.borderColor.substring(1), 16);
            const layoutElement = scene.add.rectangle(0, 0, this.styles.width, this.styles.height, layoutBackgroundColor) 
                .setOrigin(0)
                .setAlpha(this.styles.opacity)
                .setStrokeStyle(this.styles.borderWidth, borderColor, this.styles.borderOpacity);
            
            this.layout.add(layoutElement)
                .sendToBack(layoutElement);
        }

        this.layout.setSize(this.styles.width, this.styles.height);

        if (this.isDraggable) {
            this.layout.setInteractive({ useHandCursor: true });
            this.layout.input.hitArea.setTo(x + this.styles.padding, y - this.styles.padding, this.layout.width, this.layout.height);
      
            scene.input.setDraggable(this.layout);

            scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
                
                this.callback(dragX, dragY);
            });
        }

        return this;
    }

    destroy() {
        this.containers = [];
        this.elementsTotalHeight = 0;
        this.layout.destroy();
    }
}

export default Layout;