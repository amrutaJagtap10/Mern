import DisplayNotes from './DisplayNotes'
import Form from './Form'
import Navbar from './Navbar'
import TaskProvider from './TaskProvider'
import './global.css'
const App = () => {
  return (
    <>
      <Navbar/>
      <TaskProvider>
        <main className='mainContainer'>
          <Form/>
          <DisplayNotes/>
        </main>
      </TaskProvider>
      
    </>
  )
}

export default App