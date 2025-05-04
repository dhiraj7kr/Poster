const form = document.getElementById('postForm');
const output = document.getElementById('outputContainer');
const styles = ['style1', 'style2', 'style3', 'style4', 'style5'];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const logoFile = document.getElementById('logo').files[0];
  if (!logoFile) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const logoUrl = e.target.result;

    const data = {
      companyName: document.getElementById('companyName').value || '',
      description: document.getElementById('description').value || '',
      market: document.getElementById('market').value || '',
      hq: document.getElementById('hq').value || '',
      employees: document.getElementById('employees').value || '',
      investor: document.getElementById('investor').value || '',
      amount: document.getElementById('amount').value || '',
      round: document.getElementById('round').value || '',
      valuation: document.getElementById('valuation').value || ''
    };

    output.innerHTML = '';

    styles.forEach((style, index) => {
      const post = document.createElement('div');
      post.className = `post ${style}`;
      post.id = `post${index}`;
      post.innerHTML = `
        <img src="${logoUrl}" alt="Logo" />
        <h2>${data.companyName}</h2>
        ${data.investor || data.amount || data.round ? `<div class="section"><strong>💰</strong> <span class="highlight">${data.investor} invested ${data.amount} (${data.round})</span></div>` : ''}
        ${data.valuation ? `<div class="section"><strong>📈</strong> <span class="highlight">${data.valuation} Valuation</span></div>` : ''}
        ${data.description ? `<div class="section"><strong>What They Do:</strong> ${data.description}</div>` : ''}
        ${data.market ? `<div class="section"><strong>Market:</strong> ${data.market}</div>` : ''}
        ${(data.hq || data.employees) ? `<div class="section">${data.hq ? `<strong>HQ:</strong> ${data.hq}` : ''}${data.hq && data.employees ? ' | ' : ''}${data.employees ? `<strong>Employees:</strong> ${data.employees}` : ''}</div>` : ''}
        <button class="download-btn" onclick="downloadImage('post${index}', '${data.companyName || 'poster'}_style${index + 1}.png')">Download</button>
      `;
      output.appendChild(post);
    });
  };
  reader.readAsDataURL(logoFile);
});

function downloadImage(elementId, filename) {
  const element = document.getElementById(elementId);
  const downloadBtn = element.querySelector('.download-btn');
  downloadBtn.style.visibility = 'hidden'; // Hide button before capture

  html2canvas(element, { scale: 2 }).then(canvas => {
    downloadBtn.style.visibility = 'visible'; // Show again
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
  });
}
