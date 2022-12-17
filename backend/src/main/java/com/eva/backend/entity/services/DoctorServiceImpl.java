package com.eva.backend.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eva.backend.entity.dao.IDoctorDao;
import com.eva.backend.entity.models.Doctor;

@Service
public class DoctorServiceImpl implements IDoctorService{

	@Autowired
	private IDoctorDao doctorDao;


	@Override
	public Doctor get (int id) {
		return doctorDao.findById(id).get();
	}

	@Override
	public List<Doctor> getAll() {
		return (List<Doctor>)doctorDao.findAll();

	}

	@Override
	public void post(Doctor doctor) {
		doctorDao.save(doctor);

	}

	@Override
	public void put(Doctor doctor, int id) {
		doctorDao.findById(id).ifPresent((x)->{
			doctor.setId(id);
			doctorDao.save(doctor);
		});

	}

	@Override
	public void delete(int id) {
		doctorDao.deleteById(id);

	}


}

