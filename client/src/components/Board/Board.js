import React, {useState, Fragment} from 'react'
import './Board.css'

const Board = () => {

    const [task, setTask] = useState('Create a Task')

    const handleChange = (e) =>{
        setTask(e.target.value)
       console.log(e.target.value);
    }

    return (
        <Fragment>
            <div className="board">
                <div className="container">
                    <div className="task">
                        <form method="POST" className="signup-form">
                            <div className="form-group">                                
                                <input type="text" name="task" className="form-control task-input" onChange={handleChange} value={task}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Board
