# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## User Authentication/Authorization

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

* Returns the information about the current user that is logged in.
* Require Authentication: true

  * `GET /api/session`


## Products


### Get all Products

* Returns information about all of the products
* Require Authentication: false

  * `GET /api/products`


### Get all Products owned by the Current User

* Returns information about all of the products owned by the current user
* Require Authentication: true

  * `GET /api/products/current`


### Get details of a Product from an id

* Returns the details of a product specified by its id.
* Require Authentication: false

  * `GET /api/products/:productId`


### Add a Product

* Creates and returns a new product
* Require Authentication: true

  * `POST /api/products`


### Add an Image to a Product based on the Product's id

* Create and return a new image for a product specified by id
* Require Authentication: true

  * `POST /api/products/:productId/images`


### Edit a Product

* Updates and returns an existing product
* Require Authentication: true

  * `PUT /api/products/:productId`


### Delete a Product

* Deletes an existing product
* Require Authentication: true

  * `DELETE /api/products/:productId`




