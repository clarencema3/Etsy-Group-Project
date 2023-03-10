# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Etsy

### Viewing Products

* As a logged in _or_ logged out user, I want to be able to view all products for sale on the website.
  * When I'm on the `/` page:
    * I can view all products and their prices

* As a logged in _or_ logged out user, I want to be able to view a specific product and its associated reviews and ratings.
  * When I'm on the `/products/:id` page:
    * I can view the content of the product, as well as the associated reviews and ratings.
      * I can view any images (up to 5) uploaded for the product in a slideshow?
      * I can view the description, highlights, seller, price, if stock is low?
      * I can add a specific quantity of the product to the cart
      * I can view the delivery date and returns policy

### Add to shopping cart

* As a logged in user, I want to be able to add products to my shopping cart by selecting a quantity (and possibly other attributes) and clicking add to cart.
* As a logged out user, clicking add to cart or cart nav button would redirect or show modal to sign in
  * When I'm on the `/cart` page:
    * If my cart is empty I will see a message saying "Your cart is empty"
    * Otherwise, I can view all items that have been added to my cart
      * Each item card will show:
        * Picture of item
        * Name of the item
        * Quantity of the item
        * Price
        * Stock left if below specific amount
        * Edit item button
        * Remove Item button
        * Estimated delivery date
    * I can view the cart items total cost, shipping and subtotal
    * I can click proceed to checkout when I want place order

### Edit items in shopping cart

* As a logged in user, I want to be able to edit items in the cart.
  * When I'm on the `/cart` page:
    * I can click edit on each item to edit any attributes if applicable
    * I can change the quantity by clicking the dropdown
    * I can add an optional note to the seller

### Delete items in shopping cart

* As a logged in user, I want to be able to delete any products in the cart.
  * When I'm on the `/cart` page:
    * I can click "remove" to  remove a product from my cart.

### Create New Order

* As a logged in user, I want to be able to proceed to checkout and create an order.
  * When I'm on the `/cart/checkout` page:
    * There will be a form asking for the below:
      * First Name
      * Last Name
      * Address
      * City
      * State
      * Zipcode
      * Credit Card Info
    * If form is filled out incorrectly, I want to be validated which fields are incorrect
    * If form is okay, I can click confirm order and be redirected to a page showing "order placed successfully"

### Manage Orders

* As a logged in user, I want to be able to click manage orders in nav profile dropdown.
  * When I'm on the `/purchases` page:
    * I can view all orders that I have previously placed

### Create New Product

* As a logged in user, I want to be able to sell a new product on the website.
  * When I'm on the `/product/new` page:
    * There will be a form asking for the below:
      * Product name
      * Description
      * Price
      * Stock
      * Preview image
      * product image1
      * product image2
      * product image3
      * product image4
    * If form is filled out incorrectly I want to be validated which fields are incorrect

### Manage Products

* As a logged in user, I want to be able to click manage orders in nav profile dropdown.
  * When I'm on the `/products/current` page:
    * I can view all products that I have listed for sale
    * Each card shows a picture, product name, quantity and price
    * I can click "edit" to edit details of an item
    * I can click "delete" to delete an item

### Updating Product

* As a logged in user, I want to be able to update a product I am selling on the website.
  * When I'm on the `/products/:id/edit` page:
    * It will show a similar form to create a product but with data prefilled
    * If form is filled out incorrectly, I want to be validated which fields are incorrect

### Deleting Product

* As a logged in user, I want to be able to delete a product I am selling on the website.
  * When I'm on the `/products/current` page:
    * I can click "Delete" to permanently delete a product I have posted.


### Posting a review on Product

* As a logged in user, I want to be able to post a review on a product that I have not listed
  * When I'm on the `/products/:id` page:
    * I can click "Post a review" to type a review and rate the item from 1 - 5 stars

### Deleting a review Product

* As a logged in user, I want to be able to delete a review on a product that I posted
 * When I'm on the `/products/:id` page:
  * I can click "delete" and be prompted to confirm I want to delete my review
