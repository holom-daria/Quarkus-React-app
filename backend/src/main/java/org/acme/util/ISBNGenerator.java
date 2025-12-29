package org.acme.util;


import jakarta.enterprise.context.ApplicationScoped;
import java.util.Random;

@ApplicationScoped
public class ISBNGenerator {
    public String generateISBN() {
        Random random=new Random();
        long number=1000000000000L+(long)(random.nextDouble() * 9000000000000L);
        return "978-"+number;
    }
}
