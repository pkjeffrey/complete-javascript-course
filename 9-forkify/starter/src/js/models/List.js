import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
    }

    deleteItem(id) {
        const idx = this.items.findIndex(el => el.id === id);
        if (idx > -1) {
            this.items.splice(idx, 1);
        }
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}