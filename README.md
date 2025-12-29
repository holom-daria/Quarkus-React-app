This project is a full-stack app with real role based authentication, database persistence, and advanced business logic.
The project goes beyond basic CRUD operations by implementing JWT authentication, role based access control, business rules, and dynamic frontend behavior.
 
**1.	Technologies used:**
Backend: Java, Quarkus, Hibernate ORM, PostgreSQL, JWT
Frontend: React, React Router, Fetch API

**2.	Project features:**
The system supports two types of users: admins(manage books, borrowers, and borrowings) and users (browse books, borrow and return them, and view their own history)

This project implements real authentication:
-JWT authentication
-tokens stored in browser
-role based access using @RolesAllowed
-backend gets user identity from the JWT (SecurityIdentity)
- role is embedded in the signed JWT and enforced server-side via @RolesAllowed

All data is stored in PostgreSQL. 
Borrowing, returning, rating changes are persisted instantly. 
Page refresh or app restart does not reset state
Borrowing overdue detection is handled in backend.
Books ISBN is generated automatically and preserved on updates.
Admin and user actions return success / error feedback (based on backend response).

**3.Business logic:**
Borrower rating system:
-starts at 5
-late return=>user’s rating decreases by 1
-user has rating 0=>he can no longer borrow 

Borrowing Flow:
-select borrowing duration (max 14 days)
-return book shows:days late, updated rating
-backend enforces all constraints (not frontend)

User Features:
-view available books (only truly available)
-borrow books with duration selection
-view current borrowings(with overdue status)
-view borrowing history(returned/not returned)
-pop-up feedback for all actions

Admin features:
-full book management(add, update, delete)
-search books by title, author, genre
-see availability and who borrowed each book
-manage borrowers with search
-view overdue borrowings
-view full borrower history in detailed tables

**4.	How to run**
Project needs:  Java 17+, Maven, node.js (v18+) & npm, PostgreSQL (default port 5432), database creation and configuration in application.properties
Run backend with: mvn quarkus:dev
Backend will run on port 8081

**5. Screenshots**
**5.1 LOGIN AND SIGN IN**
 ![Login](appScreenshots/LOGIN.png)
![Signup ERROR](appScreenshots/SIGNUP1.png)
![Signup WARNING](appScreenshots/SIGNUP2.png)
![Signup SUCCESS](appScreenshots/SIGNUP3.png)
**5.2 USER**
![User menu](appScreenshots/USERMENU.png)
![(User) available books](appScreenshots/USERavailable.png)
![(User) borrow book](appScreenshots/USERborrow.png)
![(User) borrow selection](appScreenshots/USERborrow2.png)
![(User) borrow succesful](appScreenshots/USERborrowSUCCESS.png)
![(User) borrow error](appScreenshots/USERborrowERROR.png)
![(User) current borrowings](appScreenshots/USERcurrent.png)
![(User) borrowing history](appScreenshots/USERhistory.png)
![(User) return book](appScreenshots/USERreturn.png)
**5.3 ADMIN**
![Admin menu](appScreenshots/ADMINMENU.png)
![(Admin) add book](appScreenshots/ADMINaddbook.png)
![(Admin) all books](appScreenshots/ADMINallbooks.png)
![(Admin) all borrowers](appScreenshots/ADMINallborrowers.png)
![(Admin) search borrowers](appScreenshots/ADMINallborrowers2.png)
![(Admin) delete book ERROR](appScreenshots/ADMINdeleteERROR.png)
![(Admin) delete book SUCCESS](appScreenshots/ADMINdeleteSUCCESS.png)
![(Admin) serach book by genre](appScreenshots/ADMINgenre.png)
![(Admin) view overdue books](appScreenshots/ADMINoverdue.png)
![(Admin) update book SUCCESS](appScreenshots/ADMINupdateSUCCESS.png)
![(Admin) update book ERROR](appScreenshots/ADMINupdateERROR.png)












   
Run frontend: npm run dev
Frontend will run on port 5173
