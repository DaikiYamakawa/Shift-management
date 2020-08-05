const API_allSkills = "http://localhost:3000/skill-lists";

export default {
  getSkills() {
    return fetch(API_allSkills).then((response) => response.json());
  },
};
