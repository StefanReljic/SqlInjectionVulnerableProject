package com.application.dao;

import java.io.DataInputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Component;

import com.application.dao.connection.C3P0DataSource;
import com.application.dto.User;

@Component
public class UserDao {

	public double getUserAccountBalance(String username) {
		String query = "select account_balance from user where username = ?";
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setString(1, username);
				ResultSet resultSet = statement.executeQuery();
				if (resultSet.next())
					return resultSet.getDouble(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return -1;
	}

	public Optional<User> loginUser(User user) {
		String query = String.format("select * from user where username='%s' and password='%s'", user.getUsername(), user.getPassword());
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				ResultSet resultSet = statement.executeQuery();
				if (resultSet.next()) {
					byte[] bytes = null;
					if (resultSet.getBlob(7) != null) {
						DataInputStream dos = new DataInputStream(resultSet.getBlob(7).getBinaryStream());
						bytes = new byte[dos.available()];
						dos.read(bytes);
					}
					return Optional.of(new User(resultSet.getLong(1), resultSet.getString(2), null, resultSet.getString(4), resultSet.getString(5),
							bytes == null ? null : new String(bytes), resultSet.getDouble(8)));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return Optional.empty();
	}

	public boolean createUser(User user) {
		Blob blob = getBlobFromBytes(user.getPhoto().getBytes());
		String query = "insert into user(role_id, username, password, firstname, lastname, photo, account_balance) values (1, '" + user.getUsername()
				+ "', '" + user.getPassword() + "', '" + user.getFirstName() + "', '" + user.getLastName() + "', ?, 500);";
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setBlob(1, blob);
				return !statement.execute();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}

	private Blob getBlobFromBytes(byte[] bytes) {
		Blob blob = null;
		try {
			blob = new SerialBlob(bytes);
		} catch (SerialException e1) {
			e1.printStackTrace();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		return blob;
	}

}
