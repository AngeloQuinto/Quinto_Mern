import { useEffect, useState } from 'react'
import axios, { Axios } from "axios";

const API_URL = "http://localhost:5000/students";

function App() {
  const [student, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null)

  const fetchStud = () =>{
    axios
    .get(API_URL)
    .then((response) => {
      setStudents(response.data);
    })
  }

  const resetForm = () =>{
    setName("");
    setCourse("");
    setAge("");
    setEditId(null);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const studData ={name, course, age: Number(age)}

    if(editId) {
      axios.put(`${API_URL}/${editId}`, studData).then(() =>{
        fetchStud();
        resetForm();
      })
    }else {
      axios.post(API_URL, studData).then(()=> {
        fetchStud();
        resetForm();
      })
    }
  }

  useEffect(() => {
    fetchStud();
  }, [])

  return (
    <div>
      <h1>Student Management System</h1>
      
      <h2>Students</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} 
          onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
          <label>Course: </label>
          <input type="text" value={course}
          onChange={(e) => setCourse(e.target.value)}/>
        </div>

        <div>
          <label>Age: </label>
          <input type="number" value={age}
          onChange={(e) => setAge(e.target.value)}/>
        </div>

        <button type='submit' onClick={handleSubmit}>Add Student</button>
      </form>


      {student.map((students) => (
        <div key={students.id}>
          <p>Name: {students.name}</p>
          <p>Course: {students.course}</p>
          <p>Age: {students.age}</p>
          <br></br>
        </div>
      ))}

    </div>
  )
}

export default App
