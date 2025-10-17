### Features to be added ###
- Caching
- Input Validation(easy... I'm just too lazy to do it now)

### Features that are currently included in this project ###
- JWT authentication with refresh tokens
- Token invalidation with token versioning for immediate logouts
- Role based user access(admins and users)
- Search, filtering(by date such as start date or end date), and sorting
- Password hasing with bcrypt
- Basic rate limiting with express-rate-limit
- Basic logging with morgan
- Modular project structure with minimal code in a single file


### Tech Stack ###
- Node.js
- Express
- MongoDB
- JWT
- Bcrypt

### API Documentation ###

- '/api/auth' (Auth routes such as login, signup, refresh and logout. You can just add these names behind 'api/auth')
- '/api/notes' (Routes related to notes such as update, create, delete and read)

'/api/auth/signup' - Method(POST), It do the signup
'/api/auth/login' - Method(POST), It do the login
'/api/auth/refresh' - Method(POST), It refreshes the access token using refresh token
'/api/auth/logout' - Method(POST), It logouts the user and updates the token version

'/api/notes' - Methods(POST and GET), Use GET to get note list, POST to create a new note
'/api/notes/:id' - Methods(PUT and DELETE), Use PUT to update a specific note, DELETE to delete a specific note.
