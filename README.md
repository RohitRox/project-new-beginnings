### Project: New Beginnings

A clinical trial codenamed ​New Beginnings​ is in planning and hopes to enrol 100,000 individuals over five years. In order to protect the personal information of individuals and to prevent mistakes, each individual who agrees to participate in the study will be assigned a unique reference number. For each participant in New Beginnings we need to capture the following information:

  - Name
  - Date of birth
  - Phone number
  - Address

New Beginnings will communicate with participants using a number of different mechanisms, including physical letters, SMS, and phone calls. All communication will include a participants reference number so that they can easily locate it, should they need to contact New Beginnings. When administrators of New Beginnings need to find personal information about a specific participant, they will request the participant’s reference number. The reference number should be as short as possible, and it should be difficult for a participant to make a mistake when providing their reference number and accidentally provide another participant's reference number (i.e. if they miss-spoke on the telephone, or pressed the wrong key on a device).

As an example, an individual named Jane Doe might be assigned the reference number KFG-734 which will be used to uniquely identify Jane Doe throughout the length of their participation in New Beginnings. After some period of time, Jane Doe moves house and needs to inform New Beginnings that she has changed address. Jane rings up the New Beginnings call center and provides the reference number KFG-734. The call center staff member enters the number Jane provides, and confirms they are speaking to the right Jane Doe, before updating their address.

### System Environment and Development

The project is built using **NodeJs**, **ExpressJS** and **Typescript** on Node version `v15.5.1`

Setting up Project in Local machine:

```bash
  # install dependencies 
  $ npm install 

  # running tests
  $ npm test

  # start dev server, default port 8000
  $ npm start dev 
```

Production usage:

```bash
  # compile typescript 
  $ npm run build

  # start sever in production mode
  $ npm run prod
```

**Storage:** The storage layer provided is temporary memory based and is implemented by `MemoryStore` class. This layer can be easily replaced by prefered Database adapter/class that adheres to `IStore` interface, without requiring any changed in models/controllers.

**Reference Number/Unique Id** The unique identifier is generated by package `nanoid` for the moment. Helper function `uid` is provided to setup nanoid with desired alpha-numeric combination. However this is temporary. 
As there is already a separate microservice with an API that can be used to allocate unique reference numbers to new participants, the system designed to allow this microservice to be plugged in. The whole process relating to id generation and assignment already incorporates async/await so that there will be minimal change required, and only in the id generation module.
 
### API Docs

**Method/Path:** `GET /api/users/ABC123`
**Description:** Get/Find user

Sample Response Body: 
```json
  {
    "id": "3DA328",
    "phone_number": "537632333",
    "date_of_birth": "2011-21-03",
    "address": {
      "zip": "RG13BE",
      "address_line_1": "Abbey Road",
      "address_line_2": ""
    }
  }
```

**Method/Path:** `POST /api/users`
**Description:** Create new user

Sample Request Body: 
```json
  {
    "date_of_birth": "2011-21-03",
    "phone_number": "537632333",
    "address": {
      "zip": "RG13BE",
      "address_line_1": "Abbey Road"
    }
  }
```

Sample Response Body: 
```json
  {
    "message": "User created",
    "user": {
      "id": "ABC123",
      "phone_number": "537632333",
      "date_of_birth": "2011-21-03",
      "address": {
        "zip": "RG13BE",
        "address_line_1": "Abbey Road",
        "address_line_2": ""
      }
    }
  }
```

Sample Invalid Request Body: 
```json
  {
    "date_of_birth": "2011-21",
    "phone_number": "537632333",
    "address": {
      "zip": "",
      "address_line_1": "Abbey Road"
    }
  }
```

Sample Failed Response Body: 
```json
  {
    "message": "Invalid date format, Post/Zip code is required"
  }
```

**Method/Path:** `PUT /api/users/ABC123`
**Description:** Update user

Sample Request Body: 
```json
  {
    "date_of_birth": "2011-21-04",
    "phone_number": "537632333",
    "address": {
      "zip": "RG13BE",
      "address_line_1": "Abbey Rd"
    }
  }
```

Sample Response Body:
```json
  {
    "message": "User updated",
    "user": {
      "id": "ABC123",
      "phone_number": "537632333",
      "date_of_birth": "2011-21-04",
      "address": {
        "zip": "RG13BE",
        "address_line_1": "Abbey Rd"
      }
    }
  }
```

**Method/Path:** `DELETE /api/users/ABC123`
**Description:** Delete user

Sample Response Body:
```json
  {
    "message": "User deleted"
  }
```

### Design Principles and Patterns

- Single-responsibility principle 
- Slim Controller - Fat Models/Libs
- Test Pyramid with unit tests at bottom and integration tests at the top
- Various Design Patterns like Singleton, Adapter, Inheritance, Composition
- Typescript generics and interfaces
- JSON Logging
- Validate and Sanitize every incoming input
- Gracefully handle all possible errors

### TODOs and Improvements

- Test depth and coverage
- `MemoryStore` could be improved to handle concurrent update for same id
- All Status code in except in `get` action return 422 in case of failures. This could be improved to return appropriate status code based on errors
- Field validations like valid zip codes, phone number can be improved to cater various formats
- Code is not linted
- Service could be dockerized