# MVP List

Etsy clone is a website for users to purchase and sell products to other users.

## 0. Login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like selling/updating/deleting an item).
* Logged in users stay on current page.
* Logged out users are directed to home page.

## 1. Product listing

* All users (logged/not logged in) can view all products available for purchase.
* Logged in users create/update/delete their own products.
* Product listing page should show a product card for each product for sale showing:
    * a picture, name, star rating, number of reviews, cost, seller, quantity (if low), free shipping (if free) and Etsy label? (ex. Etsy's Pick, Bestseller)
* Single product page:
    * Slide show of pictures of product
    * to the right of slideshow: price, availability, short description, seller, number of sales, start rating, add to cart button, shipping info, highlights, long description
    * below slide show: number of reviews and star rating with % of each start rating
    * below slide show: reviews from each user with star rating, comment, user, replies from seller, purchased item, user who posted comment, date



## 2. Shopping Cart

* All users (logged/not logged in) can add a product to their personal cart if all select fields are filled in
* When added to cart, Modal pops up showing added to cart with picture, name, price, go to cart button, and other items from this shop
* When cart is empty: Cart page says Cart is empty
* When item in cart: Shows item card containing: item picture, item name, specs of item, edit button, save for later button, remove item button, quantity drop down, contact shop button, price, number of people who have item in cart?, sale %, gift checkbox, apply coupon, note, and estimated delivery
* When item is in cart can edit/remove. Editing allows you to change type of item chosen (ex. size, color, note etc)
* to the right of item cards: How you'll pay with options as check boxes, item(s) total price, total discounts, subtotal, proceed to checkout
* If not logged in: Modal pops up when proceed to checkout button clicked to continue as guest or signup

## 3. Reviews

* Logged in users can post reviews on products if they are not the owner/seller of the product.
* All (logged/not logged in) users can view reviews.

* To-do:
    
    * Users will be able to edit their reviews on products
    * Users will be able to delete their reviews on products.


## 4. Orders

* Logged in users can make purchases for items in their shopping cart.
* Logged in users will be able to view items they have purchased.

## Future features:

### 5. Search 

* All (logged/not logged in) users can search items.
* Searching brings up a product listing page whos names or category include search criteria


### 6. Categories 

* Separates product listing into categories based on item type/category


### 7. Bonus Favorites 

* Logged in user can favorite an item by click heart in top right corner, if favorited heart is filled with red
* If not logged in must sign in or sign up using modal
* When favorited a modal pops up showing successfully added
* favorites show an item card with picture, item name, seller and price
