package com.application.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.application.dao.connection.C3P0DataSource;
import com.application.dto.Store;
import com.application.dto.StoreBook;
import com.application.dto.search.StoreSearchParams;

@Component
public class StoreDao {

	public boolean addStore(Store store) {
		String query = addStoreQuery(store);
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.execute();
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}

	private String addStoreQuery(Store store) {
		return "insert into store(name, address, phone) values ('" + store.getName() + "', '" + store.getAddress() + "', '" + store.getPhone() + "')";
	}

	public List<Store> getStores(StoreSearchParams storeSearchParams) {
		List<Store> stores = new ArrayList<Store>();
		String query = "select * from store ";
		if (storeSearchParams.getPageNumber() >= 0) {
			if (!storeSearchParams.getName().trim().equals(""))
				query += "where name = '" + storeSearchParams.getName().trim() + "' ";
			query += "order by id desc limit 15 offset " + (storeSearchParams.getPageNumber() * 15);
		}
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				try (ResultSet resultSet = statement.executeQuery()) {
					while (resultSet.next()) {
						Store store = new Store(resultSet.getLong(1), resultSet.getString(2), resultSet.getString(3), resultSet.getString(4));
						stores.add(store);
					}
					return stores;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return stores;
	}

	public int count(StoreSearchParams storeSearchParams) {
		String query = "select count(*) from store ";
		if (!storeSearchParams.getName().trim().equals(""))
			query += "where name = '" + storeSearchParams.getName().trim() + "' ";
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				try (ResultSet resultSet = statement.executeQuery()) {
					if (resultSet.next()) {
						int totalCount = resultSet.getInt(1);
						if (totalCount % 15 == 0)
							return totalCount / 15;
						else
							return totalCount / 15 + 1;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	public boolean addBooksToStore(List<StoreBook> storeBooks) {
		String query = "insert into store_book values (?, ?, ?, ?, ?) on duplicate key update total_quantity = total_quantity + ? ";
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				for (StoreBook storeBook : storeBooks) {
					statement.setLong(1, storeBook.getStoreId());
					statement.setLong(2, storeBook.getBookId());
					statement.setInt(3, storeBook.getQuantityInStore());
					statement.setInt(4, 0);
					statement.setDouble(5, storeBook.getPrice());
					statement.setInt(6, storeBook.getQuantityInStore());
				}
				statement.execute();
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

}
