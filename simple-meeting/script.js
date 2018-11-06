document.getElementById("submit").addEventListener("click", onSubmit)
document.getElementById("find").addEventListener("click", onFind)
const listEl = document.getElementById("list")
let events = []
const monthNames = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"]

function onSubmit (e) {
  const subject = document.getElementById("subject").value
  const location = document.getElementById("location").value
  const from = document.getElementById("from").value
  const to = document.getElementById("to").value
  const timezone = document.getElementById("timezone").value

  const startEvent = saveDateWithTZ(from, timezone)
  const endEvent = saveDateWithTZ(to, timezone)
  
  events.push({
    subject,
    location,
    from: startEvent,
    to: endEvent,
    timezone
  })

  
  console.log(events)
}

function onFind() {
  const tz = document.getElementById("tz").value
  render(tz)
}

function saveDateWithTZ (date, timezone) {
  const formattedDate = moment(new Date(date)).format("YYYY-MM-DD HH:mm")

  return moment.tz(formattedDate, timezone)
}

function convertDate (momentDate, timezone) {
  return momentDate.tz(timezone).format("DD MMMM YYYY HH:mm")
}

function render (tz) {
  listEl.innerHTML = ""
  let html = ""
  for (let i = 0; i < events.length; i++) {
    const { subject, location, from, to } = events[i]
    html += `<div class="content">
      <div>
        <span class="eventName">${subject}</span>
        <span class="eventLoc">(${location})</span>
      </div>
      <div>From: ${convertDate(from, tz)}</div>
      <div>To  : ${convertDate(to, tz)}</div>
      
    </div>`
  }

  listEl.innerHTML = html
}