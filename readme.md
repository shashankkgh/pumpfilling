Steps for run the application.

- npm i
- npm i nodemon -d
- env file with your credential.
- nodemon index.js
- Once your server is ready and sucessfully connected with the database.


There are curl request you can run this on postman for get Result.

// Curl for save user details

curl -X POST \
  http://localhost:3000/registration \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 105' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: cd464103-c6f1-46d3-81b9-3a10682d97ed,42f0f54b-628f-4b55-a0ec-b96431527c5a' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"data":{
		"user_name":"shashank",
		"user_email":"shashank@test.co",
		"password":"Shashank@123"
	}
}'



// Curl for user login

curl -X POST \
  http://localhost:3000/login \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 64' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: c8aea19f-b0b1-4fcc-9777-613aa102e269,ced13b25-f2f0-41ad-81eb-b512910930e8' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"user_email":"SHASHANK@test.co",
	"password":"Shashank@123"
}'

// curl for filler registration

curl -X POST \
  http://localhost:3000/filler-registration \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 139' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: e697feab-83a3-424b-bcc6-e8d150e8efb1,d3141441-803f-414b-b6f9-1366dbca4d68' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"data":{
		"user_name":"smith",
		"user_email":"smith@test.co",
		"password":"Smith@123",
		"pump_id":"ChIJw7WHcle0bTkRdARYgJ3OyHI"
	}
}'

// curl for filler login

curl -X POST \
  http://localhost:3000/filler-login \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 64' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: c8aea19f-b0b1-4fcc-9777-613aa102e269,ced13b25-f2f0-41ad-81eb-b512910930e8' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
	"user_email":"SHASHANK@test.co",
	"password":"Shashank@123"
}'

// curl for upload file

curl -X PUT \
  http://localhost:3000/upload-image \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoic2hhc2hhbmtAdGVzdC5jbyIsInJvbGVzIjoiVXNlciIsImlhdCI6MTYwNDAzNTY0OCwiZXhwIjoxNjA0MTIyMDQ4fQ.-cAqtZr3fHUKbNlEqfoPw8CO2sAK7PsStcD927y0mFg' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 224644' \
  -H 'Content-Type: multipart/form-data; boundary=--------------------------562351297867987864907857' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: 4c4483ce-f348-48ac-9626-a7bf301cfeab,b8018889-815f-401a-99a9-1b6acfc39135' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F image=@/home/bdesk-04/Downloads/fa2cb547-8369-4f7f-b817-ab91ef354439-53043020_1257353017754313_4359806201064587264_n.jpg

  // curl for get near by location

  curl -X GET \
  'http://localhost:3000/get-near-by-pump?lattitude=26.88178&longitude=75.7720215' \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoic2hhc2hhbmtAdGVzdC5jbyIsInJvbGVzIjoiVXNlciIsImlhdCI6MTYwNDAzNTY0OCwiZXhwIjoxNjA0MTIyMDQ4fQ.-cAqtZr3fHUKbNlEqfoPw8CO2sAK7PsStcD927y0mFg' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: c73e7732-ed97-4f27-b64e-aa6df3439bbf,862b7e47-fa9a-4ba6-b824-3d21a5f02d88' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache'

  // curl for booking pump

  curl -X POST \
  http://localhost:3000/pump-booking \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoic2hhc2hhbmtAdGVzdC5jbyIsInJvbGVzIjoiVXNlciIsImlhdCI6MTYwNDAzNTY0OCwiZXhwIjoxNjA0MTIyMDQ4fQ.-cAqtZr3fHUKbNlEqfoPw8CO2sAK7PsStcD927y0mFg' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 351' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: 9c2b4ec5-5795-42cd-8844-9972b708c09b,acba7855-dd2b-470d-a52e-42afb28d44d8' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' \
  -d '{
    "data": {
        "pump_lat": 26.8797,
        "pump_lng": 75.764,
        "pump_name": "HP PETROL PUMP - INDUS AGENCIES",
        "pump_id": "ChIJw7WHcle0bTkRdARYgJ3OyHI",
        "user_rating": 22,
        "fule_type":"petrol",
        "fule_quantity":1,
        "vehicle_type":"car",
        "vehicle_registration_number":"ddjdhvbdsj"
    }
}'

// curl for get booking by pump

curl -X GET \
  http://localhost:3000/get-all-booking/ChIJw7WHcle0bTkRdARYgJ3OyHI \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: 4a0497d4-ac85-4a68-9489-59df1168e8ca,5457dd26-1f0b-41bb-9f66-21940ef59564' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache'
