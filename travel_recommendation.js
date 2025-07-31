// fetch('travel_recommendation_api.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error loading JSON:', error);
//   });

let data = null; // will be loaded from the JSON file

// Load JSON data on page load
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log("Data loaded:", data);
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

function handleSearch() {
  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // clear previous results

  // Normalize variations
  const beachKeywords = ['beach', 'beaches'];
  const templeKeywords = ['temple', 'temples'];
  
  let results = [];

  if (beachKeywords.includes(keyword)) {
    results = data.beaches;
    renderSection('Matching Beaches', results, resultsContainer);
  } else if (templeKeywords.includes(keyword)) {
    results = data.temples;
    renderSection('Matching Temples', results, resultsContainer);
  } else {
    // Check country names
    const countryMatch = data.countries.find(country => 
      country.name.toLowerCase() === keyword
    );
    if (countryMatch) {
      renderSection(`Cities in ${countryMatch.name}`, countryMatch.cities, resultsContainer);
    } else {
      resultsContainer.innerHTML = `<p>No results found for "<strong>${keyword}</strong>".</p>`;
    }
  }
}

// Reuse renderSection to display results
function renderSection(title, items, container) {
  const section = document.createElement('div');
  section.className = 'section'; // optional for section styling

  const heading = document.createElement('h2');
  heading.textContent = title;
  section.appendChild(heading);
  heading.className = 'item-results';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item'; // for the card/block

    // Image with custom class
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;
    img.className = 'item-image';

    // Title/Name with custom class
    const name = document.createElement('h3');
    name.textContent = item.name;
    name.className = 'item-name';

    // Description with custom class
    const desc = document.createElement('p');
    desc.textContent = item.description;
    desc.className = 'item-description';

    // Append to container
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(desc);
    section.appendChild(div);
  });

  container.appendChild(section);
}


function clearResults() {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // This clears the content
}
