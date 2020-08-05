const API_skillSets = "http://localhost:3000/skill-sets";

export default {
  getSkillSets() {
    return fetch(API_skillSets).then((response) => response.json());
  },
};
