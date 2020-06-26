package com.application.dao;

import java.io.DataInputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.stereotype.Component;

import com.application.DaoForStaticAnalysisTest;
import com.application.dao.connection.C3P0DataSource;
import com.application.dto.Book;
import com.application.dto.StoreBookDetails;
import com.application.dto.search.BookSearchParams;

@Component
public class BookDao {

	public boolean addBook(Book book) {
		Blob blob = getBlobFromBytes(book.getPhoto() == null ? null : book.getPhoto().getBytes());
		String query = DaoForStaticAnalysisTest.getAddQuery(book);
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setBlob(1, blob);
				statement.execute();
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}

	public List<StoreBookDetails> getStoresForBook(long bookId, int pageNumber) {
		List<StoreBookDetails> storeBookDetails = new ArrayList<>();
		String query = "select sb.store_id, sb.book_id, sb.total_quantity, sb.sold, sb.price, s.name from store_book sb inner join store s on "
				+ "s.id = sb.store_id where sb.book_id = ? order by sb.store_id desc limit 12 offset ?";
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				statement.setLong(1, bookId);
				statement.setInt(2, pageNumber * 12);
				try (ResultSet resultSet = statement.executeQuery()) {
					while (resultSet.next()) {
						StoreBookDetails details = new StoreBookDetails(resultSet.getLong(1), resultSet.getLong(2), resultSet.getInt(3),
								resultSet.getInt(4), resultSet.getDouble(5), resultSet.getString(6));
						storeBookDetails.add(details);

					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return storeBookDetails;
	}

	public List<Book> getBooks(BookSearchParams bookSearchParams) {
		List<Book> books = new ArrayList<>();
		Map<String, Object> nonEmptyParams = bookSearchParams.getNonEmptyParams();
		String query = "select b.* from book b";

		if (bookSearchParams.getPageNumber() >= 0) {
			if (bookSearchParams.getSelectedStore() != 0) {
				query += " inner join store_book sb on sb.book_id = b.id ";
			}

			if (nonEmptyParams.size() > 0) {
				query += " where ";
				for (String key : nonEmptyParams.keySet())
					query += key + " = '" + nonEmptyParams.get(key) + "' or ";

				query = query.substring(0, query.length() - 3);
			}

			query += " order by b.id desc limit 12 offset " + (bookSearchParams.getPageNumber() * 12);
		}
		System.out.println(query);
		try (Connection connection = C3P0DataSource.getInstance().getConnection()) {
			try (PreparedStatement statement = connection.prepareStatement(query)) {
				try (ResultSet resultSet = statement.executeQuery()) {
					while (resultSet.next()) {
						byte[] bytes = null;
						if (resultSet.getBlob(6) != null) {
							DataInputStream dos = new DataInputStream(resultSet.getBlob(6).getBinaryStream());
							bytes = new byte[dos.available()];
							dos.read(bytes);
						}
						Book book = new Book(resultSet.getLong(1), resultSet.getString(2), resultSet.getString(3), resultSet.getString(4),
								resultSet.getInt(5), bytes == null ? null : new String(bytes));
						books.add(book);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return books;
	}

	public int count(BookSearchParams bookSearchParams) {
		Map<String, Object> nonEmptyParams = bookSearchParams.getNonEmptyParams();
		String query = "select count(*) from book b";

		if (bookSearchParams.getSelectedStore() != 0) {
			query += " inner join store_book sb on sb.book_id = b.id ";
		}
		if (nonEmptyParams.size() > 0) {
			query += " where ";
			for (String key : nonEmptyParams.keySet())
				query += key + " = '" + nonEmptyParams.get(key) + "' or ";

			query = query.substring(0, query.length() - 3);
		}
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

	private Blob getBlobFromBytes(byte[] bytes) {
		if (bytes == null)
			return null;
		Blob blob = null;
		try {
			blob = new SerialBlob(bytes);
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		return blob;
	}
}
