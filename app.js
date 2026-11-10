const readline = require("readline");

const OPCION_SALIR = "5";

function celsiusAFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitACelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function metrosAKilometros(metros) {
  return metros / 1000;
}

function kilometrosAMetros(kilometros) {
  return kilometros * 1000;
}

function formatearNumero(valor) {
  return valor.toLocaleString("es-CO", { maximumFractionDigits: 4 });
}

function validarValor(texto, esLongitud) {
  const limpio = texto.trim();

  if (limpio === "") {
    return { valido: false, mensaje: "Error: el valor no puede estar vacío. Ingrese un valor válido." };
  }

  const numero = Number(limpio.replace(",", "."));

  if (Number.isNaN(numero)) {
    return { valido: false, mensaje: "Error: valor no numérico." };
  }

  if (!Number.isFinite(numero)) {
    return { valido: false, mensaje: "Error: el valor debe ser finito." };
  }

  if (esLongitud && numero < 0) {
    return { valido: false, mensaje: "Error: longitud inválida (no se permiten valores negativos)." };
  }

  return { valido: true, numero };
}

function mostrarMenu() {
  console.log("\n===== CONVERSOR DE UNIDADES =====");
  console.log("1. Celsius a Fahrenheit");
  console.log("2. Fahrenheit a Celsius");
  console.log("3. Metros a kilómetros");
  console.log("4. Kilómetros a metros");
  console.log("5. Salir");
}

async function pedirValor(rl, unidad, esLongitud) {
  let resultado = { valido: false };

  while (!resultado.valido) {
    const texto = await leer(rl, `Ingrese el valor en ${unidad}: `);
    resultado = validarValor(texto, esLongitud);
    if (!resultado.valido) {
      console.log(resultado.mensaje);
    }
  }

  return resultado.numero;
}

function crearLector() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lineas = [];
  const esperando = [];
  let cerrado = false;

  rl.on("line", (linea) => {
    if (esperando.length > 0) {
      esperando.shift()(linea);
    } else {
      lineas.push(linea);
    }
  });

  rl.on("close", () => {
    cerrado = true;
    while (esperando.length > 0) {
      esperando.shift()(null);
    }
  });

  return {
    question(texto) {
      process.stdout.write(texto);
      if (lineas.length > 0) {
        return Promise.resolve(lineas.shift());
      }
      if (cerrado) {
        return Promise.resolve(null);
      }
      return new Promise((resolve) => esperando.push(resolve));
    },
    close() {
      rl.close();
    },
  };
}

async function leer(rl, texto) {
  const respuesta = await rl.question(texto);
  if (respuesta === null) {
    console.log("\nEntrada finalizada. ¡Hasta pronto!");
    process.exit(0);
  }
  return respuesta;
}

async function main() {
  const rl = crearLector();
  let opcion = "";

  while (opcion !== OPCION_SALIR) {
    mostrarMenu();
    opcion = (await leer(rl, "Seleccione una opción (1-5): ")).trim();

    let conversion = null;

    switch (opcion) {
      case "1":
        conversion = { origen: "°C", destino: "°F", nombre: "Celsius a Fahrenheit", funcion: celsiusAFahrenheit, esLongitud: false };
        break;
      case "2":
        conversion = { origen: "°F", destino: "°C", nombre: "Fahrenheit a Celsius", funcion: fahrenheitACelsius, esLongitud: false };
        break;
      case "3":
        conversion = { origen: "m", destino: "km", nombre: "Metros a kilómetros", funcion: metrosAKilometros, esLongitud: true };
        break;
      case "4":
        conversion = { origen: "km", destino: "m", nombre: "Kilómetros a metros", funcion: kilometrosAMetros, esLongitud: true };
        break;
      case OPCION_SALIR:
        console.log("¡Hasta pronto!");
        break;
      default:
        console.log("Opción inválida. Intente de nuevo.");
    }

    if (conversion !== null) {
      const valor = await pedirValor(rl, conversion.origen, conversion.esLongitud);
      const resultado = conversion.funcion(valor);
      console.log(`\nConversión: ${conversion.nombre}`);
      console.log(`Valor original: ${formatearNumero(valor)} ${conversion.origen}`);
      console.log(`Resultado: ${formatearNumero(resultado)} ${conversion.destino}`);
    }
  }

  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = {
  celsiusAFahrenheit,
  fahrenheitACelsius,
  metrosAKilometros,
  kilometrosAMetros,
  validarValor,
  formatearNumero,
};
