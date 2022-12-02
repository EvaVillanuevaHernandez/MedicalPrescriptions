package com.eva.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eva.backend.entity.models.Doctor;
import com.eva.backend.entity.services.IDoctorService;

@RestController	
@CrossOrigin(origins ="*")
public class DoctorController {
	
@Autowired
IDoctorService doctorService;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@GetMapping("/doctors")
public List<Doctor>getAllDoctors(){
	return doctorService.getAll();
}

@PreAuthorize("hasRole('ROLE_ADMIN')")
@GetMapping("/doctors/{id}")
public Doctor getOne(@PathVariable(value = "id")int id){
	return doctorService.get(id);
}

@PreAuthorize("hasRole('ROLE_ADMIN')")
@PostMapping("/doctors")
public void post (Doctor doctor) { 
	doctorService.post(doctor);
}

@PreAuthorize("hasRole('ROLE_ADMIN')")
@PutMapping("/doctors/{id}")
public void put(Doctor doctor,@PathVariable(value="id")int id) {
	doctorService.put(doctor, id);
}

@PreAuthorize("hasRole('ROLE_ADMIN')")
@DeleteMapping("/doctors/{id}")
public void delete(@PathVariable(value="id")int id) {
	doctorService.delete(id);
}

}