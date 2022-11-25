package com.eva.backend.entity.dao;


import org.springframework.data.repository.CrudRepository;

import com.eva.backend.entity.models.Patient;

public interface IPatientDao extends CrudRepository<Patient,Integer> {

	

}
