import math

def get_operator(firstNumber, secondNumber):
  i = 0
  isEnd = False

  if firstNumber <= secondNumber:
    while isEnd == False:
      leftShift = firstNumber << i
      if leftShift == secondNumber:
        print("dikali " + math.pow(2,i))
        isEnd = True
      elif leftShift > secondNumber:
        print("-")
        isEnd = True
      i = i + 1

def hello():
  print("Hello world")