package com.application.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.application.dao.connection.C3P0DataSource;
import com.application.dto.Book;
import com.application.dto.Cart;
import com.application.dto.Store;
import com.application.dto.Transaction;
import com.application.dto.TransactionItem;

@Component
public class TransactionDao {

	public List<TransactionItem> getTransactionItems(long cartId) {
		String query = "select s.name, s.address, s.phone, b.name, b.writer, b.publisher, b.publishing_year, ci.quantity, ci.price, u.account_balance"
				+ " from cart_item ci " + "	join store s on s.id = ci.store_id " + " join book b on b.id = ci.book_id " + "where cart_id = ?";
		List<TransactionItem> transactionItems = new ArrayList<>();
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setLong(1, cartId);
				try (ResultSet resultSet = statement.executeQuery()) {
					while (resultSet.next()) {
						Store store = new Store(0, resultSet.getString(1), resultSet.getString(2), resultSet.getString(3));
						Book book = new Book(0, resultSet.getString(4), resultSet.getString(5), resultSet.getString(6), resultSet.getInt(7), null);
						TransactionItem transactionItem = new TransactionItem(store, book, resultSet.getInt(8), resultSet.getDouble(9));
						transactionItems.add(transactionItem);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return transactionItems;
	}

	public List<Transaction> getTransactions(String username) {
		String query = "select * from transaction where user_id = (select id from user where username = ?)";
		List<Transaction> list = new ArrayList<>();
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setString(1, username);
				try (ResultSet resultSet = statement.executeQuery()) {
					while (resultSet.next()) {
						list.add(new Transaction(resultSet.getLong(1), resultSet.getString(2), resultSet.getDouble(3), resultSet.getLong(4),
								resultSet.getLong(5)));
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}

	public boolean executePayment(Cart cart, String username) {
		String query = " call executePayment(?, ?)";
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (CallableStatement statement = connection.prepareCall(query)) {
				JSONObject json = new JSONObject();
				try {
					json.put("items", cart.getItems());
					json.put("totalItems", cart.getTotalItems());
					json.put("totalPrice", cart.getTotalPrice());
					json.put("username", username);
				} catch (JSONException e) {
					e.printStackTrace();
				}
				System.out.println(json.toString());
				statement.setString(1, json.toString());
				statement.registerOutParameter(2, Types.BIGINT);
				statement.executeUpdate();
				long result = statement.getLong(2);
				if (result != 0)
					return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}

}
