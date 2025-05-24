let counter = 0; // variable of Number type that keeps track of # of times button is pressed

function incrementCounter(){
    counter = counter + 1;
    let displayText = 'Pressed ' + counter;
    
    if(counter === 1){
        displayText = displayText + ' time';
    }else {
        displayText = displayText + ' times';
    }
    document.getElementById('display').innerHTML = displayText;
}