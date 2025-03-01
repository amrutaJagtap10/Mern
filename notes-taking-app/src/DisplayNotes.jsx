import React, { useContext } from 'react'
import { TaskContextApi } from './TaskProvider'

const DisplayNotes = () => {

  let {task,selective,handleCategory,handleDelete,handleUpdate} = useContext(TaskContextApi)
  // console.log(selective);
  let {selectedCategory}=selective;

  return (
    <main className="displaySection">
      <section className="selectedNotes">
        <div className="selectDisplayBlock" value={selectedCategory} onChange={handleCategory}>
          <label>Select the Category</label>
          <input type="radio" name='selectedCategory' value="all" defaultChecked={true}/> <span>All</span>
          <input type="radio" name='selectedCategory' value="general" /> <span>General</span>
          <input type="radio" name='selectedCategory' value="technical" /> <span>Technical</span>
          <input type="radio" name='selectedCategory' value="official" /> <span>Official</span>
        </div>

        <main className="displayBlock">
          <div className="displayContent">
            {
              task.length == 0 ? "Loading...." : task.map((value)=>{
                return selectedCategory==="all" ? (
                  <div className="output" key={value.id}>
                    <h1>Title: {value.title}</h1>
                    <p>Description: {value.description}</p>
                    <p>Category: {value.category}</p>
                    {/* Whenever you want to pass any argument n react it will be pass with arrow function */}
                    <button onClick={()=>handleDelete(value.id)}>Delete</button>
                    <button onClick={()=>handleUpdate(value.id)}>Update</button>
                  </div>
                ) : (
                  selectedCategory == value.category && (
                    <div className="output" key={value.id}>
                      <h1>Title: {value.title}</h1>
                      <p>Description: {value.description}</p>
                      <p>Category: {value.category}</p>
                      <button onClick={()=>handleDelete(value.id)}>Delete</button>
                      <button onClick={()=>handleUpdate(value.id)}>Update</button>
                    </div>
                  )
                )
              })
            }
          </div>
        </main>
      </section>
    </main>
  )
}

export default DisplayNotes