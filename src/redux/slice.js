import { createSlice } from "@reduxjs/toolkit";
const student_slice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    //object containing reducer funcs
    addStudent: (state, action) => {
      //current state & dispatched action obj as parameters
      state.push(action.payload); //pushing new information into current state
    },
    updateStudent: (state, action) => {
      const { roll_no, name, marks } = action.payload; //new information stored in their respective variables
      const student_update = state.find((i) => i.roll_no === roll_no); //store particular student obj based on condition
      if (student_update) {
        student_update.name = name;
        student_update.marks = marks;
      }
    },
    deleteStudent: (state, action) => {
      const roll_no = action.payload;
      const index = state.findIndex((i) => i.roll_no === roll_no);
      if (index != -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addStudent, updateStudent, deleteStudent } =
  student_slice.actions; //addStudent contains all actions in slice
export default student_slice.reducer; //all reducer functions exported

/*createSlice creates an action creator and action type:(addStudent) automatically*/
