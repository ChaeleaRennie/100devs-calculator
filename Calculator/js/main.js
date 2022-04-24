/* Required features:
Must accept user input: Number, operator, another number
Should acccept decimal
Store inputs
Recognize inputs and perform calculations
Return a result to the screen
Prevent invalid inputs (operators next to each other, two decimal points)

Optional features:
Clear button clears all entries
Show all input as it's being entered
Store previous total as a start of next operation
Clear button should clear all entries
'=' repeats the last function
Memory recall */

const buttonClick = document.querySelector('.calcButtons');

buttonClick.addEventListener('click', event => {
    const {target} = event;
    const {value} = target;
    if (!target.matches('button')){
        //kicks us out of the function if they click somewhere invalid
        return;
    }else {
        //Pass the value to the rest of the operation
        Calculator.parseInput(value)
        // console.log(value)

    }
})

const Calculator = {
    displayText: '0', //what first shows on the screen of the calc
    prevTotal: null, //Value to hold onto the previous operation

    //Switching yard for inputs\
    parseInput(value){
        if (this.displayText === '0'){
            this.displayText = ''
        }
        //Have any of the fancy buttons been clicked?
        switch(value){
            case '=':
                this.calcAnswer(this.displayText)
                break;
            case 'clear':
                //Clear screen and clear values
                this.clearAll()
                break;
            case '.':
                //If first character in text string is ., need to add the leading 0
                if (this.displayText == 0) {
                    //pass '0.' into add text method
                    this.addText('0.')
                }else {
                    //add value to text string
                    this.addText(value)
                }
                break;
            default:
                //add value to text string
                    this.addText(value)
                break;
        }
    },

    addText(value){
        if (this.displayText === '0'){
            this.displayText = ''
        }else if (this.prevTotal !== null){
            this.displayText = this.prevTotal
            this.prevTotal = null;
        }
        if (isNaN(+(value)) && isNaN(+(this.displayText))){    //user has entered an invalid sequence, don't proceed. Show error?)
            // Check that the last character entered in the display AND the pressed character are not numbers
            //!!! Go back and rewrite to see if digit or dot
            if(isNaN(this.displayText.slice(-1))){
                return;
            }
        }
        this.displayText += value
        //output display text to screen
        this.outputText(this.displayText)
    },

    outputText(text){
        //add value we're passing in onto the calc screen
        document.querySelector('.calcScreen').value = text
    },

    calcAnswer(equation){
        //passing display text into this function to evaluate
        let result= Function("return " + equation)()
        this.outputText(result)
    },

    clearAll(){
        this.displayText = '0',
        this.prevTotal = null,
        this.outputText(this.displayText)
    }
 }