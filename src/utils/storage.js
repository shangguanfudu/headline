export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (e) {
    return res
  }
}
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
export function remove (key) {
  window.localStorage.removeItem(key)
}
export function clearItem () {
  window.localStorage.clearItem()
}
