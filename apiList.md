# DevTinder API

## authRouter

-POST/signup
-POST/login
-POST/logout

## profileRouter

-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter

-POST/request/send/:status/:userId

<!-- status interested/ignored -->

-POST/request/review/:status/:requestId

<!-- status accepted/rejected -->

## userRouter

-GET/user/requests/recevied
-GET/user/connections
-GET/user/feed -gets you the profile of other users on platform

status: ignore, interested, accepted, rejected
