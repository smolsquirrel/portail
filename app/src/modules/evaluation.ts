class Evaluation {
	name: string
	weight: number
	score: [number, number]
	average: [number, number]

	constructor(cells: any[]) {
		this.name = ""
		this.weight = 0
		this.score = [0, 0]
		this.average = [0, 0]
	}

	getScore(score: string): [number, number] {
		const regex = /(\d+,\d+?)(?:\s\/\s)(\d+)/
		const r = regex.exec(score)
		return [parseFloat(r![1].replace(",", ".")), parseFloat(r![2])]
	}

	getGrade(): number {
		return (this.score[0] / this.score[1]) * 100
	}

	getAverage(): number {
		return (this.average[0] / this.average[1]) * 100
	}

	json(): Object {
		const data = {
			name: this.name,
			weight: this.weight,
			user: {
				score: `${this.score[0]}/${this.score[1]}`,
				grade: this.getGrade(),
			},
			class: {
				score: `${this.average[0]}/${this.average[1]}`,
				grade: this.getAverage(),
			},
		}
		return data
	}
}
export default Evaluation
