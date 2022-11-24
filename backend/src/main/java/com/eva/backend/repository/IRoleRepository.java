package com.eva.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eva.backend.entity.models.ERole;
import com.eva.backend.entity.models.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}