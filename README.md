<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nicolaspy/SafestBank">
    <img src="/client/bank_challenge/src/shared/images/safestBank.png" alt="Logo">
  </a>

<h3 align="center">Safest bank transactions app</h3>

  <p align="center">
    Transaction App initially planned to allow customers to do transactions such as withdrwals and deposits.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Backend:\
Developed using Node.js and Express storing localy the data.\


Frontend:\
Developed using React and Vite

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nicolaspy/SafestBank.git
   ```
3. Install Frontend NPM packages
   ```sh
   cd /client/bank_challenge/
   npm install
   ```
4. Install Backend NPM packages
   ```sh
   cd /
   npm install
   ```
   
### Running the application

1. Running Backend server
   ```sh
   cd /
   npm run dev
   ```
2. Running Vite
   ```sh
   cd /client/bank_challenge/
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Login page:\
. login using any number, make sure you use the same number for the id and password.\
. preloaded with transactions for id "1" and "2"

2. Transactions page:\
. if login with an user with transactions, the should be shown in a table.\
. all the transactions are stored in memory.\
. withdraw and deposit are enabled with required validations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Planned features -->
## Planned features

- [ ] Implement transactions among users. (Same endpoint, reciving a new Type "transfer" with new param "transferPersonId").
- [ ] DB implementation.
- [ ] auth Login implementation, Logout

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API -->
## API

- [ ] Balance

getBalance(id) => get current balance for provided id.\
endpoint: /api/balance/:personId\
example response: {\
    "personId": 1,\
    "balance": 50\
}

personId: person id of request\
balance: current balance of personId, changes every withdrawn or deposit.

- [ ] Transactions

getTransactionsById(id) => get a list of transactions for provided id.\
endpoint: /api/transactions/:personId\
  response:\
  id: transaction id\
  personId: person id of request\
  amount: amount of transaction\
  type: if debit or credit\
  oldTotal: old balance previous to current transaction\
  newTotal: new balance after current transaction\
  createdAt: transaction date


addTransaction(object) => POST a new transaction\
endpoint: POST /api/transactions/:personId\
  request: {\
      "personId": 3,\
      "amount": 200,\
      "type": "credit"\
  }\

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Tests -->
## Tests

- [ ] Jest:
   ```sh
   cd /
   npm test
   ```
Balance Tests:\
      - given the person has no balance, should return a 200 status and a balance of 0\
      - given the person has balance,  should return a 200 status and the correct balance\
      - given the person has balance and a new transaction as credit is sent, should return a 200 status and the correct balance

Transaction Tests:\
- given the person has no transactions, should return a 200 status and an empty array\
- given the person has transactions, should return a 200 status and an array with the transactions\
- given the transaction is type credit and the person has no transaction, should return a 200 status and the new transaction\
- given the transaction is type credit and the person has transactions, should return a 200 status and an array with the transactions\
- given the transaction is type debit and the person has no transactions, should return a 400 status\
- given the transaction is type debit and the person has transactions, should return a 200 status and an array with the transaction

- [ ] Cypress:
   ```sh
   cd /client/bank_challenge
   npm run integration

   choose transaction.cy.ts file and run the test
   ```
Tests:\

- should login correctly\
- shows an error when login unsuccessful\
when logged in\
- displays the correct balance of the current logged in User\
- when a user wants to withdraw more than his current balance, displays Insufficient funds as error message\
- when a user wants to withdraw less than his current balance, displays Success! notification message\
- when a user wants to make a deposit, displays Success! notification message and updates balance\

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>