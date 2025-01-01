<b>Docker Repository</b>
Client:   docker pull faizfaheem/pw-manage:client2.0
Server:   docker pull faizfaheem/pw-manage:server2.0

<b>How to Set Up with Docker:</b>
1. Pull the Docker images using the provided commands.
2. Run the container.
3. Use MySQL Workbench to create the required table.

<b>How to Set Up Through GitHub:</b>
1. Clone the repository.
2. Run npm install in both the client and server folders.
3. Create the required table in MySQL Workbench.
4. Start the application by running npm start in both the client and server directories to launch it on localhost.

<b>RESULTS

SignUp and Login Page:</b>
</br>
Integrated with Firebase for user authentication, featuring Google Sign-In for enhanced functionality.
<div style="display: flex; justify-content: space-around;">
<img src="https://github.com/user-attachments/assets/423b586d-7f83-4eee-9697-8cf6c8315f04" alt="description" width="350"/>
   <img src="https://github.com/user-attachments/assets/1aaddc9e-e3d9-48e6-89c2-4aa69500c4aa" alt="description" width="350"/>
</div>
</br>
<b>Home Page:</b>
</br>
   1. Features a popup for adding new usernames and passwords.
   </br>
   2. Displays website names in a list on the left side for easy navigation.
   </br>
<img src="https://github.com/user-attachments/assets/0c8990fe-8436-47c8-bc7d-d711c4d349e0" alt="description" width="500" height="350"/>
</br>       
</br>
   
   3. On the right, it displays the usernames associated with the corresponding websites. Clicking on a username reveals the decrypted password.
   <img src="https://github.com/user-attachments/assets/79a080ea-7fdd-4a17-9133-5b545b0649e9" alt="description" width="500" height="350"/>
   
   </br>
   </br>
   
   4. On the far right, edit and delete functions are available for modifying or removing usernames or passwords.
   <img src="https://github.com/user-attachments/assets/6382ce83-82f5-4b6e-83cf-146c4eb9af04" alt="description" width="500" height="350"/>
</br>
</br>

<b>Add Credentials Popup:</b>
1. Provides input fields to add the website name, username, and password.
<img src="https://github.com/user-attachments/assets/d2e2c3cb-615e-48af-bacc-37d779c284f3" alt="description" width="400" height="500"/>
</br>
</br>

2. Analyzes passwords and rates them from 'Too Weak' to 'Strong' based on complexity.
<img src="https://github.com/user-attachments/assets/5afce7e4-68e2-4028-a2e5-82ba9b15c0b8" alt="description" width="400" height="350"/>
</br>
</br>

3. Includes a random password generator with customizable filters, allowing users to specify password length and choose whether to include or exclude uppercase letters, lowercase letters, numbers, and special characters.
<img src="https://github.com/user-attachments/assets/f2ae49bf-1fbf-4f08-b6cf-6577a716a5b4" alt="description" width="400" height="350"/>
</br>
</br>

<b>Backend:</b>
</br>
Stores encrypted passwords securely in the database
![image](https://github.com/user-attachments/assets/5b2b4d44-869a-4991-a5d5-d28f523cbe32)

