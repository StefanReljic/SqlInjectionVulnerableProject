package com.application.dto;

import java.io.Serializable;

public class StringResponse implements Serializable {

	private String message;

	public StringResponse() {
	}

	public StringResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
