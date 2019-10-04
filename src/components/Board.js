import React from 'react'
import Square from './Square'

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    componentDidUpdate(){
        let squares = this.state.squares
        let winner = this.calculateWinner(squares)
        
        if(!this.state.xIsNext && !this.state.win){
            setTimeout(() => {
                for(let i = 0; i < squares.length; i++){
                    if(!squares[i] && !winner){
                        squares[i] = 'O'
                        this.setState({
                            squares: squares,
                            xIsNext: true
                        })
                        return
                    }
                }
            }, 3000)
        }
    }

    calculateWinner(squares){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i = 0; i < lines.length; i ++){
            const [a, b, c] = lines[i]
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a]
            }
        }
        return null
    }

    handleClick(i){
        const squares = this.state.squares.slice()

        if(this.calculateWinner(squares) || squares[i] || !this.state.xIsNext){
            return
        }

        squares[i] = 'X'
        this.setState({ 
            squares: squares, 
            xIsNext: false
        })
    }

    resetGame(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
        })
    }

    renderSquare(i){
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} 
            />
        )
    }

    render(){
        let winner = this.calculateWinner(this.state.squares)

        let status
        if(winner){
            status = 'Winner:' + (winner === 'X' ? ' You' : ' Computer')
        }else{
            status = 'Next Player: ' + (this.state.xIsNext ? 'You' : 'Computer')
        }

        return (
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>{status}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.renderSquare(0)}</td>
                            <td>{this.renderSquare(1)}</td>
                            <td>{this.renderSquare(2)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSquare(3)}</td>
                            <td>{this.renderSquare(4)}</td>
                            <td>{this.renderSquare(5)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSquare(6)}</td>
                            <td>{this.renderSquare(7)}</td>
                            <td>{this.renderSquare(8)}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan={3}>
                                <button onClick={() => {this.resetGame()}}>Reset Game</button>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
export default Board
