import React from 'react'

const Form = (props) => {
  // console.log(props);
  // eslint-disable-next-line react/prop-types
  let {course,trainer,handleChange,handleSubmit} = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Course </label>
          <input type="text" placeholder='Enter Course' name='course' value={course} onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label>Trainer </label>
          <input type="text" placeholder='Enter Trainer' name='trainer' value={trainer} onChange={handleChange}/>
        </div>

        <div className='form-group'>
          <button>Submit</button>
        </div>

      </form>
    </>
  )
}

export default Form