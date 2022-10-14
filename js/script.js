
// LER SITES
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: 'https://9xoqrdy855.execute-api.us-east-1.amazonaws.com/dev/sites',
    contentType: 'application/json',
    crossDomain: true,
    processData: false,
    dataType: "json",
    headers: { "x-api-key": "YAFO7K5IdH4LHjuEZmck98qiZrF0UjNcawE03EzZ"},
    data: '',

    success:function(data) {
      var listasites = data

      var el = document.createElement("option");
      el.textContent = "Selecione o Site";
      el.value = 0;
      sites.appendChild(el);

      for(var i = 0; i < listasites.length; i++) {
        var nome = listasites[i].nome;
        var id = listasites[i].Id;
        var el = document.createElement("option");
        el.textContent = nome;
        el.value = id;
        sites.appendChild(el);
      }

  
    },

    error: function(jqXHR,error, errorThrown) {  
      var listasites = null;
    }
  });
});

document.getElementById('sites').addEventListener('change', () =>{

  var siteid = document.getElementById("sites").value;
  tendas.length = 0;
  console.log(siteid)

  $.ajax({
    type: "GET",
    url: 'https://9xoqrdy855.execute-api.us-east-1.amazonaws.com/dev/eventos?varSitio='+siteid,
    contentType: 'application/json',
    crossDomain: true,
    processData: false,
    dataType: "json",
    headers: { "x-api-key": "YAFO7K5IdH4LHjuEZmck98qiZrF0UjNcawE03EzZ"},
    data: '',

    success:function(data) {
      var listatendas = data;

      var el = document.createElement("option");
      el.textContent = "Selecione a Tenda";
      el.value = 0;
      tendas.appendChild(el);
      
      for(var i = 0; i < listatendas.length; i++) {
        var nome = listatendas[i].nome;
        var id = listatendas[i].Id;
        var el = document.createElement("option");
        el.textContent = nome;
        el.value = id;
        tendas.appendChild(el);
      }

  
    },

    error: function(jqXHR,error, errorThrown) {  
      var listatendas = null;
    }
  });

})