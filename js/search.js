// BUSCAR EMAIL 

document.getElementById('submitemail').addEventListener('click', () => {
    var email =  document.getElementById('InputEmail').value;
    
    if(email.length !=0){
        $.ajax({
            type: "GET",
            url: 'https://9xoqrdy855.execute-api.us-east-1.amazonaws.com/dev/consultaemail?email=' + email,
            contentType: 'application/json',
            crossDomain: true,
            processData: false,
            dataType: "json",
            headers: { "x-api-key": "YAFO7K5IdH4LHjuEZmck98qiZrF0UjNcawE03EzZ"},
            data: '',

            success: function (data) {

            console.log(data);

            document.getElementById("nome").innerHTML = data.nome
            document.getElementById("pontos").innerHTML = data.pontos


            }

        })
    }
    else
      console.log("Is empty")
  
  });
  