## Passenger API ##

### Solution Architecture ###
![Alt text](assets/images/architecture.png)

### DB Model and DB Design Decisions ###
![Alt text](assets/images/er.drawio.png)

• Four models defined: flight, passenger, booking, flight-booking<br>
• Added a join table flight-booking to include foreign key constraints and  preserve referential integrity<br>
## Technical Solution Decisions ##
| Tool/Technology | Reason |
|----------|----------|
| Express with serverless | • Can organize routes and logic clearly with Express<br> •  Express manages HTTP requests effectively within Lambda functions<br>• Serverless Framework automates Lambda packaging and deployment |
| AWS Postgresql | • Relational database<br> • When data grows, postgresql supports materialized views for querying<br> |
| TypeORM |  • Support for Typescript<br>  • Support for materialized views<br> | 

## Features Implemented  ##
 • Two endpoints implemented<br>
 • Support for strong typing with Typescript<br>
 • Input validation<br>
 • Logging<br>
 • Unit Testing <br>
