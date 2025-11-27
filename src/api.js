import axios from "axios";

const API_BASE = "http://localhost:5000";
// const API_BASE = import.meta.env.VITE_API_URL;


export const api = {
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${API_BASE}/candidates/upload`, formData);
  },

  getCandidates: () => axios.get(`${API_BASE}/candidates`),

  getCandidate: (id) => axios.get(`${API_BASE}/candidates/${id}`),

  requestDocuments: (id) =>
    axios.post(`${API_BASE}/candidates/${id}/request-documents`),

  uploadDocuments: (id, pan, aadhaar) => {
    const form = new FormData();
    if (pan) form.append("pan", pan);
    if (aadhaar) form.append("aadhaar", aadhaar);

    return axios.post(`${API_BASE}/candidates/${id}/submit-documents`, form);
  }
};
