import _ from 'lodash'
import utils from './index'

export function getMax(collection, key = 'updated_at') {
  const items = collection.filter(a => a[key])
  if(items.length === 0) return null
  return items.reduce((a, b) => a[key] > b[key] ? a : b)
}

export function getMin(collection, key = 'updated_at') {
  const items = collection.filter(a => a[key])
  if(items.length === 0) return null
  return items.reduce((a, b) => a[key] > b[key] ? b : a)
}

export function findAndReplace({oldItems = [], newItems = [], oldIden = "id", newIden = "id", mapFunc} = {}) {
  
  if(newItems.length === 0) return oldItems;
  let items = oldItems.map(a => Object.assign({}, a)); // deep-clone because we don't want to mess with life
  
  newItems.forEach(newItem => {
    const oldItem = items.find(i => i[oldIden] === newItem[newIden])
    if(oldItem) {
      const idx = items.indexOf(oldItem)
      let combinedItem = {...oldItem, ...newItem}
      if(mapFunc) {
        combinedItem = mapFunc({combined: combinedItem, old: oldItem, newItem})
      }

      items[idx] = combinedItem

    } else {
      items.push(newItem)
    }
  })
  return items;

}

export const alwaysArray = item => _.isArray(item) ? item : [item]
export const alwaysDefinedArray = item => alwaysArray(item).filter(i => !!i)

export const mergeArrayOfObjects = (arr1, arr2, field = "id") => 
  arr1.map(i => {
    const other = arr2.find(i2 => i2[field] === i[field])
    return other ? {...i, ...other} : i
  } )

export function toggle(arr, nieuw) {
  arr = _.cloneDeep(arr) 
  if(arr.includes(nieuw)) {
    arr = arr.filter(item => item !== nieuw)
  } else {
    arr.push(nieuw)
  }
  return arr;
}

export function getIdsFromItems(ids, items) {
  return ids.filter(id => items.some(item => item.id === id))
}

export function mergeJoinItems(joinTableItems, mainItems, key) {
  return joinTableItems.map(i => ({...i, ...mainItems.find(i2 => i2.id === i[key]) }))
}

export function reduce(items) {
  return items.reduce((item, tally) => item + tally, 0)
}