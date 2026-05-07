let logoSeleccionado = null;
let ultimaFirmaGenerada = null;
let firmaYaGuardada = false;

const SUPABASE_URL = 'https://siqaipjakuonbllbbkdt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kd7ut5rn6ZTg1suuKCStYg_3kDUqGcm';
const NOMBRE_TABLA = 'tb_user_firmas';

// Cliente con nombre diferente para evitar colisión
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('✅ Cliente Supabase creado');

// TODO - Estas funcionciones son las principales que generan la firma con todo los datos y template

// TODO - 1. formatearTelefono: lanza error si falla
function formatearTelefono(numero) {
  console.log('formatearTelefono iniciado')

  const soloNumeros = numero.replace(/\D/g, '');
  console.log('formatearTelefono finalizo')

  if (soloNumeros.length === 10) {
    return `${soloNumeros.slice(0,2)} ${soloNumeros.slice(2,6)} ${soloNumeros.slice(6,10)}`;
  }
  throw new Error('Número incorrecto. Debe tener 10 dígitos.');
}

// TODO - 2. generarFirma: lanza error si falla
function generarFirma() {
  console.log('generarFirma iniciado')

  const radioSeleccionado = document.querySelector('input[name="opcion"]:checked');
  if (!radioSeleccionado) {
    throw new Error('Por favor, selecciona un diseño de logo antes de generar la firma.');
  }

  const telefonoFormateado = formatearTelefono(document.getElementById('telefono').value);
  logoSeleccionado = radioSeleccionado.value;
  const logoHTML = `<img src="${logoSeleccionado}" width="18.46cm" height="4.61cm" style="width:18.46cm; height:4.61cm; display:block;" alt="Firma corporativa">`;

  const data = {
    nombre: document.getElementById('nombre').value,
    apellidoPaterno: document.getElementById('apellidoPaterno').value,
    apellidoMaterno: document.getElementById('apellidoMaterno').value,
    puesto: document.getElementById('puesto').value,
    zona: document.getElementById('zona').value,
    telefono: telefonoFormateado,
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
  ultimaFirmaGenerada = html;

  console.log('generarFirma finalizo')
}

// TODO - 3. copiarFirma: lanza error si falla (pero si copia bien, no necesita alert)
async function copiarFirma() {
  console.log('copiarFirma iniciado')

  const preview = document.getElementById('preview');
  if (!preview || preview.innerHTML.trim() === '') {
    throw new Error('Genera la firma antes de copiar.');
  }
  try {
    const html = preview.innerHTML;
    const text = preview.innerText;
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' })
    });
    await navigator.clipboard.write([clipboardItem]);
  } catch (err) {
    // Fallback (intenta con execCommand)
    const range = document.createRange();
    range.selectNodeContents(preview);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    const copiado = document.execCommand('copy');
    sel.removeAllRanges();
    if (!copiado) throw new Error('No se pudo copiar la firma al portapapeles.');
  }

  console.log('copiarFirma finalizo')
}

//* Nuevas Funciones

//* Auxiliar
function obtenerDatosFormulario() {
  console.log('obtenerDatosFormulario iniciado')

  const radioSeleccionado = document.querySelector('input[name="opcion"]:checked');

  return {
    nombre: document.getElementById('nombre').value,
    apellidoPaterno: document.getElementById('apellidoPaterno').value,
    apellidoMaterno: document.getElementById('apellidoMaterno').value,
    puesto: document.getElementById('puesto').value,
    zona: document.getElementById('zona').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value,
    direccion: document.getElementById('direccion').value,
    logoSeleccionado: radioSeleccionado ? radioSeleccionado.value : ''
  };
  console.log('obtenerDatosFormulario finalizo')
}

//* 4. guardarRegistroActual: lanza error si falla

