package org.acme.resource;



import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.util.ResponseDTO;
import org.acme.entity.Borrower;
import org.acme.entity.Borrowing;
import org.acme.service.BorrowerService;
import org.acme.service.BorrowingService;

import java.util.List;

@Path("/borrowers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BorrowerResource {

    @Inject
    BorrowerService service;

    @Inject
    BorrowingService borrowingservice;


    @POST
    public ResponseDTO<Borrower> register(@Valid Borrower b) {
        return ResponseDTO.ok("Borrower registered", service.register(b));
    }

    @GET
    @RolesAllowed("ADMIN")
    public List<Borrower> all() { return service.all(); }


    @GET @Path("/{id}")
    @RolesAllowed("ADMIN")
    public Borrower get(@PathParam("id") Long id) { return service.get(id); }

    @GET
    @Path("/overdue")
    @RolesAllowed("ADMIN")
    public List<Borrowing> overdue() {
        return borrowingservice.overdue();
    }

    @GET @Path("/rating/{id}")
    @RolesAllowed("ADMIN")
    public float viewRating(@PathParam("id") Long id){
        return service.viewRatingBorrower(id);
    }


}
