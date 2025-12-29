//package org.acme;
//
//import com.google.common.net.HttpHeaders;
//import io.quarkus.test.junit.QuarkusTest;
//import org.junit.jupiter.api.Test;
//import jakarta.ws.rs.core.MediaType;
//import static io.restassured.RestAssured.given;
//import static org.hamcrest.CoreMatchers.is;
//
//@QuarkusTest
//class BookResourceTest {
//    @Test
//    void testGetAllBooks() {
//        given()
//                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
//          .when().get("/api/books")
//          .then()
//             .statusCode(200)
//                .body("size()", is(4));
//
//    }
//    @Test
//    void testGetCount() {
//        given()
//                .header(HttpHeaders.ACCEPT, MediaType.TEXT_PLAIN)
//                .when().get("/api/books/count")
//                .then()
//                .statusCode(200)
//                .body(is("4"));
//
//    }
//
//    @Test
//    void testGetBook() {
//        given()
//                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
//                .pathParam("id",1)
//                .when().get("/api/books/{id}")
//                .then()
//                .statusCode(200)
//                .body("title",is("Narnia"))
//                .body("author",is("Ana M."))
//                .body("yearOfPublication",is(2002))
//                .body("genre",is("SF"));
//
//    }
//
//}