package org.acme.repository;



import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entity.Admin;

@ApplicationScoped
public class AdminRepository implements PanacheRepository<Admin> {

    public Admin findByUsername(String username) {
        return find("username", username).firstResult();
    }
}
