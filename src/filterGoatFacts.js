/**
 * filterGoatFacts - Filters goat facts based on word and index
 */
export const filterGoatFacts = (facts) => {

  const searchText = document.querySelector("#search-text")
  const positionNumber= document.querySelector("#position")
  const listItems = document.querySelectorAll('ul li')

  //hide or display li's based on search values
  if (searchText && positionNumber && searchText.value && positionNumber.value) {

    listItems.forEach(item => {
      let splitArray = item.innerHTML.split(" ");
      if (splitArray[positionNumber.value - 1].toLowerCase() == searchText.value.toLowerCase()) {  //subtract 1 from position number to not use zero based indexing
        item.style.display="block";
      } else {
        item.style.display="none";
      }
      
    });
    
  } else {
    listItems.forEach(item => {
        item.style.display="block";
    });
  }

}
