export default {
    setButtonImage() {
        const buttonImage = this.disabled && this.styles.backgroundDisabledImage
            ? this.scene.add.image(0, 0, this.styles.backgroundDisabledImage).setOrigin(0)
            : this.scene.add.image(0, 0, this.styles.backgroundImage).setOrigin(0);

        this.container = this.scene.add.container(this.x, this.y, [buttonImage])
            .setSize(buttonImage.width, buttonImage.height)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.callback(`#${this.styles.backgroundImage}${this.x}${this.y}`));
        
        this.container.input.hitArea.setTo(this.container.width / 2, this.container.height / 2, this.container.width, this.container.height);

        if (this.styles.backgroundHoverImage) {
            const hoverImage = this.scene.add.image(0, 0, this.styles.backgroundHoverImage)
                .setOrigin(0)
                .setVisible(false);

            this.container.add(hoverImage);
            this.container
                .on('pointerover', () => hoverImage.setVisible(true))
                .on('pointerout', () => hoverImage.setVisible(false));
        }

        if (this.label) {
            const label = this.scene.add.text(this.container.width / 2, this.container.height / 2, this.label, this.styles).setOrigin(.5);

            this.container.add(label);
        }
    }
};