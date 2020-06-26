package com.application.dto;

import java.io.Serializable;
import java.util.List;

public class Cart implements Serializable {

	private List<CartItem> items;
	private int totalItems;
	private double totalPrice;
	
	public Cart() {
	}

	public Cart(List<CartItem> items, int totalItems, double totalPrice) {
		super();
		this.items = items;
		this.totalItems = totalItems;
		this.totalPrice = totalPrice;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	public int getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(int totalItems) {
		this.totalItems = totalItems;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

}
