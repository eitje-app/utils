import _ from 'lodash'

export function exists(item) {
  if(!item) return false;
  if(_.isString(item) ) {
    return item.replace(/\s/g,'').length > 0
  }
  return (!item.length || item.length > 0)
}

export function add(tally, item) {
  return tally + item
}

export function isPresent(field) {
  return field === 0 ? true : !!field
}

export function reduceObjects(data) {
  return data.reduce(reduceObject, {})
}

export function round(num, places = 2) {
  if(!num) return num;

  return Number( Number(num).toFixed(places) )
}

export function reduceObject(tally, item) {
  const keys = Object.keys(item)
    keys.forEach(k => {
      if(!tally[k]) tally[k] = 0;

      if(_.isNumber(item[k])) {
        tally[k] += item[k]
      }

    }) 
    return tally;

}

export function funcOrObj(item, ...args) {
  if (_.isFunction(item)) return item(...args);
  return item;
}



