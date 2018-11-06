document.getElementById("refresh").addEventListener("click", refresh)
document.getElementById("submitEvent").addEventListener("click", addEvent)

let event = null
let currDate = null
const defaultTimezone = "Asia/Jakarta"

function refresh () {
  const timezones = document.querySelectorAll(".input-timezone")
  currDate = moment.tz(new Date(), defaultTimezone)
  renderCurrentTime(timezones)
  if (event !== null) {
    renderEvent(event)
  }
  
}

function renderCurrentTime (timezones) {
  timezones.forEach(element => {
    const id = `${element.id}-text`
    document.getElementById(id).innerText = getTime(currDate, element.value).format("HH:mm")
  })
}

function getTime (selectedDate, timezone) {
  return selectedDate.tz(timezone || defaultTimezone)
}

function addEvent () {
  const eventName = document.getElementById("event-name").value
  const eventDate = document.getElementById("event-date").value
  const eventTimezone = document.getElementById("event-timezone").value
  
  const isValidDate = !isNaN(new Date(eventDate).getTime())
  
  if (isValidDate) {
    event = {
      name: eventName,
      date: moment.tz(moment(new Date(eventDate)).format("YYYY-MM-DD HH:mm"), eventTimezone),
      timezone: eventTimezone
    }
    renderEvent(event)
  } else {
    document.getElementById("detailEvent").innerText = "Date is not valid"
  }
  
}

function renderEvent (event) {
  const timezones = document.querySelectorAll(".input-timezone")
  let html = `${event.name} ${event.date.format('DD MMMM YYYY HH:mm')} ${event.timezone}`
  document.getElementById("detailEvent").innerHTML = html

  timezones.forEach(element => {
    const id = `${element.id}-countdown`
    const startEvent = getTime(currDate.tz(event.timezone), element.value)
    const endEvent = getTime(event.date, event.timezone)
    const countdown = getCountdown(startEvent, endEvent)

    const end = getTime(event.date, element.value)
    document.getElementById(id).innerText = end.format("HH:mm") + " " + countdown
  })
  
}

function getCountdown (startTime, endTime) {
  const duration = moment.duration(endTime.diff(startTime)).asHours()
  const fixedDuration = Math.floor(duration)
  if (fixedDuration === 0) {
    return "Less than 1 hour"
  } else if (fixedDuration === 1) {
    return "An hour more"
  } else if (fixedDuration > 1) {
    return fixedDuration + " hours more"
  } else {
    return "You have missed the event"
  }
}

function init () {
  const timezoneQty = 4
  let html = ""
  for (let i = 0; i < timezoneQty; i++) {
    const index = i + 1
    html += `<div class="timezone-section">
      <input class="input-timezone" placeholder="timezone" value="${defaultTimezone}" type="text" id="timezone-${index}" />
      <div class="time" id="timezone-${index}-text"></div>
      <div class="countdown-time" id="timezone-${index}-countdown"></div>
    </div>`
  }
  document.getElementById("time").innerHTML = html
  
  currDate = moment.tz(new Date(), defaultTimezone)
  const timezones = document.querySelectorAll(".input-timezone")
  renderCurrentTime(timezones)
}

init()