import Evaluation from "./evaluation"

class Container {
	name: string
	weight: number
	contents: (Container | Evaluation)[]
	weights: number[]
	average_weights: number[]
	constructor(name: string, weight: number = 1) {
		this.name = name
		this.weight = weight
		this.contents = []
		this.weights = []
		this.average_weights = []
	}

	setWeight(weight: number): void {
		this.weight = weight
	}

	add(x: Container | Evaluation): void {
		this.contents.push(x)
		this.weights.push(x.weight)
		this.average_weights.push(x.weight)
	}

	calculate(grades: number[]): number {
		let total = 0
		let total_weight = 0
		if (grades.length == 0) return 0
		for (let i = 0; i < grades.length; i++) {
			total += grades[i] * this.weights[i]
			total_weight += this.weights[i]
		}
		return total / total_weight
	}

	getGrade(): number {
		return this.calculate(this.contents.map((x: Container | Evaluation) => x.getGrade()))
	}

	getAverage(): number {
		return this.calculate(this.contents.map((x: Container | Evaluation) => x.getAverage()))
	}

	json(): Object {
		const data = {
			name: this.name,
			weight: this.weight,
			user: this.getGrade(),
			class: this.getAverage(),
			contents: this.contents.map((x: Container | Evaluation) => x.json()),
		}
		return data
	}
}

export default Container
