import http from "./http-common";

const getAll = () => {
  return http.get("/prescriptions");
};

const get = id => {
  return http.get(`/prescriptions/${id}`);
};

const create = data => {
  let dataToSend = new FormData();
  // dataToSend.append("patientName", data.patientId);
  dataToSend.append("patientName", data.patientName);
  dataToSend.append("doctorName", data.doctorName);
  dataToSend.append("date", data.date);
  dataToSend.append("medicine", data.medicine);
  dataToSend.append("posology", data.posology);
  return http.post("/prescriptions", dataToSend);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("patientName", data.patientName);
  dataToSend.append("doctorName", data.doctorName);
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
// const findByPatientName = patientName => {
//   return http.get(`/prescriptions?patientName=${patientName}`);
// };

const createPrescriptionWithPatient = (prescriptionId, patientId) => {
  let endPoint = `/patients/${patientId}/prescriptions/${prescriptionId}`;
  let dataToSend = new FormData();

  return http.post(endPoint, dataToSend);
}

const PrescriptionsService = {
  createPrescriptionWithPatient,
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default PrescriptionsService;