package com.application.dto.search;

import java.util.HashMap;
import java.util.Map;

public class BookSearchParams {

	private String name;
	private String writer;
	private String publisher;
	private int publishingYear;
	private int pageNumber;
	private long selectedStore;

	public BookSearchParams() {

	}

	public BookSearchParams(String name, String writer, String publisher, int publishingYear, int pageNumber, long selectedStore) {
		super();
		this.name = name;
		this.writer = writer;
		this.publisher = publisher;
		this.publishingYear = publishingYear;
		this.pageNumber = pageNumber;
		this.selectedStore = selectedStore;
	}

	public Map<String, Object> getNonEmptyParams() {
		Map<String, Object> map = new HashMap<>();

		if (!name.trim().equals(""))
			map.put("name", name);

		if (!writer.trim().equals(""))
			map.put("writer", writer);

		if (!publisher.trim().equals(""))
			map.put("publisher", publisher);

		if (selectedStore != 0)
			map.put("store_id", selectedStore);

		return map;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public int getPublishingYear() {
		return publishingYear;
	}

	public void setPublishingYear(int publishingYear) {
		this.publishingYear = publishingYear;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public long getSelectedStore() {
		return selectedStore;
	}

	public void setSelectedStore(long selectedStore) {
		this.selectedStore = selectedStore;
	}

}
