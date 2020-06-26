package com.application.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.dao.UserDao;
import com.application.dto.StringResponse;
import com.application.dto.User;

@RestController
@RequestMapping("/user")
public class UserService {

	@Autowired
	private UserDao userDao;

	@PostMapping(value = "/loginUser")
	@ResponseBody
	public ResponseEntity<Object> loginUser(@RequestBody User user) {
		Optional<User> loggedUser = userDao.loginUser(user);
		if (loggedUser.isPresent())
			return ResponseEntity.ok().body(loggedUser.get());

		return ResponseEntity.badRequest().body(new StringResponse("Username or password are incorrect"));
	}

	@PostMapping(value = "/createUser")
	@ResponseBody
	public ResponseEntity<StringResponse> createUser(@RequestBody User user) {
		boolean userCreated = userDao.createUser(user);
		if (userCreated)
			return ResponseEntity.ok().body(new StringResponse("User created"));

		return ResponseEntity.badRequest().body(new StringResponse("User not created"));
	}

}
