package com.application.dto;

public class Payment {

	private Cart cart;
	private String username;

	public Payment() {
	}

	public Payment(Cart cart, String username) {
		super();
		this.cart = cart;
		this.username = username;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
