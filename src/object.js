import utils from './index'

export function objectEmpty(obj) {
  return Object.keys(obj).length === 0 || 
         !(Object.values(obj).some(c2 => utils.exists(c2)))
}

export function objPresent(item) {
  return Object.values(item).some(i => utils.exists(i))
}