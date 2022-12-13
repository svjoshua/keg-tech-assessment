/**
 * addGoatFacts - Adds the passed in goat facts to the Dom
 */
export const addGoatFacts = (facts) => {

  const factArray = facts.data //get fact array
  const factList = document.querySelector('#goat-facts-list') //get ul where we want to add the li's
  factList.innerHTML = ""; // clear out previous goat facts

  // loop through array and add each element to the ul with the template literal
  factArray.forEach(function (item) {
    const fact = `<li>${item}</li>`;
    factList.innerHTML += fact
  })


}
