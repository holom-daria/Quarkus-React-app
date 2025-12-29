package org.acme.security;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.acme.entity.Admin;
import org.acme.entity.Borrower;
import org.acme.repository.AdminRepository;
import org.acme.repository.BorrowerRepository;
import org.acme.util.ResponseDTO;
@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    AdminRepository adminRepo;

    @Inject
    BorrowerRepository borrowerRepo;

    @Inject
    JwtService jwtService;

    @POST
    @Path("/login")
    public ResponseDTO<String> login(LoginRequest req) {

        Admin admin = adminRepo.findByUsername(req.username);
        if (admin != null && admin.password.equals(req.password)) {
            return ResponseDTO.ok(
                    "Admin login successful",
                    jwtService.generateToken(admin.username,"ADMIN")
            );
        }


        Borrower user = borrowerRepo.findByName(req.username);
        if (user != null && user.password.equals(req.password)) {
            return ResponseDTO.ok(
                    "User login successful",
                    jwtService.generateToken(user.name,"USER")
            );
        }

        return ResponseDTO.error("Invalid credentials");
    }
}
