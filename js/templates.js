const firmaTemplates = {
  clasica: `
<!-- Firma sin tablas, con estilos inline -->
<div style="font-family: Calibri; max-width: 700px;">

  <!-- Contenedor principal con clearfix -->
  <div style="overflow: hidden; margin-bottom: 10px;">

    <!-- Bloque izquierdo: textos -->
    <div style="float: left; width: 65%;">

      <!-- Nombre completo -->
      <div style="font-size: 21.33px; font-weight: bold; color: #EB003F; margin: 0 0 2px 0;">
        {{nombre}} {{apellidoPaterno}} {{apellidoMaterno}}
      </div>

      <!-- Puesto -->
      <div style="font-size: 21.33px; font-weight: bold; color: #000000; margin: 0 0 4px 0;">
        {{puesto}}
      </div>

      <!-- Espacio -->
      <div style="font-size: 10.67px; color: #ffffff; margin: 0 0 2px 0;">
         .
      </div>

      <!-- Empresa (primero) -->
      <div style="font-size: 16px; font-weight: bold; color: #000000; margin: 0 0 2px 0;">
        Adeccco México
      </div>

      <!-- Sede y Reclutamiento -->
      <div style="font-size: 16px; font-weight: bold; color: #000000; margin: 0 0 2px 0;">
        División {{zona}} | Reclutamiento 
      </div>

      <!-- Teléfono -->
      <div style="font-size: 16px; font-weight: bold; color: #EB003F; margin: 0 0 2px 0;">
        {{telefono}}
      </div>

      <!-- Correo -->
      <div style="margin: 0 0 4px 0;">
        <a href="mailto:{{correo}}" style="font-size: 16px; color: #000000; text-decoration: none;">
          <a href="{{correo}}" style="color: #000000; text-decoration: underline;">{{correo}}</a>
        </a>
      </div>

      <!-- Empresa (segundo) -->
      <div style="font-size: 13.33px; color: #595959; margin: 0 0 2px 0;">
        Adecco México
      </div>

      <!-- Dirección -->
      <div style="font-size: 13.33px; color: #595959; margin: 0 0 2px 0;">
        {{direccion}}
      </div>

      <!-- Imagen a la izquierda -->
      <div width: 5%; margin-right: 5%;">
        {{logo}}
      </div>
    </div>
  </div>

  <!-- Clear float -->
  <div style="clear: both;"></div>

  <!-- Textos finales -->
  <div style="font-size: 13.33px; line-height: 1.4;">

    <!-- Página web (enlace) -->
    <div style="margin: 0 0 2px 0;">
      <a href="http://www.adecco.com/es-mx" style="color: #000000; text-decoration: underline;">www.adecco.com/es-mx</a>
    </div>

    <!-- Texto complementario -->
    <div style="color: #EB003F; margin: 0 0 2px 0;">
      ¿Quejas o sugerencias? calidadmx@adecco.com | Adecco Te Escucha | Programa de Satisfacción del Cliente
    </div>

    <!-- Texto de políticas -->
    <div style="color: #595959; margin: 0 0 2px 0;">
      5ta empresa más atractiva del mundo para trabajar - "Los mejores lugares para trabajar en el mundo | World’s Best Workplaces" 2018
      <!-- Espacio -->
      <div style="font-size: 10.67px; color: #ffffff; margin: 0 0 2px 0;">
         .
      </div>
      Antes de imprimir un documento, analiza si es necesario y hazlo a doble cara. Por una cultura PAPERLESS conoce nuestra política ambiental.
      <!-- Espacio -->
      <div style="font-size: 10.67px; color: #ffffff; margin: 0 0 2px 0;">
         .
      </div>
      Este correo electrónico y cualquier archivo transmitido con él son confidenciales y están destinados exclusivamente para el uso de la persona o entidad a la que se dirigen. Puede contener información legalmente privilegiada y no puede divulgarse a nadie más. Si recibió este correo electrónico por error, notifique al remitente y elimine todas las copias de su sistema. Cualquier opinión expresada en este correo electrónico puede ser personal del autor y no necesariamente refleja las opiniones de la Compañía o sus afiliados.
    </div>

  </div>

</div>
`
};