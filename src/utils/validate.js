/**
 * @param {string} str
 * @return {Boolean}
 * **/ 
export function validUsername (str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @return {Boolean}
 * **/
// export function validURL (url) {
//     // const reg = //
// }

/**
 * @param {string} str
 * @return {Boolean}
 * **/
export function validLowerCase (str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}