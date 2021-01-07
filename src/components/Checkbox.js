import styles from '../styles/checkbox'

class Checkbox {
    constructor(label, state) {
        this.label = label;
        this.state = state;
        this.styles = styles;
        this.callback = () => { console.error('Missing onChange event for', this.label) };

        return this;
    }

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

    onChange(callback) {
        this.callback = callback;

        return this;
    }

    setState(state) {
        this.state = state;
        this.container.destroy();

        this.create(this.x, this.y, this.scene, this.layout);
        this.callback(state);        

        return this;
    }

    setVisible(visible) {
        this.container.setVisible(visible);
    }

    create(x, y, scene, layout) {
        const checkboxColor = parseInt(this.styles.checkbox.color.substring(1), 16);

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

        label.setPadding((this.styles.checkbox.size - label.height) / 2)

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

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }

    destroy() {
        this.container.destroy();
    }
}

export default Checkbox;