import React, { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
//Named export
export const TaskContextApi = createContext();

//!to get the data from localStorage
  let getNotes = ()=>{
    let Noteslists =localStorage.getItem("lists");
    //if lists exists any data then escecute if block
    if(Noteslists){
      //? Json.parse()--->return data in object
      return JSON.parse(Noteslists)
    }else{
      return []
    }
  }

const TaskProvider = (props) => {

  let [task,setTask] = useState(getNotes());

  const addTask =(title,description,category)=>{
    setTask([...task,{title,description,category,id:uuidv4()}])
  }

  let [state, setState]=useState({
    title:"",
    description:"",
    category:"",
  })

  //! To add task into localStorage
  //? json.stringify() used for convert data in string

  useEffect(()=>{
    localStorage.setItem("lists",JSON.stringify(task))
  },[task])

  let [selective,setSelective] = useState({
    selectedCategory : "all"
  })

  let handleCategory=(e)=>{
    let {name,value} = e.target;
    setSelective({[name]:value})
    setTask(task)
  }

  let handleDelete=(id)=>{
    let filteredItem = task.filter(item=>item.id != id)
    setTask(filteredItem);
  }

  let handleUpdate=(id)=>{
    let restItem = task.filter(item=>item.id != id)
    console.log("rest..", restItem);
    let editItem = task.find((item)=>item.id==id)
    console.log("edit..",editItem);
    setTask(restItem);
    setState(editItem)
  }

  return (
    <TaskContextApi.Provider value={{state,setState,addTask,task,selective,handleCategory,handleDelete,handleUpdate}}>
      {props.children}
    </TaskContextApi.Provider>
  )
}

export default TaskProvider