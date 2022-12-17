package com.eva.backend.entity.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="prescription")
public class Prescription implements Serializable {

private static final long serialVersionUID =1L;
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		
		private String posology;
		
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
		private Date date;
		private String medicine;
		
		@ManyToOne
		private Doctor doctor;
		
		@ManyToOne
		private Patient patient;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getPosology() {
			return posology;
		}

		public void setPosology(String posology) {
			this.posology = posology;
		}

		public Date getDate() {
			return date;
		}

		public void setDate(Date date) {
			this.date = date;
		}

		public String getMedicine() {
			return medicine;
		}

		public void setMedicine(String medicine) {
			this.medicine = medicine;
		}

		public Doctor getDoctor() {
			return doctor;
		}

		public void setDoctor(Doctor doctor) {
			this.doctor = doctor;
		}

		
		public Patient getPatient() {
			return patient;
		}

		public void setPatient(Patient patient) {
			this.patient = patient;
		}

		public Prescription(int id, String posology, Date date, String medicine,
				String doctorId) {
			super();
			this.id = id;
			this.posology = posology;
			this.date = date;
			this.medicine = medicine;
			
			
		}		
		
		public Prescription() {

			super();
		}

		
}


