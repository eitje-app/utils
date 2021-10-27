import moment from 'moment'
import _ from 'lodash'
import utils from './index'

export const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const formats = ['DD-MM-YYYY', 'YYYY-MM-DD']

export const likeDate = (val) => {
  const mmt = moment(val, formats, true) // without strict any number is valid..
  return !_.isNaN(mmt.hour())
}

export const getDate = (hours = 0) => {
  const date = new Date()
  date.setHours(hours, 0, 0, 0)
  return date
}

export const makeHourDate = (mins) => {
  const str = minToTimeString(mins)
  const [hours, minutes] = str.split(':')
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

export const getWeekDatesFromDate = (date) => {
  const d = moment(date)
  const week = d.isoWeek()
  const year = d.isoWeekYear()
  return getWholeWeekArray(week, year)
}

export const getWholeWeekArray = function (week, year) {
  var datesArr = []
  let dagen = days()
  _(7).times((n) => {
    datesArr.push(getDateFromWeek(n + 1, week, year).format('YYYY-MM-DD'))
  })
  return datesArr
}

export const getWholeWeekString = function (week, year) {
  var datesArr = []
  let dagen = days()
  _(7).times((n) => {
    datesArr.push({date: getDateFromWeek(n + 1, week, year).format('YYYY-MM-DD')})
  })
  return datesArr
}

export const minSince = (start) => {
  return moment().endOf('day').diff(moment(start), 'm')
}

export function daysPassed(date) {
  return moment().endOf('day').diff(moment(date).endOf('day'), 'days')
}

export function daysUntill(date) {
  return -daysPassed(date)
}

export function yearsPassed(date, comparison) {
  return moment(comparison).endOf('day').diff(moment(date).endOf('day'), 'years')
}

export function yearsUntill(date, comparison) {
  return -yearsPassed(date, comparison)
}

export function nextDate(date) {
  const yearDiff = yearsPassed(date) + 1 // we want next date
  return moment(date).add(yearDiff, 'years').format('YYYY-MM-DD')
}

export function humanDate(date) {
  return moment(date).format('dddd DD MMM')
}

export function humanYearDate(date) {
  return moment(date).format('DD MMM YYYY')
}

export function fullHumanYearDate(date) {
  return moment(date).format('DD MMMM YYYY')
}

export function fullHumanDate(date, {dayname = true} = {}) {
  const format = dayname ? "dddd DD MMM 'YY" : "DD MMM 'YY"
  return moment(date).format(format)
}

export function shortDate(date) {
  return moment(date).format('ddd DD MMM')
}

export function shortDateTime(date) {
  return moment(date).format('ddd DD MMM HH:mm')
}

export function dateTime(date) {
  return moment(date).format('DD-MM-YYYY HH:mm')
}

export function getDateFromWeek(day, week, year) {
  let mmt = moment()

  mmt.isoWeekday(day).isoWeek(week)
  mmt.isoWeekYear(year)
  return mmt
}

export function getYearWeekFromDate(date) {
  return {
    week: date.isoWeek(),
    year: date.isoWeekYear(),
  }
}

export function isAfterDate(date, dateTwo = moment()) {
  return getDayDiff(date, dateTwo) >= 0
}

function getDayDiff(date, dateTwo = moment()) {
  date = moment(date)
  dateTwo = moment(dateTwo)
  dateTwo = dateTwo.startOf('day')
  const diff = date.startOf('day').diff(dateTwo, 'd')
  return diff
}

export function today() {
  return moment().format('YYYY-MM-DD')
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
  if (!date2) return date1
  if (!date1) return date2
  if (date1 && date2) return date1 > date2 ? date1 : date2
}

export const getMonthDays = (month, year) => {
  const start = moment([year, month - 1, 1])
  const startOfMonth = start.format('YYYY-MM-DD')
  const endOfMonth = start.endOf('month').format('YYYY-MM-DD')
  return {startOfMonth, endOfMonth}
}

export function minToHourArray(time) {
  // => [3, 40] for 03:40
  const str = _.isString(time) ? time : minToTimeString(time)
  const split = str.split(':')
  const hours = Number(split[0])
  const mins = Number(split[1])
  return [hours, mins]
}

export const timeStringToDate = (val) => {
  const date = new Date()
  const vals = val.split(':')
  date.setHours(vals[0], vals[1], 0, 0)
  return date
}

export const roundTime = (time, amt = 1) => {
  time = moment(time)
  const mod = time.minute() % amt
  if (mod === 0) return time
  const remainder = amt - mod
  time.add(remainder, 'minutes')
  return time
}

export const getYear = (date) => moment(date).year()

export const getMonth = (date) => moment(date).month() + 1 // moment thinks january == 0

export const makeDateObj = (date) => ({month: getMonth(date), year: getYear(date)})

export const getCurrentYear = getYear

export const getCurrentMonth = getMonth

export function secondsToTimeString(secs) {
  return new Date(secs * 1000).toISOString().substr(11, 8)
}

export const inTimeRange = (dateTime, hours) => {
  const now = moment()
  return now.diff(dateTime, 'hours') <= hours
}

export const formatDate = (date, format = 'DD-MM-YYYY') => {
  return moment(date).format(format)
}

export function convertTimeStr(time) {
  var spT = time.split(':')
  var time1 = spT[0]
  var time2 = spT[1]
  return [Number(time1), Number(time2)]
}

export function timeStringToMin(time = '00:00') {
  if (!_.isString(time)) {
    return 0
  }
  const [hours, mins] = convertTimeStr(time)
  return hours * 60 + mins
}

export function minToTimeString(mins, abs = false) {
  if (!utils.isPresent(mins)) return null
  mins = Math.round(mins)
  let prefix = ''
  if (abs) {
    if (mins < 0) prefix = '-'
    mins = Math.abs(mins)
  }
  if (mins < 0) {
    mins = 0
  }
  var mod = mins % 60
  var hr
  if (mod > 0) {
    hr = (mins - mod) / 60
    if (hr < 10) {
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

/// datetime (new methods)

export function buildDateTime({date, time}) {
  const format = 'YYYY-MM-DD HH:mm'
  return moment(`${date} ${time}`, format).format(format) // is this sensible at all?
}
