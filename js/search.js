// BUSCAR EMAIL 

export async function search(){

    let idqrcode = ""

    var email =  document.getElementById('email').value

    if(email.length !=0){
        return $.ajax({
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

                    if(pontos>=1700){
                        var categoria = "A"
                        var msg = "Você já está na ELITE!"
                    } else if(pontos<1700 & pontos>=900){
                        var categoria = "B"
                        var msg = `Faltam ${1700-pontos} para você atingir a categoria A`
                    } else {
                        var categoria = "C"
                        var msg = `Faltam ${900-pontos} para você atingir a categoria B`
                    }
                
                    document.getElementById("nome").innerHTML = data.nome
                    document.getElementById("pontos").innerHTML = data.pontos   
                    document.getElementById("idqrcode").value = data.id                 
                    document.getElementById("categoria").innerHTML = categoria
                    document.getElementById("msg").innerHTML = msg
                    document.getElementById("erro").innerHTML = ""

                  
                    document.getElementById("result").classList.remove('invisible');

                }
                
                else{
                    document.getElementById("result").classList.add('invisible');
                    document.getElementById("erro").innerHTML = data.nome;
                }

            }


        })
    }
    else
      console.log("Is empty")
}

