package com.eva.backend.entity.services;


import com.eva.backend.entity.dao.IDoctorDao;
import com.eva.backend.entity.dao.IPrescriptionDao;

import com.eva.backend.entity.models.Prescription;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionServiceImpl implements IPrescriptionService{

@Autowired
private IPrescriptionDao prescriptionDao;

@Autowired
private IDoctorDao doctorDao;

@Override
public Prescription get (int id) {
	return prescriptionDao.findById(id).get();
}

@Override
public List<Prescription> getAll() {
	return (List<Prescription>)prescriptionDao.findAll();
	
}

@Override
public void post(Prescription prescription) {
	prescriptionDao.save(prescription);
	
}

@Override
public void put(Prescription prescription, int id) {
	prescriptionDao.findById(id).ifPresent((x)->{
		prescription.setId(id);
		prescriptionDao.save(prescription);
	});
	
}

@Override
public void delete(int id) {
	prescriptionDao.deleteById(id);
	
}

@Override
public void DtoP(int idDoctor,int idPrescription) {
	prescriptionDao.findById(idPrescription).ifPresent((y)->{
	doctorDao.findById(idDoctor).ifPresent((x)->{
		y.setDoctor(x);
		prescriptionDao.save(y);
	});
	});
}
//FK
/*
@Override
public List<Prescription> findAllFromId(int id) {
	return prescriptionDao.findAllFromId(id);
}*/
}
