import React, { useState } from "react"
import userData from "../../constants/data.json"
import { setUser } from '../../redux/form.action'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

function Login({saveUserDataFn}) {
    const[inputData, setInputData] = useState({})
    const[invalidUser, setInValidUser] = useState(false)
    const history = useHistory();

    const userInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let Succesful = true
        userData.users.forEach((element)=>{
            if(element.userName === inputData.userName && element.password === inputData.password){
                alert(`Login Succesful!! Hello ${inputData.userName}`)
                saveUserDataFn(element.userId)
                Succesful = false
            }
        })
        Succesful && setInValidUser(true)
        e.preventDefault()
        if(!Succesful) history.push('/tasklist')
    }

    return (
        <div className='pageWrapper'>
            <h1 className='loginHeading'>{'Login Here'}</h1>
            <div className='loginBox'>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    {invalidUser && <p className='invalidCred'>{'Invalid Credentials'}</p>}
                    <label htmlFor='userName'>{'UserName'}</label>
                    <input type='text' id='userName' name='userName' onChange={e=>userInput(e)} 
                        value={inputData['userName'] ? inputData['userName'] : ''} required />
                    <label htmlFor='password'>{'Password'}</label>
                    <input type='text' id='password' name='password' onChange={e=>userInput(e)} 
                        value={inputData['password'] ? inputData['password']: ''} required />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserDataFn: (userId) => {
            dispatch(setUser(userId))
        },
    }
}

export default connect(null, mapDispatchToProps)(Login)
