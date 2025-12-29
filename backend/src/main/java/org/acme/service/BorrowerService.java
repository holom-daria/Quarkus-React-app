package org.acme.service;


import org.acme.entity.Borrower;
import org.acme.repository.BorrowerRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class BorrowerService {

    @Inject
    BorrowerRepository repo;

    @Transactional
    public Borrower register(Borrower b) {
        repo.persist(b);
        return b;
    }
    public float viewRatingBorrower(Long id) { return repo.findById(id).rating;}
    public List<Borrower> all() { return repo.listAll(); }
    public Borrower findBorrowerByID (Long id){ return repo.findById(id);}
    public Borrower findBorrowerByName (String name ){ return repo.findByName(name);}
    public Borrower get(Long id) { return repo.findById(id); }

}
