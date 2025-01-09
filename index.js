let table = document.querySelector(".table_body");

async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        let reqData = data;
        renderData(reqData);
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}

function renderData(reqData) {
    reqData.forEach(items => {
        let price_change_24h = parseFloat(items.price_change_24h).toFixed(2);
        let symbolUpperCase = items.symbol.toUpperCase();

        let tdDataRow = document.createElement('tr');
        tdDataRow.innerHTML = `
            <td>
                <div class="coin-img">
                    <img src="${items.image}" alt="" style="width: 45px; height: 45px" />
                    <div class="coin-name">${items.name}</div>
                </div>
            </td>
            <td>${symbolUpperCase}</td>
            <td>${items.current_price}</td>
            <td>${items.total_volume}</td>
            <td class="percentage_change">${price_change_24h}%</td>
            <td>Mkr Cap: ${items.market_cap}</td>
        `
            ;
        let tdDataCel = tdDataRow.querySelector('.percentage_change');
        if (price_change_24h < 0) {
            tdDataCel.style.color = 'red';
        } else {
            tdDataCel.style.color = 'green';
        }
        table.appendChild(tdDataRow);
    });
}

function updateTable(searchTerm) {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const filteredData = data.filter(item => {
                return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            });
            table.innerHTML = '';
            renderData(filteredData);
            // renderData();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.getElementById('search_bar').addEventListener('keyup', function (event) {
    const searchTerm = event.target.value;
    updateTable(searchTerm);
});

function MarketCap() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => {
            return response.json();
        }).then(data => {
            let sortedDataCap = data.sort((a, b) => {
                return b.market_cap - a.market_cap;
            })
            table.innerHTML = '';
            renderData(sortedDataCap);
        })
}

function Percentage() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => {
            return response.json();
        }).then(data => {
            let sortedDataPer = data.sort((a, b) => {
                return b.price_change_24h - a.price_change_24h;
            })
            table.innerHTML = '';
            renderData(sortedDataPer);
        })
}

fetchDataWithAsyncAwait();
renderData();