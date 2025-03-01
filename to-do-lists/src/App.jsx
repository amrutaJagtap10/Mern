import { useState } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import "./global.css";
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  let [state,setState]=useState({
    items:[],
    course:"",
    trainer:"",
    id:uuidv4()
  })

  let handleInput=(e)=>{
    let {name,value}=e.target;
    setState({...state,[name]:value});

  }

  let handleSubmit=(e)=>{
    e.preventDefault();
    //collect all data in one object
    let newItem={
      id: state.id,
      course: state.course,
      trainer: state.trainer
    }

    //spread operator is used for collecting previous data and newItem is used for collecting new data
    let finalItems=[...state.items,newItem]

    setState({
      items:finalItems,//store updated data
      id: uuidv4(),
      course:"",
      trainer:""
    })

  }
  console.log(state);

  let handleDelete=(x)=>{
    //Filter is a array method and it will return a new array
    // item is argument
    let filteredItem=state.items.filter((item)=>item.id != x)
    console.log(filteredItem);
    setState({...state,items:filteredItem});
  }

  let handleUpdate= (y)=>{
    //Filter is a array method and it will return a new array
    //value is argument
    let restItem = state.items.filter((value)=>value.id !=y)
    console.log(restItem);
    let editItem = state.items.find((value)=> value.id == y)
    console.log(editItem);
    setState({
      ...state,
      items:restItem,
      course: editItem.course,
      trainer: editItem.trainer,
    })
  }

  return (
    <>
      {/* <article> tag is used for independent and combined the content */}
      <article>
        <h1>ToDoList</h1>
        <main> 
          {/* <main> tag is used for specify or display the main content of document */}
          <Form course={state.course} trainer={state.trainer} handleChange={handleInput} handleSubmit={handleSubmit}/>
          <TodoList items={state.items} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
        </main>
      </article>
    </>
  )
}

export default App