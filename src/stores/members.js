import { createSlice } from "@reduxjs/toolkit";
import membersApi from "../api/members";

// Sliceを生成する
const slice = createSlice({
  name: "members",
  initialState: {
    loading: true,
    error: false,
    members: [],
    selected: 0,
  },
  reducers: {
    fetchSucceed: (state, action) => {
      state.loading = false;
      state.members = action.payload;
    },
    fetchFaild: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    selectPerson: (state, action) => {
      state.selected = action.payload;
    },
    setSkills: (state, action) => {
      const { name, checked } = action.payload;
      state.members[state.selected].skill[name] = checked;
    },
    addPerson: (state, action) => {
      state.members.push(action.payload);
    },
    deletePerson: (state, action) => {
      console.log(action.payload);
      let temp = [...state.members];
      temp.splice(action.payload, 1);
      state.members = temp;
    },
    deletePersonSkill: (state, action) => {
      const label = action.payload;
      console.log(state.members);

      state.members.map((item, index) => {
        console.log(item.name);
        console.log(index);
        delete state.members[index].skill[label];
      });
    },
    addPersonSkill: (state, action) => {
      const label = action.payload;
      console.log(state.members);

      state.members.map((item, index) => {
        state.members[index].skill = { ...state.members[index].skill, [label]: false };
      });
    },
  },
});

export function fetchMembers() {
  return async (dispatch) => {
    try {
      const response = await membersApi.getMembers();
      dispatch(slice.actions.fetchSucceed(response));
    } catch (err) {
      dispatch(slice.actions.fetchFaild(err));
    }
  };
}

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { selectPerson, setSkills, addPerson, deletePerson, deletePersonSkill, addPersonSkill } = slice.actions;
