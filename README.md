# BNEXT - WebApp Challenge

La WebApp Challenge emula el comportamiento de una app móvil para resolver tanto llamados JSON y XML, ambos resueltos de manera ásincronica haciendo uso extensivo de Promises. Esto para garantizar el pintado de resultados de las llamadas.
# Features

Frontend:
  - Validación Server-side del formulario: solo se aceptan números
  - Manejo de errores via alertas modales


Backend:
  - Validación Service-side y Server-side: no se aceptan XML malformes, fechas en el pasado, regiones no cubiertas.
  - Timeout para el servicio SOAP para evitar consumo excesivo de recursos
  - Manejo de errores via alertas modales

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

### Stack

El WebApp Challenge corre sobre una instancia Node/Express sin librerias de render:

* [EJS]
* [Bootstrap 4]
* [Node]
* [Express]
* [Easy Soap]

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Instalación

Requiere [Node.js](https://nodejs.org/) v4+.

```sh
$ cd bnext_challenge
$ npm install
$ npm start
```
Navegar a localhost:3000 para acceder a Index.

### App Map

El reto Frontend se encuentra bajo /login
El reto Backend se encuentra bajo /seguro_de_viaje

| Plugin | README |
| ------ | ------ |
| Login | localhost:3000/login  |
| User | localhost:3000/user |
| Seguros | localhost:3000/seguro_de_viaje |
| Nuevo Seguro | localhost:3000/seguro_de_viaje/nuevo |
| Solicitar Nuevo Seguro | localhost:3000/seguro_de_viaje/solicitud |
| Checkout Nuevo Seguro | localhost:3000/seguro_de_viaje/confirmar |
