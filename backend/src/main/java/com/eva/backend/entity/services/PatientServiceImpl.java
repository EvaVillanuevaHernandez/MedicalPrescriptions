package com.eva.backend.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eva.backend.entity.dao.IDoctorDao;
import com.eva.backend.entity.dao.IPatientDao;
import com.eva.backend.entity.models.Patient;


@Service
public class PatientServiceImpl implements IPatientService {

	@Autowired
	private IPatientDao patientDao;
	
	@Autowired
	private IDoctorDao doctorDao;

	@Override
	public Patient get (int id) {
		return patientDao.findById(id).get();
	}
	@Override
	public List<Patient> getAll() {
		return (List<Patient>)patientDao.findAll();
		
	}

	@Override
	public void post(Patient patient) {
		patientDao.save(patient);
		
	}

	@Override
	public void put(Patient patient, int id) {
		patientDao.findById(id).ifPresent((x)->{
			patient.setId(id);
			patientDao.save(patient);
		});
		
	}

	@Override
	public void delete(int id) {
		patientDao.deleteById(id);
		
	}
	
	@Override
	public void DtoP(int idDoctor, int idPatient) {
		patientDao.findById(idPatient).ifPresent((y)->{
		doctorDao.findById(idDoctor).ifPresent((x)->{
			y.setDoctor(x);
			patientDao.save(y);
		});
	});
}


}
	


