package com.eva.backend.entity.dao;

import org.springframework.data.repository.CrudRepository;

import com.eva.backend.entity.models.Doctor;

public interface IDoctorDao extends CrudRepository< Doctor,Integer> {

}