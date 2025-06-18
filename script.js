const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLuX2Ta2veASjc85NnEfOIDXXKzVUGm9m-ag_ubn202I8nxmq27_B3UoNS2_h8yEzuVQWOKTP4yKVj/pub?output=csv';

async function loadLeaderboard() {
  const res = await fetch(sheetURL);
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, { header: true });
  const rows = parsed.data;

  // Sort by Score or Wager amount
  const sorted = rows.sort((a, b) => parseFloat(b['Wager amount'].replace(/[^0-9.-]+/g, "")) - parseFloat(a['Wager amount'].replace(/[^0-9.-]+/g, "")));

  const table = document.createElement('table');

  // Table Header
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  Object.keys(rows[0]).forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Table Body
  const tbody = document.createElement('tbody');
  sorted.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  document.getElementById('leaderboard').appendChild(table);
}

loadLeaderboard();
