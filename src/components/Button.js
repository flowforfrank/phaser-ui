import styles from '../styles/button'

class Button {
    constructor(label, enabled) {
        this.label = label;
        this.styles = styles;
        this.disabled = typeof enabled !== 'undefined' ? !enabled : false;
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

    setDisabled(isDisabled) {
        this.disabled = isDisabled;
        this.destroy();

        this.create(this.x, this.y, this.scene, this.layout);

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
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.layout = layout;

        if (this.disabled) {
            this.container = scene.add.text(x, y, this.label, this.styles.disabled)
                .setOrigin(0)
                .setPadding(styles.padding);
        } else {
            this.container = scene.add.text(x, y, this.label, this.styles)
                .setOrigin(0)
                .setPadding(styles.padding)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.callback(`#${this.label}${x}${y}`))
                .on('pointerover', () => this.container.setStyle({ fill: this.styles.hoverBackgroundColor }))
                .on('pointerout', () => this.container.setStyle({ fill: this.styles.color }));
        }


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