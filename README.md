# Tech-Assessment
  * Please complete all tasks outline in the tasks section below
  * There is no time limit
    * Generally, this assessment should take around 4 to 8 hours to complete.
    * You will not be graded on how long it takes you to complete it, but please be aware of the time expectation.
    * Estimating the amount of time it takes to complete a task is a common practice within our team
    * **NOTE** - The time estimation does not include installation or tasks marked as **extra-credit**
  * Not every change required is outlined in the tasks section
    * We want to see how you think through a problem
    * Some tasks require updating multiple files for that task to be completed
    * Don't be afraid to add, move, or change parts of the app. Show us what you can do
  * You are encouraged to **show your work** through comments
    * You don't have to comment every little change, but we would like to see your thought process
  * While styles, look, and feel are not a priority, the app should look decent

## Prerequisites
  * You will need the following installed:
    * [Node](https://nodejs.org/en/download/)
    * [Yarn](https://classic.yarnpkg.com/en/docs/install)
    * [Git](https://git-scm.com/)
    * [Git-Hub Account](https://github.com/)
    * [Docker](https://www.docker.com/)

## Installation
  * Fork this repo
    * See the [github docs](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) on how to fork a repository if needed
  * Clone your forked version locally
    * Command: `git clone https://github.com/<github-user-name>/keg-tech-assessment`
    * Be sure to replace `<github-user-name>` with your own user name
  * Install the node_modules
    * Command: `yarn install`
  * Get the project running
    * Command: `yarn start`
      * This will start two servers; a Webpack server and an API server
      * To start them separately run the commands
        * `yarn web` - Webpack Server
        * `yarn api` - API Server

## Tasks

1. **Setup the environment**
   * Use the commands listed in the `Installation` section above
   * Open your browser to http://localhost:3000
     * It should load the test application

2. **Fix the error messages**
   * Open your browser's inspector, to see all the errors on the page
   * In the following steps, you will be asked to implement features, marked by errors in the inspector. As you work on and complete each one, please remove the error message.
   * Once you have finished all the steps, there should be no errors showing in the browser's inspector

3. **Get Goat Facts**
   * When clicking the `Get Goat Facts` button, it should call the `onGetGoatFacts` method

4. **Add Goat Facts JSON API**
   * The server API has an endpoint that returns facts about goats when called
     * See the code in `server/endpoints/goats.js`
     * **Goat Facts Endpoint**
       * Method: `GET`
       * Path: `/goats`
   * Update the `server code` to ensure the `/goats` API endpoint is reachable
   * Next update the `code` in `getGoatFacts.js`
     * It should make a `GET /goats` call to the server API
     * It should return a `json` response with an array of goat facts under the data property

5. **Add Goat Facts to the Dom**
   * After getting the goat facts from the server API in step 4
   * Update the code in `addGoatFacts.js` to do the following
     * Clear out any past goat facts under the `ul#goat-facts-list` element
     * Add each new goat fact to the dom as an `li` element
       * Each element should be a **child** of the `ul#goat-facts-list` element

6. **Alternative Facts**
   * Add 2 new input elements to the dom
     * One should be for text
       * The text input should **only** allow a single word (i.e. No Spaces)
     * The other should be for numbers
       * The numbered input should **only** allow numbers
   * Update the code in `filterGoatFacts.js` to filter the goat facts with the following rules
     * The text input defines a word
     * The numbered input defines the index of that word within a sentence
     * Any goat fact that has a matching word at the defined index should be displayed
     * All **non-matching** goat facts should be hidden
       * For example, if the text input content is `test`, and the numbered input content is `3`
       * Then only a sentence with the word `test` as the third word, would match
       * `This test is lame` => DOES **NOT** MATCH (should be hidden)
       * `Doing this test is fun` => **DOES MATCH** (should be displayed)
         * Test is the third word in this sentence, so it would match the above defined filter
   * When a word is entered into the text input, and a number is entered into the numbered input
     * Then the `filterGoatFacts` code should run
     * It should **only** display goat facts that match the defined inputs
     * All other goat facts should be hidden
     * If either or both text inputs are empty, **all** loaded goat facts should be displayed

7. **Dockerfile**
   * In the `container` folder there is a `Dockerfile`
   * Write a docker file for this application
     * You should be able to run the following commands successfully
       * `yarn doc:build` - Command should build the docker image
       * `yarn doc:run` - Command should run the docker image, starting the app within it
       * `yarn doc:test` - Command should complete without throwing any errors
         * Run this command in a separate terminal tab while the docker container is running

8. **Testing Framework**
   * Choose and implement a unit testing framework for the appplication.
   * Make sure that running yarn doc:test includes these unit tests.
   * For purposes of this assessment, only the backend needs to be tested.

9. **Update API**
   * Update the Goat Facts API so that it no longer uses a flat-file data source but instead uses a database.
   * You may use any database you like.
   * Import the current contents of the flat file into the database so that the functionality of the API remains unchanged from the front end.

  > From this step, you can run the full stack using [`docker-compose`](https://docs.docker.com/compose/install/) and spin it up with `yarn doc:run` and the command `yarn doc:test` in a separate terminal

10. **Deploy to the Cloud** - *extra credit*
   * How this is done is not important. It just needs to be accessible via the internet in some way
  
  > Accessible from the Cloud at https://goat-facts.uc.r.appspot.com/

## Submit
   * Submit a pull request to this repo
   * Send an us an email, letting us know it has been submitted

## Alternate filtering logic
Depending on the client requirements, another possible way to filter the goat facts is to directly manipulate the DOM to hide/show after all the facts have been added to the DOM via `addGoatFacts()`.

This way, the list of facts displayed will be filtered inline without having to click on `Get Goat Facts` button. It would result in a different user experience.

For this solution, we need to:
   * Move `filterGoatFacts()` call after `addGoatFacts()`
   * Remove the array parameter from `filterGoatFacts()`
   * Re-design this method to filter directly from the DOM `<li>` elements instead of filtering the list of facts prior to display them