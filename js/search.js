// BUSCAR EMAIL 

var input =  document.getElementById('email');

input.addEventListener('keypress', function(event){

    if(event.key == "Enter"){
        event.preventDefault();
        document.getElementById("btnsearch").click()
    }

});


document.getElementById("btnsearch").addEventListener('click', ()=>{

    var email =  document.getElementById('email').value

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

                if(data.status == 200){
                    var pontos = data.pontos

                    console.log(data)

                    if(pontos>=2300){
                        var categoria = "A"
                        var msg = "Você já está na ELITE!"
                    } else if(pontos<2300 & pontos>=1200){
                        var categoria = "B"
                        var msg = `Faltam ${2300-pontos} para você atingir a categoria A`
                    } else {
                        var categoria = "C"
                        var msg = `Faltam ${1200-pontos} para você atingir a categoria B`
                    }
                
                    document.getElementById("nome").innerHTML = data.nome
                    document.getElementById("pontos").innerHTML = data.pontos
                    document.getElementById("categoria").innerHTML = categoria
                    document.getElementById("msg").innerHTML = msg

                    document.getElementById("erro").innerHTML = "";


                    document.getElementById("result").classList.remove('invisible');

                }

                else{
                    console.log(data)
                    document.getElementById("result").classList.add('invisible');
                    document.getElementById("erro").innerHTML = data.nome;
                }

            }

        })

    }
    else
      console.log("Is empty")

});
