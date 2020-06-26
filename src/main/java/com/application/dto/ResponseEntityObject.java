package com.application.dto;

import java.io.Serializable;
import java.util.List;

public class ResponseEntityObject<T> implements Serializable {
	List<T> list;
	int totalPages;

	public ResponseEntityObject() {

	}

	public ResponseEntityObject(List<T> list, int totalPages) {
		super();
		this.list = list;
		this.totalPages = totalPages;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

}
