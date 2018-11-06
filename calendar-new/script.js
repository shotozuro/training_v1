const monthNames = ["January", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const dayNames = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

let currYear = null
let currMonth = null
let selectedCell = null
let dates = []

const calendarEl = document.getElementById("calendar")
const monthSelector = document.getElementById("months")
const yearSelector = document.getElementById("years")
const eventEl = document.getElementById("event-section")
const eventListEl = document.getElementById("event-list")

document.getElementById("submit-event").addEventListener("click", onSubmitEvent)
document.getElementById("prev").addEventListener("click", onPrev)
document.getElementById("next").addEventListener("click", onNext)
yearSelector.addEventListener("change", onChangeMonthYear)
monthSelector.addEventListener("change", onChangeMonthYear)


let events = []

function updateCal (y, m) {
  currYear = parseInt(y)
  currMonth = parseInt(m)
}

function onPrev () {
  const prevMonth = currMonth === 0 ? 11 : currMonth - 1
  const prevYear = currMonth === 0 ? currYear - 1 : currYear
  updateCal(prevYear, prevMonth)

  init()
}

function onNext () {
  const nextMonth = currMonth === 11 ? 0 : currMonth + 1
  const nextYear = currMonth === 11 ? currYear + 1 : currYear
  updateCal(nextYear, nextMonth)

  init()
}

function onChangeMonthYear () {
  const selectedYear = yearSelector.value
  const selectedMonth = monthSelector.value

  updateCal(selectedYear, selectedMonth)
  console.log(selectedYear, selectedMonth)
  init()
}

function init () {
  renderNavigation()
  const year = currYear === null ? new Date().getFullYear() : currYear
  const month = currMonth === null ? new Date().getMonth() : currMonth
  
  updateCal(year, month)
  getDays(year, month)

  monthSelector.value = month
  yearSelector.value = year.toString()

}

function getDays (y, m) {
  const firstDay = new Date(y, m, 1).getDay()
  const lastDay = new Date(y, m + 1, 0).getDay()
  const lastDate = new Date(y, m + 1, 0).getDate()

  const manyDays = firstDay + lastDate + (6 - lastDay)
  dates = Array(manyDays).fill(0).map((x, index) => getDayDetail(y, m, index + 1 - firstDay))
  renderCalendar()
}

function getDayDetail (y,m,d) {
  const date = new Date(y,m,d)
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    date: date.getDate(),
    isCurrMonth: date.getMonth() === currMonth
  }
}

function renderCalendar () {
  calendarEl.innerHTML = ""
  let html = ""
  for (let i = 0; i < dates.length; i++) {
    const selectedDate = dates[i]
    const outside = selectedDate.isCurrMonth ? "" : " outside"
    const ahad = selectedDate.day === 0 ? " ahad" : ""
    const eventsInHere = getEvents("cell-" + i)
    const selected = "cell-" + i === selectedCell ? " selected" : ""
    if (i === 0) {
      html += `<div class="row">`
      for (let j = 0; j < dayNames.length; j++) {
        html += `<div class="cell day">${dayNames[j]}</div>`
      }
      html += `</div>`
    }

    if (i % 7 === 0) {
      html += `<div class="row">`
    }
    html += `<div class="cell"><button class="date${outside}${ahad}" onclick="onAddEvent(this)" id="cell-${i}"><div class="${selected}">${selectedDate["date"]}</div>`
    if (eventsInHere.length > 0) {
      html += `<div class="event-in-here">`
      eventsInHere.forEach((element, index) => {
        if (index < 4) {
          html += `<span>${element}</span>`
        }
      })
      html += `</div>`
    }
    html += `</button></div>`
    if ((i + 1) % 7 === 0) {
      html += `</div>`
    }
  }

  // document.getElementById("month-name").innerText = monthNames[currMonth]
  calendarEl.innerHTML = html
}


function onAddEvent (e) {
  const cellBefore = selectedCell
  if (cellBefore !== null) {
    document.getElementById(cellBefore).classList.remove("selected")
  }

  selectedCell = e.id
  eventEl.style.display = "block"
  document.getElementById(selectedCell).classList.add("selected")
  renderEvents()
}

function renderEvents () {
  const eventsOnSelectedDate = getEvents(selectedCell)
  if (eventsOnSelectedDate.length > 0) {
    let html = `<ul>`
    eventsOnSelectedDate.forEach(element => {
      html += `<li>${element}</li>`
    })
    html += `</ul>`
    eventListEl.innerHTML = html
  } else {
    eventListEl.innerText = "Tidak ada event"
  }
}

function getEvents (cell) {
  const cellId = cell.split("-")[1]
  const date = `${dates[cellId].year}-${dates[cellId].month}-${dates[cellId].date}`
  const index = events.findIndex(x => x.date === date)
  if (index < 0) {
    return []
  } else {
    return events[index]["events"]
  }
}

function onSubmitEvent () {
  const cellId = selectedCell.split("-")[1]
  const date = `${dates[cellId].year}-${dates[cellId].month}-${dates[cellId].date}`
  const eventName = document.getElementById("event-text").value
  addEvent(date, eventName)
  renderEvents()
  renderCalendar()
  document.getElementById("event-text").value = ""
}

function addEvent (date, eventName) {
  const index = events.findIndex(x => x.date === date)
  if (index < 0) {
    events.push({date, events: [eventName]})
  } else {
    events[index].events = [...events[index].events, eventName]
  }
}

function renderNavigation () {
  let html = ""
  monthNames.forEach((element, index) => {
    html += `<option value=${index}>${element}</option>`
  })
  monthSelector.innerHTML = html
  
  let yearHtml = ""
  for (let i = 0; i < 11; i++) {
    const year = parseInt(new Date().getFullYear()) - 5 + i

    yearHtml += `<option value=${year}>${year}</option>`
  }
  yearSelector.innerHTML = yearHtml
}


init()