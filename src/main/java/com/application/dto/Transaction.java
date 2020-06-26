package com.application.dto;

public class Transaction {

	private long id;
	private String date;
	private double totalPrice;
	private long userId;
	private long cartId;

	public Transaction() {
	}

	public Transaction(long id, String date, double totalPrice, long userId, long cartId) {
		super();
		this.id = id;
		this.date = date;
		this.totalPrice = totalPrice;
		this.userId = userId;
		this.cartId = cartId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getCartId() {
		return cartId;
	}

	public void setCartId(long cartId) {
		this.cartId = cartId;
	}

}
