# Contribuir a AgriMarket

Gracias por tu interés en el proyecto. Estas son las pautas para contribuir.

## Flujo de trabajo

1. Crea una rama a partir de `main`:
   ```bash
   git checkout -b feat/nombre-de-la-funcionalidad
   ```
2. Instala dependencias y levanta el proyecto:
   ```bash
   npm install
   npm run dev
   ```
3. Realiza tus cambios.
4. Antes de hacer commit, verifica:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
5. Escribe un mensaje de commit claro (por ejemplo, `feat: agregar filtro por vereda`).
6. Abre un Pull Request describiendo el cambio.

## Estilo de código

- Se usa ESLint y Prettier. Ejecuta `npm run format` antes de subir cambios.
- Componentes en PascalCase y archivos `.jsx`.
- Preferir funciones y hooks.

## Reporte de errores

Abre un issue describiendo el problema, los pasos para reproducirlo y el resultado esperado.
