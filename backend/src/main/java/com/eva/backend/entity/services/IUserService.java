package com.eva.backend.entity.services;

import java.util.List;

import com.eva.backend.entity.models.User;

public interface IUserService {

	public User get(int userId );
	public List <User> getAll();
	public User post(User user);
	public void put(User user, int userId);
	public void delete (int userId);
}
