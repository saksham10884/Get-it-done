import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [complete, setComplete] = useState(0);

  useEffect(() => {
    async function fetchdata(){
      let todosstring =localStorage.getItem("todos")
      if (todosstring) {
        let newtodos =await JSON.parse(localStorage.getItem("todos"))
        setTodos(newtodos)
        let comptodos=await newtodos.filter(item=>{
          return item.is_complete==true
        })
        setComplete(comptodos.length)
      }
    }
    fetchdata()
  }, [])

  const change = (e) => {
    setTodo(e.target.value)
  }
  const add = () => {
    setTodos([...todos,{id:uuidv4(),todo,is_complete:false}])
    setTodo("")
  }
  const done = (e) => {
    let index = todos.findIndex((item) => {
      return item.id == e.target.name
    })
    let newtodos = [...todos]
    newtodos[index].is_complete = !newtodos[index].is_complete
    let comptodos = newtodos.filter(item => {
      return item.is_complete == true
    })
    setComplete(comptodos.length)
    setTodos(newtodos)
  }
  const del = (e) => {
    let newtodos = todos.filter(item => {
      return item.id != e.target.value
    })
    let comptodos = newtodos.filter(item => {
      return item.is_complete == true
    })
    setComplete(comptodos.length)
    setTodos(newtodos)
  }
  const edittodo = (e) => {
    setTodo(todos.filter(i => i.id == e.target.value)[0].todo)

    let newtodos = todos.filter(item => {
      return item.id != e.target.value
    })
    let comptodos = newtodos.filter(item => {
      return item.is_complete == true
    })
    setComplete(comptodos.length)
    setTodos(newtodos)
  }
  const save=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  return (
    <>
      <div className="container">
        <div className="addtodo">
          <h3>Add Todo</h3>
          <input type="text" value={todo} placeholder="New Todo" onChange={change} />
          <button onClick={add}>Add</button>
          <button onClick={save}>Save</button>
        </div>
        <div className="todos">
          <div className="tasks">
            <h3>Your Todos</h3>
            <div className="todolist">
              {todos.length == 0 && <div>No todos</div>}
              {todos.map(item => {
                return <div className="todo" key={item.id}>
                  <div className="check">
                    <input type="checkbox" defaultChecked={item.is_complete} onClick={done} name={item.id} id="checkbox" />
                    {item.todo}
                  </div>
                  <div className="buttons">
                    <button onClick={del} value={item.id}>Delete</button>
                    <button onClick={edittodo} value={item.id}>Edit</button>
                  </div>
                </div>
              })}
            </div>
          </div>
          <div className="progressor">
            <h3>Progess</h3>
            <div className="data">
              <div id="total">Total Tasks:{todos.length}</div>
              <div id="completed">Completed:{complete}</div>
              <div id="pending">Pending:{todos.length - complete}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
