# NOTES

1. We can check GET request on browser itself but for other we need to connect with some frontend or postman.
2. req, res, middleware
3. MVC model - model, view, controller
4. Adding req, res to arrow function = making it callback function
5. Middleware is a function that runs before the route handler and after all routes have been defined in app.js file (before any of them) --- app.use act as middleware
6.   ```userModel.findOne({email: req.body.email})``` --- we will find user by Email and the email we will get from the client which will access using req.body.email field
7. ```bcrypt.genSalt(10)``` -- how many round we need to encrypt

    ```bcrypt.hash(req.body.password, salt)``` -- now hashing the password

    ```req.body.password = hashedPassword```   --- replacing the original password with hashed password
8. ```comparePassword = bcrypt.compare(req.body.password, user.password)``` --- first parameter is from entered field and second parameter is from the database 

