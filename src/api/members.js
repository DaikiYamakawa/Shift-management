const API_URL = "http://localhost:3000/part-time-job-lists";

export default {
  getMembers() {
    return fetch(API_URL).then((response) => response.json());
  },
};
