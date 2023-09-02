function configurevideo() {
  let APP_ID = "";
  console.log(APP_ID);
  let localStream, remoteStream, peerConnection;
  let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    document.getElementById("user-1").srcObject = localStream;
    createOffer();
  };
  const servers = {
    iceServers: [
      {
        url: ["stun1.l.google.com:19302", "stun2.l.google.com:19302"],
      },
    ],
  };
  let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("New ICE Candidate: ", event.candidate);
      }
    };

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
  };
  init();
}

export {configurevideo};
