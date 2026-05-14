import axios from "axios";

const Base_Url =
  "https://6a0400872afe8349b4b5c182.mockapi.io";

export const candidateAPI = {

  // GET ALL CANDIDATES
  getCandidates: () =>
    axios.get( Base_Url + "/candidates" ),

  // ADD CANDIDATE
  addCandidate: (data) =>
    axios.post(Base_Url + "/candidates", data),

  // UPDATE CANDIDATE
  updateCandidate: (id, data) =>
    axios.put(Base_Url + "/candidates/" + id, data),

  // DELETE CANDIDATE
  deleteCandidate: (id) =>
    axios.delete( Base_Url + "/candidates/" + id ),
};

export const jobsAPI = {

  // GET ALL JOBS
  getJobs: () =>
    axios.get(Base_Url + "/jobs"),

  // ADD JOB
  addJob: (data) =>
    axios.post(Base_Url + "/jobs",data),

  // UPDATE JOB
  updateJob: (id, data) =>
    axios.put(Base_Url + "/jobs/" + id, data),

  // DELETE JOB
  deleteJob: (id) =>
    axios.delete( Base_Url + "/jobs/" + id ),
};