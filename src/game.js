class snake {
	state = {
		key: '',
		snake: [[300, 300]],
		button: {
			left: 250,
			top: 270,
			width: 100,
			height: 45
		},
		before: [],
		food: false,
		foodLoc: [],
		over: true
	}
	mouse = e => {
		const rect = document.getElementById('canvas').getBoundingClientRect()
		const { left, top, width, height } = this.state.button
		let x = e.clientX - rect.left
		let y = e.clientY - rect.top
		if (x > left && x < left + width && y > top && y < top + height)
			this.state.over = false
	}
	before = snake => {
		this.state.before = [...snake[0]]
	}
	colision = () =>
		this.state.snake.every((item, id) =>
			id > 0 ? item.toString() !== this.state.snake[0].toString() : true
		)
	direction = key => {
		for (let i = this.state.snake.length - 1; i > 0; i--) {
			this.state.snake[i] = [...this.state.snake[i - 1]]
		}
		switch (key) {
			case 'w':
				if (this.state.before[1] !== this.state.snake[0][1] - 20) {
					this.before(this.state.snake)
					this.state.snake[0][1] -= 20
				} else {
					this.before(this.state.snake)
					this.state.snake[0][1] += 20
				}
				break
			case 's':
				if (this.state.before[1] !== this.state.snake[0][1] + 20) {
					this.before(this.state.snake)
					this.state.snake[0][1] += 20
				} else {
					this.before(this.state.snake)
					this.state.snake[0][1] -= 20
				}
				break
			case 'a':
				if (this.state.before[0] !== this.state.snake[0][0] - 20) {
					this.before(this.state.snake)
					this.state.snake[0][0] -= 20
				} else {
					this.before(this.state.snake)
					this.state.snake[0][0] += 20
				}
				break
			case 'd':
				if (this.state.before[0] !== this.state.snake[0][0] + 20) {
					this.before(this.state.snake)
					this.state.snake[0][0] += 20
				} else {
					this.before(this.state.snake)
					this.state.snake[0][0] -= 20
				}
				break
			default:
				if (!key) {
					this.before(this.state.snake)
					this.state.snake[0][0] += 20
				}
				break
		}
	}
	draw = (left, top, w, h, color, ctx) => {
		ctx.fillStyle = color
		ctx.fillRect(left, top, w, h)
	}
	keyListener = ({ key }) => {
		if (key == 'w' || key == 's' || key == 'a' || key == 'd') {
			this.state.key = key
		}
	}
	over = snake => {
		if (
			snake[0][0] < 0 ||
			snake[0][0] > 600 ||
			snake[0][1] < 0 ||
			snake[0][1] > 600 ||
			!this.colision()
		) {
			this.state.snake.length = 1
			this.state.snake[0] = [300, 300]
			this.state.over = true
		}
	}
	food = () => {
		if (!this.state.food) {
			this.state.food = true
			this.state.foodLoc[0] = Math.ceil(Math.random() * 30) * 20
			this.state.foodLoc[1] = Math.ceil(Math.random() * 30) * 20
		} else {
			if (
				this.state.snake[0][0] === this.state.foodLoc[0] &&
				this.state.snake[0][1] === this.state.foodLoc[1]
			) {
				this.state.food = false
				this.state.snake.length == 1
					? this.state.snake.push([...this.state.before])
					: this.state.snake.push([
							...this.state.snake[this.state.snake.length - 1]
					  ])
			}
		}
	}
	game = () => {
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')
		const h = canvas.height
		const w = canvas.width

		setInterval(() => {
			this.direction(this.state.key)
			this.over(this.state.snake)
			this.draw(0, 0, w, h, 'grey', ctx)
			this.food()
			if (!this.state.over) {
				if (this.state.food) {
					this.draw(
						this.state.foodLoc[0],
						this.state.foodLoc[1],
						20,
						20,
						'red',
						ctx
					)
				}
				for (let i of this.state.snake) {
					this.draw(i[0], i[1], 20, 20, 'black', ctx)
				}
			} else {
				const { left, top, width, height } = this.state.button
				ctx.font = '70px Arial'
				ctx.fillStyle = 'black'
				ctx.fillText('SNAKE', 180, 180)
				ctx.strokeRect(left, top, width, height)
				ctx.font = '20px Arial'
				ctx.fillText('START', 265, 300)
			}
		}, 200)
	}
}
export default new snake()
