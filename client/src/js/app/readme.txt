1. When the user requests the www.hellovinci.com/chat, the chat.handlebars is rendered. It uses the ‘client’ template of handlebars. The ‘client’ template has the ‘specifications’ and other view templates inside it.

2. When the user sends the request from the front end, the askapiai(chat_input) function is called inside main.js

3. The function is defined inside request_reply.js. It first creates the local_storage objects for ‘active_list’ and ‘all_discussed_list’. Then it fetches the value inside them and sends it to the backend along with the message

4. This function also processes the reply that is received from the backend.

5. Once the reply is received from the backend, we check for 3 conditions
5.1 Whether webhook (batman






Old readme


1. Created a zlatan object for the reply received from the backend. This is only for cases where
webhook is used and api ai status code returned is 200

2. The zlatan object is then passed to the zlatan_router function

3. zlatan_router checks the query status of the data returned by the backend and calls the appropriate function to create the context object from zlatan, call the relevant handlebars script and create the element

4. If the status code returned is 100, we need to create the product. We call the get_product function and pass it the zlatan object

5. Now we might have a scenario wherein the user has requested multiple mobiles. So the zlatan mobiles field may have multiple mobiles and further multiple variants for each mobile

6. We call forEach function on the zlatan mobiles array to build the element for each mobile



***** Creating the product element *****

a. Set load status to 0

b. Call the set_id function. In the request id array set the new id for the current_index

c. Call the case_special_product to check if it is a new product or a reload. This is done on the basis of load_status. Then select the function to fetch the relevant variant accordingly

d. Once we get the selected_variant from the figo.js, we get the title, features, pricing, retailers etc. and all other information from the selected variant


