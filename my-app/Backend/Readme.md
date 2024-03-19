https://github.com/lokkochan/seng401backend

The source code of backend for READ database is as above and is successfully deployed as following link:
https://seng401jstacartread.onrender.com

Access users collection:
https://seng401jstacartread.onrender.com/api/Jstacart/users
  GET:
  - default : return all users
  - /:email : return user that is belongs to that email
  
  POST:
  - default : add user information, will check if the email exist or not
  
  DELETE:
  - /:email : remove user by the email
  
  PATCH:
  - /:email : update that user with info from body

Access products collection:
https://seng401jstacartread.onrender.com/api/Jstacart/products
  GET:
  - default : return all products
  - /:ID : return product that is belongs to that ID
  
  POST:
  - default : add product information, will check if the ID exist or not
  
  DELETE:
  - /:ID : remove product by the ID
  
  PATCH:
  - /:ID : update that product with info from body

Access orders collection:
https://seng401jstacartread.onrender.com/api/Jstacart/orders

  GET:
  - default : return all orders
  - /:email : return orders that is belongs to that email
  
  POST:
  - default : add order
  
  DELETE:
  - /:objectID/:email : remove order by the objectID and email
  
  PATCH:
  - /:objectID/:email : update order by the objectID and email
