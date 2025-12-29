package org.acme.service;



import com.arjuna.ats.internal.jdbc.drivers.modifiers.list;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import org.acme.entity.Book;
import org.acme.entity.Borrower;
import org.acme.entity.Borrowing;
import org.acme.repository.BookRepository;
import org.acme.repository.BorrowerRepository;
import org.acme.repository.BorrowingRepository;
import org.acme.util.ReturnBookResponseDTO;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.list;

@ApplicationScoped
public class BorrowingService {

    @Inject
    BorrowingRepository borrowingRepo;
    @Inject
    BookRepository bookRepo;
    @Inject
    BorrowerRepository borrowerRepo;

    @Transactional
    public Borrowing borrow(Long bookId, String username, int days) {

        Book book=bookRepo.findById(bookId);
        if (book==null)
            throw new IllegalArgumentException("Book not found");
        if (!book.available)
            throw new IllegalStateException("Book not available");
        Borrower borrower=borrowerRepo.findByName(username);
        if (borrower==null)
            throw new IllegalArgumentException("Borrower not found");
        if (borrower.rating<=0)
            throw new IllegalStateException("Borrower rating is 0");

        book.available =false;
        bookRepo.persist(book);

        Borrowing b=new Borrowing();
        b.book=book;
        b.borrower=borrower;
        b.borrowDate=LocalDate.now();
        b.dueDate=b.borrowDate.plusDays(days);

        borrowingRepo.persist(b);
        return b;
    }




//    @Transactional
//    public Borrowing returnBook(Long borrowingId) {
//        Borrowing b = borrowingRepo.findById(borrowingId);
//        if (b == null) throw new IllegalArgumentException("Borrowing not found");
//        if (b.returnDate != null) return b;
//        boolean wasOverdue = borrowingRepo
//                .findOverdue()
//                .stream()
//                .anyMatch(ob -> ob.id.equals(b.id));
//
//        b.returnDate = LocalDate.now();
//
//        if (wasOverdue) {
//            b.borrower.rating -= 1;
//            if (b.borrower.rating < 0) {
//                b.borrower.rating = 0;
//            }
//        }

//
//        b.book.available = true;
//        return b;
//    }

    public List<Borrowing> byUser(Long borrowerId) {
        return borrowingRepo.findByBorrower(borrowerId);
    }
    @Transactional
    public ReturnBookResponseDTO returnBook(Long id) {

        Borrowing b = borrowingRepo.findById(id);
        if (b == null)
            throw new WebApplicationException("Borrowing not found", 404);

        LocalDate today = LocalDate.now();
        b.returnDate = today;

        b.book.available = true;
        bookRepo.persist(b.book);

        int lateDays = 0;

        if (today.isAfter(b.dueDate)) {
            lateDays = (int) ChronoUnit.DAYS.between(b.dueDate, today);
            Borrower borrower = b.borrower;
            borrower.rating = Math.max(0, borrower.rating - 1);
        }

        ReturnBookResponseDTO resp = new ReturnBookResponseDTO();
        resp.lateDays = lateDays;
        resp.newRating = b.borrower.rating;
        resp.borrowing = b;

        return resp;
    }

    public List<Borrowing> overdue() {
        return borrowingRepo.findOverdue();
    }
        public List<Borrowing> findUnreturned() {
            return borrowingRepo.findUnreturned();
    }
//    public List<Borrowing> byBorrowerUsername(String username) {
//        Borrower borrower = borrowerRepo.findByName(username);
//        if (borrower == null) {
//            throw new IllegalArgumentException("Borrower not found");
//        }
//        return borrowingRepo.findByBorrower(borrower.id);
//    }
//
//    public List<Borrowing> currentByBorrower(String username) {
//        Borrower borrower = borrowerRepo.findByName(username);
//        return borrowingRepo.find(
//                "borrower.id = ?1 and returnDate is null",
//                borrower.id
//        ).list();
//    }
    public List<Borrowing> currentByUsername(String username) {
        return borrowingRepo.findCurrentByUsername(username);
    }
    @Transactional
    public Borrowing borrowByUsername(Long bookId, String username, Integer days) {
        Book book = bookRepo.findById(bookId);
        if (book == null)
            throw new WebApplicationException("Book not found", 404);

        if (!book.available)
            throw new WebApplicationException("Book not available", 400);

        Borrower borrower = borrowerRepo.findByName(username);
        if (borrower == null)
            throw new WebApplicationException("Borrower not found", 404);

        if (borrower.rating <= 0)
            throw new WebApplicationException(
                    "You can no longer borrow books because your rating is 0", 403
            );

        book.available = false;

        Borrowing b = new Borrowing();
        b.book = book;
        b.borrower = borrower;
        b.borrowDate = LocalDate.now();
        b.dueDate = b.borrowDate.plusDays(
                days == null || days <= 0 ? 14 : Math.min(days, 14)
        );

        borrowingRepo.persist(b);
        return b;
    }

    public List<Borrowing> historyByUsername(String username) {
        return borrowingRepo.findHistoryByUsername(username);
    }
}
