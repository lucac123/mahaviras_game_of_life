export default class Realm {
    width;
    height;

    grid;
    capacity;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.capacity = 0;

        this.grid = [...Array(width)].map(e => Array(height).fill(None));
    }

    addSoul(soul) {

    }

    draw(context) {
        
    }
}