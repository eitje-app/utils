import utils from './index'
import _ from 'lodash'

export function objectEmpty(obj) {
  return Object.keys(obj).length === 0 || 
         !(Object.values(obj).some(c2 => utils.exists(c2)))
}

export function objPresent(item) {
  return _.isObject(item) && Object.values(item).some(i => utils.exists(i))
}

export const composeObj = (...objs) => {
  let obj = {}
  
  objs.forEach(o => {
    obj = {...obj, ...(o || {}) }
  })

  return obj
}