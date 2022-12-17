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
  dataToSend.append("secondSurname", data.secondSurname);
  dataToSend.append("file", data.image);
  dataToSend.append("doctor", data.doctor);
  // dataToSend.append("nameImg", data.nameImg);
  // dataToSend.append("typeImg", data.typeImg);
  return http.post("/patients", dataToSend);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("dni", data.dni);
  dataToSend.append("history", data.history);
  dataToSend.append("name", data.name);
  dataToSend.append("surname", data.surname);
  dataToSend.append("secondSurname", data.secondSurname);
  // dataToSend.append("image", data.image);
  return http.put(`/patients/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/patients/${id}`);
};

const PatientService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default PatientService;