const rowNames = ['A','B','C','D','E','F','G','H','I','J'];
const colNames = Array(10).fill(0).map((x, idx) => idx)
const boardEl = document.getElementById("board")
const shipData = {
  carrier: { size: 5 },
  battleship: { size: 4 },
  destroyer: { size: 3 },
  submarine: { size: 3 },
  patrol: { size: 2 },
}

let playerOneShip = []
let playerTwoShip = []
let playerTurn = 'p1'
let status

let tempShip = {}

let playerOneBoard = []
let playerTwoBoard = []

function updateBoard () {
  playerOneBoard = rowNames.map(x => Array(10).fill({name: "water"}))
  playerTwoBoard = rowNames.map(x => Array(10).fill({name: "water"}))
}
// add listener
const renderBoard = () => {
  boardEl.innerHTML = ""
  for (var i = 0; i < rowNames.length; i++) {
    renderRow(i)
    for (var j = 0; j < colNames.length; j++) {
      renderBox(i, j)
    }
  }
}

const renderRow = (row) => {
  if (row == 0) {
    const coordDiv = document.createElement("DIV")
    coordDiv.style.display = "flex"
    coordDiv.style.flexDirection = "row"
    for (var i = 0; i < colNames.length + 1; i++) {
      const colDiv = document.createElement("DIV")
      const colText = document.createTextNode(Number(i))
      colDiv.classList.add("coord")
      colDiv.appendChild(colText)
      coordDiv.appendChild(colDiv)
    }
    boardEl.appendChild(coordDiv)

  }

  var div = document.createElement("DIV")
  div.setAttribute("id", "box-" + row)
  div.classList.add("row")
  boardEl.appendChild(div)
}

const renderBox = (row, col) => {
  if (col == 0) {
    const rowDiv = document.createElement("DIV")
    const rowText = document.createTextNode(rowNames[row])
    rowDiv.classList.add("coord")
    rowDiv.appendChild(rowText)
    document.getElementById("box-" + row).appendChild(rowDiv)
  }
  const rowOfBoxes = document.getElementById("box-" + row)
  const box = document.createElement("BUTTON")
  let selectedBox
  if (playerTurn == 'p1') {
    selectedBox = playerOneBoard[row][col]
  } else if (playerTurn == 'p2') {
    selectedBox = playerOneBoard[row][col]
  }

  if (selectedBox.name != "water") {
    box.classList.add("ship")
    box.classList.add(selectedBox.name)
  }
  box.classList.add("box")
  box.setAttribute("id", "box-"+row+"-"+col)
  box.addEventListener("click", clickOnBox)
  rowOfBoxes.appendChild(box)
}

function onAddShip (e) {
  const direction = document.getElementsByName("direction")[0].value
  const id = e.target.id
  tempShip = {}
  changeStatus(id)
  const startCoord = prompt("Enter start coordinate for ship")
  if (startCoord) {
    var regCol = /[0-9]+/
    var regRow = /[a-zA-Z]+/
    const detectedNumber = startCoord.match(regCol)
    const detectedRow = startCoord.match(regRow)

    if (detectedNumber.length > 0) {
      col = parseInt(detectedNumber[0]) - 1
    }

    if (detectedRow.length > 0) {
      row = rowNames.indexOf(detectedRow[0].toUpperCase())
    }
    if (col > -1 && row > -1) {
      // if (isShipValid({row,}))
      addShip({row, col}, {})
    }
    tempShip = { start : {row, col}}
    // console.log({detectedNumber, col, row})
    console.log({tempShip})
  }
}

