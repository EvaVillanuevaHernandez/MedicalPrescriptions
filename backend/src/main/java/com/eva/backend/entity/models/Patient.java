package com.eva.backend.entity.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="patient")
public class Patient implements Serializable {

	private static final long serialVersionUID =1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;	
	private String dni;	
	private String name;	
	private String surname;
	private String secondSurname;
	private String history;
	private String nameImg;
	private String typeImg;
	
	@Column(name="image",unique = false,length=100000)
	private byte[] image;
	
	@JsonIgnore
	@OneToMany(mappedBy="patient")
	private List<Prescription> prescriptions;

	@ManyToOne
	private Doctor doctor;

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public List<Prescription> getPrescriptions() {
		return prescriptions;
	}

	public void setPrescriptions(List<Prescription> prescriptions) {
		this.prescriptions = prescriptions;
	}

	public String getDni() {
		return this.dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
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

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public String getNameImg() {
		return nameImg;
	}

	public void setNameImg(String nameImg) {
		this.nameImg = nameImg;
	}

	public String getTypeImg() {
		return typeImg;
	}

	public void setTypeImg(String typeImg) {
		this.typeImg = typeImg;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
}
