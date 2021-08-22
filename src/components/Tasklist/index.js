import React, { useState, useEffect } from "react"
import usersList from "../../constants/data.json"
import deleteIcon from "../../constants/icons/delete-icon.png"
import arrowIcon from "../../constants/icons/arrow.png"
import { connect } from 'react-redux'

function Tasklist({userId}) {
    const[task, setTask] = useState({})
    const[taskList, setTaskList] = useState([])
    const[editItemIndex, setEditItemIndex] = useState(null)

    useEffect(()=>{
        usersList.users.forEach((element)=>{
            if(element.userId == userId) setTaskList(element.workList)
        })
    },[])

    const userInput = (e) => {
        setTask({
            taskId: taskList.length+1,
            task: e.target.value,
            completed: false
        })
    }

    const handleSubmit = (e) => {
        let list = [...taskList]
        list = list.concat([task])
        setTaskList(list)
        setTask({})
        e.preventDefault()
    }

    const deleteListItem = (i) => {
       let list = [...taskList]
       list.splice(i,1)
       setTaskList(list)
    }

    const reOrderListItem = (i,up) => {
        let list = [...taskList]
        if(list[i].completed == true){
            return null
        }
        if(up && i !==0 && list[i-1].completed !== true ){
            let temp
            temp = list[i-1]
            list[i-1] = list[i]
            list[i]=temp
        }
        if(!up && i !==taskList.length-1 && list[i+1].completed !== true) {
            let temp
            temp = list[i+1]
            list[i+1] = list[i]
            list[i]=temp
        }
        setTaskList(list)
    }

    const editListItem = (e,action) => {
        if(action == 'Edit')
            setEditItemIndex(e.target.value)
        else
            setEditItemIndex(null)
    }

    const editTask = (e) => {
        let list = [...taskList]
        let i = parseInt(e.target.id.split('').pop())
        list[i].task = e.target.value
        setTaskList(list)
        e.preventDefault()
    }

    const taskCompleted = (e) => {
        let list = [...taskList]
        let i = parseInt(e.target.value)
        let element = list[i]
        if(e.target.checked){
            list[i].completed = true
            list.push(element)
            list.splice(i,1)
        }
        else{
            list[i].completed = false
            list.splice(i,1)
            list.unshift(element)
        }
        setTaskList(list)
    }

    return (
        <>
            <h1>{'Checklist Items'}</h1>
            <form id='taskEditorForm' onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor='task'>{'Add Task'}</label>
                <input type='text' id='task' name='task' value={task.task ? task.task : ''} onChange={(e)=>userInput(e)} required/>
                <input type='submit' value='Submit' />
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='widthSmall'>{'Delete'}</th>
                            <th className='widthSmall'>{'Move Up'}</th>
                            <th className='widthSmall'>{'Move Down'}</th>
                            <th>{'List Item'}</th>
                            <th className='widthSmall'>{'Status'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskList.map((eachTask,i)=>{
                                return(
                                    <tr key={i}>
                                        <td className='widthSmall'><button className='deleteButton' value={i} onClick={()=>deleteListItem(i)}><img className='deleteIcon' src={deleteIcon} alt='Delete' tooltip='Delete' /></button></td>
                                <td className='widthSmall'>{!eachTask.completed && <button className='arrowButton' value={i} onClick={()=>reOrderListItem(i,1)}><img className='upArrowIcon' src={arrowIcon} alt='upArrow' tooltip='Move Up' /></button>}</td>
                                <td className='widthSmall'>{!eachTask.completed && <button className='arrowButton' value={i} onClick={()=>reOrderListItem(i,0)}><img className='downArrowIcon' src={arrowIcon} alt='downArrow' tooltip='Move Down' /></button>}</td>
                                        <td>
                                            <button className='editButton' value={i} onClick={(e)=>editListItem(e,editItemIndex == i ? 'Save' : 'Edit')}>{editItemIndex == i ? 'Save' : 'Edit'}</button>
                                            {
                                                editItemIndex == i ?  
                                                <textarea  rows="1" cols="30" id={'task'+i} value={eachTask.task} onChange={(e)=>editTask(e)} required/>
                                                : <p>{eachTask.task}</p>
                                            }
                                        </td>
                                        <td className='widthSmall'><input type='checkbox' value={i} onChange={(e)=>taskCompleted(e)} checked={eachTask.completed} /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
    }
}

export default connect(mapStateToProps)(Tasklist)
