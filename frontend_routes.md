# User-facing routes

## Login

### Log in page

This page displays a log in form

- `GET /login`
- `POST /login`

## Signup

This page displays a signup form.

### Sign up page

- `GET /signup`
- `POST /signup`

## HOME/INDEX PAGE

### Home/Index page

This page will display cards/previews of products from our products table, as well as a navigation bar with login/signup or logout buttons. Both logged out & Logged in users can click an image card and get directed to a product page. The top of the page will have a search bar. It will also have a list of clickable categories underneath the top nav bar.

- `GET /`

## SELLER - MANAGEMENT PRODUCTS

- `GET /products/current`
  This page displays all of the products owned my a seller. It will look exactly the same as the Home/Index Page layout, but will have buttons to Edit or Delete a product on top of each product card.

## SINGLE PRODUCT CRUDS

This page displays an individual Product with associated Reviews, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the Product, this page also displays an update and delete button. Logged in users can leave a Review on this page, and can add a Product to their cart.
(Maybe V2 feature: A user can only leave a review if they have already purchased this product).

- `GET /products/:id`
  This page displays a single product listing.

- `POST /products/new`
  This page displays a form to post a new product.

- `EDIT /products/:id/edit`
  This page displays the same form as the post a new product form, but the fields are prepopulated with the existing data of the product. This page will not allow for updating of images.

- `DELETE`
  This will trigger a modal to confirm whether the user wants to delete the product

## SHOPPING CART`/cart`

This page displays all of the items in a customers cart with options to edit or delete items from the cart. It will also contain a proceed to checkout button which will take a user to the cart/checkout

- `GET /cart`
  A user can visit a page to view all items currently in their cart.

- `POST `
  From a single product page, a user can "add to cart"

- `EDIT /cart`
  This will just be a dropdown option to edit the quantity of the product in the cart.

- `DELETE /cart`
  This will trigger a modal to confirm whether the user wants to delete the product

## REVIEWS

All of these cruds will be done from the product detail page

- `GET `
- `POST `
- `DELETE `

## ORDERS

- `GET /orders`
  This will be a page that displays all of a customers existing order

- `POST cart/checkout`
  This will be a checkout page that takes in user details needed for payment and shipping before an order is posted. Redirects to the /orders page after successful submission.
