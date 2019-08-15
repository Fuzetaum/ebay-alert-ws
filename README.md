# About

This project is an eBay alerts configuration web service

# Environment Variables

Before running the web service, you will need to choose one method to run it: locally or via a Docker container. Depending on the chosen method, the path to connect to your MongoDB server instance might change. Keep in mind that you will need 3 different information about MongoDB: conenction path, connection port, and the web service's database name.

Looking at the `.env.example` you will find the configuration template you have to set up before running the web service. Create a `.env` file in the project's root, add the same fields from the template file, and set their values as the MongoDB information mentioned above. Don't use quotes or any other formatting: just write those values right in front, with no spacing.

If you are willing to run this as a Docker container, you can create the `.env` file with the following values:

* DB_HOST=mongo
* DB_PORT=27017

Note that the `DB_NAME` field is also up to your preference. After doing this, you are ready to proceed to running the web service.

# Running

If you want to run a local web service in your machine, you need Node.js and Yarn installed. After this, clone the source code, navigate to the project folder and run `yarn` and `yarn start`. This will boot the web service. **Note that running this way also requires a MongoDB instance installed in the host machine**.

The second run method relies on using a Docker container. First, you will need any Docker version installed in the host machine, but that is compatible with **docker-compose 3.7**. When you have Docker already set up, open your Docker CLI tool, navigate to the project folder, and run both commands `docker-compose build` and `docker-compose up`. This will build the required images and start the container, already configured with the project's needs as well as a MongoDB server instance.