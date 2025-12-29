package org.acme.resource;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.util.ResponseDTO;
import org.acme.entity.Admin;
import org.acme.repository.AdminRepository;

import java.util.List;

@Path("/admins")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminResource {

    @Inject
    AdminRepository repo;


    @POST
    @Transactional
    @RolesAllowed("ADMIN")
    public ResponseDTO<Admin> create(@Valid Admin a) {
        repo.persist(a);
        return ResponseDTO.ok("Admin registered",a);
    }


    @GET
    @RolesAllowed("ADMIN")
    public List<Admin> all() {
        return repo.listAll();
    }


}
