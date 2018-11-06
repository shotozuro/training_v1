// const tiles = 100;
var tiles = []
var bag = []
var player1 = []
var player2 = []
var player1Point = 0
var player2Point = 0

var board = Array(15).fill({letter: 0}).map(x => Array(15).fill({letter: 0}))
var playerOneTurn = true

var boardEl = document.getElementById("board")
var player1Deck = document.getElementById("player1-deck")
var player2Deck = document.getElementById("player2-deck")

var tempBlock
var tempBlocks = []
var havePutBlocks = []
var totalPoint = 0
let skipCount = 0

// console.log({a, len: a.length})
var letters = [
  {letter: "NULL", point: 0, count: 2},
  {letter: "A", point: 1, count: 19},
  {letter: "N", point: 1, count: 9},
  {letter: "E", point: 1, count: 8},
  {letter: "I", point: 1, count: 8},
  {letter: "U", point: 1, count: 5},
  {letter: "T", point: 1, count: 5},
  {letter: "R", point: 1, count: 4},
  {letter: "O", point: 1, count: 3},
  {letter: "S", point: 1, count: 3},
  
  {letter: "K", point: 2, count: 3},
  {letter: "M", point: 2, count: 3},
  
  {letter: "D", point: 3, count: 4},
  {letter: "G", point: 3, count: 3},
  
  {letter: "L", point: 4, count: 3},
  {letter: "H", point: 4, count: 2},
  {letter: "P", point: 4, count: 2},
  
  {letter: "B", point: 5, count: 4},
  {letter: "Y", point: 5, count: 2},
  {letter: "F", point: 5, count: 1},
  {letter: "V", point: 5, count: 1},
  
  {letter: "C", point: 6, count: 3},
  {letter: "W", point: 6, count: 1},
  {letter: "J", point: 6, count: 1},
  {letter: "Z", point: 6, count: 1},
]

function init () {
  generateBag()
  player1 = generatePlayerTiles('p1')
  player2 = generatePlayerTiles('p2')
  render()
}

function generateBag () {
  for (var i = 0; i < letters.length; i++) {
    var generate = generateTiles(letters[i]) 
    tiles.push(generate)
  }

  bag = tiles.flat()
}

function generatePlayerTiles (player) {
  const playerDeck = []
  const maxTiles = 7
  const jml = player === 'p1' ? Math.abs(player1.length - maxTiles) : Math.abs(player2.length - maxTiles)
  
  for(var i=0; i < jml; i++) {
    var indx = Math.floor(Math.random() * Math.floor(bag.length));
    playerDeck.push(bag[indx]);
    bag.splice(indx, 1);
  }
  return playerDeck
}

function render () {
  boardEl.innerHTML = ""
  tempBlock = {}

  renderPlayerOne()
  renderPlayerTwo()

  for (var i = 0; i < board.length; i++) {
    renderRow(i)
    for (var k = 0; k < board[i].length; k++) {
      renderBlock(i, k)
    }
  }
  // console.log({bag: bag.length})
  document.getElementById("player1-point").innerText = `Player 1 Score: ${player1Point}`
  document.getElementById("player2-point").innerText = `Player 2 Score: ${player2Point}`
}

