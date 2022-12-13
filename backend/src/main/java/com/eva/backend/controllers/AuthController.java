package com.eva.backend.controllers;


import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eva.backend.entity.models.ERole;
import com.eva.backend.entity.models.Role;
import com.eva.backend.entity.models.User;
import com.eva.backend.payload.request.LoginRequest;
import com.eva.backend.payload.request.SignupRequest;
import com.eva.backend.payload.response.JwtResponse;
import com.eva.backend.payload.response.MessageResponse;
import com.eva.backend.repository.IRoleRepository;
import com.eva.backend.repository.IUserRepository;
import com.eva.backend.security.jwt.JwtUtils;
import com.eva.backend.security.services.UserDetailsImpl;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	 @Autowired
	  AuthenticationManager authenticationManager;

	  @Autowired
	  IUserRepository userRepository;

	  @Autowired
	  IRoleRepository roleRepository;

	  @Autowired
	  PasswordEncoder encoder;

	  @Autowired
	  JwtUtils jwtUtils;

	  @PostMapping("/signin")
	  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//		  byte[] username = Base64.getDecoder().decode(loginRequest.getUsername());
//		  String decodeUsername = new String(username);
//		  byte[] password = Base64.getDecoder().decode(loginRequest.getPassword());
//		  String decodePassword = new String(password);

	    Authentication authentication = authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(/*decodeUsername */loginRequest.getUsername(), /*decodePassword*/loginRequest.getPassword()));

	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    String jwt = jwtUtils.generateJwtToken(authentication);
	    
	    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
	    List<String> roles = userDetails.getAuthorities().stream()
	        .map(item -> item.getAuthority())
	        .collect(Collectors.toList());

	    return ResponseEntity.ok(new JwtResponse(jwt, 
                (long) userDetails.getId(), 
                userDetails.getUsername(), 
                userDetails.getEmail(), 
                roles));
}

	  @PostMapping("/signup")
	  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//		  byte[] username = Base64.getDecoder().decode(signUpRequest.getUsername());
//		  String decodeUsername = new String(username);
//		  byte[] password = Base64.getDecoder().decode(signUpRequest.getPassword());
//		  String decodePassword = new String(password);

	    if (userRepository.existsByUsername(/*decodeUsername*/signUpRequest.getUsername())) {
	      return ResponseEntity
	          .badRequest()
	          .body(new MessageResponse("Error: Username is already taken!"));
	    }

	    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
	      return ResponseEntity
	          .badRequest()
	          .body(new MessageResponse("Error: Email is already in use!"));
	    }

	    // Create new user's account
	    User user = new User(signUpRequest.getUsername(), 
	               signUpRequest.getEmail(),
	               encoder.encode(/*decodePassword*/signUpRequest.getPassword()));

	    Set<String> strRoles = signUpRequest.getRole();
	    Set<Role> roles = new HashSet<>();

	    if (strRoles == null) {
	      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	      roles.add(userRole);
	    } else {
	      strRoles.forEach(role -> {
	        switch (role) {
	        case "admin":
	          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(adminRole);

	          break;
	        /*case "mod":
	          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(modRole);
	          break;*/
	        default:
	          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(userRole);
	        }
	      });
	    }

	    user.setRoles(roles);
	    userRepository.save(user);

	    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	  }
	}
