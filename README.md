# social-media-backend-user

In the Project I have implemented the micro service backend for social media( few module). For the technolgy stack, I have used NodeJS, Express, Axios, NoSQL(MongoClient).

The project has 2 modules.
1. User Module
2. Post Module

The database has 3 Collections.
-Followers
	{
		email: "abcd@gmail.com",
		following: "pqr@gmail.com"
	}
-Posts:
	{
		post_id:"2c965246-8699-4e65-9634-529a04046614"
		postedBy:"xyz2@gmail.com"
		text:"hello3_auth"
		createdAt:"2021-09-26T16:48:21.878Z"
	}
-Users:
	{
		name:"hon"
		email:"abcd@gmail.com"
		password:"an@123"
		phoneNo:"8734912425"
		isAdmin:true
	}
	
	
The UserModule has following functionalities:
- User Login, logout, and jwt autentication.
- Funtions - createUser, getAllUser, getSingleUser, 	 updateUser, deleteUser

The PostModule has following functionalities:
- Funtions - createFollower, getFollowing, getFOllower, userSearchHistory

Note: I am working with backend for last 2 years, and so I prefer to work as backend engineer. Though I am familier with Angluar, Currently I am not able to create the UI. Saying this I might need to polish my frontend skills, whenever I again start working on it. For the Frontend I am familier with HTML, CSS, Javascript/typescript and angular material design.