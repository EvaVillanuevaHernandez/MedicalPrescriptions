package com.eva.backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eva.backend.entity.models.Patient;
import com.eva.backend.entity.services.IPatientService;
import com.eva.backend.tools.ImageUtility;

@RestController	
@CrossOrigin(origins ="*")
public class PatientController {
	
	@Autowired
	IPatientService patientService;
	
	@GetMapping("/patients")
	public List<Patient> getAllPatients(){
		/*List<Patient>db=patientService.getAll();
		db.forEach((x)->{
			byte[] noZip=ImageUtility.decompressImage(x.getImage());
			x.setImage(noZip);
		});*/
		
		//return db;
		return patientService.getAll();
	}
	
	@GetMapping("/patients/{id}")
	public Patient getOne(@PathVariable(value = "id")int id) {
		//final Patient db= patientService.get(id);
		return patientService.get(id);
		/*return Patient.builder()
				.nameImg(db.getNameImg())
				.typeImg(db.getTypeImg())
				.image(ImageUtility.decompressImage(db.getImage()))
				.name(db.getName())
				.surname(db.getSurname())
				.dni(db.getDni())
				.history(db.getHistory())
				.id(db.getId())
				.build();*/
	}
	
	/*@GetMapping("/patients/{name}")
	public Patient findByName(@PathVariable(value = "name") String name) {
		return patientService.get(name);
	}*/

	@PostMapping("/patients")
	public void post(Patient patient/*,@RequestParam("file")MultipartFile image)throws IOException*/){
		/*String randomID =UUID.randomUUID().toString();
		String filename = randomID.concat(randomID+image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf(".")));
		
		patient.setNameImg(filename);
		patient.setTypeImg(image.getContentType());
		patient.setImage(ImageUtility.compressImage(image.getBytes()));*/
		patientService.post(patient);
		
	}
	
	
	@PutMapping("/patients/{id}")
	public void put(Patient patient,@PathVariable(value = "id")int id/*,@RequestParam("file") MultipartFile image)throws IOException*/){
		/*String randomID=UUID.randomUUID().toString();
		String filename = randomID.concat(randomID + (image.getOriginalFilename().lastIndexOf(".")));
		
		patient.setNameImg(filename);
		patient.setTypeImg(image.getContentType());
		patient.setImage(ImageUtility.compressImage(image.getBytes()));*/
		patientService.put(patient, id);
	}
	
	@DeleteMapping("/patients/{id}")
	public void delete(@PathVariable(value="id")int id) {
		patientService.delete(id);
	
	}
	
	@PostMapping("/doctors/{idD}/patients/{idP}")
	public void DtoP(@PathVariable(value="idD") int idD,@PathVariable(value="idP")int idP) {
		patientService.PtoD(idD,idP);
	}
}
