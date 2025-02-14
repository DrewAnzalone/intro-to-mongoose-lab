const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/customer");
const prompt = require('prompt-sync')();
dotenv.config();
const print = console.log;
const OPTIONS = 3;
const cliText = `Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. quit
`


async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  print("connected to mongoDB");

  let input = 0;
  while (input != OPTIONS) {
    input = CLIprompt();
    await body(input);
  }

  await mongoose.connection.close();
  print("disconnected from mongoDB");

  process.exit();
}

function CLIprompt() {
  print(cliText);
  let input;
  while (!(input >= 1 && input <= OPTIONS)) {
    input = prompt("Number of action to run: ");
  }
  return parseInt(input);
}

async function body(input) {
  switch (input) {
    case 1: // 1. Create a customer
      const customer = createCustomer();
      await uploadCustomer(customer);
      break;
    case 2: // 2. View all customers
      await findCustomers();
      break;
  }
}

function createCustomer() {
  const name = prompt("Enter the customer's name: ");
  const age = prompt("Enter the customer's age: ");
  return { name, age };
}

async function uploadCustomer(customerData) {
  const customer = await Customer.create(customerData);
  print("Customer data upload successful", customer);
}

async function findCustomers() {
  const customers = await Customer.find();
  print("All customers:", customers);
}

main()
