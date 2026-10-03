function calculateBudget() {
    let form = document.getElementById('budget-form');
    let area = Number(form.elements.area.value);
    let rooms = Number(form.elements.rooms.value);
    let washrooms = Number(form.elements.washrooms.value);
    let balconies = Number(form.elements.balconies.value);
    let floors = Number(form.elements.floors.value);
    let floorArea = area * floors;
    let roomCount = rooms * floors;
    let washroomCount = washrooms * floors;
    let balconyCount = balconies * floors;

    let items = [
        { id: 'cement', quantity: Math.round(floorArea / 10), unit: 'bags' },
        { id: 'rebar', quantity: Math.round(floorArea * 4), unit: 'kg' },
        { id: 'bricks', quantity: Math.round(floorArea / 500), unit: 'trolleys' },
        { id: 'aggregate', quantity: Math.round(floorArea / 500), unit: 'trolleys' },
        { id: 'black-river-sand', quantity: Math.round(floorArea / 500), unit: 'trolleys' },
        { id: 'coarse-river-sand', quantity: Math.round(floorArea / 500), unit: 'trolleys' },
        { id: 'worker', quantity: Math.round((roomCount + washroomCount + balconyCount) * 8), unit: 'hours' },
        { id: 'white-floor-tiles', quantity: Math.round((floorArea + washroomCount * 40 + balconyCount * 20) / 20), unit: 'boxes' },
        { id: 'paint', quantity: Math.round((floorArea + roomCount * 80 + washroomCount * 40 + balconyCount * 20) / 100), unit: 'containers' }
    ];

    let list = document.querySelector('#recommendations');
    let totalBox = document.querySelector('#estimated-total');
    let total = 0;

    list.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let product = findProduct(item.id);
        let row = document.createElement('li');
        let cost = item.quantity * product.price;

        row.textContent = product.name + ': ' + item.quantity + ' ' + item.unit + ' - Total: ' + cost;
        list.appendChild(row);
        total = total + cost;
    }

    totalBox.textContent = 'Total cost: ' + total;
    document.querySelector('#calculator-results').hidden = false;
}