# Online House Selling
Property or house listing

# Route List

### Auth API
List of auth routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /signin             | POST     | Sign user                    |
| /signup         | POST    | Signup                    |

### House API
List of todo routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /houses/            | GET     | Get all house                   |
| /houses/:id         | GET    | Get house by id                   |
| /houses/name         | GET    | Get house by name                   |
| /houses/location         | GET    | Get house by location                   |
| /houses/seller/:seller         | GET    | Get house by seller                   |
| /houses/add         | POST    | Add new house                    |
| /houses/:id         | PUT    | Edit one house by id                    |
| /houses/:id         | DELETE    | Delete a house by id                    |
