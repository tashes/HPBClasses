let ES = new Map();

export async function emit (e, ...data) {
    let cbs = ES.get(e);
    if (Array.isArray(cbs)) {
        await Promise.all(cbs.map(async cb => await cb(...data)));
    }
};

export async function on (e, cb) {
    let cbs = ES.get(e);
    if (!Array.isArray(cbs)) {
        cbs = [];
        ES.set(e, cbs);
    }
    cbs.push(cb);
};