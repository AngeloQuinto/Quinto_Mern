import { useEffect, useState } from 'react'
import axios from "axios";


function App() {
  const [student, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null)

  const fetchStud = () =>{
    axios
    .get("http://localhost:5000/students")
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
      axios.put(`${"http://localhost:5000/students"}/${editId}`, studData).then(() =>{
        fetchStud();
        resetForm();
      })
    }else {
      axios.post("http://localhost:5000/students", studData).then(()=> {
        fetchStud();
        resetForm();
      })
    }
  }

  const handleEdit = (student) => {
    setEditId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  }

  const handleDelete = (id) => {
    axios.delete(`${"http://localhost:5000/students"}/${id}`).then(() => {
      fetchStud();
    })
  }

  useEffect(() => {
    fetchStud();
  });

  return (
    <>
      <div>
        <h1>Student Management System</h1>
        
        <h2>Add Student</h2>

          <div>
            <label>Name: </label>
            <input type="text" value={name} 
            onChange={(e) => setName(e.target.value)} required/>
          </div>

          <div>
            <label>Course: </label>
            <input type="text" value={course}
            onChange={(e) => setCourse(e.target.value)} required/>
          </div>

          <div>
            <label>Age: </label>
            <input type="number" value={age}
            onChange={(e) => setAge(e.target.value)} required/>
          </div>

          <button  onClick={handleSubmit}>
            {editId ? "Update Student" : "Add Student"}
          </button>

        <h2>List of Students:</h2>

        {student.map((student) => (
          <div key={student._id}>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick={() => handleEdit(student)}>Edit</button>
            <br/>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
            <hr/>
            <br/>
          </div>
        ))}

      </div>
    </>
  )
}

export default App
