package com.application.dto.search;

public class StoreSearchParams {

	private long selectedStore;
	private String name;
	private int pageNumber;

	public StoreSearchParams() {
	}

	public StoreSearchParams(long selectedStore, String name, int pageNumber) {
		super();
		this.selectedStore = selectedStore;
		this.name = name;
		this.pageNumber = pageNumber;
	}

	public long getSelectedStore() {
		return selectedStore;
	}

	public void setSelectedStore(long selectedStore) {
		this.selectedStore = selectedStore;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

}
