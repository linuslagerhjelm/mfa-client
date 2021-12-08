# MFA Client
This repository hosts the source code for a client that can call a backend to signup and login with
an API that uses a TOTP based MFA solution.

## Get it upp and running

This project is built with `npm` and you must have it installed on your system in order to start the client.

To get started:

1. `npm ci`
2. `npm start`
3. Navigate to [http://localhost:3005](http://localhost:3005)


## API Documentation

This section explains the details of the API that this client expects the backend to use. 

First of all, the client assumes that the backend is reachable on [http://localhost:5000](http://localhost:5000). This is configurable by changing the url in [src/api/user.ts](src/api/user.ts).

The client expects the following endpoints/request methods on the server:

### POST/users
Used to register a new user to the system. The user submits the username and password that they will be using later to sign in to the system. After a successfull call to this endpoint, a new user with the specified username and password will have been registered on the server. The server will also have registered a MFA secret and stored for later retreival. 

The server responds to this request with a key uri compatible string that the client will use to render a QR code.

Example request body:
```
{
  "email": "user@example.com",
  "password": "AVeryStrongPassword"
}
```

Example response:
```
{
  "qr_material": "otpauth://totp/KompPassMfa:user?secret=NSDOX2NWV2QUH6KRAZYCEDRABDDF4OZF&issuer=KompPassMfa"
}
```
### POST/sessions
The first step in the login process. This request initiates the creation of a new session for the user. The client sends the credentials in the request body, which are to be validated against the credentials stored on the server. Should this verification pass, the server responds with a case id that the client will use in subsequent requests. 

Example request body:
```
{
  "email": "user@example.com",
  "password": "AVeryStrongPassword"
}
```

Example response:
```
{
  "case_id": "1cyowSalJVv2hbCX5ZeT9HtEOTZwUNeyDZy2zbQhSyxGXzFu5B7WB+ZvmW7ND8FSR7PSFVpXz9tHsAESTZMGFQ=="
}
```

### PUT/sessions
The second step in the login process. This request requres that `POST/sessions` was successful. The client sends the current MFA code to the server along with the case_id that was previously aquired. The server validates that the MFA token is valid for this user. After this request has been completed successfully, the server responds with a session id, that the client can use in subsequent request to prove that they already authenticated.

Example request body:
```
{
  "case_id":"TxWh30ue53Xf+44S8G4aNuFxT+aO9d3eQcz7LYEdulDHT5Gig7QFEmKu0RDl9VvETbbocfwQOm+GP87qcDZLsw==",
  "token":"048285"
}
```

Example response:
```
{
  "session_id": "YNultrquZh+qQfN+R02odvaJnGWIU012LvXZpTzXs/bRyqAq+89it+ApiB291K7BDQTS96Rk7uc057w9tkZVSg=="
}
```

### GET/users
Lists the registered users in the system. This endpoint requires authenticated access. Access to this endpoint is granted to clients that provides a valid session id in the authorization header. Such an id can be aquired by going through the login sequence described above.

Example response:
```
{
  "registered_users": [
        "admin"
    ]
}
```

## Third party libraries
Implementation of the TOTP algorithm on the server should probably be done by introducing a third party dependency. Below are some suggestions for various programming languages:

- Python: [https://github.com/pyauth/pyotp](https://github.com/pyauth/pyotp) (Verified)
- Java: [https://github.com/samdjstevens/java-totp](https://github.com/samdjstevens/java-totp)
- C#: [https://github.com/kspearrin/Otp.NET](https://github.com/kspearrin/Otp.NET)
- node.js: [https://github.com/yeojz/otplib](https://github.com/yeojz/otplib)

