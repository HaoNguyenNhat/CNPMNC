package com.devcamp.springjwt;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.devcamp.springjwt.models.ERole;
import com.devcamp.springjwt.models.Role;
import com.devcamp.springjwt.models.User;
import com.devcamp.springjwt.repository.RoleRepository;
import com.devcamp.springjwt.repository.UserRepository;

@SpringBootApplication
public class SpringBootSecurityJwtApplication implements CommandLineRunner {
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	public static void main(String[] args) {
    SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}

	@Override
	public void run(String... params) throws Exception {
		if(!roleRepository.findByName(ERole.ROLE_USER).isPresent()) {
			roleRepository.save(new Role(ERole.ROLE_USER));
		}

		if(!roleRepository.findByName(ERole.ROLE_MODERATOR).isPresent()) {
			roleRepository.save(new Role(ERole.ROLE_MODERATOR));
		}

		if(!roleRepository.findByName(ERole.ROLE_ADMIN).isPresent()) {
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}

		User initUser = new User("DevcampUser", "demo@devcamp.edu.vn", encoder.encode("12345678"));
		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		initUser.setRoles(roles);

		if(!userRepository.existsByEmail("demo@devcamp.edu.vn")) {
			userRepository.save(initUser);
		}
	}
}
