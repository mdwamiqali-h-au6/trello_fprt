import React, {useState, useEffect, Fragment} from 'react';
import './TaskPage.css';

const TaskPage = () => {

    const [taskss, setTaskss] = useState([
            {taskName: "To-Do 1",category: "todo"},
            {taskName: "In Progress 1",category: "inProgress"},
            {taskName: "Completed 1",category: "completed"}
    ])

    const onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
    }
    
	const onDragOver = (event) => {
	    event.preventDefault();
	}

	const onDrop = (event, cat) => {
        console.log(event.dataTransfer.getData("taskName"))
	    let taskName = event.dataTransfer.getData("taskName");

	    let newTasks = taskss.filter((task) => {
	        if (task.taskName === taskName) {
                task.taskName = taskName;
	            task.category = cat;
	        }
	        return task;
	    });

	    setTaskss({
            ...taskss,
            newTasks
        });
        console.log(taskss)
    }
    
    let tasks = {
        todo: [],
        inProgress:[],
        completed:[]
    }

    taskss.map((task, index) => {
        tasks[task.category].push(
            <div key={index} 
                onDragStart = {(event) => onDragStart(event, task.taskName)}
                draggable
                className="alert alert-light draggable" 
                role="alert"
            >
                    {`${task.taskName} Demo`}
            </div>
        )
    })

    return (
        
        <Fragment>
            <div className="container-fluid customer-container">
                <div className="todoCus">
                    TO-DO
                    <div className="todolist todo"
                        onDragOver={(event)=>onDragOver(event)}
                        onDrop={(event)=>{onDrop(event, "todo")}}
                    >
                        {tasks.todo}
                    </div>
                </div>

                <div className="in-progress droppable">
                    IN-PROGRESS
                    <div className="todolist inProgress"
                        onDragOver={(event)=>onDragOver(event)}
                        onDrop={(event)=>{onDrop(event, "inProgress")}}
                    >
                        {tasks.inProgress}
                    </div>
                </div>

                <div className="completedCus droppable">
                    COMPLETED
                    <div className="todolist"
                        onDragOver={(event)=>onDragOver(event)}
                        onDrop={(event)=>{onDrop(event, "completed")}}
                    >
                        {tasks.completed}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TaskPage
