package com.application.dto;

public class Book {

	private long id;
	private String name;
	private String writer;
	private String publisher;
	private int publishingYear;
	private String photo;

	public Book() {
	}

	public Book(long id, String name, String writer, String publisher, int publishingYear, String photo) {
		super();
		this.id = id;
		this.name = name;
		this.writer = writer;
		this.publisher = publisher;
		this.publishingYear = publishingYear;
		this.photo = photo;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

}
