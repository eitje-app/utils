import utils from './index'

export function objectEmpty(obj) {
  return Object.keys(obj).length === 0 || 
         !(Object.values(obj).some(c2 => utils.exists(c2)))
}