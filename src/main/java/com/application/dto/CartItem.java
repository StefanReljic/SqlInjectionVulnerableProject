package com.application.dto;

import java.io.Serializable;

public class CartItem implements Serializable {

	private long cartId;
	private long storeId;
	private long bookId;
	private int quantity;
	private double price;

	public CartItem() {
	}

	public CartItem(long cartId, long storeId, long bookId, int quantity, double price) {
		super();
		this.cartId = cartId;
		this.storeId = storeId;
		this.bookId = bookId;
		this.quantity = quantity;
		this.price = price;
	}

	public long getCartId() {
		return cartId;
	}

	public void setCartId(long cartId) {
		this.cartId = cartId;
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

	@Override
	public String toString() {
		return "Store id: " + storeId + ", bookId: " + bookId + ", price: " + price + ", quantity: " + quantity;
	}
}
