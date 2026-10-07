import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  
  const [student, setStudents] = useState([]);

  useEffect(() => {

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    })
  })
  return (
    <>
    <div>
      <h1>Student Management System</h1>
      
      <h2>Students</h2>

      <form>
        <div>
          <label>Name: </label>
          <input />
        </div>
        <div>
          <label>Course: </label>
          <input />
        </div>
        <div>
          <label>Age: </label>
          <input />
        </div>

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
