import React, { Component } from 'react';

class InputForm extends Component {
    render() {
        return (
            <div className='scoreboard'>
            <img src="https://us.123rf.com/450wm/photoraidz/photoraidz1406/photoraidz140600127/29424064-soccer-field-with-blank-scoreboard.jpg" style={{'visibility': "hidden"}} />
                <div className='player1'>
                    <div>{this.props.tasks[0].name}</div>
                    <div>{this.props.tasks[0].score}</div>
                </div>
                <div className='player2'>
                    <div>{this.props.tasks[1].name}</div>
                    <div>{this.props.tasks[1].score}</div>
                </div>
            </div>
        );
    }
}

export default InputForm;