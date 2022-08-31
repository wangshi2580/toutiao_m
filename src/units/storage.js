export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}
export const getItem = key => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
export const delItem = key => {
    localStorage.removeItem(key)
}