import http from "./http-common";

const getAll = () => {
  return http.get("/prescriptions");
};

const get = id => {
  return http.get(`/prescriptions/${id}`);
};

const create = data => {
  let dataToSend = new FormData();
 console.log("cabra",data.doctor);
  dataToSend.append("patient", data.patient);
  dataToSend.append("doctor", data.doctor);
  dataToSend.append("date", data.date);
  dataToSend.append("medicine", data.medicine);
  dataToSend.append("posology", data.posology);
  return http.post("/prescriptions", dataToSend);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("patient", data.patient);
  dataToSend.append("doctor", data.doctor);
  dataToSend.append("date", data.date);
  dataToSend.append("posology", data.posology);
  dataToSend.append("medicine", data.medicine);
  return http.put(`/prescriptions/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/prescriptions/${id}`);
};

const removeAll = () => {
  return http.delete(`/prescriptions`);
};

const PrescriptionsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default PrescriptionsService;