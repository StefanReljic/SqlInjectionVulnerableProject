package com.application;

import com.application.dto.Book;

public class DaoForStaticAnalysisTest {

	public static String getAddQuery(Book book) {
		return "insert into book(name, writer, publisher, publishing_year, photo) values ('" + book.getName() + "', '" + book.getWriter() + "', '"
				+ book.getPublisher() + "', " + book.getPublishingYear() + ", ?)";
	}
}
