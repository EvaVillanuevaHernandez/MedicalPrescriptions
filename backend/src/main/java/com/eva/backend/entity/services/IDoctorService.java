package com.eva.backend.entity.services;

import java.util.List;

import com.eva.backend.entity.models.Doctor;

public interface IDoctorService {
	
	public Doctor get (int id);
	public List <Doctor>getAll();
	public void post(Doctor doctor);
	public void put(Doctor doctor,int id);
	public void delete(int id);
	
	}