function addShip (start, end) {
  // const direction = document.getElementsByName("direction")[0].value
  const { row: rowStart, col: colStart } = start
  const { row: rowEnd, col: colEnd } = end
  const ship = status.split("-")

  // if (playerTurn == 'p1' ) {
  //   playerOneShip.push(ship[0])
  // } else {
  //   playerTwoShip.push(ship[0])
  // }

  if (rowStart == rowEnd) {
    const minCol = Math.min(colStart, colEnd)
    const maxCol = Math.max(colStart, colEnd)
    const shipSize = shipData[ship[1]].size
    // console.log()
    for (var i = minCol; i <= maxCol; i++) {
      if (playerTurn == 'p1' ) {
        playerOneBoard[row][i] = {name: ship[1]}
      } else if (playerTurn == 'p2') {
        playerTwoBoard[row][i] = {name: ship[1]}
      }
    }
  } else if (colStart == colEnd) {
    const minRow = Math.min(rowStart, rowEnd)
    const maxRow = Math.max(rowStart, rowEnd)
    const shipSize = shipData[ship[1]].size
    for (var i = minRow; i <= maxRow; i++) {
      if (playerTurn == 'p1' ) {
        playerOneBoard[i][col] = {name: ship[1]}
      } else if (playerTurn == 'p2') {
        playerTwoBoard[i][col] = {name: ship[1]}
      }
    }
  }


  console.log({playerOneBoard, start, end, shipName: ship[1]})

  changeStatus(null)
  renderBoard()
}

function isShipValid (start, end) {
  if (status) {
    const ship = status.split("-")
    const shipName = ship[1]
    if (start.row == end.row) {
      const minCol = Math.min(start.col, end.col)
      const maxCol = Math.max(start.col, end.col)
      const shipLength = Math.abs(start.col - end.col) + 1
      if (parseInt(shipData[shipName].size) == parseInt(shipLength)) {
        let stat = true
        for (var i = minCol; i <= maxCol; i++) {
          if (playerTurn == 'p1') {
            stat = playerOneBoard[start.row][i].name == "water"
          } else if (playerTurn == 'p2') {
            stat = playerTwoBoard[start.row][i].name == "water"
          }
        }

        if (!stat) alert('Sudah terpakai kapal lain')
        return stat
      } else { return false }
    } else if (start.col == end.col) {
      const minRow = Math.min(start.row, end.row)
      const maxRow = Math.max(start.row, end.row)
      const shipLength = Math.abs(start.row - end.row) + 1
      if (parseInt(shipData[shipName].size) == parseInt(shipLength)) {
        let stat = true
        for (var i = minRow; i <= maxRow; i++) {
          if (playerTurn == 'p1') {
            stat = playerOneBoard[i][start.col].name == "water"
          } else if (playerTurn == 'p2') {
            stat = playerTwoBoard[i][start.col].name == "water"
          }
        }
        if (!stat) alert('Sudah terpakai kapal lain')
        return stat
      } else { return false }
    } else {
      return false
    }
  } else {
    return false  
  }
}

const putStartShip = (row, col) => {
  document.getElementById(`box-${row}-${col}`).style.backgroundColor = "#01a3a4"
  tempShip.start = { row, col }
  changeStatus(`${status}-end`)
}

const putEndShip = (row, col) => {
  if (tempShip.hasOwnProperty("start")) {
    const start = tempShip.start
    const end = {row, col}
    if (isShipValid(start, end)) {
      addShip(start, end)
    } else {
      alert('Your ship is not valid!')
    }
  }
}

const hit = () => {
  console.log('attack!!')
}

const clickOnBox = (e) => {
  const id = e.target.id
  const coord = id.split("-");
  switch (status) {
    case 'add-carrier':
    case 'add-battleship':
    case 'add-destroyer':
    case 'add-submarine':
    case 'add-patrol':
      putStartShip(coord[1], coord[2]);
      break;
    case 'add-carrier-end':
    case 'add-battleship-end':
    case 'add-destroyer-end':
    case 'add-submarine-end':
    case 'add-patrol-end':
      putEndShip(coord[1], coord[2]);
      break;
    default:
      hit()
      break;
  }
}

function changeStatus (str) {
  status = str
}

const addShipButtons = document.querySelectorAll(".add-ship")
for (var i = 0; i < addShipButtons.length; i++) {
  addShipButtons[i].addEventListener("click", onAddShip)
}

function init () {
  updateBoard()
  renderBoard()
}

init()
