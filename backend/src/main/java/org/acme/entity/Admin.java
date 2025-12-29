package org.acme.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @NotBlank
    @Column(unique = true)
    public String username;

    @NotBlank
    public String password;
}
