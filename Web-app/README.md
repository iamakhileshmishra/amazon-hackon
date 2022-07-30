# amazon eCommerce Platform    [Open deployment](https://cool-as-code.herokuapp.com/)

<img width="843" alt="image" src="https://user-images.githubusercontent.com/79476272/181875340-0f639332-0b55-4078-a720-4c672eccf66d.png">
<img width="839" alt="image" src="https://user-images.githubusercontent.com/79476272/181875361-58627bc2-ff66-42c8-9ea2-f4a065907931.png">
<img width="842" alt="image" src="https://user-images.githubusercontent.com/79476272/181875379-c51e8ef3-692c-4a02-a9d4-a5c4b83715a4.png">


## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@gmail.com (Admin)
123456

john@gmail.com (Customer)
123456


```
# While Checkout choose Credit Card Payment Option And Proceed as given below
```
## Sample Credit Card Details for Dummy Payment 

Card Number 4929711230757389
Expiry Date : Any Future Date (ex:- 10/25)
CVV - 123

## Shipping Address Any US Address 

Ex-
Street:  2935 Richland Avenue
City:  Spring
State/province/area:   Texas
Phone number  281-364-8576
Email :- random@gmail.com
Zip code  77386
Country calling code  +1
Country  United States

```
