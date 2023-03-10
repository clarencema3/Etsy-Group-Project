# User-facing routes

## `/login`

### Log in page

This page displays a log in form

- `GET /login`
- `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

- `GET /signup`
- `POST /signup`

## `/`

This page will display cards/previews of products from our products table, as well as a navigation bar with login/signup or logout buttons. Both logged out & Logged in users can click an image card and get directed to a product page. The top of the page will have a search bar. It will also have a list of clickable categories underneath the top nav bar.

- `GET /`
- `POST /fauxtweets/:id/fauxlikes`
- `DELETE /fauxtweets/:id/fauxlikes`

## `/products/current`

This page displays a form with which a logged in user can craft a new FauxTweet, as well as a navigation bar with login/signup or logout buttons.

- `POST /fauxtweets`

## `/products/:id`

- `GET /products/:id`
- `POST /products/new`
- `EDIT /products/:id/edit`
- `DELETE /products/:id`

This page displays individual FauxTweets with associated FauxComments and FauxLikes, as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the FauxTweet, this page also displays an update and delete button. Logged in users can FauxLike the FauxTweet and FauxComments on this page, and can post FauxComments. The logged in owners of those FauxComments can update or delete them.

## `/cart`

- `GET /fauxtweets/:id`
- `POST /fauxtweets/:id/fauxlikes`
- `DELETE /fauxtweets/:id/fauxlikes`
- `POST /fauxtweets/:id/fauxcomments`
- `DELETE /fauxtweets/:id/fauxcomments`
