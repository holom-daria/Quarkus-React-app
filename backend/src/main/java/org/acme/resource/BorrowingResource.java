package org.acme.resource;



import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.RolesAllowed;
import org.acme.entity.Borrowing;
import org.acme.util.ResponseDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.service.BorrowingService;
import io.quarkus.security.identity.SecurityIdentity;
import org.acme.util.ReturnBookResponseDTO;

import java.util.List;


@Path("/borrowings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BorrowingResource {
    @Inject
    SecurityIdentity identity;
    @Inject
    BorrowingService service;

    public static class BorrowRequest {
        public Long bookId;
        public Long borrowerId;
        public Integer days;
    }

    @POST
    @RolesAllowed("USER")
    public ResponseDTO<Borrowing> borrow(BorrowRequest req) {
        String username=identity.getPrincipal().getName();
        Borrowing b=service.borrowByUsername(req.bookId, username,req.days);
        return ResponseDTO.ok("Book borrowed",b);
    }



    @GET @Path("/overdue")
    @RolesAllowed("ADMIN")
    public List<Borrowing> overdue() {
        return service.overdue();
    }

    @GET @Path("/unreturned")
    @RolesAllowed("ADMIN")
    public List<Borrowing> unreturned() {
        return service.findUnreturned();
    }


    @GET
    @Path("/me/current")
    @RolesAllowed("USER")
    public List<Borrowing> myCurrentBorrowings() {
        String username = identity.getPrincipal().getName();
        return service.currentByUsername(username);
    }
    @PUT
    @Path("/me/return/{id}")
    @RolesAllowed("USER")
    public ReturnBookResponseDTO returnBook(@PathParam("id") Long id) {
        return service.returnBook(id);
    }

    @GET
    @Path("/me/history")
    @RolesAllowed("USER")
    public List<Borrowing> myBorrowingHistory() {
        String username = identity.getPrincipal().getName();
        return service.historyByUsername(username);
    }

    @GET
    @Path("/borrower/{borrowerId}")
    @RolesAllowed("ADMIN")
    public List<Borrowing> history(@PathParam("borrowerId") Long borrowerId) {
        return service.byUser(borrowerId);
    }


}
