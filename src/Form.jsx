import {addStudent, updateStudent, deleteStudent} from "./redux/slice.js"
import { useSelector, useDispatch } from "react-redux"
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const Form = () => {
  const[roll_no,set_roll_no]=useState('');
  const[name, set_name]=useState('');
  const[marks,set_marks]=useState('');
  const[edit,set_edit]=useState(false) //variable to determine edit mode is enabled or disabled
  const dispatch=useDispatch();
  const students=useSelector((state)=>state.students); //selector function that takes entire store state as argument and returns a slice of state

  const handle_submit=(e)=>{
    e.preventDefault(); //to prevent reloading of form
    const details={roll_no,name,marks}
    dispatch(addStudent(details)); //dispatches addStudent action to store with roll_no and name as payload
    set_roll_no(''); //value is reset
    set_name('');
    set_marks('');
  }

  const handle_change=(e)=>{
    const {name,value}=e.target
    if(name==="roll_no") set_roll_no(value)
    if(name==="name") set_name(value)
    if(name==="marks") set_marks(value)
  }

  const handle_edit=(i)=>{
      set_edit(true)
      set_roll_no(i.roll_no);
      set_name(i.name);
      set_marks(i.marks);
    }   
  
  const handle_update=()=>{
    const details={roll_no,name,marks}
    dispatch(updateStudent(details));
    set_edit(false)
    set_roll_no(''); //value is reset
    set_name('');
    set_marks('');
  }

  const handle_delete=(roll_no)=>{
    dispatch(deleteStudent(roll_no));
  }
  
  return (
    <div>
        <form onSubmit={handle_submit}>
          <label>Roll No:</label>
          <input type="text" name="roll_no" placeholder="Roll Number" value={roll_no} onChange={handle_change} required/><br></br>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={handle_change} required/><br></br>
          <label>Marks:</label>
          <input type="text" name="marks" placeholder="Marks" value={marks} onChange={handle_change} required/><br></br>
          {edit==false && <button type="submit" value="Submit" style={{height:"30px",margin:"10px"}}>Submit</button>}
          {edit==true && <button value="Update" style={{height:"30px",margin:"10px"}} onClick={handle_update}>Update</button>}
        </form>
    {/*Displaying students data*/}
    <div>
        
        {students.map((student) => (
          <div class="container mt-6"><br></br><br></br>
          <div className="row justify-content-center">
            <div className="col-4">
            <table className="table table-striped table-bordered custom-border custom-width">
            <thead>
            <tr><th colSpan="2" ><center>Report Card</center></th></tr></thead>
            <tbody>
            <tr><td >Roll No</td><td > {student.roll_no}</td></tr>
            <tr><td>Name</td><td>{student.name}</td></tr>
            <tr><td>Marks</td><td>{student.marks}</td></tr>
            <tr>
            <td>Grade</td>
            <td>
            {student.marks>=400 && "A"}
            {student.marks<=400 && student.marks>=300 && "B"}
            {student.marks<=300 && student.marks>=200  && "C"}
            {student.marks<=200  && student.marks>=100 && "D"}
            {student.marks<100 && "E"}
            </td></tr>
            </tbody>
            </table>
            <div className="link">
            <a href="#" onClick={()=>handle_edit(student)}> <FontAwesomeIcon icon={faEdit} />Edit</a>
            <a href="#" onClick={()=>handle_delete(student.roll_no)}> <FontAwesomeIcon icon={faTrashAlt} />Delete</a>
            </div>
            </div>
          </div>
          </div>
        ))}
    </div>
    </div>
  )
}

export default Form