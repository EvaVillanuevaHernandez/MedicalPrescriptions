package com.eva.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eva.backend.entity.models.Patient;
import com.eva.backend.entity.services.IPatientService;

@RestController	
@CrossOrigin(origins ="*")
public class PatientController {
	
	@Autowired
	IPatientService patientService;
	
	@GetMapping("/patients")
	public List<Patient> getAllPatients(){
		return patientService.getAll();
	}
	
	@GetMapping("/patients/{id}")
	public Patient getOne(@PathVariable(value = "id")int id) {
		return patientService.get(id);
	}

	@PostMapping("/patients")
	public void post(Patient patient){
		patientService.post(patient);	
	}
	
	
	@PutMapping("/patients/{id}")
	public void put(Patient patient,@PathVariable(value = "id")int id){
		patientService.put(patient, id);
	}
	
	@DeleteMapping("/patients/{id}")
	public void delete(@PathVariable(value="id")int id) {
		patientService.delete(id);
	
	}
	
	@PostMapping("/doctors/{idD}/patients/{idP}")
	public void DtoP(@PathVariable(value="idD") int idD,@PathVariable(value="idP")int idP) {
		patientService.PtoD(idD,idP);
	}
}
