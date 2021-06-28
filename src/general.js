import _ from 'lodash'

export function exists(item) {
  if (_.isNumber(item)) return true
  if (!item) return false
  if (_.isString(item)) {
    return item.replace(/\s/g, '').length > 0 && item != 'undefined'
  }

  if (_.isPlainObject(item)) {
    return Object.keys(item).length > 0
  }

  if (_.isBoolean(item)) {
    return !!item
  }

  return item && item.length > 0
}

export function add(tally, item) {
  return tally + item
}

export function isPresent(field) {
  return field === 0 ? true : !!field
}

export function reduceArrOfObj(data) {
  return data
    .map((d) => Object.values(d))
    .flat()
    .reduce((tally, item) => tally + item, 0)
}

export function reduceObjects(data) {
  return data.reduce(reduceObject, {})
}

export function round(num, places = 2) {
  if (!num) return num

  return Number(Number(num).toFixed(places))
}

export function reduceObject(tally, item) {
  const keys = Object.keys(item)
  keys.forEach((k) => {
    if (!tally[k]) tally[k] = 0

    if (_.isNumber(item[k])) {
      tally[k] += item[k]
    }
  })
  return tally
}

export function funcOrObj(item, ...args) {
  if (_.isFunction(item)) return item(...args)
  return item
}

export const funcOrVal = funcOrObj

export function funcOrBool(item, ...args) {
  if (_.isFunction(item)) return !!item(...args)
  return !!item
}

export function randomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)
}
