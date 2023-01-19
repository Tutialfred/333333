/// =========================================================================== ///
/// =============================== HENRY-FLIX ================================ ///
/// =========================================================================== ///

"use strict";

const categories = ["regular", "premium"];

let users = [];
let series = [];
//users:[],
//series:[],

module.exports = {
  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    users = [];
    series = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addUser: function (email, name) {
    // Agrega un nuevo usuario, verificando que no exista anteriormente en base a su email.
    // En caso de existir, no se agrega y debe arrojar el Error ('El usuario ya existe') >> ver JS throw Error
    // Debe tener una propiedad <plan> que inicialmente debe ser 'regular'.
    // Debe tener una propiedad <watched> que inicialmente es un array vacío.
    // El usuario debe guardarse como un objeto con el siguiente formato:
    // {  email: email, name: name,  plan: 'regular' , watched: []}
    // En caso exitoso debe retornar el string 'Usuario <email_del_usuario> creado correctamente'.

    let userFind = users.find((e) => e.email === email);

    if (userFind) {
      throw Error("El usuario ya existe");
    } else {
      users.push({
        email: email,
        name: name,
        plan: "regular",
        watched: [],
      });
      return `Usuario ${email} creado correctamente`;
    }
  },

  listUsers: function (plan) {
    //'
    // Si no recibe parámetro, devuelve un arreglo con todos los usuarios.
    // En caso de recibir el parámetro <plan>, devuelve sólo los usuarios correspondientes a dicho plan ('regular' o 'premium').

    if (plan === "regular") {
      let regularUsers = users.filter((u) => {
        return u.plan === "regular";
      });
      return regularUsers;
    } else if (plan === "premium") {
      let premiumUsers = users.filter((u) => {
        return u.plan === "premium";
      });
      return premiumUsers;
    }
    return users;
  },

  switchPlan: function (email) {
    // Alterna el plan del usuario: si es 'regular' lo convierte a 'premium' y viceversa.
    // Retorna el mensaje '<Nombre_de_usuario>, ahora tienes el plan <nuevo_plan>'
    // Ej: 'Martu, ahora tienes el plan premium'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')

    let userFind = users.find((e) => e.email === email);

    if (!userFind) {
      throw Error("Usuario inexistente");
    }
    if (userFind.plan === "regular") {
      userFind.plan = "premium";
      return `${userFind.name}, ahora tienes el plan ${userFind.plan}`;
    } else if (userFind.plan === "premium") {
      userFind.plan = "regular";
      return `${userFind.name}, ahora tienes el plan ${userFind.plan}`;
    }
  },

  addSerie: function (name, seasons, category, year) {
    // Agrega una nueva serie al catálogo.
    // Si la serie ya existe, no la agrega y arroja un Error ('La serie <nombre_de_la_serie> ya existe')
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
    // Debe devolver el mensaje 'La serie <nombre de la serie> fue agregada correctamente'
    // Debe guardar la propiedad <category> de la serie (regular o premium)
    // Debe guardar la propiedade <rating> inicializada 0
    // Debe guardar la propiedade <reviews> que incialmente es un array vacío.

    // series = [{name, seasons, category, year},{name, seasons, category, year}]

    let serieFind = series.find((e) => e.name === name);

    if (serieFind) {
      throw Error(`La serie ${name} ya existe`);
    }

    if (!categories.includes(category)) {
      throw Error(`La categoría ${category} no existe`);
    }

    if (!series.includes(name)) {
      series.push({
        name: name,
        seasons: seasons,
        rating: 0,
        category: category,
        year: year,
        reviews: [],
      });
    }

    return series;
  },

  listSeries: function (category) {
    // Devuelve un arreglo con todas las series.
    // Si recibe una categoría como parámetro, debe filtrar sólo las series pertenecientes a la misma (regular o premium).
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.

    // if (!category) {
    //   throw Error(`La categoría ${category} no existe`);
    // }
    if (category === undefined) {
      return series;
    }
    if (category === "regular") {
      let regularSerie = series.filter((u) => {
        return u.category === "regular";
      });
      return regularSerie;
    }

    if (category === "premium") {
      let premiumSerie = series.filter((u) => {
        return u.category === "premium";
      });
      return premiumSerie;
    }

    if (!categories.includes(category)) {
      throw Error(`La categoría ${category} no existe`);
    }
  },

  play: function (serie, email) {
    // Con esta función, se emula que el usuario comienza a reproducir una serie.
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    // Si la serie no existe, arroja el Error ('Serie inexistente')
    // Debe validar que la serie esté disponible según su plan. Usuarios con plan regular sólo pueden reproducir series de dicha categoría, usuario premium puede reproducir todo.
    // En caso de contrario arrojar el Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
    // En caso exitoso, añadir el nombre (solo el nombre) de la serie a la propiedad <watched> del usuario.
    // Devuelve un mensaje con el formato: 'Reproduciendo <nombre de serie>'

    let userFind = users.find((e) => e.email === email);
    let serieFind = series.find((e) => e.name === serie);

    if (!userFind) {
      throw Error("Usuario inexistente");
    }
    if (!serieFind) {
      throw Error("Serie inexistente");
    }
    // Debe validar que la serie esté disponible según su plan.

    if (serieFind.category === "premium" && userFind.plan !== "premium") {
      throw Error("Contenido no disponible, contrata ahora HenryFlix Premium!");
    }

    userFind.watched.push(serieFind.name);
    return `Reproduciendo ${serieFind.name}`;
  },

  watchAgain: function (email) {
    // Devuelve sólo las series ya vistas por el usuario
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    let userFind = users.find((e) => e.email === email);
    if (!userFind) {
      throw Error("Usuario inexistente");
    }
    return userFind.watched;
  },

  rateSerie: function (serie, email, score) {
    // Asigna un puntaje de un usuario para una serie:
    // Actualiza la propiedad <reviews> de la serie, guardando en dicho arreglo un objeto con el formato { email : email, score : score } (ver examples.json)
    // Actualiza la propiedad <rating> de la serie, que debe ser un promedio de todos los puntajes recibidos.
    // Devuelve el mensaje 'Le has dado <puntaje> puntos a la serie <nombre_de_la_serie>'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente') y no actualiza el puntaje.
    // Si la serie no existe, arroja el Error ('Serie inexistente') y no actualiza el puntaje.
    // Debe recibir un puntaje entre 1 y 5 inclusive. En caso contrario arroja el Error ('Puntaje inválido') y no actualiza el puntaje.
    // Si el usuario no reprodujo la serie, arroja el Error ('Debes reproducir el contenido para poder puntuarlo') y no actualiza el puntaje. >> Hint: pueden usar la función anterior

    let userFind = users.find((e) => e.email === email);
    let serieFind = series.find((e) => e.name === serie);
    // reviews: [{ email : email, score : score }, { email : email, score : score }]
    // rating: reviews[0].score + reviews[1].score / reviews.lenght;
    if (!userFind) {
      throw Error("Usuario inexistente");
    }

    if (!serieFind) {
      throw Error("Serie inexistente");
    }

    if (score < 1 || score > 5) {
      throw Error("Puntaje inválido");
    }

    if (!userFind.watched.includes(serieFind.name)) {
      throw Error("Debes reproducir el contenido para poder puntuarlo");
    }

    serieFind.reviews.push({ email: email, score: score });
    serieFind.rating =
      serieFind.reviews.reduce((a, b) => a + b.score, 0) /
      serieFind.reviews.length;

    return `Le has dado ${score} puntos a la serie ${serieFind.name}`;
  },
};
