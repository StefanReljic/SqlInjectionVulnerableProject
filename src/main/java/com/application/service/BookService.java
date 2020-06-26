package com.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.dao.BookDao;
import com.application.dto.Book;
import com.application.dto.ResponseEntityObject;
import com.application.dto.StoreBookDetails;
import com.application.dto.StringResponse;
import com.application.dto.search.BookSearchParams;

@RestController
@RequestMapping("/book")
public class BookService {

	@Autowired
	private BookDao bookDao;

	@PostMapping("/getBooks")
	@ResponseBody
	public ResponseEntity<ResponseEntityObject<Book>> getBooks(@RequestBody BookSearchParams bookSearchParams) {
		List<Book> books = bookDao.getBooks(bookSearchParams);
		int totalPages = bookDao.count(bookSearchParams);
		return ResponseEntity.ok().body(new ResponseEntityObject<>(books, totalPages));
	}

	@GetMapping("/getStoresForBook")
	private ResponseEntity<ResponseEntityObject<StoreBookDetails>> getStoresForBook(long bookId, int pageNumber) {
		List<StoreBookDetails> storeBookDetails = bookDao.getStoresForBook(bookId, pageNumber);
		int totalPages = storeBookDetails.size() % 12 == 0 ? storeBookDetails.size() / 12 - 1 : storeBookDetails.size() % 12 - 1;
		return ResponseEntity.ok().body(new ResponseEntityObject<>(storeBookDetails, totalPages));
	}

	@PostMapping("/addBook")
	public ResponseEntity<StringResponse> addBook(@RequestBody Book book) {
		boolean bookAdded = bookDao.addBook(book);
		if (bookAdded)
			return ResponseEntity.ok().body(new StringResponse("Book added successfully"));

		return ResponseEntity.badRequest().body(new StringResponse("Error while adding book"));
	}
}
