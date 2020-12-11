import moment from 'moment'
import _ from 'lodash'
import utils from './index'


const formats = ['DD-MM-YYYY', 'YYYY-MM-DD']

export const likeDate = (val) => {
  const mmt = moment(val, formats, true) // without strict any number is valid..
  return !_.isNaN(mmt.hour())
}

export const getDate = (hours = 0) => {
  const date = new Date()
  date.setHours(hours, 0, 0, 0)
  return date;
}


export const makeHourDate = (mins) => {
  const str = minToTimeString(mins)
  const [hours, minutes] = str.split(":")
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date;
}

export const getWeekDatesFromDate = date => {
  const d = moment(date)
  const week = d.isoWeek()
  const year = d.isoWeekYear()
  return getWholeWeekArray(week, year)
}




export const getWholeWeekArray = function(week, year) {
  var datesArr = []
  let dagen = days()
  _(7).times((n) => {
    datesArr.push(getDateFromWeek(n + 1, week, year).format("YYYY-MM-DD"))
  })
  return datesArr;
} 


export const getWholeWeekString = function(week, year) {
  var datesArr = []
  let dagen = days()
  _(7).times((n) => {
    datesArr.push({date: getDateFromWeek(n + 1, week, year).format("YYYY-MM-DD")})
  })
  return datesArr;
} 

export const minSince = (start) => {
  return moment().diff(moment(start), 'm')
}

export function humanDate(date) {
  return moment(date).format("dddd DD MMM")
}

export function fullHumanDate(date) {
  return moment(date).format("dddd DD MMM YYYY")
}

export function getDateFromWeek(day, week, year) {
  let mmt = moment()
  
  mmt.isoWeekday(day).isoWeek(week)
  mmt.isoWeekYear(year)
  return mmt;
};




export function isAfterDate(date, dateTwo = moment()) {
  return getDayDiff(date, dateTwo) >= 0
}

function getDayDiff(date, dateTwo = moment()) {
  date = moment(date)
  dateTwo = moment(dateTwo)
  dateTwo = dateTwo.startOf('day')
  const diff = date.startOf('day').diff(dateTwo, 'd') 
  return diff;
}

export function today() {
  return moment().format("YYYY-MM-DD")
}

export function todayOrEarlier(date) {
  return getDayDiff(date) <= 0
}

export function inPast(date) {
  return !isAfterDate(date)
}

export const totalMins = (string1, string2) => {
 return moment(string2).diff(moment(string1), 'minutes')
}

export function highest(date1, date2) {
   if(!date2) return date1;
   if(!date1) return date2;
   if(date1 && date2) return date1 > date2 ? date1 : date2;
}

export const getMonthDays = (month, year) => {
  const start = moment([year, month - 1, 1])
  const startOfMonth = start.format("YYYY-MM-DD")
  const endOfMonth = start.endOf('month').format("YYYY-MM-DD")
  return {startOfMonth, endOfMonth}

}

export const timeStringToDate = val => {
  const date = new Date()
  const vals = val.split(":")
  date.setHours(vals[0], vals[1], 0, 0)
  return date;

}

export const roundTime = (time, amt = 1) => {
  time = moment(time)
  const mod = time.minute() % amt
  if(mod === 0) return time;
  const remainder = amt - (mod)
  time.add(remainder, 'minutes')
  return time;
}

export const getCurrentYear = () => moment().year()

export const getCurrentMonth = () => moment().month() + 1 // moment thinks january == 0

export function secondsToTimeString(secs) {
  return  new Date(secs * 1000).toISOString().substr(11, 8);
}

export const inTimeRange = (dateTime, hours) => {
  const now = moment()
  return now.diff(dateTime, 'hours') <= hours
}

export const formatDate = (date, format = 'DD-MM-YYYY') => {
  return moment(date).format(format)
}

export function timeStringToMin(time = "00:00") {
  if(!_.isString(time)) {
    return 0;
  } 
  var spT = time.split(":")
  var time1 = spT[0]
  var time2 = spT[1]
  return Number(time1) * 60 + Number(time2)
}

export function minToTimeString(mins, abs = false) {
  if(!utils.isPresent(mins)) return 'n/a'
  mins = Math.round(mins);
  let prefix = ""
  if(abs) {
    if(mins < 0) prefix = "-";
    mins = Math.abs(mins)
  }
  if(mins < 0) { mins = 0 }
  var mod = mins % 60
  var hr;
  if (mod > 0) {
    hr = (mins - mod) / 60
    if(hr < 10) {
      hr = `0${hr}`
    }
     if (mod < 10) {
      mod = `0${mod}`
    }
    return `${prefix}${hr}:${mod}`
  } else {
      mod = mins / 60
      if (mod < 10) {
        mod = `0${mod}`
      }
      return `${prefix}${mod}:00`
    }
  }
