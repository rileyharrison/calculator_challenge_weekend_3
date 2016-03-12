// declare variables
    var buffer = '';
    var operator = '';
    var valA = '';
    var valB = '';

$(document).ready(function(){

    console.log("in ready function");
    //prevent form submission
    $("#calculator").on("submit", function(event){
        event.preventDefault();
    })
    // setup listeners
    initialize();

})

function initialize(){

    console.log("in initialize");

    setListeners();
}

function setListeners(){
    console.log("in set listeners");
    $('.calc-container').on('click','button', calcClick);
}

function calcClick(){
    //console.log("in calc click");

    //get the value of clicked key
    // perform operations depending
    //numbers, add to buffer
    //operators, check if we have a number in buffer
    // to work with.
    // decimal, check if have on enetered alread.
    // = check if we can do this math with operands and operator

    console.log($(this).data('key'));

    var myKey = $(this).data('key');

    switch (myKey){
        case 0:
            addToBuffer(myKey);
            break;

        case 1:
            addToBuffer(myKey);
            break;

        case 2:
            addToBuffer(myKey);
            break;

        case 3:
            addToBuffer(myKey);
            break;

        case 4:
            addToBuffer(myKey);
            break;

        case 5:
            addToBuffer(myKey);
            break;

        case 6:
            addToBuffer(myKey);
            break;

        case 7:
            addToBuffer(myKey);
            break;

        case 8:
            addToBuffer(myKey);
            break;

        case 9:
            addToBuffer(myKey);
            break;

        case '+':
            setOperator(myKey);
            break;

        case '-':
            setOperator(myKey);
            break;

        case '/':
            setOperator(myKey);
            break;

        case 'x':
            setOperator(myKey);
            break;

        case '=':
            checkExpression();
            break;
        case 'AC':
            clearAll();
            break;

        case '.':
            addDecimal();
            break;
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
    // console.log("about to do math");
    // console.log("valA", valA);
    // console.log("valB", valB);
    // console.log("operator", operator);

    // check for operator, customize url depending on type of math

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

function setOperator(value){

    operator = value;
    // if we have a number in the buffer, set value 1 to the buffer
    // this means we got a +-/x, and we need to be ready for the next number.
    if (buffer.length > 0){
        valA = buffer;
        buffer = '';
    }
    displayBuffer();

}

function addDecimal(){

    // check if buffer has a decimal in it
    //if not add to buffer
    if (buffer.indexOf(".") == -1){
        buffer = buffer + '.';

        // if we only have the decimal prepend a 0
        if (buffer.length == 1){
            buffer = '0' + buffer;
        }
    }
    displayBuffer();
}

function addToBuffer(value){
    //concatenate the entered number to the buffer
    buffer = buffer + value;
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
