// 用户信息
export function getSSession (name) {
  return sessionStorage.getItem(name);
}
// 清除本地信息
export function clearSSession (name) {
  sessionStorage.removeItem(name)
}

export function setSSession (name,data) {
  sessionStorage.removeItem(name)
  sessionStorage.setItem(name, data)
}
// 用户信息
export function getLSession (name) {
  return localStorage.getItem(name);
}
// 清除本地信息
export function clearLSession (name) {
  localStorage.removeItem(name)
}

export function setLSession (name,data) {
  localStorage.setItem(name, data)
}

