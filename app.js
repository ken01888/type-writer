$(document).ready(function () {

    //Hide Upper Keyboard
    $('#keyboard-upper-container').hide()


    //Shift Key & Toggle && Color Change
    $(document).keydown(function (e) {
        if (e.keyCode == 16) {
        /*show*/ $('#keyboard-upper-container').show();
        /*hide*/ $('#keyboard-lower-container').hide();
        }

        let asciiLetter = e.key.charCodeAt(0)
        let j = $('#' + asciiLetter).attr('id')
        if (asciiLetter == j) {
            $('#' + asciiLetter).css('background-color', 'yellow')
        }
    })

    $(document).keyup(function (e) {
        if (e.keyCode == 16) {
        /*hide*/ $('#keyboard-upper-container').hide();
        /*show*/ $('#keyboard-lower-container').show();
        }

        let asciiLetter = e.key.charCodeAt(0)
        let j = $('#' + asciiLetter).attr('id')
        if (asciiLetter == j) {
            $('#' + asciiLetter).css('background-color', '#f5f5f5')
        }
    })

    //Sentence 

    const sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate',''];
    let sentenceIndex = 0;
    let letterIndex = 0;
    let errorCounter = 0;
    let timeNow = new Date()
    let timeMinutes = timeNow.getMinutes()
    $('#sentence').html(sentences[sentenceIndex])
    $('#yellow-block').html(sentences[sentenceIndex][letterIndex])
    $('#target-letter').html(sentences[sentenceIndex][letterIndex])


    //Keypress Events
    $(document).on('keypress',function (e) {
        let correctSymbol = '&#x2705'
        let errorSymbol = '&#10060'
        let asciiLetter = e.key.charCodeAt(0);
        let text = String.fromCharCode(asciiLetter);
        
        if (letterIndex + 1 == sentences[sentenceIndex].length  ) {
            $('#sentence').empty()
            $('#yellow-block').empty()
            $('#target-letter').empty()
            sentenceIndex++
            $('#sentence').html(sentences[sentenceIndex])
            
            return (letterIndex = 0,
                $('#yellow-block').html(sentences[sentenceIndex][letterIndex]).css({
                    'position': 'absolute',
                    'margin-top': '30px',
                    'width': '35px',
                    'height': '5px',
                    'background-color': 'yellow',
                    'margin-left': '0px'
                }
            )

        ) 

        } else if(sentences[sentenceIndex].length == 0){
        $('#sentence').empty()
        $('#yellow-block').remove()
        $('#target-letter').empty()
        $('#feedback').empty()
        $(document).off('keypress')

        let stopTime = new Date()
        let stopMinutes = stopTime.getMinutes()
        let minutes = stopMinutes - timeMinutes
        let wordsPerMinute = (240 / minutes) - (2 * errorCounter)
        let buttonReset = $('<button class="btn btn-light">Reset keyboard</button>').attr('id','buttonReset').click(function(){
            location.reload()
        })

        let buttonResult = $('<button class="btn btn-light">Back To Results</button>').attr('id','buttonResult').click(function(){
            $('#sentence').empty()
            $('#sentence').html('Words Typed Per Minute: '+wordsPerMinute)

        })

        $('#sentence').html('Words Typed Per Minute: '+wordsPerMinute)
        .css({'font-size':'1em','text-align':'center'})
        .fadeOut(5000,function(){
        $('#sentence').empty()
        $('#sentence').html('Would you like to play again?').show()
        $('#feedback').append(buttonReset)
        $('#target-letter').append(buttonResult)
            })

        
        return (sentenceIndex,letterIndex ) 

         
}   


//Error Symbol Feedback
if (text !== sentences[sentenceIndex][letterIndex]) {
    $('#feedback').html(errorSymbol);
    errorCounter++;

} else {
    $('#feedback').html(correctSymbol);
} 

//Letter Index & Next Letter Highlight
letterIndex++
$('#yellow-block').html(sentences[sentenceIndex][letterIndex]).css({'margin-left':'+=17','font-size':'30px','font-weight':900});
$('#target-letter').html(sentences[sentenceIndex][letterIndex]);
    })
})



