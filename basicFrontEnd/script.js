document.addEventListener('DOMContentLoaded', function(){
    var card = document.getElementById('new_window');
    card.addEventListener('click', function() {
    var newWindow = window.open(URL,'https://docs.github.com/en/get-started/start-your-journey/hello-world', 'weight = 800, height = 600');})
})
