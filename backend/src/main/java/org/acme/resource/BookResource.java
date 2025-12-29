package org.acme.resource;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.util.ResponseDTO;
import org.acme.entity.Book;

import java.util.List;
import jakarta.validation.Valid;
import org.acme.service.BookService;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookResource {

    @Inject
    BookService service;

    @GET
    public List<Book> all() {
        return service.all();
    }

    @GET
    @Path("/available")
    public List<Book> available() {
        return service.available();
    }

    @GET
    @Path("/search")
    public List<Book> search(@QueryParam("q") String q) {
        return service.search(q == null ? "" : q);
    }

    @GET
    @Path("/count")
    public ResponseDTO<Long> count() {
        return ResponseDTO.ok("Books count",service.count());
    }

    @POST
    @RolesAllowed("ADMIN")
    public ResponseDTO<Book> create(@Valid Book book) {
        return ResponseDTO.ok("Book added",service.add(book));
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public ResponseDTO<Book> update(@PathParam("id") Long id, Book b) {
        return ResponseDTO.ok("Book updated", service.update(id,b));
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public ResponseDTO<Void> delete(@PathParam("id") Long id) {
        try {
            service.delete(id);
            return ResponseDTO.ok("Book deleted successfully",null);
        } catch (IllegalArgumentException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
}


