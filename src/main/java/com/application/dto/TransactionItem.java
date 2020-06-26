package com.application.dto;

public class TransactionItem {

	private Store store;
	private Book book;
	private int quantity;
	private double price;

	public TransactionItem() {
		// TODO Auto-generated constructor stub
	}

	public TransactionItem(Store store, Book book, int quantity, double price) {
		super();
		this.store = store;
		this.book = book;
		this.quantity = quantity;
		this.price = price;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

}
