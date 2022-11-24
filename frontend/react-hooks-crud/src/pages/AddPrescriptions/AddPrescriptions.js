// import React, { useState } from "react";
// import Header from "../components/Header/Header";
// import PrescriptionsDataService from "../services/PrescriptionsService";

// const AddPrescriptions = () => {
//   const initialPrescriptionsState = {
//     id: null,
//     patientName: "",
//     doctorName: "",
//     medicine: "",
//     posology:""
//   };
//   const [prescriptions, setPrescriptions] = useState(initialPrescriptionsState);
//   const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = event => {
//     const { patientname, value } = event.target;
//     setPrescriptions({ ...prescriptions, [patientname]: value });
//   };

//   const savePrescriptions = () => {
//     var data = {
//         patientName: prescriptions.patientName,
//         doctorName: prescriptions.doctorName,
//         medicine: prescriptions.medicine,
//         posology: prescriptions.posology
//     };

//     PrescriptionsDataService.create(data)
//       .then(response => {
//         setPrescriptions({
//           id: response.data.id,
//           patientName: response.data.patientName,
//           doctorName: response.data.doctorName,
//           medicine: response.data.medicine,
//           posology: response.data.posology
//         });
//         setSubmitted(true);
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   const newPrescriptions = () => {
//     setPrescriptions(initialPrescriptionsState);
//     setSubmitted(false);
//   };

//   return (
//     <>
//     <Header/>
//     <div className="submit-form">
//     {submitted ? (
//       <div>
//         <h4>You submitted successfully!</h4>
//         <button className="btn btn-success" onClick={newPrescriptions}>
//           Add
//         </button>
//       </div>
//     ) : (
//       <div>
//         <div className="form-group">
//           <label htmlFor="patientName">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="patientName"
//             required
//             value={prescriptions.patientName}
//             onChange={handleInputChange}
//             name="patienName"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="doctorName">Doctor</label>
//           <input
//             type="text"
//             className="form-control"
//             id="doctorName"
//             required
//             value={prescriptions.doctorName}
//             onChange={handleInputChange}
//             name="doctorName"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="date">Date</label>
//           <input
//             type="text"
//             className="form-control"
//             id="date"
//             required
//             value={prescriptions.date}
//             onChange={handleInputChange}
//             name="date"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="posology">Posology</label>
//           <input
//             type="text"
//             className="form-control"
//             id="posology"
//             required
//             value={prescriptions.doctorName}
//             onChange={handleInputChange}
//             name="posology"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="medicine">Medicine</label>
//           <input
//             type="text"
//             className="form-control"
//             id="medicine"
//             required
//             value={prescriptions.medicine}
//             onChange={handleInputChange}
//             name="medicine"
//           />
//         </div>

//         <button onClick={savePrescriptions} className="btn btn-success">
//           Submit
//         </button>
//       </div>
//     )}
//   </div>
//   </>
//   );
// };

// export default AddPrescriptions;