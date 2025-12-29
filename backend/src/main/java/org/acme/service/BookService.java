package org.acme.service;




import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import org.acme.util.ISBNGenerator;
import org.acme.entity.Book;
import org.acme.repository.BookRepository;

import java.util.List;

@ApplicationScoped
public class BookService {

    @Inject
    BookRepository repo;
    @Inject
    ISBNGenerator isbnGenerator;

    @Transactional
    public Book add(Book book) {
        if (book.isbn==null||book.isbn.isEmpty()) {
            book.isbn =isbnGenerator.generateISBN();
        }
        book.available=true;
        repo.persist(book);
        return book;
    }

    public List<Book> all() { return repo.listAll();}


    public List<Book> available() {
        return repo.list("available",true);
    }

    public List<Book> search(String q) { return repo.search(q); }



    public long count() {
        return repo.count();
    }



    @Transactional
    public Book update(Long id, Book b) {
        Book existing=repo.findById(id);

        if (existing==null) {
            throw new WebApplicationException("Book not found",404);
        }

        existing.title=b.title;
        existing.author=b.author;
        existing.genre=b.genre;

        return existing;
    }

@Transactional
public void delete(Long id) {
    boolean deleted=repo.deleteById(id);

    if (!deleted) {
        throw new IllegalArgumentException("Book not found");
    }
}

}
