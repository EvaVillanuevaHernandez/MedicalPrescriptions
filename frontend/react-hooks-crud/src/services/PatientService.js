import http from "./http-common";

const getAll = () => {
  return http.get("/patients");
};


const get = id => {
  return http.get(`/patients/${id}`);
};

const create = data => {
  let dataToSend = new FormData();
  dataToSend.append("dni", data.dni);
  dataToSend.append("history", data.history);
  dataToSend.append("name", data.name);
  dataToSend.append("surname", data.surname);
  return http.post("/patients", dataToSend);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("dni", data.dni);
  dataToSend.append("history", data.history);
  dataToSend.append("name", data.name);
  dataToSend.append("surname", data.surname);
  return http.put(`/patients/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/patients/${id}`);
};

const removeAll = () => {
  return http.delete(`/patients`);
};
const findByPatientName = patientName => {
  return http.get(`/patients?patientName=${patientName}`);
};

const PatientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByPatientName
};

export default PatientService;