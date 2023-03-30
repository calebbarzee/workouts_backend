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
      userLevel: 1 | 2,
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
      name: "string",
      description: "string",
      imageURL: "string",
      categories: "string",
      muscleGroup: "string"
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
