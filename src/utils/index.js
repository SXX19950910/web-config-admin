export function deepClone(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
            }
        }
    }
    return newObj
}

export function paging (data, size, current) {
    const tablePush = []
    data.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
            tablePush.push(item)
        }
    })
    return tablePush
}
