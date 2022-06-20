const socket = io();
$('#identify').hide();
$('.msginput').hide();
socket.on('connect', () => {
    $('#status').html('Connection status: connected!')
    $('#identify').html(`You're identified by: ${socket.id}`)
    $('#identify').show()
    $('.msginput').show();
});

$('#msgsend').click(() => {
    if(!$('#msgtext').val()) return;
    socket.emit('message', $('#msgtext').val())
    $('#msgtext').val('')
    $('#msgtext').focus()
})

socket.on('new message', (data) => {
    $('.msgs').append(`<b>${data.id}</b>: ${data.msg}<br>`)
})