package org.acme.util;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.enterprise.event.Observes;
import io.quarkus.runtime.StartupEvent;
import org.acme.entity.Admin;
import org.acme.repository.AdminRepository;

@ApplicationScoped
public class AdminInitializer {

    @Inject
    AdminRepository repo;

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        if (repo.findByUsername("admin1")==null) {
            Admin a =new Admin();
            a.username ="admin1";
            a.password="password";
            repo.persist(a);
        }
    }
}
