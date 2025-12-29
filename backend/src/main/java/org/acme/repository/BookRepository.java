package org.acme.repository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Book;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import java.util.List;



import io.quarkus.hibernate.orm.panache.PanacheRepository;
@ApplicationScoped
public class BookRepository implements PanacheRepository<Book> {

    public List<Book> findAvailable() {
        return list("available", true);
    }

    public List<Book> search(String q) {
        String like = "%" + q.toLowerCase() + "%";
        return list("lower(title) like ?1 or lower(author) like ?1 or lower(genre) like ?1", like);
    }
}
