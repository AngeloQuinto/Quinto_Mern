import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  const [student, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const fetchStud = () =>{
    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      console.log(response.data);
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const studData ={name, course, age: Number(age)}

    fetchStud();
  }

  useEffect(() => {
    fetchStud();
  }, [])
  return (
    <>
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

      {student.map((student) => (
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
        </div>
      ))}

    </div>
    </>
  )
}

export default App
