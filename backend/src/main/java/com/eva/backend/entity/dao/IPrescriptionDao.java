package com.eva.backend.entity.dao;


import org.springframework.data.repository.CrudRepository;


import com.eva.backend.entity.models.Prescription;

public interface IPrescriptionDao extends CrudRepository<Prescription,Integer>{
/*
	List<Prescription> findAllById(int id);
	
	@Query("select b from Prescription b where b.doctor.id = :id")
	List<Prescription> findAllFromId(@Param("id") int id);*/

}
