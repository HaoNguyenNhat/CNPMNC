package com.devcamp.springjwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.springjwt.models.ERole;
import com.devcamp.springjwt.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
