const operations = document.querySelectorAll(".calculate")
operations.forEach(element => {
  element.addEventListener("click", onCalculate)
})

const binaryDict = "01"
const hexDict = "0123456789ABCDEF"

const resultEl = document.getElementById("result")

function getDict(base) {
  switch (base) {
    case 2 : return binaryDict
    case 16 : return hexDict
    default: return ""
  }
}

function onCalculate (e) {
  const base = document.getElementsByName("base")[0].value
  const numb1 = document.getElementById("numb1").value
  const numb2 = document.getElementById("numb2").value
  const operation = e.target.id

  const baseNumber = {
    "dec": 10,
    "hex": 16,
    "bin": 2,
  }

  const calculation = calculate(numb1, numb2, operation, baseNumber[base])
  console.log({calculation})
  const html = `<div>${calculation.message}</div>
  <ul>
    <li>Binary: ${calculation.result.binary} </li>
    <li>Hex: ${calculation.result.hex} </li>
    <li>Decimal: ${calculation.result.decimal} </li>
  </ul>`
  resultEl.innerHTML = html
}

function calculate(numb1, numb2, op, base) {
  const firstNumber = base !== 10 ? numbBaseToDec(numb1, base) : parseInt(numb1)
  const secondNumber = base !== 10 ? numbBaseToDec(numb2, base) : parseInt(numb2)
  let decResult = 0
  let message = ""
  if (op === "add") {
    decResult = firstNumber + secondNumber
    message = `${numb1} + ${numb2} = ${decToBase(decResult, base)}`
  } else if (op === "substract") {
    decResult = firstNumber - secondNumber
    message = `${numb1} - ${numb2} = ${decToBase(decResult, base) || 0}`
  } else if (op === "multiply") {
    decResult = firstNumber * secondNumber
    message = `${numb1} * ${numb2} = ${decToBase(decResult, base)}`
  } else if (op === "divide") {
    decResult = firstNumber / secondNumber
    message = `${numb1} / ${numb2} = ${decToBase(decResult, base)}`
  }

  const result = {
    binary: decToBase(decResult, 2),
    hex: decToBase(decResult, 16),
    decimal: decResult
  }

  return { message, result }
}

function decToBase (dec, base) {
  const dict = getDict(base)

  if (base === 10) {
    return dec
  } else {
    if (dec < 0) return "negative number"
    if (dec === 0) return dict.indexOf(0)
    if (Number(dec) === dec && dec % 1 !== 0) return "fraction"
  }
  

  let decimal = dec
  let leftOverList = []
  while(decimal > 0) {
    const leftOver = decimal % base
    leftOverList.push(leftOver)
    decimal = Math.floor(decimal / base) 
  }

  const converted = leftOverList.map(x => dict.charAt(x))
  return converted.reverse().join("")
}

function numbBaseToDec(str, base) {
  if (base === 10) return str

  const numbLength = str.length
  const dict = getDict(base)

  if (numbLength > 0) {
    let sum = 0
    for (let i = 0; i < numbLength; i++) {
      const char = str.charAt(numbLength - (i + 1) )
      const hexVal = dict.indexOf(char.toUpperCase())
      sum += hexVal * Math.pow(base, i)
    }

    return sum
  }
  return 0
}