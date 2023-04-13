# Petsy (Etsy-Clone)

Hi Welcome to Petsy, our clone of Etsy built by [Sean Baeyens](https://www.linkedin.com/in/sean-baeyens/), [Clarence Ma](https://github.com/clarencema3), [Anton Do](https://www.linkedin.com/in/anton-do/), and [Jordan Blancaflor](https://www.linkedin.com/in/jordan-blancaflor-a4577584/)

##Technologies & Libraries Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Wiki
- [Redux Store](https://github.com/clarencema3/Etsy-Group-Project/wiki#example-redux-state)
- [Backend Routes](https://github.com/clarencema3/Etsy-Group-Project/wiki/Backend-Routes)
- [Frontend Routes](https://github.com/clarencema3/Etsy-Group-Project/wiki/Frontend-Route)
- [User Stories](https://github.com/clarencema3/Etsy-Group-Project/wiki/User-Stories)
- [Schema](https://github.com/clarencema3/Etsy-Group-Project/wiki/Schema)

## Overview & Functionality:
**Note: You can log in using the Demo User to experience all of the sites features.**

### Account Signup and login:
**Note: You can log in using the Demo User to experience all of the sites features.
- Users can create a new account or sign in with an existing account.

### Browsing and Purchasing Products:
**Note: Must be logged in to use cart & manage purchase functionality. You can log in using the Demo User to experience all of the sites features.
**Note: For ease of use, we do not collect any shipping or purchase info in order to make a purchase
- Add items to your cart
  - Items are automatically limited by the amount they currently have in stock
  - Your cart icon will update to show the total amount of items currently in your cart
  - View your full cart and full price before checkout
 - Purchase items
  - After purchasing an item get re-directed to your purchases.
  - See a record of your purchases that record the cost at the time of purchase.

### Seller Functionality:
**Note: You can log in using the Demo User to experience all of the sites features.
- A user can visiting their [manage store page](https://aa-flask-project.onrender.com/products/current) or clicking the Store icon in the navbar.
- From this page, you can click the "+ Add a product to your store" button to add a new product.
- Users can delete/remove items that they are selling and it will be removed from their store and from the entire site.
- Users can click the edit button for an individual product to open a modal that allows them to edit individual aspects of the product. The form will be pre-loaded with the existing values for that item.

### Review Functionality:
- From an [individual product page](https://aa-flask-project.onrender.com/products/1) a user can add a new review.
- Logged out users and owners of the product are restricted from leaving a review
- Users can add, edit or delete their reviews
- A products rating is dynamically updated as new reviews are added


## Future Implementations (Future features to add that were cut from V1 scope)
- After a purchase is made the stock of an item should decrement by the appropriate amount.
- Search functionality.
- Adding a shipping and payment feature.
- Addition of product categories for easier browsing.
