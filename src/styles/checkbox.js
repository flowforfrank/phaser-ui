export default {
    checkbox: {
        color: '#f39c12',
        size: 25,
        strokeWidth: 1,
        hoverOpacity: .25,
        disabled: {
            color: '#9e6100'
        }
    },
    label: {
        color: '#f39c12',
        margin: 5,
        disabled: {
            color: '#9e6100'
        }
        // can be any property from:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/#add-text-object
    },
    icon: {
        color: '#f39c12',
        shape: '20.285 2.000, 9.000 13.567, 3.714 8.556, 0.000 12.272, 9.000 21.000, 24.000 5.715',
        translateY: -1
        // scale: 1 -  omit scale to autoresize icon to size of the checkbox
    }
}