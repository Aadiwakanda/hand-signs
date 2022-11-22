
prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach("#camera")

function Takepic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src=" + data_uri + " id='resultpic'>"
    })
}
console.log("ml5 version:"+ ml5.version)

imageClassifyer=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Nz5ySBPcs/model.json",model_loaded)

function model_loaded(){
    console.log("model is ready and loaded")
}
function speak(){
    var synth= window.speechSynthesis
    speak_data1="the first prediction is"+prediction1
    speak_data2="the second prediction is"+prediction2
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}

function predict(){
    img1=document.getElementById("resultpic")

    imageClassifyer.classify(img1,got_result)
}

function got_result(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)

    prediction1=results[0].label
    prediction2=results[1].label
      document.getElementById("result_emotion_name").innerHTML=prediction1
      document.getElementById("result_emotion_name2").innerHTML=prediction2
     speak()
     if(prediction1 == "Thumbs up"){
        document.getElementById("emoji1").innerHTML="&#128077;"
     }
     else if(prediction1=="peace"){
        document.getElementById("emoji1").innerHTML="&#9996;"
     }
     else{
        document.getElementById("emoji1").innerHTML="&#128076;"
     }
     if(prediction2 == "Thumbs up"){
        document.getElementById("emoji2").innerHTML="&#128077;"
     }
     else if(prediction2=="peace"){
        document.getElementById("emoji2").innerHTML="&#9996;"
     }
     else{
        document.getElementById("emoji2").innerHTML="&#128076;"
     }
    }
}