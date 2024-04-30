import re


class Evaluation:
    def __init__(self, cells):
        self.absent = False
        self.name = cells[2].text.strip()
        self.weight = int(cells[3].text)
        self.score = self.get_score(cells[7].text)
        self.average = self.get_score(cells[7].text)

    def get_score(self, score):
        r = re.match(r"(\d+(,\d+)?)(?:\s\/\s)(\d+)", score)
        if not r:
            self.absent = True
            return (score, score)
        return (float(re.sub(",", ".", r.group(1))), float(r.group(3)))

    def get_grade(self):
        if self.absent:
            return "AS"
        return (self.score[0] / self.score[1]) * 100

    def get_average(self):
        return (self.average[0] / self.average[1]) * 100

    def to_dict(self):
        data = {
            "name": self.name,
            "weight": self.weight,
            "user": {
                "score": f"{self.score[0]}/{self.score[1]}",
                "grade": self.get_grade(),
            },
            "class": {
                "score": f"{self.average[0]}/{self.average[1]}",
                # "grade": self.get_average(),
            },
        }
        return data

    def __repr__(self):
        return f"{self.name}, {self.weight}, {self.score}, {self.average}"
