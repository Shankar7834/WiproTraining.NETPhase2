import React from 'react'

export default function TaskCard(props) {
    return (

        <li key={props.task.id} className={props.task.completed ? "completed" : "incomplete"}>


            <span>{props.task.id} -- {props.task.name}</span>
            <button className='delete' onClick={() => props.handleDelete(props.task.id)} >Delete</button>
        </li>

    )
}
