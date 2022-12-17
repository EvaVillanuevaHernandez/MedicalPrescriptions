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

import com.eva.backend.entity.models.Prescription;
import com.eva.backend.entity.services.IPrescriptionService;

@RestController	
@CrossOrigin(origins ="*")
public class PrescriptionController {
	
@Autowired
IPrescriptionService prescriptionService;

@GetMapping("/prescriptions")
public List<Prescription> getAllPrescriptions(){
	return prescriptionService.getAll();
}

@GetMapping("/prescriptions/{id}")
public Prescription getOne(@PathVariable(value = "id")int id) {
	return prescriptionService.get(id);
}

@PostMapping("/prescriptions")
public int post(Prescription prescription){
	Prescription p = prescriptionService.post(prescription);
	return p.getId();
}

@PutMapping("/prescriptions/{id}")
public void put(Prescription prescription,@PathVariable(value = "id")int id){
	prescriptionService.put(prescription, id);
}

@DeleteMapping("/prescriptions/{id}")
public void delete(@PathVariable(value="id")int id) {
	prescriptionService.delete(id);
}

}
