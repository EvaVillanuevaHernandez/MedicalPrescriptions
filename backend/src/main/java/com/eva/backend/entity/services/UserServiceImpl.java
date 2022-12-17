package com.eva.backend.entity.services;
import java.util.List;

import com.eva.backend.entity.dao.IDoctorDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eva.backend.entity.dao.IUserDao;
import com.eva.backend.entity.models.User;

@Service
public class UserServiceImpl implements IUserService {


	@Autowired
	private IUserDao userDao;

	@Autowired
	private IDoctorDao doctorDao;

	@Override
	public User get (int id) {
		return userDao.findById(id).get();
	}
	@Override
	public List<User> getAll() {
		return (List<User>)userDao.findAll();
		
	}

	@Override
	public User post(User user) {
		return userDao.save(user);
		
	}

	@Override
	public void put(User user, int id) {
		userDao.findById(id).ifPresent((x)->{
			user.setId(id);
			userDao.save(user);
		});
	
		
	}

	@Override
	public void delete(int id) {
		userDao.deleteById(id);
		
	}

}