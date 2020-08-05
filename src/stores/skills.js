import { createSlice } from "@reduxjs/toolkit";
import skillsApi from "../api/allSkills";
import skillSetsApi from "../api/skillSets";

// Sliceを生成する
const slice = createSlice({
  name: "skills",
  initialState: {
    loading: true,
    error: false,
    allSkills: [],
    busySkills: {},
    freeSkills: {},
    selected: 0,
  },
  reducers: {
    fetchAllSkills: (state, action) => {
      state.loading = false;
      state.allSkills = action.payload;
    },
    fetchSkillSets: (state, action) => {
      state.loading = false;
      state.busySkills = { ...action.payload.busy };
      state.freeSkills = { ...action.payload.free };
    },
    fetchFaild: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    addSkill: (state, action) => {
      //全スキルに新規スキル追加
      state.allSkills.push(action.payload);
      // スキルセットに新規スキル追加
      state.busySkills = { ...state.busySkills, [action.payload]: false };
      state.freeSkills = { ...state.freeSkills, [action.payload]: false };
    },
    deleteSkill: (state, action) => {
      const { index, name } = action.payload;

      // 全スキルstateの指定キー削除
      let temp = [...state.allSkills];
      temp.splice(index, 1);
      state.allSkills = temp;

      // スキルセットの指定キー削除
      delete state.busySkills[name];
      delete state.freeSkills[name];
    },
    selectTab: (state, action) => {
      state.selected = action.payload;
    },
    setSkillSet: (state, action) => {
      const { name, checked } = action.payload;
      if (state.selected == 0) {
        console.log(checked);
        state.busySkills = { ...state.busySkills, [name]: checked };
      } else if (state.selected == 1) {
        state.freeSkills = { ...state.freeSkills, [name]: checked };
      }
    },
  },
});

export function fetchSkills() {
  return async (dispatch) => {
    try {
      const response = await skillsApi.getSkills();
      dispatch(slice.actions.fetchAllSkills(response));
    } catch (err) {
      dispatch(slice.actions.fetchFaild(err));
    }
  };
}

export function fetchSkillSets() {
  return async (dispatch) => {
    try {
      const response = await skillSetsApi.getSkillSets();
      dispatch(slice.actions.fetchSkillSets(response));
    } catch (err) {
      dispatch(slice.actions.fetchFaild(err));
    }
  };
}

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { deleteSkill, addSkill, selectTab, setSkillSet } = slice.actions;
