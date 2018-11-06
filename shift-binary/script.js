function getOperator (firstNumber, secondNumber) {
  let message = ""
  let i = 0
  let isEnd = false
  if (firstNumber <= secondNumber) {
    while (!isEnd) {
      const leftShift = firstNumber << i
      if (leftShift === secondNumber) {
        message = "dikali " + Math.pow(2,i)
        isEnd = true
      } else if (leftShift > secondNumber) {
        message = "-"
        isEnd = true
      }
      i++
    }
  } else {
    while (!isEnd) {
      const rightShift = firstNumber >> i
      // console.log({rightShift, secondNumber})
      if (rightShift === secondNumber) {
        message = "dibagi " + Math.pow(2,i)
        isEnd = true
      } else if (rightShift < secondNumber) {
        message = "-"
        isEnd = true
      }
      i++
    }
  }
  console.log(message)

}