export default {
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
    },

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
    },

    setAutoWidth() {
        let containersIndex = this.containers.length;
        let calculatedWidth = 0;

        while(containersIndex--) {
            calculatedWidth = this.containers[containersIndex].width + (this.styles.padding * 2);

            if (this.styles.width < calculatedWidth) {
                this.styles.width = calculatedWidth;
            }
        }
    },

    setLayoutBackground() {
        const layoutBackgroundColor = parseInt(this.styles.backgroundColor.substring(1), 16);
        const borderColor = parseInt(this.styles.borderColor.substring(1), 16);
        const layoutElement = this.scene.add.rectangle(0, 0, this.styles.width, this.styles.height, layoutBackgroundColor) 
            .setOrigin(0)
            .setAlpha(this.styles.opacity)
            .setStrokeStyle(this.styles.borderWidth, borderColor, this.styles.borderOpacity);
        
        this.layout.add(layoutElement)
            .sendToBack(layoutElement);
    },

    setLayoutDraggable() {
        this.layout.setInteractive({ useHandCursor: true });
        this.layout.input.hitArea.setTo(this.layout.width / 2, this.layout.height / 2, this.layout.width, this.layout.height);

        this.scene.input.setDraggable(this.layout);

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            
            this.callback(dragX, dragY);
        });
    }
}