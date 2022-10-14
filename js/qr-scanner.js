import QrScanner from "/js/qr-scanner.min.js";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js";

   
const video = document.getElementById('qr-video');
const videoContainer = document.getElementById('video-container');
const camHasCamera = document.getElementById('cam-has-camera');
const camList = document.getElementById('cam-list');
const camHasFlash = document.getElementById('cam-has-flash');
const flashToggle = document.getElementById('flash-toggle');
const flashState = document.getElementById('flash-state');
const camQrResult = document.getElementById('cam-qr-result');
const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
const fileSelector = document.getElementById('file-selector');
const fileQrResult = document.getElementById('file-qr-result');
const resposta = document.getElementById('resposta') 
let reading = true;



// SET RESULT 


function setResult(label, result) {
    label.textContent = result.data;
    
    camQrResultTimestamp.textContent = new Date().toString();
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);


    const resultado = JSON.stringify({ nome: label.textContent, tenda:  tendaId});


    var tendaId = document.getElementById("tendas").value;
    var siteid = document.getElementById("sites").value;

    
    if (reading & tendaId != 0 & siteid != 0) {


        console.log (resultado)
        $(document).ready(function () {
                
            $.ajax({
                type: "GET",
                url: 'https://9xoqrdy855.execute-api.us-east-1.amazonaws.com/dev/dev?tendaId=' + tendaId + '&qrcode=' + label.textContent+ '&siteid='+siteid,
                contentType: 'application/json',
                crossDomain: true,
                processData: false,
                dataType: "json",
                headers: { "x-api-key": "YAFO7K5IdH4LHjuEZmck98qiZrF0UjNcawE03EzZ"},
                data: '',

                success: function (data) {

                console.log(data);

                $('#exampleModal').modal('show'); // Abrir modal

                setTimeout(function() {
                    $('#exampleModal').modal('hide');
                    reading=true;
                }, 5000);
            

                if (data.status == '200') // Cadastro realizado com sucesso
                {
                    document.getElementById("resposta").innerHTML = data.nome
                    console.log("Cadastrado")
                }
                else if (data.status == '204') // Já esta cadastrada
                {
                    document.getElementById("resposta").innerHTML = data.nome
                    console.log("ja cadastrado")
                }
                else if (data.status == '300') // QR CODE INVÁLIDO
                {
                    document.getElementById("resposta").innerHTML = data.nome
                    console.log("inválido")
                }
        
                },
                error: function (jqXHR, error, errorThrown) { //Pessoa nao tem pre registro
                    $('#exampleModal').modal('show'); // Abrir modal
                    document.getElementById("resposta").innerHTML = "Selecione o Site"

                }


            });


        });

         reading = false;

    }    if (tendaId == 0 || siteid == 0){
            $('#exampleModal').modal('show'); // Abrir modal
            document.getElementById("resposta").innerHTML = "Selecione a tenda"
            //console.log (tendaId + siteid)
    }
}
  
// ####### Web Cam Scanning #######
  
const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
    onDecodeError: error => {
        camQrResult.textContent = error;
        camQrResult.style.color = 'inherit';
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});
  
const updateFlashAvailability = () => {
    scanner.hasFlash().then(hasFlash => {
        // camHasFlash.textContent = hasFlash;
        // flashToggle.style.display = hasFlash ? 'inline-block' : 'none';
    });
};
  
scanner.start().then(() => {
    updateFlashAvailability();
    // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
    // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
    // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
    // start the scanner earlier.
    QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        //camList.add(option);
    }));
});
  
//QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);

// for debugging
window.scanner = scanner;

/*      

document.getElementById('scan-region-highlight-style-select').addEventListener('change', (e) => {
    videoContainer.className = e.target.value;
    scanner._updateOverlay(); // reposition the highlight because style 2 sets position: relative
});

document.getElementById('show-scan-region').addEventListener('change', (e) => {
    const input = e.target;
    const label = input.parentNode;
    label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
    scanner.$canvas.style.display = input.checked ? 'block' : 'none';

    document.getElementById('inversion-mode-select').addEventListener('change', event => {
        scanner.setInversionMode(event.target.value);
    });
  
    camList.addEventListener('change', event => {
        scanner.setCamera(event.target.value).then(updateFlashAvailability);
    });
  
    flashToggle.addEventListener('click', () => {
        scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
    });
    
*/
  
document.getElementById('start-button').addEventListener('click', () => {
    reading = true;
    //console.log("voltei a ler")

});

  
/*
document.getElementById('stop-button').addEventListener('click', () => {
    console.log("parei de ler")
    scanner.stop();
})

  
// ####### File Scanning #######
  
fileSelector.addEventListener('change', event => {
    const file = fileSelector.files[0];
    if (!file) {
        return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
    .then(result => setResult(fileQrResult, result))
    .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
});

*/





