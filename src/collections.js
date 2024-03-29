import _ from 'lodash'
import utils from './index'

export function getMax(collection, key = 'updated_at') {
  const items = collection.filter((a) => a[key])
  if (items.length === 0) return null
  return items.reduce((a, b) => (a[key] > b[key] ? a : b))
}

export function getMin(collection, key = 'updated_at') {
  const items = collection.filter((a) => a[key])
  if (items.length === 0) return null
  return items.reduce((a, b) => (a[key] > b[key] ? b : a))
}

export function findAndReplace({oldItems = [], newItems = [], oldIden = 'id', newIden = 'id', mapFunc} = {}) {
  if (newItems.length === 0) return oldItems
  let items = oldItems.map((a) => Object.assign({}, a)) // deep-clone because we don't want to mess with life

  newItems.forEach((newItem) => {
    const oldItem = items.find((i) => i[oldIden] === newItem[newIden])
    if (oldItem) {
      const idx = items.indexOf(oldItem)
      let combinedItem = {...oldItem, ...newItem}
      if (mapFunc) {
        combinedItem = mapFunc({combined: combinedItem, old: oldItem, newItem})
      }

      items[idx] = combinedItem
    } else {
      items.push(newItem)
    }
  })
  return items
}

export const alwaysArray = (item) => (_.isArray(item) ? item : [item])

export const alwaysDefArray = (item) => alwaysArray(item).filter((i) => _.isBoolean(i) || utils.exists(i))

// these methods do pracitcally the same, but after a while we've discovered we need two utilities:
// 1. a method that filters out all falsy values, that's alwaysDefinedArray (should be alwaysTruthyArray)
// 2. a method that gets out undefined and null, that should be alwaysDefinedArray, but is alwaysDefArray for now.

export const alwaysDefinedArray = (item) => alwaysArray(item).filter((i) => utils.exists(i))
export const alwaysTruthyArray = alwaysDefinedArray

export const mergeArrayOfObjects = (arr1, arr2, field = 'id') =>
  arr1.map((i) => {
    const other = arr2.find((i2) => i2[field] === i[field])
    return other ? {...i, ...other} : i
  })

export function toggle(arr, nieuw) {
  if (_.isArray(nieuw)) return toggleArray(arr, nieuw)
  arr = _.cloneDeep(arr)
  if (arr.includes(nieuw)) {
    arr = arr.filter((item) => item !== nieuw)
  } else {
    arr.push(nieuw)
  }
  return arr
}

export function toggleArray(arr, newArr) {
  let finalArr = arr
  newArr.forEach((item) => {
    finalArr = toggle(finalArr, item)
  })
  return finalArr
}

export function getIdsFromItems(ids, items) {
  return ids.filter((id) => items.some((item) => item.id === id))
}

export function mergeJoinItems(joinTableItems, mainItems, key) {
  return joinTableItems.map((i) => ({...i, ...mainItems.find((i2) => i2.id === i[key])}))
}

export function reduce(items) {
  return items.filter(Number).reduce((item, tally) => item + tally, 0)
}

export function sum(arr = [], field) {
  const mapper = (i) => {
    if (_.isFunction(field)) return field(i)
    return i[field] || 0
  }

  return reduce(arr.map(mapper))
}
