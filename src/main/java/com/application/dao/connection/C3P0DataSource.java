package com.application.dao.connection;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class C3P0DataSource {
	private static C3P0DataSource dataSource;
	private ComboPooledDataSource comboPooledDataSource;
	private String url;
	private String username;
	private String password;

	private C3P0DataSource() {
		readConfiguration();
		comboPooledDataSource = new ComboPooledDataSource();
		comboPooledDataSource.setJdbcUrl(url);
		comboPooledDataSource.setUser(username);
		comboPooledDataSource.setPassword(password);
	}

	public static C3P0DataSource getInstance() {
		if (dataSource == null)
			dataSource = new C3P0DataSource();
		return dataSource;
	}

	public Connection getConnection() {
		Connection con = null;
		try {
			con = comboPooledDataSource.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return con;
	}

	private void readConfiguration() {
		ResourceBundle bundle = PropertyResourceBundle.getBundle("com.application.dao.connection.C3P0DataSource");
		url = bundle.getString("url");
		username = bundle.getString("username");
		password = bundle.getString("password");
	}
}
