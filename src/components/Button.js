import styles from '../styles/button'

class Button {
    constructor(label) {
        this.label = label;
        this.styles = styles;
        this.callback = () => { console.error('Missing onClick event for', this.label) };

        return this;
    }

    setStyle(styles) {
        this.styles = {
            ...this.styles,
            ...styles
        };

        return this;
    }

    onClick(callback) {
        this.callback = callback;

        return this;
    }

    setVisible(visible) {
        this.container.setVisible(visible);
    }

    create(x, y, scene, layout) {
        this.container = scene.add.text(x, y, this.label, this.styles)
            .setOrigin(0)
            .setPadding(styles.padding)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.callback(`#${this.label}${x}${y}`))
            .on('pointerover', () => this.container.setStyle({ fill: this.styles.hoverBackgroundColor }))
            .on('pointerout', () => this.container.setStyle({ fill: this.styles.color }));

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }

    destroy() {
        this.container.destroy();
    }
}

export default Button;