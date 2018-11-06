MAX_WEIGHT = 100
MIN_WEIGHT = 10
INCR_WEIGHT = 3
DECR_WEIGHT = 1

class Animal:
    def __init__(self):
        self.type = ""
        self.age = 0
        self.weight = 0
        self.max_weight = 0
        self.decrement_weight = 0
        self.increment_weight = 0
    
    def SetType(self, _type):
        self.type = _type
    
    def SetAge(self, _age):
        self.age = _age
    
    def SetWeight(self, _weight):
        self.weight = _weight
    
    def SetMaxWeight(self, _type):
        if (_type == "rusa"):
            self.max_weight = 75
        elif (_type == "domba" or _type == "kambing"):
            self.max_weight = 70
        else:
            self.max_weight = MAX_WEIGHT

    def SetDecrWeight(self, _type):
        if (_type == "kambing"):
            self.decrement_weight = 2
        else:
            self.decrement_weight = DECR_WEIGHT

    def SetIncrWeight(self, _type):
        if (_type == "domba"):
            self.increment_weight = 2
        else:
            self.increment_weight = INCR_WEIGHT

    def DailyRoutine(self):
        # noon
        if self.weight < self.max_weight:
            self.weight += self.increment_weight
        else:
            self.weight -= self.decrement_weight
        
        if self.weight < MIN_WEIGHT:
            self.weight = MIN_WEIGHT
        
        print("Kondisi " + self.type + " di siang hari --> usia: " + str(self.age) + " -- " + "berat: " + str(self.weight))
        
        # night
        self.weight -= 1
        
        if self.weight < MIN_WEIGHT:
            self.weight = MIN_WEIGHT
        
        print("Kondisi " + self.type + " di malam hari --> usia: " + str(self.age) + " -- " + "berat: " + str(self.weight))
        
        self.age += 1

class Rusa ()


if __name__ == "__main__":
    tmp = raw_input().split()
    numberOfAnimal = int(tmp[0])
    numberOfDay = int(tmp[1])
    
    animals = []
    for i in range(0, numberOfAnimal):
        tmp = raw_input().split()
        animalType = tmp[0]
        animalAge = int(tmp[1])
        animalWeight = int(tmp[2])
        
        tmpAnimal = Animal()
        tmpAnimal.SetType(animalType)
        tmpAnimal.SetAge(animalAge)
        tmpAnimal.SetWeight(animalWeight)

        tmpAnimal.SetMaxWeight(animalType)
        tmpAnimal.SetIncrWeight(animalType)
        tmpAnimal.SetDecrWeight(animalType)

        animals.append(tmpAnimal)
    
    for i in range(0, numberOfDay):
        print("Hari #" + str(i + 1))
        for j in range(0, len(animals)):
            animals[j].DailyRoutine()
