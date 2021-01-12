import Element from './core/Element'

import styles from '../styles/radio'

class Radio extends Element {
    constructor() {
        super();

        this.buttons = [];
        this.styles = styles;
        this.elementsTotalHeight = 0;
        this.callback = () => { console.error('Missing onChange event for', this); };

        return this;
    }

    setStyle(styles) {
        this.styles = {
            radio: {
                ...this.styles.radio,
                ...styles.radio
            },
            label: {
                ...this.styles.label,
                ...styles.label
            }
        };

        return this;
    }

    setState(index) {
        if (!this.buttons[index].state) {
            this.buttons = this.buttons.map(button => ({ ...button, state: false }));
            this.buttons[index].state = true;

            this.destroy();
            this.callback(index);
            this.create(this.x, this.y, this.scene, this.layout);
        }
    }

    add(label, state) {
        this.buttons.push({
            label,
            state: state || false
        });

        return this;
    }

    calculateWidth() {
        let buttonsIndex = this.buttons.length;
        let width = 0;

        while(buttonsIndex--) {
            const calculatedWidth = (this.styles.radio.size * 2)
                + (this.styles.label.margin || 0)
                + this.buttons[buttonsIndex].width;

            if (width < calculatedWidth) {
                width = calculatedWidth;
            }
        }

        return width;
    }

    calculateHeight() {
        const numberOfRadios = this.buttons.length;

        return (this.styles.radio.size * 2) * numberOfRadios
            + (this.styles.radio.margin * (numberOfRadios - 1));
    }

    create(x, y, scene, layout) {
        const radioColor = parseInt(this.styles.radio.color.substring(1), 16);
        const activeRadios = this.buttons.filter(button => button.state).length;

        if (activeRadios > 1) {
            console.error('You can\'t have more than 1 active radio elements for', this);
            return;
        }

        if (!activeRadios) {
            this.buttons[0].state = true;
        }

        this.x = x;
        this.y = y;
        this.scene = scene;
        this.layout = layout;
        this.container = scene.add.container(x, y, [])

        let index = 0;
        let numberOfButtons = this.buttons.length;

        while (index < numberOfButtons) {
            const i = index;
            const y = index === 0
                ? 0
                : (index * this.styles.radio.margin) + this.elementsTotalHeight;

            const element = scene.add.circle(0, y, this.styles.radio.size, radioColor, 0)
                .setOrigin(0)
                .setStrokeStyle(this.styles.radio.strokeWidth, radioColor)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.setState(i))
                .on('pointerover', () => element.setFillStyle(radioColor, this.styles.radio.hoverOpacity))
                .on('pointerout', () => element.setFillStyle(radioColor, 0));

            const labelX = element.width + (this.styles.label.margin || 0);
            const labelY = index === 0
                ? element.height / 2
                : (index * this.styles.radio.margin) + this.elementsTotalHeight + (element.height / 2);

            const label = scene.add.text(labelX, labelY, this.buttons[index].label, this.styles.label)
                .setOrigin(0, .5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.setState(i))
                .on('pointerover', () => element.setFillStyle(radioColor, this.styles.radio.hoverOpacity))
                .on('pointerout', () => element.setFillStyle(radioColor, 0));

            label.setPadding((this.styles.radio.size - label.height) / 2);

            this.buttons[index].width = label.width;

            if (this.buttons[index].state) {
                const defaultCheckboxSize = 12;

                const checkIconX = element.width / 2;
                const checkIconY = index === 0
                    ? element.height / 2
                    : (index * this.styles.radio.margin) + this.elementsTotalHeight + (element.height / 2);

                const checkIcon = scene.add.circle(checkIconX, checkIconY, this.styles.radio.size, radioColor)
                    .setScale(this.styles.radio.bulletPointScale || this.styles.radio.size / defaultCheckboxSize);

                this.container.add(checkIcon);
            }

            this.container.add([element, label]);
            this.elementsTotalHeight += (this.styles.radio.size * 2);
            
            index++;
        }

        this.container.setSize(this.calculateWidth(), this.calculateHeight());

        if (layout) {
            layout.add(this.container);
        }

        return this;
    }

    /**
     * @summary Destroys the Radio
     * 
     * @example
     * radio.destroy();
     */
    destroy() {
        this.elementsTotalHeight = 0;
        this.container.destroy();
    }
}

export default Radio;