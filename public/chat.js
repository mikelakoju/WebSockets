//Make connection
//this is the scoket variable running on the front end
var socket = io.connect('http://localhost:4000');

//Query Dom for valriables from the html page
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      


//eMit event when someone clicks . so we add event listner
btn.addEventListener('click',function(){
    //note that the receives the chat and the data we are sending to the server
    //the emit function sends message to the server. "chat" is the name of the 
    //message and the data for the message follows in {}
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

//Listen when anyone is typing a message -- feedback
message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

//listen for events
socket.on('chat',function(data){
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+ data.handle +':</strong>'+ data.message +'</p>';
});


socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' +data + 'is typing a message...</em></p>';
});