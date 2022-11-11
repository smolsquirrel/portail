from container import Container


class MainContainer(Container):
    def _calculate(self, grades):
        if len(grades) == 0:
            return 0
        total_weight = 0
        total_grade = 0
        for (grade, weight) in zip(grades, self.weights):
            if grade != 0:
                total_grade += grade * weight
                total_weight += weight
        if total_weight == 0:
            return 0
        return total_grade / total_weight
