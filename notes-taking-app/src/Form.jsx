import { useContext } from "react"
import { TaskContextApi } from "./TaskProvider"

const Form = () => {

  let data = useContext(TaskContextApi)
  // console.log(data);
  let {state, task, setState, addTask}=data;

  // console.log(state);
  let {title, description, category}=state;

  let handleChange=(e)=>{
    let {name,value}=e.target;
    setState({...state,[name]:value})
  }

  let handleSubmit=(e)=>{
    e.preventDefault();
    addTask(title,description,category)
    setState({
      title:"",
      description:"",
      category:""
    })

  }
  console.log(task);


  return (
    <main className="formBlock">
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <label>Title</label>
          <input type="text" name="title" placeholder="Enter title" value={title} onChange={handleChange}/>
        </div>

        <div className="form-content">
          <label>Description</label>
          <textarea name="description" cols="60" rows="10" placeholder="Enter description" value={description} onChange={handleChange}></textarea>
        </div>

        <div className="form-content">
          <label>Category</label>
          <select name="category" value={category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="general" name="category" >General</option>
            <option value="technical" name="category">Technical</option>
            <option value="official" name="category">Official</option>
          </select>
        </div>

        <button>Submit</button>
      </form>
    </main>
  )
}

export default Form

