<!-- # API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. -->
## API Endpoints

### Products

- Index `GET /products`
- Show `GET /products/:id`
- Create [token required] `POST /products`
- Top 5 most popular products `GET /products/mostpeopular`
- Products by category (args: product category) `GET /products/category/:category`

## Users

- Index [token required] `GET /users` - get all users requiring a token
- Show [token required] `GET /users/:id` - get a single user requiring a token
- Create N[token required] `POST /users` - create a new user
- login args: email, password `POST /users/login` - login a user

## Orders

- Current Order by user [args: user id](token required) `GET /orders/:user_id`
- [OPTIONAL] Completed Orders by user [args: user id](token required) `GET /orders/:user_id/completed`
- [OPTIONAL] Create Order [args: user id](token required) `POST /orders`
- update Order [args:( user_id, order_id)](token required) `PUT /orders/:user_id/:order_id`

## Data Shapes

#### Product

- id
- name
- price
- description
- category
- created_at
-updated_at
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- email
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete, pending or completed)
