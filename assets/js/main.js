$('#form').on('submit', function(ev) {
    ev.preventDefault();

    jsonData = $('#formularz').serializeArray().map(function(x){this[x.name] = x.value; return this;}.bind({}))[0]

    $.ajax({
        type: "POST",
        url: "https://yrr3c4lpul.execute-api.eu-central-1.amazonaws.com/default/contact",
        //url: "https://enx8bb6ti4dl1qg.m.pipedream.net",
        data: JSON.stringify(jsonData),
        success: function(data){
            console.log(data);
            if (data.Error === "") {
                $('#formWrapper').html("<p>Dziękujemy za wysłanie wiadomości</p>");
            } else {
                console.log(data.Error);
                $('#formWrapper').html("<p>Wysyłanie wiadomości nie powiodło się.</p>" + data.error);
            }

        },
        dataType: "json",
        contentType : "application/json"
    });
})

$('a.submit').on('click', function(ev) {
    ev.preventDefault();
    $(this).attr('disabled', true);

    $('#formularz').submit();
})