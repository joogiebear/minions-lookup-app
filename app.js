// Initialize an empty array for the minions data
let minions = [];

// Fetch data from minions.json
fetch('minions.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        minions = data; // Store the fetched data in the minions array
        populateMinionList('combat'); // Call the function to populate the minion list with "combat" type
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function populateMinionList(selectedType) {
    const listElement = document.getElementById('minionList');
    listElement.innerHTML = ''; // Clear existing content

    minions.filter(minion => minion.type === selectedType)
        .forEach(minion => {
            // Create a card container for each minion
            const cardContainer = document.createElement('div');
            cardContainer.className = 'minion-card'; // Use the card style class

            // Create the minion name element
            const minionName = document.createElement('h3');
            minionName.className = 'minion-name';
            minionName.textContent = minion.name;

            // Create the card element
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${minion.img}" alt="${minion.name}">
                <div class="card-divider"></div>
                <ul>
                    ${minion.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            `;

            // Add a click event listener to the card to open the URL based on the minion's name
            card.addEventListener('click', () => {
                const minionNameWithoutSpaces = minion.name.replace(/\s/g, ''); // Remove spaces from the name
                const minionURL = `${minionNameWithoutSpaces}.html`; // Create the URL based on the name
                window.location.href = minionURL; // Navigate to the URL in the same window
            });

            // Append the name and card to the card container
            cardContainer.appendChild(minionName);
            cardContainer.appendChild(card);

            // Append the card container to the list
            listElement.appendChild(cardContainer);
        });
}

function filterByMinionType() {
    const selectedType = document.getElementById('minionSelect').value;
    populateMinionList(selectedType); // Call the function to populate the minion list with the selected type
}
