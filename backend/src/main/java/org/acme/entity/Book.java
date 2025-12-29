package org.acme.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @NotBlank
    public String title;

    @NotBlank
    public String author;

    public String genre;
    public String isbn;
    @Column(nullable = false)
    public boolean available = true;

}
