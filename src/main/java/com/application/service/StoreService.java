package com.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.dao.StoreDao;
import com.application.dto.ResponseEntityObject;
import com.application.dto.Store;
import com.application.dto.StoreBook;
import com.application.dto.StringResponse;
import com.application.dto.search.StoreSearchParams;

@RestController
@RequestMapping("/store")
public class StoreService {

	@Autowired
	private StoreDao storeDao;

	@PostMapping("/getStores")
	@ResponseBody
	public ResponseEntity<ResponseEntityObject<Store>> getStores(@RequestBody StoreSearchParams storeSearchParams) {
		List<Store> books = storeDao.getStores(storeSearchParams);
		int totalPages = storeDao.count(storeSearchParams);
		ResponseEntityObject<Store> response = new ResponseEntityObject<>(books, totalPages);
		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/addStore")
	public ResponseEntity<StringResponse> addStore(@RequestBody Store store) {
		boolean storeAdded = storeDao.addStore(store);
		if (storeAdded)
			return ResponseEntity.ok().body(new StringResponse("Store added successfully"));

		return ResponseEntity.badRequest().body(new StringResponse("Error while adding store"));
	}

	@PostMapping("/addBooksToStore")
	public ResponseEntity<StringResponse> addBooksToStore(@RequestBody List<StoreBook> storeBooks) {
		boolean booksAddedToStore = storeDao.addBooksToStore(storeBooks);
		if (booksAddedToStore)
			return ResponseEntity.ok().body(new StringResponse("Books added successfully"));

		return ResponseEntity.badRequest().body(new StringResponse("Error while adding books to store"));
	}

}
