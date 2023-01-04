$('.s-img').parallax({imageSrc: 'https://images.unsplash.com/photo-1623475329493-889804e377f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'});
// wow
new WOW().init();
// local
$('html, body').localScroll({duration:800});

//record
    let btn = document.querySelector(".record-btn")

btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })

  //needed for better browser support
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
             ? "video/webm; codecs=vp9" 
             : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })

    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener('stop', function(){
      let blob = new Blob(chunks, {
          type: chunks[0].type
      })
      let url = URL.createObjectURL(blob)

      let video = document.querySelector("video")
      video.src = url

      let a = document.createElement('a')
      a.href = url
      a.download = 'video.webm'
      a.click()
  })

    //we have to start the recorder manually
    mediaRecorder.start()
})
