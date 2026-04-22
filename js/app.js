let logoSeleccionado = null;

function formatearTelefono(numero) {
  const soloNumeros = numero.replace(/\D/g, '');
  if (soloNumeros.length === 10) {
    return `${soloNumeros.slice(0,2)} ${soloNumeros.slice(2,6)} ${soloNumeros.slice(6,10)}`;
  }
  return alert('Numero Incorrecto. Por favor, colocar el numero a 10 dígitos.');;
}

function generarFirma() {
  const radioSeleccionado = document.querySelector('input[name="opcion"]:checked');
  if (!radioSeleccionado) {
    alert('Por favor, selecciona un diseño de logo antes de generar la firma.');
    return;
  }

  logoSeleccionado = radioSeleccionado.value;

  const logoHTML = `
    <img src="${logoSeleccionado}"
         width="18.46cm"
         height="4.61cm"
         style="width:18.46cm; height:4.61cm; display:block;"
         alt="Firma corporativa">
  `;

  const data = {
    nombre: document.getElementById('nombre').value,
    apellidoPaterno: document.getElementById('apellidoPaterno').value,
    apellidoMaterno: document.getElementById('apellidoMaterno').value,
    puesto: document.getElementById('puesto').value,
    zona: document.getElementById('zona').value,
    telefono: formatearTelefono(document.getElementById('telefono').value),
    correo: document.getElementById('correo').value,
    direccion: document.getElementById('direccion').value,
    logo: logoHTML
  };

  let html = firmaTemplates.clasica;

  Object.keys(data).forEach(key => {
    html = html.replaceAll(`{{${key}}}`, data[key] || '');
  });

  document.getElementById('preview').innerHTML = html;
  document.getElementById('htmlOutput').value = html;
}

async function copiarFirma() {
  const preview = document.getElementById('preview');
  if (!preview || preview.innerHTML.trim() === '') {
    alert('Genera la firma antes de copiar.');
    return;
  }
  try {
    const html = preview.innerHTML;
    const text = preview.innerText;
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' })
    });
    await navigator.clipboard.write([clipboardItem]);
    alert('Firma copiada. Ahora puedes pegarla en tu firma de correo.');
  } catch (err) {
    // Fallback
    const range = document.createRange();
    range.selectNodeContents(preview);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
    alert('Firma copiada (modo clásico).');
  }
}