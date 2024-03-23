Event Handler:

link:(will be there after deployment).com/api/Jstacart/

Basically, all request are using the same link, the handler will send the request to different database and collection by checking the header of each request.
So making sure the header contains the correct keys and values are the task of user of this API.
The following will explain each request with the behavior of handler under different headers.

GET request:
  - users collection access
      - headers {
          "collection": "users",
          "search": "<Choose one from the array>"  //["all", "name"],
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "name": "<name to search>"    // Not needed if "all" is used in the search method in header
        }
      - Return the list of users or one user depends on the choice
  - products collection access
      - headers {
          "collection": "products",
          "search": "<Choose one from the array>"  //["all", "id", "category", "store", "both"]
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "id": "<id>"    // Needed only when id is selected,
          "category": "<category>"  //Needed only when category or both is selected,
          "store":"<store>" //Needed only when store or both is selected 
        }
      - Return the list of users or one user depends on the choice
  - orders collection access
      - headers {
          "collection": "orders",
          "search": "<Choose one from the array>"  //["all", "_id", "email"],
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "_id": "<id to search>"    // Needed only when id is selected,
          "email": "<email>"        //Needed only when email is selected
        }
      - Return the list of users or one user depends on the choice
    
POST request:
  - users collection access
      - headers {
          "collection": "users",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          user object, details check ./BackendR/model/userModel. Email and Name attributes are essential, others can be null or absent 
        }
      - Return may be null, msg for fail task
  - products collection access
      - headers {
          "collection": "products",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          product object, details check ./BackendR/model/productsModel. id, name and price attributes are essential, other can be null or absent   
        }
      - Return maybe null, msg for fail task
  - orders collection access
      - headers {
          "collection": "orders",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          product object, details check ./BackendR/model/orderModel. customerEmail, customerName, productID, quantity, paymentMethod, and status attributes are essential, other can be null or absent   
        }
      - Return maybe null for success, msg for fail task
   
DELETE request:
  - users collection access
      - headers {
          "collection": "users",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "email": "<email>"
        }
      - Return maybe null, msg for fail task
  - products collection access
      - headers {
          "collection": "products",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "id":"<id>"
        }
      - Return maybe null, msg for fail task
  - orders collection access
      - headers {
          "collection": "orders",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "objectID":"<objectID of order>",
          "email":<customerEmail of order>
        }
      - Return maybe null, msg for fail task

PATCH request:
  - users collection access
      - headers {
          "collection": "users",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "email": "<email>",
          "body":{body to update}
        }
      - Return maybe null, msg for fail task
  - products collection access
      - headers {
          "collection": "products",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "id":"<id>",
          "body":{body to update}
        }
      - Return maybe null, msg for fail task
  - orders collection access
      - headers {
          "collection": "orders",
          "sender": "<who are you>"  //["database","web"]
        }
      - body {
          "objectID":"<objectID of order>",
          "email":<customerEmail of order>,
          "body":{body of the object to update}
        }
      - Return maybe null, msg for fail task
   
Above guidelines will change according to the project progress.
If the waiting time long, it may cause by the round robin of free tier at the server side.
If face any problems, check the error message first, if have further problems, make down the time, input of the error, what you are trying to do, and send a message to Chun Lok Chan
