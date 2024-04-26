$(document).ready(function () {

    // Capturar el evento de clic en el botón de búsqueda
    $('#buscarBtn').click(function () {

        // Capturar el número del héroe ingresado por el usuario
        var numeroHeroe = $('#numeroHeroe').val();

        // Validar que la entrada sea un número
        if (!isNaN(numeroHeroe)) {

            // Realizar la consulta a la API
            $.ajax({
                url: 'https://superheroapi.com/api/3a43917d29257abe1491d3e7a226b334' + numeroHeroe,
                method: 'GET',
                success: function (data) {

                    // Renderizar la información recibida
                    renderizarInformacion(data);

                    // Generar el gráfico de pastel con la información específica del héroe
                    generarGraficoPastel(data);
                },
                error: function () {
                    alert('Error al consultar la API');
                }
            });
        } else {
            alert('Por favor, ingresa un número válido');
        }
    });

    // Función para renderizar la información recibida
    function renderizarInformacion(data) {


        $('#resultado').html('<div class="card"><div class="card-body">' +
            '<h5 class="card-title">' + data.name + '</h5>' +
            '<p class="card-text">Inteligencia: ' + data.powerstats.intelligence + '</p>' +
            '<p class="card-text">Fuerza: ' + data.powerstats.strength + '</p>' +
            
            '</div></div>');
    }

    // Función para generar el gráfico de pastel
    function generarGraficoPastel(data) {
        var puntos = data.powerstats; // Suponiendo que 'powerstats' es un objeto que contiene los poderes del héroe
        var dataPoints = [];
        for (var poder in puntos) {
            dataPoints.push({ label: poder, y: parseInt(puntos[poder]) });
        }

        var chart = new CanvasJS.Chart("graficoPastel", {
            animationEnabled: true,
            title: {
                text: "Poderes del Superhéroe"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }
});