function detectWord (row1, row2, col1, col2) {
  const detectedWords = []
  let minRow = getArea().minRow
  let maxRow = getArea().maxRow
  let minCol = getArea().minCol
  let maxCol = getArea().maxCol
  
  if (tempBlocks.length > 0) {
    if (row1 != null) {
      minRow = row1
      maxRow = row2
      minCol = col1
      maxCol = col2
    }
    
    // console.log({minRow, maxRow, minCol, maxCol})
    if (maxRow == minRow && maxCol == minCol) {
      const row = parseInt(maxRow)
      const col = parseInt(maxCol)

      if (board[row - 1][col].letter != 0) {
        const selected = board[row - 1][col]
        tempBlocks.push({...selected, row: row - 1, col})
        const word = guessWord(row - 1, row, col, col)
        detectedWords.push(word)
      } if (board[row + 1][col].letter != 0) {
        const selected = board[row + 1][col]
        tempBlocks.push({...selected, row: row + 1, col})
        const word = guessWord(row, row + 1, col, col)
        detectedWords.push(word)
      } if (board[row][col - 1].letter != 0) {  
        const selected = board[row][col - 1]
        tempBlocks.push({...selected, row, col: col - 1})
        const word = guessWord(row, row, col - 1, col)
        detectedWords.push(word)
      } if (board[row][col + 1].letter != 0) {
        const selected = board[row][col + 1]
        tempBlocks.push({...selected, row, col: col + 1})
        const word = guessWord(row, row, col, col + 1)
        detectedWords.push(word)
      }
    } 
    // else if (minRow == maxRow) {
        // const row = parseInt(maxRow)
        //  check every pieces
        // for (var i = 0; i < havePutBlocks.length; i++) {
        //   const col = havePutBlocks[i].col
        //   const row = havePutBlocks[i].col
        //   const word = guessWord(row, row, minCol, col)
        //   detectedWords.push(word)
        //   console.log({col, maxCol, minCol, detectedWords})


          // for (var j = row - 1; j >= 0; j--) {
          //   const col = havePutBlocks[i].col
          //   const word = guessWord(j - 1, row, col, col)
          //   detectedWords.push(word)
            // const selected = board[j][col]
            // if(selected.letter == 0) break;
            // words.push({...selected, row: i, col})
          // }

          // for (var j = row + 1; j < board.length; j++) {
          //   const col = havePutBlocks[i].col
          //   const word = guessWord(j, row, col, col)
          //   detectedWords.push(word)
          // }  
        // }
    // }
    // } else if (minCol == maxCol) {
    //   const col = parseInt(maxCol)

    // }
    else {
      const word = guessWord(minRow, maxRow, minCol, maxCol)
      detectedWords.push(word)
    }
  }
  // console.log(detectedWords)
  return detectedWords
  // console.log({detectedWords})
}

function getArea () {
  const maxCol = tempBlocks
  .map(val => val.col)
  .reduce((a, b) => {
    return Math.max(a,b)
  })
  const minCol = tempBlocks
  .map(val => val.col)
  .reduce((a, b) => {
    return Math.min(a,b)
  })
  const maxRow = tempBlocks
  .map(val => val.row)
  .reduce((a, b) => {
    return Math.max(a,b)
  })
  const minRow = tempBlocks
  .map(val => val.row)
  .reduce((a, b) => {
    return Math.min(a,b)
  })
  return {minRow, maxRow, minCol, maxCol}
}

function guessWord (minRow, maxRow, minCol, maxCol) {
  const words = []

  if (minRow == maxRow && minCol == maxCol) {
    words.push(board[minRow][minCol])
  } else {
    if (minRow == maxRow) {
      const row = Number(maxRow)

      // get before
      for (var i = minCol - 1; i >= 0; i--) {
        const selected = board[row][i]
        if(selected.letter == 0) break;
        tempBlocks.push({...selected, row, col: i})
      }
  
      // get after
      for (var i = maxCol + 1; i < board.length; i++) {
        const selected = board[row][i]
        if(selected.letter == 0) break;
        tempBlocks.push({...selected, row, col: i})
      }
  
      const {minCol: newMinCol, maxCol: newMaxCol} = getArea()
      for(var i = newMinCol; i < newMaxCol + 1; i++) {
        const selected = board[row][i]
        words.push(selected)
      }

    } else if (minCol == maxCol) {
      const guess = []
      const col = Number(maxCol)
      
      // get before
      for (var i = minRow - 1; i >= 0; i--) {
        const selected = board[i][col]
        if(selected.letter == 0) break;
        tempBlocks.push({...selected, row: i, col})
      }
  
      // get after
      for (var i = maxRow + 1; i < board.length; i++) {
        const selected = board[i][col]
        if(selected.letter == 0) break;
        tempBlocks.push({...selected, row: i, col})
      }
  
      const {minRow: newMinRow, maxRow: newMaxRow} = getArea()
  
      for(var i = Number(newMinRow); i < Number(newMaxRow) + 1; i++) {
        const selected = board[i][col]
        words.push(selected)
      }
    }
  }

  return words
}

