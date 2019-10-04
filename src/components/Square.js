import React from 'react'

class Square extends React.Component{
    render(){
        return (
            <label 
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </label>
        )
    }
}
export default Square
