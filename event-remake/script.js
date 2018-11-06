document.getElementById("refresh").addEventListener("click", refresh)
document.getElementById("submit-event").addEventListener("click", onAddEvent)

const defaultTimezone = "Asia/Jakarta"
let timezoneLength = 4

let event = null

function init () {
  renderTimezones()
  // refresh()
  setInterval(refresh, 1000)
}

function refresh () {
  renderCurrentTime()
  if (event !== null) {
    renderEventTimezone()
  }
}

function onChangeTimezone () {
  refresh()
}

function renderCurrentTime () {
  const currentTime = moment.tz(moment().format("YYYY-MM-DD HH:mm:ss"), defaultTimezone)
  const timezones = document.querySelectorAll(".timezone-input")

  timezones.forEach((element, index) => {
    const time = getTime(currentTime, element.value)
    document.getElementById(`timezone-${index + 1}-current-date`).innerText = time.format("dddd, DD MMM YYYY")
    document.getElementById(`timezone-${index + 1}-current-time`).innerText = time.format("HH:mm:ss")
  })
}

function getTime (selectedTime, timezone) {
  return selectedTime.tz(timezone)
}

function onAddEvent () {
  document.getElementById("status").innerHTML = ""
  const eventName = document.getElementById("event-name").value
  const eventDate = document.getElementById("event-date").value
  const eventTimezone = document.getElementById("event-timezone").value
  const isValidDate = !isNaN(new Date(eventDate).getTime())
  if (isValidDate) {
    event = {
      name: eventName,
      date: moment.tz(moment(new Date (eventDate)).format("YYYY-MM-DD HH:mm"), eventTimezone),
      tiimezone: eventTimezone
    }
  
    renderEventTimezone()
  } else {
    document.getElementById("status").innerText = "Event date is not valid"
  }
  
}

function renderEventTimezone () {
  const timezones = document.querySelectorAll(".timezone-input")
  timezones.forEach((element, index) => {
    const time = getTime(event.date, element.value)
    document.getElementById(`timezone-${index + 1}-eventdate`).innerText = "Event: " + time.format("DD MMMM YYYY HH:mm")
    // document.getElementById(`timezone-${index + 1}-eventdate`).insertAdjacentHTML("beforeBegin", "<p>Event</p>")
  })
}

function onAddTimezone () {
  const nextTimezoneId = timezoneLength + 1
  timezoneLength = nextTimezoneId
  const box = renderTimezoneBox(nextTimezoneId)
  document.getElementById("add-timezone").insertAdjacentHTML('beforeBegin', box)
  refresh ()
}

function renderTimezones () {
  let html = ""
  for(let i = 0; i < timezoneLength; i++) {
    const index = i + 1
    html += renderTimezoneBox(index)
    if (index === timezoneLength) {
      html += `<div class="plus-box" id="add-timezone" onclick="onAddTimezone()"><img style="width: 100px;" src="plus_PNG30.png" /></div>`
    }
  }

  document.getElementById("timezones").innerHTML = html
}

function renderButtonAdd () {

}

function renderTimezoneBox (index) {
  return `<div class="timezone-box" id="timezone-${index}">
  <div class="timezone-header"><input class="timezone-input" id="timezone-${index}-input" placeholder="Timezone" value="Asia/Jakarta" onblur="onChangeTimezone()" /></div>
  <div class="current-time">
    <p class="time" id="timezone-${index}-current-time"></p>
    <p class="date" id="timezone-${index}-current-date"></p>
  </div>
  <div class="event-time">
  <p id="timezone-${index}-eventdate"></p>
  </div>
</div>`
}

init()