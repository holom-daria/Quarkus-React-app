package org.acme.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Borrower;

@ApplicationScoped
public class BorrowerRepository implements PanacheRepository<Borrower> {
    public Borrower findByName(String name) {
        return find("name", name).firstResult();
    }
}
