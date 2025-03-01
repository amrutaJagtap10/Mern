import React, { Fragment } from 'react'

const TodoList = (props) => {
  console.log(props);
  let {items,handleDelete,handleUpdate}=props;
  return (
    <>
      <section className='todo'>
        <h2>Courses</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              items.length>0 && items.map((items)=>{
                return(
                  <Fragment key={items.id}>
                    <tr>
                      <td>{items.id.slice(0,5)}</td>
                      <td>{items.course}</td>
                      <td>{items.trainer}</td>
                      <td>
                        <button onClick={()=>handleUpdate(items.id)}>Update</button>
                        <button  onClick={()=>handleDelete(items.id)}>Delete</button>
                      </td>
                    </tr>
                  </Fragment>
                  
                )
              })
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default TodoList