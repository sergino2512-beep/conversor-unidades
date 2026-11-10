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

