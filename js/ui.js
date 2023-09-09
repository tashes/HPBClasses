let ALL = new Map();

class Element {
    constructor (element, name) {
        this.e = element;
        this.name = name;
    }
}

class Checkbox extends Element {
    constructor (element, name) {
        super(element, name);

        this.state = element.checked || false;

        this.e.addEventListener('click', (e) => {
            this.state = !this.state;
            e.preventDefault();
            e.stopPropagation();
        });
    }

    set state (state) {
        this.e.setAttribute('data-state', state);
        this._state = state;
        this.e.querySelector('input[type=checkbox]').checked = state;
        let evt = new Event('change', { bubbles: true });
        this.e.dispatchEvent(evt);
    }

    get state () {
        return this._state;
    }
}

class CheckGroup extends Element {
    constructor (element, name) {
        super([], name);

        this._state = new Set();

        this.add(element);
    }

    add (element) {
        this.e.push(element);
        element.setAttribute('data-state', false);

        element.addEventListener('click', (e) => {
            if (element.getAttribute('data-state') === "true") {
                this.remove(element.getAttribute('data-value'));
            }
            else {
                this.push(element.getAttribute('data-value'));
            }
            e.preventDefault();
            e.stopPropagation();
        });
    }

    push (value) {
        this._state.add(value);
        let el = this.e.find(e => e.getAttribute("data-value") === value);
        el.setAttribute('data-state', true);
        el.querySelector('input[type=checkbox]').checked = true;
        let evt = new Event('change', { bubbles: true });
        el.dispatchEvent(evt);
    };

    remove (value) {
        this._state.delete(value);
        let el = this.e.find(e => e.getAttribute("data-value") === value);
        el.setAttribute('data-state', false);
        el.querySelector('input[type=checkbox]').checked = false;
        let evt = new Event('change', { bubbles: true });
        el.dispatchEvent(evt);
    }

    get state () {
        return Array.from(this._state.values());
    };
}

class RadioGroup extends Element {
    constructor (element, name) {
        super([], name);

        this.add(element);
    }

    add (element) {
        this.e.push(element);
        element.setAttribute('data-state', false);

        element.addEventListener('click', (e) => {
            if (element.getAttribute('data-value') === this.state) {
                this.state = undefined;
            }
            else {
                this.state = element.getAttribute('data-value');
            }
            e.preventDefault();
            e.stopPropagation();
        });
    }

    set state (value) {
        let states = this.e.map(e => e.getAttribute('data-value'));
        if (value === undefined) {
            this._state = value;
            this.e.forEach(e => {
                e.setAttribute('data-state', false);
                e.querySelector('input[type=checkbox]').checked = false;
                let evt = new Event('change', { bubbles: true });
                e.dispatchEvent(evt);
            });
        }
        else if (states.find(v => v === value)) {
            this._state = value;
            this.e.forEach(e => {
                if (e.getAttribute('data-value') === value) {
                    e.setAttribute('data-state', true);
                    e.querySelector('input[type=checkbox]').checked = true;
                    let evt = new Event('change', { bubbles: true });
                    e.dispatchEvent(evt);

                }
                else {
                    e.setAttribute('data-state', false);
                    e.querySelector('input[type=checkbox]').checked = false;
                    let evt = new Event('change', { bubbles: true });
                    e.dispatchEvent(evt);
                }
            })
        }
    }

    get state () {
        return this._state;
    }

    get ele () {
        return this.e.find(e => e.getAttribute('data-value') === this._state);
    }
}

document.querySelectorAll('.check').forEach(ele => {
    let name = ele.getAttribute('data-id');
    let obj = new Checkbox(ele, name);
    ALL.set(name, obj);
});

document.querySelectorAll('.radio').forEach(ele => {
    let name = ele.getAttribute('data-group');
    let obj = ALL.get(name);
    if (obj === undefined) {
        obj = new RadioGroup(ele, name);
        ALL.set(name, obj);
    }
    else {
        obj.add(ele);
    }
});

document.querySelectorAll('.checkgroup').forEach(ele => {
    let name = ele.getAttribute('data-group');
    let obj = ALL.get(name);
    if (obj === undefined) {
        obj = new CheckGroup(ele, name);
        ALL.set(name, obj);
    }
    else {
        obj.add(ele);
    }
});

export async function getUIElement (name) {
    return ALL.get(name);
};