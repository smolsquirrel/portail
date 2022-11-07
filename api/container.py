import numpy as np


class Container:
    def __init__(self, name, weight=1):
        self.name = name
        self.weight = weight
        self.contents = []
        self.weights = []
        self.average_weights = []
        self.grades = []
        self.averages = []
        self.absent = False

    def set_weight(self, weight):
        self.weight = weight

    def add(self, x):
        self.contents.append(x)
        if not x.absent:
            self.grades.append(x.get_grade())
            self.weights.append(x.weight)
        self.average_weights.append(x.weight)
        self.averages.append(x.get_average())

    def _calculate(self, grades):
        if len(grades) == 0:
            return 0
        return np.average(grades, weights=self.weights)

    def get_grade(self):
        return self._calculate(self.grades)

    def get_average(self):
        return self._calculate(self.averages)

    def to_dict(self):
        data = {
            "name": self.name,
            "weight": self.weight,
            "user": self.get_grade(),
            "class": self.get_average(),
            "contents": list(map(lambda x: x.to_dict(), self.contents)),
        }
        return data

    def __repr__(self):
        return f"{self.name}, {self.weight}"
