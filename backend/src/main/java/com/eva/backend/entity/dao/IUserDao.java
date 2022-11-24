package com.eva.backend.entity.dao;

import org.springframework.data.repository.CrudRepository;


import com.eva.backend.entity.models.User;

public interface IUserDao extends CrudRepository<User,Integer> {

}
