package org.acme.repository;



import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Borrowing;

import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class BorrowingRepository implements PanacheRepository<Borrowing> {

    public List<Borrowing> findByBorrower(Long borrowerId) {
        return list("borrower.id", borrowerId);
    }

    public List<Borrowing> findUnreturned() {
        return list("returnDate is null");
    }
    public List<Borrowing> findOverdue() {
        return list("returnDate is null and dueDate < ?1", LocalDate.now());
    }
    public List<Borrowing> findCurrentByUsername(String username) {
        return list(
                "borrower.name = ?1 AND returnDate IS NULL",
                username
        );
    }

    public List<Borrowing> findHistoryByUsername(String username) {
        return list(
                "borrower.name = ?1 AND returnDate IS NOT NULL",
                username
        );
    }
}

