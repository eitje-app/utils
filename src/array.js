import _ from 'lodash'

export const intersects = (arr1, arr2) => _.intersection(arr1, arr2).length > 0

export const composeArray = (...arrs) => {
  let arr = []
  
  arrs.forEach(o => {
    arr = [...arr, ...(o || []) ]
  })

  return arr
}