const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const calendarEl = document.getElementById("calendar")
const monthNameEl = document.getElementById("month-name")
const eventsEl = document.getElementById("events")

let currMonth = null
let currYear = null

let selectedCell = null
let dates = []
let eventList = [] // {date: ..., events: []}

function updateCalendar (y, m) {
  currMonth = m
  currYear = y
}

function onNextMonth () {
  const nextMonth = currMonth === 11 ? 0 : currMonth + 1
  const nextYear = currMonth === 11 ? currYear + 1 : currYear
  updateCalendar(nextYear, nextMonth)
  init(nextYear, nextMonth)
}

function onPrevMonth () {
  const prevMonth = currMonth === 0 ? 11 : currMonth - 1
  const prevYear = currMonth === 0 ? currYear - 1 : currYear
  updateCalendar(prevYear, prevMonth)
  console.log({next: currYear +"-"+ currMonth})
  init(prevYear, prevMonth)
}

function renderCalendar () {
  calendarEl.innerHTML = ""
  eventsEl.style.display = "none"
  let html = ""
  for (let i = 0; i < dates.length; i++) {
    const selectedDate = dates[i]
    const isOutside = selectedDate["isCurrMonth"] ? "" : " outside-month"
    const isAhad = selectedDate["day"] === 0 ? " ahad" : ""
    
    const isAnyEvents = getEvents(`${selectedDate["year"]}-${selectedDate["month"]}-${selectedDate["date"]}`).length
    const event = isAnyEvents > 0 ? " event" : ""
    if (i === 0) {
      html += `<div class="row">`
      for (let j = 0; j < dayNames.length; j++) {
        html += `<div class="cell days">${dayNames[j]}</div>`
      }
      html += `</div>`
    }
    if (i % 7 === 0) {
      html += `<div class="row">`
    }
    html += `<div class="cell"><button class="btn${isOutside}${isAhad}${event}" id="cell-${i}" onClick=onAddEvent(this)>${selectedDate["date"]}</button></div>`
    if ((i + 1) % 7 === 0) {
      html += `</div>`
    }
  }
  monthNameEl.innerText = `${monthNames[currMonth]} - ${currYear}`
  calendarEl.innerHTML = html
}

function init () {
  const today = new Date()
  const year = currYear !== null ? currYear : today.getFullYear()
  const month = currMonth !== null ? currMonth : today.getMonth()

  updateCalendar(year, month)

  const prevDay = getPrevDay(year,month)
  const currDay = getCurrDay(year,month)
  const nextDay = getNextDay(year,month)

  dates = [...prevDay, ...currDay, ...nextDay]
  renderCalendar(dates)
  selectedCell = null
}

function getDetail (y,m,d) {
  const date = new Date(y,m,d)
  return {
    day: date.getDay(),
    month: m,
    year: y,
    date: d,
    isCurrMonth: m === currMonth
  }
}

function getCurrDay (y,m) {
  const countDays = new Date(y, m + 1, 0).getDate()
  return Array(countDays).fill(0).map((x, index) => getDetail(y,m, index + 1))
}

function getPrevDay (y,m) {
  const prevMonthLastDate = new Date(y, m, 0).getDate()
  const firstDay = new Date(y, m, 1).getDay()
  return Array(firstDay).fill(0).map((x, index) => getDetail(y, m-1, prevMonthLastDate - firstDay + index + 1))
}

function getNextDay (y,m) {
  const lastDay = new Date(y, m + 1, 0).getDay()
  const countDays = 6 - lastDay
  return Array(countDays).fill(0).map((x, index) => getDetail(y, m+1, index+1))
}

function getSelectedDate () {
  const id = selectedCell.split("-")[1]

  const selectedDate = dates[id]
  const date = selectedDate.date
  const month = selectedDate.month
  const year = selectedDate.year
  return `${year}-${month}-${date}`
}

function onAddEvent (e) {
  selectedCell = e.id
  eventsEl.style.display = "block"
  renderEventList()
}

function getEvents (date) {
  const filtered = eventList.filter(x => x.date === date)
  if (filtered.length > 0) {
    return filtered[0]["events"]
  } else {
    return []
  }
}

function renderEventList () {
  const date = getSelectedDate()
  const events = getEvents(date)
  let html = ""
  if (events.length > 0) {
    html += "<ul>"
    events.forEach(element => {
      html += `<li>${element}</li>`
    })
    html += "</ul>"
  } else {
    html += "<span>Tidak ada event</span>"
  }
  
  document.getElementById("event-list").innerHTML = html
}

function onSubmitEvent () {
  const subject = document.getElementById("event-subject").value
  const date = getSelectedDate()
  addEvent(date, subject)
  renderEventList()
  document.getElementById("event-subject").value = ""
}

function addEvent (date, subject) {
  const index = eventList.findIndex(x => x.date === date)
  if (index > -1) {
    const selectedEvent = eventList[index]
    eventList[index]["events"] = [...selectedEvent.events, subject]
  } else {
    eventList.push({date, events: [subject]})
  }
}

init()