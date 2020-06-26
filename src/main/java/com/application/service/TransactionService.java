package com.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.dao.TransactionDao;
import com.application.dao.UserDao;
import com.application.dto.Payment;
import com.application.dto.ResponseEntityObject;
import com.application.dto.StringResponse;
import com.application.dto.Transaction;
import com.application.dto.TransactionItem;

@RestController
@RequestMapping("/transaction")
public class TransactionService {

	@Autowired
	private TransactionDao transactionDao;
	@Autowired
	private UserDao userDao;

	@PostMapping("/completePayment")
	public ResponseEntity<StringResponse> executePayment(@RequestBody Payment payment) {
		boolean transactionExecuted = transactionDao.executePayment(payment.getCart(), payment.getUsername());
		double accountBalance = userDao.getUserAccountBalance(payment.getUsername());
		if (transactionExecuted)
			return ResponseEntity.ok().body(new StringResponse(accountBalance + ""));

		return ResponseEntity.badRequest().body(new StringResponse("Payment failed"));
	}

	@GetMapping("/transactions")
	public ResponseEntity<ResponseEntityObject<Transaction>> getTransactions(String username) {
		List<Transaction> userTransactions = transactionDao.getTransactions(username);
		return ResponseEntity.ok().body(new ResponseEntityObject<>(userTransactions, 0));
	}

	@GetMapping("/transactionDetails")
	public ResponseEntity<ResponseEntityObject<TransactionItem>> transactionDetails(long cartId) {
		List<TransactionItem> transactionItems = transactionDao.getTransactionItems(cartId);
		return ResponseEntity.ok().body(new ResponseEntityObject<>(transactionItems, 0));
	}
}
