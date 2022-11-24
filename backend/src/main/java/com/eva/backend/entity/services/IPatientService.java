package com.eva.backend.entity.services;

import java.util.List;

import com.eva.backend.entity.models.Patient;

public interface IPatientService {
	public Patient get(int id );
	public List <Patient> getAll();
	public void post(Patient patient);
	public void put(Patient patient, int id);
	public void delete (int id);
	public void PtoD(int idD, int idP);
}