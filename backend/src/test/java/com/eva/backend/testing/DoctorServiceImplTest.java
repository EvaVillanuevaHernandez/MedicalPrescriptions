package com.eva.backend.testing;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import com.eva.backend.entity.dao.IDoctorDao;
import com.eva.backend.entity.models.Doctor;
import com.eva.backend.entity.services.DoctorServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class DoctorServiceImplTest {

    @Mock
    private IDoctorDao doctorDao;

    @InjectMocks
    private DoctorServiceImpl doctorService;

    @Test
    public void whenValidId_thenDoctorShouldBeFound() {
        Doctor alex = new Doctor(1, "collegiateNum", "Alex", "Smith", "Doe", "123456789");
        when(doctorDao.findById(1)).thenReturn(java.util.Optional.of(alex));
        Doctor found = doctorService.get(1);

        assertThat(found.getName())
                .isEqualTo(alex.getName());
    }
};
