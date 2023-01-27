package com.eva.backend.entity.services;

import java.util.List;

import com.eva.backend.entity.models.Prescription;
import org.springframework.data.jpa.repository.Query;

public interface IPrescriptionService {
	public Prescription get(int id );
	public List <Prescription> getAll();
	public Prescription post(Prescription prescription);
	public void put(Prescription prescription, int id);
	public void delete (int id);
	
	public void DtoP(int idDoctor, int idPrescription);

	public void PtoP(int idPatient, int idPrescription);

}

