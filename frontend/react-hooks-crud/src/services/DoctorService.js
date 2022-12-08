import http from "./http-common";

const getAll = () => {
  return http.get("/doctors");
};

const get = id => {
  return http.get(`/doctors/${id}`);
};

const create = data => {
  let dataToSend = new FormData();
  dataToSend.append("collegiateNum", data.collegiateNum);
  dataToSend.append("name", data.name);
  dataToSend.append("surname", data.surname);
  dataToSend.append("secondSurname", data.secondSurname);
  dataToSend.append("dni", data.dni);
  return http.post("/doctors", dataToSend);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("collegiateNum", data.collegiateNum);
  dataToSend.append("name", data.name);
  dataToSend.append("surname", data.surname);
  dataToSend.append("secondSurname", data.secondSurname);
  dataToSend.append("dni", data.dni);
  return http.put(`/doctors/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/doctors/${id}`);
};


const PrescriptionsService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default PrescriptionsService;