# codeforbcs-test-backend
A simple backend that allows for user registration and login to help Code For BCS members learn React

DEPLOYED URL: https://codeforbcs-test-backend.herokuapp.com/

ENDPOINTS

• POST https://codeforbcs-test-backend.herokuapp.com/api/register

takes  

>{  
      "username": [insert username],  
      "password": [insert password]  
}

returns
>{  
  "id": [user id in database],  
  "username": [username],  
  "password": [hashed password]  
}


• POST https://codeforbcs-test-backend.herokuapp.com/api/login

input
>{  
      "username": [insert username],  
      "password": [insert password]  
}

returns
>{  
  "message": "Welcome [username] 😁",  
  "token": [token]  
}




