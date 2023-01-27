package com.eva.backend.entity.services;

import java.util.List;
import java.util.Optional;

import com.eva.backend.entity.models.Patient;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import javax.validation.constraints.NotNull;

public interface IPatientService {
	
	public Patient get(int id );
	//public Patient get(String name );
	public List <Patient> getAll();
	public void post(Patient patient);
	public void put(Patient patient, int id);
	public void delete (int id);


	 ResponseEntity<Resource> exportReport(int idP, String history);
}