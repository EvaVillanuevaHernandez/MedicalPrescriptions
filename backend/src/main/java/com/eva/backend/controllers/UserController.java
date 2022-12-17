package com.eva.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eva.backend.entity.models.User;
import com.eva.backend.entity.services.IUserService;

@RestController	
@CrossOrigin(origins ="*")
public class UserController {

@Autowired
IUserService userService;

@GetMapping("/users")
public List<User> getAllUsers(){
	return userService.getAll();
}

@GetMapping("/users/{id}")
public User getOne(@PathVariable(value = "id")int id) {
	return userService.get(id);
}

@PostMapping("/users")
public void post(User user){
	userService.post(user);	
}

@PutMapping("/users/{id}")
public void put(User user,@PathVariable(value = "id")int id){
	userService.put(user, id);
}

@DeleteMapping("/users/{id}")
public void delete(@PathVariable(value="id")int id) {
	userService.delete(id);
}


}

