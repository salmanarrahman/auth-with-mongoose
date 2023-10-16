# l2b1a4-cow-hut-admin-auth-salmanarrahman
l2b1a4-cow-hut-admin-auth-salmanarrahman created by GitHub Classroom


Live link 

https://eid-hut-saallu.vercel.app


Application Routes:

Auth (User)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/login (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/signup (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/refresh-token (POST)
Auth (Admin)
Route: https://eid-hut-saallu.vercel.app/api/v1/admins/create-admin (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/admins/login (POST)

BOTH ADMIN LOGIN AND USER LOGIN SHOULD BE DONE WITH PHONE NUMBER AND PASSWORD,

YOU MUST LOGIN TO GENERATE NEW ACCESS TOKEN.

header key should be "authorization" and value is access token.

USER :

https://eid-hut-saallu.vercel.app/api/v1/users [GET]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [SINGLE USER GET]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [PATCH]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [DELETE]

COWS : 

https://eid-hut-saallu.vercel.app/api/v1/cows/create-cow [POST]

https://eid-hut-saallu.vercel.app/api/v1/cows [GET]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [single get]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [patch]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [delete]









