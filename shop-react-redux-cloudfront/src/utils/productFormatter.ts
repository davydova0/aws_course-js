export const getJoinedProducts = (data) => {
    return Object.values(data.reduce((acc, item) => {
        const id = item.id || item.product_id;
        if (!acc[id]) {
            acc[id] = {id, count: 0}
        }
        acc[id] = {
            ...acc[id],
            ...item
        }
        delete acc[id].product_id
        return acc
    }, {}));
}

export const getFormatterProduct = (obj) => {
    let result = {};
    for (let [key, values] of Object.entries(obj[0])) {
        result[key] = Object.values(values)[0]
    }
    return result;
}