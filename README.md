# Call Center

Big Data Analytics Systems Resource Requirements Many organizations in cloud storage and processing service providers are a common practice.    
In this project, we have created a solution for processing and displaying data.    
The system is split into 3 subsystems that together enable incoming calls to the Call Center in Real-Time Near access and use a dashboard that displays today's call summaries, and also allows classification of the call type to route the recommended conversation of the caller.
  
**System A – Get Data:**  
A system that shows waiting calls, with customer details: city, gender, age, and previous calls,  
The person who gets the calls fills in the product (That the customer demand a service ), Internet, Cable-TV, cellular, or All.    
What type of service (Joining, Disconnecting, Complaining, and Service) At the end of the call, press "END".  
At the end of the call, the call data send to Kafka and sent this data to subSystemB and subSystemC.  
  
![image](https://user-images.githubusercontent.com/74377162/167851293-5c6476b1-bd9c-4ca8-bd06-0464590e49e2.png)
  
**System B - Real-time data:**  
When a message is received from Kafka, it will store the data in Redis.  
The System is shown in the Dashboard:  
*  The number of waiting calls and the average waiting time in 10 minutes using graphs.
* Shows in the table and graph the number of waiting calls and waiting times starting today at a level of aggregation of 5 minutes.
* The system allows viewing summary data from the beginning of the day: number of joining calls, number of complaint calls, number of disconnection requests, and number of Service calls.
  
![WhatsApp Image 2022-05-06 at 08 27 11](https://user-images.githubusercontent.com/74377162/167849825-2a851ee4-944d-4712-92c7-7af06e149a74.jpeg)
![WhatsApp Image 2022-05-![WhatsApp Image 2022-05-06 at 08 34 10](https://user-images.githubusercontent.com/74377162/167849848-1bffaf3c-7044-4edc-98d4-6f14bf974ac6.jpeg)
06 at 08 27 39](https://user-images.githubusercontent.com/74377162/167849836-98959ce7-a2e5-4509-b6a2-60ce6b6f7d79.jpeg)
![WhatsApp Image 2022-05-06 at 08 34 10](https://user-images.githubusercontent.com/74377162/167849963-61fd99df-fc7d-44f3-8bb8-27427ec07331.jpeg)

  
**System C- Predicting call topic:**   
This system gets from Kafka all calls and allows you to analyze the histories using a machine learning algorithm and create a prediction model to call topics (joining, complain, disconnect, service ), by using BigML.
    
![image](https://user-images.githubusercontent.com/74377162/167852050-751673ed-2e2f-4995-877d-e4649005e3d9.png)


