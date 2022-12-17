package com.eva.backend.entity.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "doctor")
public class Doctor implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String collegiateNum;
	private String name;
	private String surname;

	private String secondSurname;
	private String dni;

	@JsonIgnore
	@OneToMany(mappedBy="doctor")
	private List<Prescription> prescriptions;

	@JsonIgnore
	@OneToMany(mappedBy="doctor")
	private List<Prescription> patients;

	@OneToOne
	private User user;

	public Doctor(int id, String collegiateNum, String name, String surname,String secondSurname, String dni) {
		super();
		this.id = id;
		this.collegiateNum = collegiateNum;
		this.name = name;
		this.surname = surname;
		this.secondSurname = secondSurname;
		this.dni = dni;
	}

	public Doctor() {
		super();
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCollegiateNum() {
		return collegiateNum;
	}
	public void setCollegiateNum(String collegiateNum) {
		this.collegiateNum = collegiateNum;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getSecondSurname() {
		return secondSurname;
	}
	public void setSecondSurname(String secondSurname) {
		this.secondSurname = secondSurname;
	}

	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}

	//FK
	public List<Prescription> getPrescriptions() {
		return prescriptions;
	}

	public void setPrescriptions(List<Prescription> prescriptions) {
		this.prescriptions = prescriptions;
	}

	public List<Prescription> getPatients() {
		return patients;
	}
	public void setPatients(List<Prescription> patients) {
		this.patients = patients;
	}


}