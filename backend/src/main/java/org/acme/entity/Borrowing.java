package org.acme.entity;


import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Borrowing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    public Book book;

    @ManyToOne
    @JoinColumn(name = "borrower_id")
    public Borrower borrower;

    public LocalDate borrowDate;
    public LocalDate dueDate;
    public LocalDate returnDate;
}

