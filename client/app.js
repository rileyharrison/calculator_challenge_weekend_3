// declare variables
    var buffer = '';
    var operator = '';
    var valA = '';
    var valB = '';

$(document).ready(function(){
    //prevent form submission
    $("#calculator").on("submit", function(event){
        event.preventDefault();
    })
    // setup listeners
    initialize();
})

function initialize(){
    setListeners();
}

function setListeners(){
    $('.calc-container').on('click','.btn-num', addToBuffer);
    $('.calc-container').on('click','.btn-operator', setOperator);
    $('.calc-container').on('click','.btn-equal', checkExpression);
    $('.calc-container').on('click','.btn-clear', clearAll);
    $('.calc-container').on('click','.btn-decimal', addDecimal);

    $(window).keydown(getKeys);


 }

function getKeys(event){

     var myKey = parseInt(event.keyCode);

      console.log("mykey=", myKey-48);
     if (myKey >47 && myKey <58){
         addKeyToBuffer(myKey-48);
     }


 }

function clearAll(){
    // set it all to nothing and refresh display
    buffer = '';
    operator = '';
    valA = '';
    valB = '';
    displayBuffer();
}

function checkExpression(){
    // see if we just got a second operand
    if (buffer.length>0){
        valB = buffer;
    }
    // see if we have valid operand a, operand be, and operator.
    if (valA.length>0 && valB.length>0 && operator.length>0){
        doMath()
    } else {
        console.log("we can't do math with this stuff.");
        clearAll();
    }
}

function doMath(){
    switch (operator){
        case '+':
            mathUrl = "/add";
            break;
        case '-':
            mathUrl = "/subtract";
            break;
        case 'x':
            mathUrl = "/multiply";
            break;
        case '/':
            mathUrl = "/divide";
            break;
        }

        // put key value pairs for operands in object to post
        // on success of post, show the result, and load it into the buffer
    var mathObject = { "valueA": valA, "valueB": valB }
    $.ajax({
        type: "POST",
        url: mathUrl,
        data: mathObject ,
        success: function(data){
            showResult(data);
        }
    });
}

function showResult(data){
    // wipe everything, all we know is what came back from the server.
    clearAll();
    // make sure it's a string so future values concatenate not add.
    buffer = data.toString();
    displayBuffer();
}

function setOperator(){
    var myKey = $(this).data('key');
    operator = myKey;
    // if we have a number in the buffer, set value 1 to the buffer
    // this means we got a +-/x, and we need to be ready for the next number.
    if (buffer.length > 0){
        valA = buffer;
        buffer = '';
    }
    displayBuffer();
}

function addDecimal(){
    // check if buffer has a decimal in it if not add to buffer
    if (buffer.indexOf(".") == -1){
        buffer = buffer + '.';
        // if we only have the decimal prepend a 0
        if (buffer.length == 1){
            buffer = '0' + buffer;
        }
    }
    displayBuffer();
}

function addKeyToBuffer(value){
    //concatenate the entered number to the buffer

    buffer = buffer + value;
    displayBuffer();
}
function addToBuffer(value){
    //concatenate the entered number to the buffer
    var myKey = $(this).data('key');    
    buffer = buffer + myKey;
    displayBuffer();
}

function displayBuffer(){
    // if buffer has contents show, else show a 0.
    if (buffer.length==0){
        $('.display').text(0);
    } else {
        $('.display').text(buffer);
    }
}
