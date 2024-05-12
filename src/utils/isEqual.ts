type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isEqual(lhs: unknown, rhs: unknown): boolean {
    if (isPlainObject(lhs) && isPlainObject(rhs)) {
        if (Object.keys(lhs).length !== Object.keys(rhs).length) {
            return false;
        }

        return Object.entries(lhs).every(([key, value]) =>
            isEqual(value as any, (rhs as PlainObject)[key] as any));
    } if (isArray(lhs) && isArray(rhs)) {
        if (lhs.length !== rhs.length) {
            return false;
        }

        return lhs.every((item, index) => isEqual(item, rhs[index]));
    }

    return lhs === rhs;
}
export default isEqual;
