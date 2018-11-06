const asciiDB = {
  "31": "",      "32": " ",     "33": "!",     "34": "\"",    "35": "#",    
  "36": "$",     "37": "%",     "38": "&",     "39": "'",     "40": "(",    
  "41": ")",     "42": "*",     "43": "+",     "44": ",",     "45": "-",    
  "46": ".",     "47": "/",     "48": "0",     "49": "1",     "50": "2",    
  "51": "3",     "52": "4",     "53": "5",     "54": "6",     "55": "7",    
  "56": "8",     "57": "9",     "58": ":",     "59": ";",     "60": "<",    
  "61": "=",     "62": ">",     "63": "?",     "64": "@",     "65": "A",    
  "66": "B",     "67": "C",     "68": "D",     "69": "E",     "70": "F",    
  "71": "G",     "72": "H",     "73": "I",     "74": "J",     "75": "K",    
  "76": "L",     "77": "M",     "78": "N",     "79": "O",     "80": "P",    
  "81": "Q",     "82": "R",     "83": "S",     "84": "T",     "85": "U",    
  "86": "V",     "87": "W",     "88": "X",     "89": "Y",     "90": "Z",    
  "91": "[",     "92": "\\",    "93": "]",     "94": "^",     "95": "_",    
  "96": "`",     "97": "a",     "98": "b",     "99": "c",     "100": "d",    
  "101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",    
  "106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
  "111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",    
  "116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
  "121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",    
  "126": "~",    "127": ""
  }

document.getElementById("submit").addEventListener("click", submitText)

function submitText () {
  const text = document.getElementById("text").value
  const convertedText = convertText(text)
  
  document.getElementById("result").innerText = text + " = " + convertedText.join(" ")
}

function convertText (text) {
  let converted = []
  for (let i = 0; i < text.length; i++) {
    const selectedChar = text.charAt(i)
    const bin = getBinaryFromChar(selectedChar)
    converted.push(bin)
  }
  return converted
}

function getBinaryFromChar (char) {
  const db = getASCIIDatabse(asciiDB)
  return decToBinary(db[char])
}

function getASCIIDatabse(obj){
  let newASCIIDB = {}
  
  Object.keys(obj).map(key => {
    newASCIIDB[obj[key]] = key
  })

  return newASCIIDB
}

function decToBinary (dec) {
  const dict = "01"
  if (dec === 0) return dict.indexOf(0)
  
  let decimal = dec
  let leftOverList = []
  while(decimal > 0) {
    const leftOver = decimal % 2
    leftOverList.push(leftOver)
    decimal = Math.floor(decimal / 2) 
  }

  const converted = leftOverList.map(x => dict.charAt(x))
  return converted.reverse().join("")
}


// function check () {
//   const text = document.getElementById("text").value
//   const converted = convertText(text)
//   const converted2 = convertText2(text)
//   return converted.join("") === converted2.join("")
// }

// function convertText2 (text) {
//   let conv = []
//   for (let i = 0; i < text.length; i++) {
//     const dec = text.charCodeAt(i)
//     const bin = decToBinary(dec)
//     conv.push(bin)
//   }

//   return conv
// }