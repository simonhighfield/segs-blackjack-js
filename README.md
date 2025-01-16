# Blackjack!

This repository provides the functions to play a game of Blackjack.

Currently, these provide for a single player to begin a game: generating a deck of cards, dealing the player and a dealer each an initial hand , and storing those results. 

Also provided are game play functions that receive a player's input - whether they want to 'hit' and receive another card, or 'stand' and submit their score.

Future work will provide functions to shuffle the deck of cards and to evaluate the winner, and a user interface will be built using React.

This front-end will visually present the game to the user, and allow for user input (such as their decision to 'hit' or 'stand').

 

## Tech Stack

 

- JavaScript

- Jest node package provides a test suite for unit and integration tests

- Jest extended node package provides additional matchers

 

## Design principles

 

- Test driven development

- Uses pure functions

- Error check functions throw errors in case a function is invioked with invalid arguments

- Intented to be used in React application

 

## Project Structure

 

- The **utils folder** contains utility functions, organised into sub-folders:

    - **gameInitialisation** has functions to prepare the game, such as generating a deck of cards, and dealing initial hands;

    - **gamePlay** has functions to respond to a player's input, such as dealing a card if they choose to 'hit', or submitting the score if they want to 'stand';

    - **errorChecks** has functions used by gamePlay functions to throw errors in case they were invoked with invalid arguments;

    - **devFunctions** has functions used in the development to print the deck of cards to a file. These are not production functions, so have no associated tests.

 

- The **tests folder** contains tests written with jest, organised into sub-folders:

    - The **unitTests** folder has tests for each of the **gameInitialisation**, **gamePlay**, and **errorChecks** functions;

    - **integration.tests.js** has tests that prove functions correctly invoke other functions;

    - **scenarios.tests.js** has tests that prove this code satisfies the scenarios for the BBC SEGS technical assesment;

- The **data folder** contains data used for both production and test code. Arrays of card emblems, names, and values are stored centrally here for easy maintenance.

- **test.setup.js** allows the use of the jest-extended node package, by requiring all the jest-extended matchers used.

- **package.json** has been authored to allow the use of jest-extended, and contains scripts to run test suites.

 

## Getting started

Clone the project onto your machine:

 

    git clone https://github.com/simonhighfield/segs-blackjack-js.git

 

> **Note:** You may choose to optionaly create your own fork of the GitHub repository, in which case use the URL from your fork.

 

  <br>

 

Install the node packages used:

 

    npm i

 

## Running the tests

The package.json contains several scripts written to run the different tests. Please check the scripts section for a full list, but some useful ones are described below.

 

To run all test suites

 

    npm t

or

 

    npm run test

This runs all unit, integration, and scenario tests, quickly checknig the whole codebase works as intended, and will provide granular details of tests that fail. However, this provides no granularity of the tests that pass.

 

 

To run unit tests

 

    npm run unit

Again, this provides little granularity, so for more detail on the tests that pass (and therefore see the criteria and design of the working functions, tests can be run individually:

To run gameInitialisation.tests.js tests:

 

    npm run init

 

To only run gamePlay.tests.js tests:

 

    npm run game

   

To only run errorChecks.tests.js:

 

    npm run error

To only run integration.tests.js:

 

    npm run int

  

To run only scenario.tests.js:

 

    npm run scen

 

 

# Future work

 

- Function to shuffle the deck of cards

- Function to evaluate winner

- A user interface built with React , and hosted online

- Extend the card objects to contain image URLs

 

## Planned React Implementation

initialiseGame will generate the deck of cards, serve 2 cards to the player and dealer, and provide a look up for the results, that initially stores the dealers score.

The user will be provided with buttons that invoked nextPlay with either 'hit' (to receive another card) or 'stand' to submit their score.

In the case of 'stand', nextPlay invokes updateResultsLookup to submit the players score, and then the winner will be determined.

In the case of 'hit', nextPlay invokes dealCard, which updates the state for the player's hand. A useEffect listening to the player's hand will invoke getHandValidity.

A useEffect listening to the hand validity determines what happens next: if invalid, the updateResultsLookup will be invoked, submitting the player's score. If valid, then no change, and again the player has the option to 'hit' or 'stand'.