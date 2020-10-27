import _ from 'lodash'

const urlPattern = /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*[-a-zA-Z0-9@:%_\+~#?&\/=])*/ig

export function snakeToCamel(s){
    return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function truncateString(str, num, addPoints = true, {canBeLink} = {}) {  
  if(!str) return "";
  let isSmall = false
  num = isSmall ? num - 6 : num
  if(num < 0) num = 0;
  if(canBeLink) {
    const links = str.match(urlPattern) || []
    const linkEnd = links.reduce((tally, l) => {
      const idxEnd = str.indexOf(l) + l.length
      return idxEnd > tally ? idxEnd : tally
    }, 0)
      
      num = linkEnd > num ? linkEnd : num
    }
  

  if (num < str.length){
    return str.slice(0, num) + (addPoints ? "..." : "");
  } 
  else {
    return str;
  }

}

export function capitalize(str) {
  if(!_.isString(str)) return str;
  if(str.length === 0) return str;
  return str[0].toUpperCase() + str.substring(1)
}

export function titleCase(str) {
  return str.toLowerCase().split(' ').filter(Boolean).map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}