async function guardarRegistroActual() {
  console.log('guardarRegistroActual iniciado')

  const datos = obtenerDatosFormulario();

  console.log(datos)
  console.log('validacion iniciado')

  if (!datos.nombre || !datos.apellidoPaterno) {
    throw new Error('Faltan datos obligatorios (nombre y apellido paterno).');
  }
  if (!ultimaFirmaGenerada) {
    throw new Error('No hay firma generada. Ejecuta generarFirma() primero.');
  }

  console.log('validacion finalizo')
  
  console.log('duplicados iniciado')
  // Verificar si ya existe (evitar duplicados)
  const { data: existente, error: errorSelect } = await supabaseClient
    .from(NOMBRE_TABLA)
    .select('id')
    .eq('nombre', datos.nombre)
    .eq('apellido_paterno', datos.apellidoPaterno)
    .eq('apellido_materno', datos.apellidoMaterno)
    .eq('puesto', datos.puesto)
    .eq('zona', datos.zona)
    .eq('telefono', datos.telefono)
    .eq('correo', datos.correo)
    .eq('direccion', datos.direccion)
    .eq('logo_seleccionado', datos.logoSeleccionado)
    .maybeSingle();

  console.log('duplicados finalizo')

  if (errorSelect) {
    throw new Error('Error al comprobar existencia: ' + errorSelect.message);
  }
  if (existente) {
    throw new Error('⚠️ Este registro ya existe en la base de datos, no se duplica.');
  }

  const registro = {
    nombre: datos.nombre,
    apellido_paterno: datos.apellidoPaterno,
    apellido_materno: datos.apellidoMaterno,
    puesto: datos.puesto,
    zona: datos.zona,
    telefono: datos.telefono,
    correo: datos.correo,
    direccion: datos.direccion,
    logo_seleccionado: datos.logoSeleccionado,
    firma_html: ultimaFirmaGenerada,
    timestamp: new Date().toISOString()
  };

  const { error } = await supabaseClient.from(NOMBRE_TABLA).insert([registro]);
  if (error) {
    throw new Error('Error al guardar: ' + error.message);
  }
  console.log('✅ Registro guardado en Supabase');

  console.log('guardarRegistroActual finalizo')
}

//* Validacion
function validarFormulario() {
  console.log('validarFormulario iniciado')

  const campos = {
    nombre: document.getElementById('nombre').value.trim(),
    apellidoPaterno: document.getElementById('apellidoPaterno').value.trim(),
    puesto: document.getElementById('puesto').value,
    zona: document.getElementById('zona').value,
    telefono: document.getElementById('telefono').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    direccion: document.getElementById('direccion').value.trim()
  };
  const selectPuesto = document.getElementById('puesto');
  const selectZona = document.getElementById('zona');
  
  if (!campos.nombre) throw new Error('❌ Falta el nombre.');
  if (!campos.apellidoPaterno) throw new Error('❌ Falta el apellido paterno.');
  if (!selectPuesto.value || selectPuesto.value === '') throw new Error('❌ Selecciona un puesto.');
  if (!selectZona.value || selectZona.value === '') throw new Error('❌ Selecciona una zona.');
  if (!campos.telefono) throw new Error('❌ Falta el teléfono.');
  if (!campos.correo) throw new Error('❌ Falta el correo electrónico.');
  if (!campos.direccion) throw new Error('❌ Falta la dirección CEDIS.');

  console.log('validarFormulario finalizo')
}

//! 5. FUNCIÓN MAIN (orquestadora) con manejo de errores centralizado
async function mainFirma() {
  console.log('mainFirma iniciado');
  try {
    validarFormulario();
    generarFirma();
    await new Promise(resolve => setTimeout(resolve, 100));
    await copiarFirma();
    await new Promise(resolve => setTimeout(resolve, 500));
    await guardarRegistroActual();
    alert('✅ La firma ya está lista y copiada.\nAbre Outlook y presiona Ctrl+V para pegar la firma.');
  } catch (error) {
    alert(error.message);
  }
  console.log('mainFirma finalizo');
}

