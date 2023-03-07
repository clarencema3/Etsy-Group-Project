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


## FauxComments

* A logged in user may delete one of their own FauxComments, removing it from the list of visible FauxComments without causing a refresh/redirect.

  * `DELETE /api/fauxcomments/:id`

## FauxLikes

* A logged in user can FauxLike or FauxUnlike a FauxTweet or FauxComment with visible confirmation without causing a refresh/redirect.
  
  * `POST /api/fauxtweets/:id/likes`
  * `POST /api/fauxcomments/:id/likes`
  * `DELETE /api/fauxtweets/:id/likes`
  * `DELETE /api/fauxcomments/:id/likes`