package com.eva.backend.entity.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.*;


import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eva.backend.entity.dao.IDoctorDao;
import com.eva.backend.entity.dao.IPatientDao;
import com.eva.backend.entity.models.Patient;
import org.springframework.util.ResourceUtils;

import javax.validation.constraints.NotNull;


@Service
public class PatientServiceImpl implements IPatientService {

    @Autowired
    private IPatientDao patientDao;

    @Autowired
    private IDoctorDao doctorDao;

    @Override
    public Patient get(int id) {
        return patientDao.findById(id).get();
    }

    @Override
    public List<Patient> getAll() {
        return (List<Patient>) patientDao.findAll();

    }

    @Override
    public void post(Patient patient) {
        patientDao.save(patient);

    }

    @Override
    public void put(Patient patient, int id) {
        patientDao.findById(id).ifPresent((x) -> {
            patient.setId(id);
            if (patient.getImage() == null) {
                patient.setImage(x.getImage());
                patient.setNameImg(x.getNameImg());
                patient.setTypeImg(x.getTypeImg());
            }
            if (patient.getDoctor() == null) {
                patient.setDoctor(x.getDoctor());
            }
            patientDao.save(patient);
        });

    }

    @Override
    public void delete(int id) {
        patientDao.deleteById(id);

    }

    @NotNull
    @Override
    public ResponseEntity<Resource> exportReport(int idP, String history) {
        Optional<Patient> optPatient = this.patientDao.findById(idP);
        Double rpta = this.patientDao.totalHistory(history);
        if (optPatient.isPresent()) {
            try {
                final Patient patient = optPatient.get();
                final File file = ResourceUtils.getFile("classpath:Patients.jasper");
                final File imgLogo = ResourceUtils.getFile("classpath:images/logosimple.png");

				final JasperReport report = (JasperReport)  JRLoader.loadObject(file);
           		final HashMap<String, Object> parameters = new HashMap<>();
				parameters.put("imgLogo",new FileInputStream(imgLogo));
				parameters.put("total",rpta);
				parameters.put("dsPatient",new JRBeanCollectionDataSource((Collection<?>) this.patientDao.findByIdPatient(idP)));

                JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
                byte[] reporte = JasperExportManager.exportReportToPdf(jasperPrint);
                String sdf = (new SimpleDateFormat("dd/MM/yyyy")).format(new Date());
                StringBuilder stringBuilder = new StringBuilder().append("PatientPDF:");
                ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                        .filename(stringBuilder.append(patient.getId())
                                .append("generateDate:")
                                .append(sdf)
                                .append(".pdf")
                                .toString())
                        .build();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentDisposition(contentDisposition);
                return ResponseEntity.ok().contentLength((long) reporte.length)
                        .contentType(MediaType.APPLICATION_PDF)
                        .headers(headers).body(new ByteArrayResource(reporte));
            } catch (Exception e) {
                e.printStackTrace();
            }

        }else{
            return ResponseEntity.noContent().build();
        }
        return null;
    }

}
	


