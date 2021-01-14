export default {
    createCheckbox() {
        const checkboxColor = parseInt(this.styles.checkbox.color.substring(1), 16);

        const checkbox = this.scene.add.rectangle(0, 0, this.styles.checkbox.size, this.styles.checkbox.size, this.checkboxColor, 0)
            .setOrigin(0)
            .setStrokeStyle(this.styles.checkbox.strokeWidth, checkboxColor);

        this.container.add(checkbox);

        return checkbox;
    },

    createCheckboxImage() {
        const checkboxImage = this.disabled && this.styles.checkbox.disabled.image
            ? this.styles.checkbox.disabled.image
            : this.styles.checkbox.image;

        const checkbox = this.scene.add.image(0, 0, checkboxImage).setOrigin(0);

        this.container.add(checkbox);

        if (this.styles.checkbox.hoverImage) {
            const hoverImage = this.scene.add.image(0, 0, this.styles.checkbox.hoverImage)
                .setOrigin(0)
                .setVisible(false);

            this.container.add(hoverImage);
            this.container
                .on('pointerover', () => hoverImage.setVisible(true))
                .on('pointerout', () => hoverImage.setVisible(false));
        }

        return checkbox;
    },

    createLabel(checkbox) {
        const checkboxColor = parseInt(this.styles.checkbox.color.substring(1), 16);

        const labelX = checkbox.width + (this.styles.label.margin || 0);
        const labelY = checkbox.height / 2;
        const label = this.scene.add.text(labelX, labelY, this.label, this.styles.label).setOrigin(0, .5);
    
        const checkboxWidth = this.styles.checkbox.size
            + (this.styles.label.margin || 0)
            + label.width;

        this.container.add(label)
            .setSize(checkboxWidth, this.styles.checkbox.size)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.setState(!this.state))
            .on('pointerover', () => {
                if (!this.styles.checkbox.image) {
                    checkbox.setFillStyle(checkboxColor, this.styles.checkbox.hoverOpacity);
                }
            })
            .on('pointerout', () => {
                if (!this.styles.checkbox.image) {
                    checkbox.setFillStyle(checkboxColor, 0);
                }
            });

        this.container.input.hitArea.setTo(this.container.width / 2, this.container.height / 2, this.container.width, this.container.height);

        return label;
    },

    createIcon(checkbox) {
        const defaultCheckboxSize = 50;
        const checkIconColor = this.disabled
            ? parseInt(this.styles.icon.disabled.color.substring(1), 16)
            : parseInt(this.styles.icon.color.substring(1), 16)
        
        const checkIconX = checkbox.width / 2 + (this.styles.icon.translateX || 0);
        const checkIconY = checkbox.height / 2 + (this.styles.icon.translateY || 0);

        const checkIcon = this.scene.add.polygon(checkIconX, checkIconY, this.styles.icon.shape, checkIconColor)
            .setScale(this.styles.icon.scale || this.styles.checkbox.size / defaultCheckboxSize);
    
        this.container.add(checkIcon);
    }
};