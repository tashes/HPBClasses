import { clearForm } from "./form.js";
import { getUIElement } from "./ui.js";

const SLIDES = Array.from(document.querySelectorAll('#slides > div'));
let CURRENT = document.querySelector('#slides > div.active');
let HISTORY = [];

function wait (ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
};

export async function start () {
    if (CURRENT) {
        CURRENT.classList.remove('active');
        CURRENT = "";
    }
    let slide = SLIDES[0];
    CURRENT = slide;
    slide.classList.add('active');

    SLIDES.forEach(s => s.querySelectorAll('.answers > div').forEach(ele => ele.classList.remove('selected')));

    HISTORY = [];
    document.querySelector('#qback').classList.add('disable');
};

export async function open () {
    document.querySelector('#questions').classList.remove('closed');
    document.querySelector('#questions').classList.add('opening');
    await wait(100);
    document.querySelector('#questions').classList.remove('opening');
};

export async function close () {
    document.querySelector('#questions').classList.add('closing');
    await wait(400);
    document.querySelector('#questions').classList.remove('closing');
    document.querySelector('#questions').classList.add('closed');
};

export async function toSlide (n, hist = true) {
    if (CURRENT) {
        if (hist === true) {
            HISTORY.push((SLIDES.findIndex(s => s.isSameNode(CURRENT)) + 1));
            document.querySelector('#qback').classList.remove('disable');
        }
        CURRENT.classList.remove('active');
        CURRENT = "";
        await wait(400);
    }
    let slide = SLIDES[n - 1];
    CURRENT = slide;
    slide.classList.add('active');
}

function toggle (name) {
    let ele = document.querySelector(`#${ name }`);
    if (ele.classList.contains('selected')) {
        ele.classList.remove('selected');
        return false;
    }
    else {
        ele.classList.add('selected');
        return true;
    }
};

function setupCheck (button, ui, value, to) {
    if (typeof to === "function") {
        document.querySelector(`#${ button }`).addEventListener('click', async () => {
            toggle(button);
            let check = await getUIElement(ui);
            check.state = value;
            await to();
        });
    }
    else {
        document.querySelector(`#${ button }`).addEventListener('click', async () => {
            toggle(button);
            let check = await getUIElement(ui);
            check.state = value;
            await toSlide(to);
        });
    }
}

function setupRadio (button, ui, value) {
    document.querySelector(`#${ button }`).addEventListener('click', async () => {
        let state = toggle(button);
        let check = await getUIElement(ui);
        if (state === true) {
            check.push(value);
        }
        else {
            check.remove(value);
        }
    });
};

function setupNext (button, to) {
    document.querySelector(`#${ button }`).addEventListener('click', async () => {
        toSlide(to);
    });
};

document.querySelector('#qclose').addEventListener('click', async () => {
    await close();
});
document.querySelector('#qopen').addEventListener('click', async () => {
    await clearForm();
    await start();
    await open();
});
document.querySelector('#qback').addEventListener('click', () => {
    let n = HISTORY.pop();
    if (n && n > 0) {
        toSlide(n, false);
        if ([ 1, 2, 3, 4, 6, 7, 9, 10, 12 ].indexOf(n) > -1) {
            SLIDES[n - 1].querySelectorAll('.answers > div').forEach(ele => ele.classList.remove('selected'));
        }
    }
    if (HISTORY.length === 0) {
        document.querySelector('#qback').classList.add('disable');
    }
});

setupCheck("slide_1_1", "flv-vessel", true, 2);
setupCheck("slide_1_2", "flv-vessel", false, 3);
setupCheck("slide_2_1", "flv-trace", "lga", 3);
setupCheck("slide_2_2", "flv-trace", "aorta", 3);
setupCheck("slide_3_1", "ampv-vessel", true, 4);
setupCheck("slide_3_2", "ampv-vessel", false, 6);
setupCheck("slide_4_1", "ampv-trace", "aorta", 5);
setupCheck("slide_4_2", "ampv-trace", "ct", 5);
setupCheck("slide_4_3", "ampv-trace", "sma", 5);
setupCheck("slide_4_4", "ampv-trace", "cm", 5);
setupRadio("slide_5_1", "ampv-branch", "lha");
setupRadio("slide_5_2", "ampv-branch", "rha");
setupRadio("slide_5_3", "ampv-branch", "gda");
setupNext("slide_5_next", 6);
setupCheck("slide_6_1", "pmpv-vessel", true, 7);
setupCheck("slide_6_2", "pmpv-vessel", false, 9);
setupCheck("slide_7_1", "pmpv-trace", "n", 8);
setupCheck("slide_7_2", "pmpv-trace", "aorta", 8);
setupCheck("slide_7_3", "pmpv-trace", "ct", 8);
setupCheck("slide_7_4", "pmpv-trace", "sma", 8);
setupCheck("slide_7_5", "pmpv-trace", "cm", 8);
setupCheck("slide_7_6", "pmpv-trace", "cha", 8);
setupRadio("slide_8_1", "pmpv-branch", "lha");
setupRadio("slide_8_2", "pmpv-branch", "rha");
setupRadio("slide_8_3", "pmpv-branch", "gda");
setupNext("slide_8_next", 9);
setupCheck("slide_9_1", "smv-vessel", true, 10);
setupCheck("slide_9_2", "smv-vessel", false, 12);
setupCheck("slide_10_1", "smv-trace", "aorta", 11);
setupCheck("slide_10_2", "smv-trace", "sma", 11);
setupRadio("slide_11_1", "smv-branch", "lha");
setupRadio("slide_11_2", "smv-branch", "rha");
setupRadio("slide_11_3", "smv-branch", "gda");
setupNext("slide_11_next", 12);
setupCheck("slide_12_1", "leash-vessel", true, async () => await close());
setupCheck("slide_12_2", "leash-vessel", false, async () => await close());

start();