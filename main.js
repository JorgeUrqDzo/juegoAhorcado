(function () {

   var palabra_secreta_array = [];
   var respuesta;
   var intentos = 0;

   var letrasABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');


   function crearBotones() {
      var boton = '';
      letrasABC.forEach(function (letra, indice) {
         boton += '<button class="btn btn-primary botonLetra">' + letra + '</button>';
      });

      $("#botones").html(boton);
   }

   $(document).on('click', ".botonLetra", function (e) {
      $(this).prop('disabled', true);
      var letra = $(this).html();
      var encontrado = false;
      palabra_secreta_array.forEach(function (caracter, indice) {
         if (letra == caracter) {
            $("#letra" + indice).html(letra);
            encontrado = true;
            respuesta[indice] = letra;
         }
      });

      $("#letra").val('');

      if (encontrado) {
         checarGanar();
      } else {
         intentos++;
         checarIntentos();
      }
   });

   $("#btnJugar").on('click', function () {
      comenzarJuego();
   });

   $("#formPalabraSecreta").on('submit', function(e){
      e.preventDefault();
      comenzarJuego();
   })

   function comenzarJuego(){
      var palabra = $("#palabra").val().toUpperCase().trim();
      palabra_secreta_array = $("#palabra").val().toUpperCase().split('');
      respuesta = new Array(palabra_secreta_array.length);
      if (palabra_secreta_array.length > 0 && palabra) {
         $("#letra").prop('disabled', false);
         $("#buscarLetra").prop('disabled', false);
         crearBotones();
         mostrarTablero(palabra_secreta_array);
      } else {
         reiniciar();
         alert("Escribe una palabra secreta");
      }
   }

   function mostrarTablero(arregloPalabras) {
      $(".areaJuego").html('');
      arregloPalabras.forEach(function (letra, indice) {
         if (!letra.trim()) {
            $(".areaJuego").append('<div id="letra' + indice + '" class="raya">&nbsp</div>');
         } else {
            $(".areaJuego").append('<div id="letra' + indice + '" class="raya">?</div>');

         }
      });
   }

   function checarGanar() {
      for (let index = 0; index < respuesta.length; index++) {
         if (respuesta[index] != palabra_secreta_array[index]) {
            return;
         }
      }
      setTimeout(_ => {
         alert("ganaste");
         reiniciar();
      }, 800)

   }

   function checarIntentos() {
      var equis = '';

      for (let index = 0; index < intentos; index++) {
         equis += '<div class="raya" style="color:red">X</div>';
      }

      $("#fallos").html(equis);

      if (intentos == 6) {
         setTimeout(_ => {
            alert("Perdiste");
            reiniciar();
         }, 800)
      }
   }

   function reiniciar() {
      $("#fallos").html('');
      $("#palabra").val('');
      $("#letra").prop('disabled', true);
      $("#buscarLetra").prop('disabled', true);
      $("#botones").html('');
      $(".areaJuego").html('');
   }

})();