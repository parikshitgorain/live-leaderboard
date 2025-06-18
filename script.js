const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLuX2Ta2veASjc85NnEfOIDXXKzVUGm9m-ag_ubn202I8nxmq27_B3UoNS2_h8yEzuVQWOKTP4yKVj/pub?output=csv';

async function loadLeaderboard() {
  const res = await fetch(sheetURL);
  const data = await res.text();
  const rows = data.trim().split('\n').map(r => r.split(','));

  const headers = rows.shift();
  const scoreIdx = headers.indexOf('Score');

  const sorted = rows.sort((a, b) => +b[scoreIdx] - +a[scoreIdx]);

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  sorted.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell.replace(/^"(.*)"$/, '$1').replace(/"$/, '');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  document.getElementById('leaderboard').appendChild(table);
}

loadLeaderboard();
