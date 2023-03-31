import dotenv from "dotenv";

dotenv.config();
const outputFile = "../src/swagger.json"; // For generating the deployed swagger.json

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Workouts API",
    description: "Access and store your workouts."
  },

  host: "https://workoutaccess.onrender.com", // Uncomment these lines for the deployed version
  schemes: ["https"], // Uncomment these lines for the deployed version

  // Tags
  tags: [
    {
      name: "Workouts",
      description: "CRUD operations regarding the Exercise Model."
    },
    {
      name: "Users",
      description: "CRUD operations regarding the User Model."
    }
  ],

  // Definitions
  definitions: {
    user: {
      email: "string",
      firstName: "string",
      lastName: "string",
      tokenData: {},
      workouts: []
    },
    newUser: {
      $firstName: "string",
      $lastName: "string"
    },

    error: {
      $message: "string",
      error: {
        message: "string"
      }
    },

    workout: {
      name: "Bench Press",
      description: "A chest exercise involving pressing of a barbell from a supine position.",
      imageURL: "https://plus.unsplash.com/premium_photo-1672280783573-e0e0ca8fed20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1043&q=80",
      categories: "Weight Lifting",
      muscleGroup: "Chest"
    },
  },

  // Authorizations
  securityDefinitions: {
    auth0: {
      type: "oauth2",
      authorizationUrl: "https://workoutaccess.onrender.com/login", // Uncomment this line for production
      flow: "authorizationCode"
    }
  }
};

const endpointsFiles = ["../src/routes/index.ts"];
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Wrote to ${outputFile}`);
});
