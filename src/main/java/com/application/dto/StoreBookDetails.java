package com.application.dto;

public class StoreBookDetails extends StoreBook {

	private String storeName;

	public StoreBookDetails(long storeId, long bookId, int quantity, int sold, double price, String storeName) {
		super(storeId, bookId, quantity, sold, price);
		this.storeName = storeName;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	@Override
	public String toString() {
		return super.toString() + " store name " + storeName;
	}
}
