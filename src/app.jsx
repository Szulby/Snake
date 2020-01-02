import React from 'react'
import './main.css'
import snake from './game'
export default class App extends React.Component {
	componentDidMount() {
		snake.game()
	}
	render() {
		return (
			<div className="game-container">
				<canvas
					id="canvas"
					tabIndex="1000"
					ref="canvas"
					width="600"
					height="600"
					onClick={snake.mouse}
					onKeyDown={snake.keyListener}
				></canvas>
			</div>
		)
	}
}
