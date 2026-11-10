# Conversor de unidades de temperatura y longitud

Mini-proyecto evaluable — Módulo I, Fundamentos de JavaScript.

Programa de consola en JavaScript (Node.js) que convierte valores entre unidades de temperatura y longitud, con validación de entradas y un menú que se repite hasta que el usuario elige salir.

**Autor:** Sergio Alejandro Pérez Reyes — ADSO, SENA (ficha 3410706)

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- No usa librerías externas

## Ejecución

```bash
git clone https://github.com/<tu-usuario>/conversor-unidades.git
cd conversor-unidades
node app.js
```

## Menú

| Opción | Conversión | Fórmula |
|---|---|---|
| 1 | Celsius a Fahrenheit | F = (C × 9 / 5) + 32 |
| 2 | Fahrenheit a Celsius | C = (F − 32) × 5 / 9 |
| 3 | Metros a kilómetros | km = m / 1000 |
| 4 | Kilómetros a metros | m = km × 1000 |
| 5 | Salir | — |

## Funcionamiento

1. Se muestra el menú y se lee la opción.
2. Un `switch` selecciona la conversión; el `default` informa una opción inválida y vuelve a mostrar el menú.
3. Se pide el valor y se valida:
   - No puede estar vacío.
   - Debe ser numérico (se acepta coma o punto decimal, por ejemplo `2,5` o `2.5`).
   - Debe ser finito (`Number.isFinite`).
   - Las temperaturas pueden ser negativas; las longitudes no.
   - Si el valor no es válido se muestra el error y se vuelve a pedir.
4. Se ejecuta la función de conversión correspondiente (cada una recibe un número y retorna el resultado).
5. Se muestra el valor original, la conversión y el resultado con su unidad (máximo 4 decimales, sin redondear los cálculos internos).
6. Un ciclo `while` repite el proceso hasta elegir la opción 5.

## Funciones principales

| Función | Descripción |
|---|---|
| `celsiusAFahrenheit(c)` | Convierte °C a °F |
| `fahrenheitACelsius(f)` | Convierte °F a °C |
| `metrosAKilometros(m)` | Convierte m a km |
| `kilometrosAMetros(km)` | Convierte km a m |
| `validarValor(texto, esLongitud)` | Valida la entrada y retorna el número o el mensaje de error |
| `formatearNumero(valor)` | Muestra el número con formato colombiano |
| `mostrarMenu()` | Imprime el menú |

## Registro de pruebas

| # | Entrada | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| 1 | Opción 1, `0` °C | 32 °F | 32 °F | Aprobado |
| 2 | Opción 1, `100` °C | 212 °F | 212 °F | Aprobado |
| 3 | Opción 2, `32` °F | 0 °C | 0 °C | Aprobado |
| 4 | Opción 3, `1500` m | 1,5 km | 1,5 km | Aprobado |
| 5 | Opción 4, `2,5` km | 2500 m | 2.500 m | Aprobado |
| 6 | Opción 1, `-10` °C | 14 °F | 14 °F | Aprobado |
| 7 | Opción 3, `-5` m | Error: longitud inválida | Error: longitud inválida (no se permiten valores negativos). | Aprobado |
| 8 | `abc` | Error: valor no numérico | Error: valor no numérico. | Aprobado |
| 9 | Entrada vacía | Solicitar valor válido | Error: el valor no puede estar vacío. Ingrese un valor válido. | Aprobado |
| 10 | Opción `7` | Opción inválida, mostrar menú | Opción inválida. Intente de nuevo. (se muestra el menú) | Aprobado |
| 11 | `Infinity` | Error: valor no finito | Error: el valor debe ser finito. | Aprobado |
| 12 | Opción `5` | Salir del programa | ¡Hasta pronto! | Aprobado |

### Prueba automática rápida

```bash
printf '1\n0\n1\n100\n2\n32\n3\n1500\n4\n2,5\n1\n-10\n3\n-5\n\nabc\n7\n7\n5\n' | node app.js
```

## Estructura

```
conversor-unidades/
├── app.js
└── README.md
```
