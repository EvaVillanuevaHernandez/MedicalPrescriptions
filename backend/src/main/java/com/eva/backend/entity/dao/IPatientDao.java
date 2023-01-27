package com.eva.backend.entity.dao;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.eva.backend.entity.models.Patient;

import java.util.Optional;

public interface IPatientDao extends CrudRepository<Patient,Integer> {
    @Query(value="SELECT * FROM medicalprescriptions.patient  WHERE  Patient.id=:idP",nativeQuery = true)
    Optional<Patient> findById(int idP);

    @Query(value="SELECT * FROM medicalprescriptions.patient WHERE medicalprescriptions.patient.id=:idP",nativeQuery = true)
    Iterable<Patient> findByIdPatient(int idP);

    @Query(value="SELECT COUNT(history) FROM medicalprescriptions.patient WHERE history=:history",nativeQuery = true)
    Double totalHistory(String history);


}
