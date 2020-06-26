package com.application.dto;

import java.io.Serializable;

public class StoreBook implements Serializable {

	protected long storeId;
	protected long bookId;
	protected int quantityInStore;
	protected int sold;
	protected double price;

	public StoreBook() {
	}

	public StoreBook(long storeId, long bookId, int quantityInStore, int sold, double price) {
		super();
		this.storeId = storeId;
		this.bookId = bookId;
		this.quantityInStore = quantityInStore;
		this.sold = sold;
		this.price = price;
	}

	public long getStoreId() {
		return storeId;
	}

	public void setStoreId(long storeId) {
		this.storeId = storeId;
	}

	public long getBookId() {
		return bookId;
	}

	public void setBookId(long bookId) {
		this.bookId = bookId;
	}

	public int getQuantityInStore() {
		return quantityInStore;
	}

	public void setQuantityInStore(int quantityInStore) {
		this.quantityInStore = quantityInStore;
	}

	public int getSold() {
		return sold;
	}

	public void setSold(int sold) {
		this.sold = sold;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Store id: " + storeId + ", bookId: " + bookId + ", quantityInStore: " + quantityInStore + ", price: " + price;
	}

}