function removeDuplicates (myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

function getWord () {
  const words = []

  for(var i = 0; i < havePutBlocks.length; i++) {
    const { row, col } = havePutBlocks[i]
    const other = detectWord(row, row, col, col)
    other.map(val => {
      words.push(val)
    })
    // const tempWord = other[0].map(v => v.letter).join("")
    // words.push(other[0])
  }

  const filtered = removeDuplicates(words, 'letter')
  console.log({words, filtered})

  if (filtered && filtered.length > 0) {
    const word = filtered.map(v => {
      const obj = {
        word: v.map(v2 => v2.letter).join(""),
        point: v.map(v => parseInt(v.point))
        .reduce((a,b) => {
          return a + b
        })
      }  
      return obj
    })

    return word
  } else {
    return null
  }
}

function showConfirmation () {
  // const { word, totalPoint } = getWord()
  const detectedWords = getWord()

  const allWords = detectedWords.map(val => val.word).join(", ")
  const allPoints = detectedWords
    .map(val => parseInt(val.point))
    .reduce((a, b) => a + b)
  // console.log({allWords, allPoints})
  
  if (window.confirm(`Your word is "${allWords}" ?`)) {
    totalPoint = allPoints
    endTurn()
  } else {
    cancel()
  }
}

function endTurn () {
  skipCount = 0
  const isPlayerOne = playerOneTurn
  if (tempBlocks.length > 0) {
    if (isPlayerOne) {
      tempBlocks.map(val => {
        player1.splice(val.source, 1)
        return val
      })
      // const { totalPoint } = getWord()
      player1Point += totalPoint
    } else {
      tempBlocks.map(val => {
        player2.splice(val.source, 1)
        return val
      })
      // const { totalPoint } = getWord()
      player2Point += totalPoint
    }
  
    board.map((val1, idx1) => {
      val1.map((val2, idx2) => {
        if (board[idx1][idx2].hasOwnProperty('source')) {
          delete board[idx1][idx2]['source']
        }
      })
    })
    totalPoint = 0
    changePlayer()  
  } else {
    skip()    
  }
}

function cancel () {
  tempBlocks = []
  havePutBlocks = []
  board.map((val1, idx1) => {
    val1.map((val2, idx2) => {
      if (board[idx1][idx2].hasOwnProperty('source')) {
        board[idx1][idx2] = {letter: 0}
      }
    })
  })
  
  render()
}

function skip () {
  if (skipCount > 0) {
    gameOver()
  }
  skipCount++
  cancel()
  changePlayer()
}

function changePlayer () {
  const isPlayerOne = playerOneTurn
  let temp
  if (isPlayerOne) {
    temp = generatePlayerTiles('p1')
    if (temp.length > 0) {
      player1 = player1.concat(temp)
    }
  } else {
    temp = generatePlayerTiles('p2')
    if (temp.length > 0) {
      player2 = player2.concat(temp)
    }
  }
  
  playerOneTurn = !playerOneTurn
  tempBlocks = []
  havePutBlocks = []
  document.getElementById("word").innerText = ""
  document.getElementById("total-point").innerText = ""
  render()
}

function renderRow (a) {
  if (a == 0) {
    const coordDiv = document.createElement("DIV")
    coordDiv.style.display = "flex"
    coordDiv.style.flexDirection = "row"
    for (var i = 0; i < board.length + 1; i++) {
      const colDiv = document.createElement("DIV")
      const colText = document.createTextNode(Number(i))
      colDiv.classList.add("coord")
      colDiv.appendChild(colText)
      coordDiv.appendChild(colDiv)
    }
    boardEl.appendChild(coordDiv)

  }
  var div = document.createElement("DIV")
  div.setAttribute("id", "block-" + a)
  div.classList.add("row")
  boardEl.appendChild(div)
}

function renderPlayerOne () {
  player1Deck.innerHTML = ""
  const arrOfTempIndex = tempBlocks.map(val => parseInt(val.source))
  if (playerOneTurn) {
    for (var i = 0; i < player1.length; i++) {
      var btn = document.createElement("BUTTON")
      var n = document.createTextNode(player1[i].letter)
      if (arrOfTempIndex.indexOf(i) > -1) {
        btn.disabled = true
      }
      btn.addEventListener("click", takePiece)
      btn.setAttribute("id", "player1-block-" + i)
      btn.classList.add("player1-blocks")
      btn.appendChild(n)
      player1Deck.appendChild(btn)
    }
    var pass = document.createElement("BUTTON")
    var p = document.createTextNode("PASS")
    pass.appendChild(p)
    pass.addEventListener("click", skip)
    player1Deck.appendChild(pass)

    var reset = document.createElement("BUTTON")
    var res = document.createTextNode("RESET")
    reset.appendChild(res)
    reset.addEventListener("click", cancel)
    player1Deck.appendChild(reset)

    var end = document.createElement("BUTTON")
    var e = document.createTextNode("END TURN")
    end.appendChild(e)
    end.addEventListener("click", showConfirmation)
    player1Deck.appendChild(end)
  }
}

function renderPlayerTwo () {
  player2Deck.innerHTML = ""
  const arrOfTempIndex = tempBlocks.map(val => parseInt(val.source))
  if (!playerOneTurn) {
    for (var i = 0; i < player2.length; i++) {
      var btn = document.createElement("BUTTON")
      var n = document.createTextNode(player2[i].letter)
      if (arrOfTempIndex.indexOf(i) > -1) {
        btn.disabled = true
      }
      btn.addEventListener("click", takePiece)
      btn.setAttribute("id", "player2-block-" + i)
      btn.classList.add("player2-blocks")
      btn.appendChild(n)
      player2Deck.appendChild(btn)
    }
    var pass = document.createElement("BUTTON")
    var p = document.createTextNode("PASS")
    pass.appendChild(p)
    pass.addEventListener("click", skip)
    player2Deck.appendChild(pass)

    var reset = document.createElement("BUTTON")
    var res = document.createTextNode("RESET")
    reset.appendChild(res)
    reset.addEventListener("click", cancel)
    player2Deck.appendChild(reset)

    var end = document.createElement("BUTTON")
    var e = document.createTextNode("END TURN")
    end.appendChild(e)
    end.addEventListener("click", showConfirmation)
    player2Deck.appendChild(end)
  }
}

function gameOver () {
  if (player1Point > player2Point) {
    alert("Player 1 WIN!")
  } else if (player2Point > player1Point) {
    alert("Player 2 WIN!")
  } else {
    alert("BOTH PLAYERS WIN! :)")
  }
  window.location.reload()
}

function takePiece (e) {
  const id = e.target.id.split("-")
  if (playerOneTurn) {
    const {letter, point} = player1[id[2]]
    tempBlock = {source: id[2], letter, point}
  } else {
    const {letter, point} = player2[id[2]]
    tempBlock = {source: id[2], letter, point}
  }
  
  e.target.style.backgroundColor = 'yellow'
  e.target.disabled = true
}

function putToBoard (e) {
  var id = e.target.id
  var spl = id.split("-")
  if (tempBlock.hasOwnProperty('letter')) {
    if (tempBlock.letter == 'NULL') {
      var bonusLetter = prompt("Please enter your letter", "");
      let txt
      if (bonusLetter == null || bonusLetter == "") {
        txt = "User cancelled the prompt.";
      } else {
        if (bonusLetter.length > 0) {
          const newLetter = bonusLetter[0].toUpperCase()
          board[spl[1]][spl[2]] = {...tempBlock, letter: newLetter}
          tempBlocks.push({...tempBlock, row: spl[1], col: spl[2], letter: newLetter})
          havePutBlocks.push({...tempBlock, row: spl[1], col: spl[2]})
        }
      }      
    } else {
      tempBlocks.push({...tempBlock, row: spl[1], col: spl[2]})
      board[spl[1]][spl[2]] = tempBlock
      havePutBlocks.push({...tempBlock, row: spl[1], col: spl[2]})
    }

    render()
  }

}


function renderBlock (x,y) {
  var btn = document.createElement("BUTTON")
  var text = board[x][y].letter
  var pt = board[x][y].point
  if (y == 0) {
    const rowDiv = document.createElement("DIV")
    const rowText = document.createTextNode(Number(x) + 1)
    rowDiv.classList.add("coord")
    rowDiv.appendChild(rowText)
    document.getElementById("block-" + x).appendChild(rowDiv)
  }
  if (text != 0) {
    var n = document.createTextNode(text)
    var numb = document.createElement("SPAN")
    var num = document.createTextNode(pt)
    btn.appendChild(n)
    numb.appendChild(num)
    numb.classList.add("poin")
    btn.appendChild(numb)
    btn.disabled = true
  }
  if (tempBlocks.length > 0) {
    btn.disabled = true
    const { minRow, maxRow, minCol, maxCol } = getArea()
    if (minRow == maxRow) {
      if (x == minRow && text == 0) btn.disabled = false
    }
    if (minCol == maxCol) {
      if (y == minCol && text == 0) btn.disabled = false
    }
  }

  btn.classList.add("block")
  btn.setAttribute("id", "block-"+x+"-"+y)
  btn.addEventListener("click", putToBoard)
  document.getElementById("block-" + x).appendChild(btn)
}

function generateTiles (data) {
  const {count, letter, point} = data
  var certainTile = []
  for (var i=0; i < count; i++) {
     certainTile.push({letter, point})
  }
  return certainTile
}


init()
