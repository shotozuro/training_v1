
const stationEl = document.getElementById("station")
const statusEl = document.getElementById("status")

const actionBtn = document.querySelectorAll(".btn-action")
actionBtn.forEach(element => {
  element.addEventListener("click", chooseRoute)
});

const btnStartOver = document.getElementById("btnStartOver")
btnStartOver.addEventListener("click", init)

const routes = {
  "city" : {
    name: "City Mall Station",
    A: "west",
    B: "south",
  },
  "west": {
    name: "West Station",
    A: "east",
    B: "central"
  },
  "central": {
    name: "Central Station",
    A: "city",
    B: "midway",
  },
  "midway": {
    name: "Midway Station",
    A: "north",
    B: "railington",
  },
  "north": {
    name: "North Station",
    A: "central",
    B: "suburb"
  },
  "south": {
    name: "South Station",
    A: "city",
    B: "railington"
  },
  "east": {
    name: "East Station",
    A: "west",
    B: "railington",
  },
  "railington": {
    name: "Railington Station",
    A: "city",
    B: "east"
  },
  "suburb": {
    name: "Suburbopolis Station",
    A: null,
    B: null
  }
}

  
let currentStation = ""

function chooseRoute (e) {
  const ids = e.target.id.split("-")
  nextStation = routes[currentStation][ids[1]]
  if (nextStation !== null) {
    currentStation = nextStation
    render()
  }
}

function render () {
  stationEl.innerHTML = `<img src="http://csfieldguide.org.nz/en/interactives/trainsylvania/img/${currentStation}.png" />
    <span id="stationName">${routes[currentStation]["name"]}</span>
  `
  if (currentStation === "suburb") {
    statusEl.innerText = "Anda telah sampai di " + routes[currentStation]["name"]
  }
}

function init () {
  currentStation = "city"
  statusEl.innerText = ""

  render()
}

init()