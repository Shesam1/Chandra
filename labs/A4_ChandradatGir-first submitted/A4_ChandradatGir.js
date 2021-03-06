		var message;
		var cardnumber="";
		var isValid;
		var isDateValid;
		var card;
		var inputNum;
		var error;
		var validateCard =[];
		var inputMonth;
		var inputYear;
		var curYear= new Date().getFullYear();
		var curMonth=new Date().getMonth();
		var arrayMonth;
		var color;
		var color2;


		function cardValidate(){
			inputData=document.getElementById("credit");
			inputNum=inputData.elements.namedItem("creditcard").value;
			inputMonth=inputData.elements.namedItem("month").value;
			inputYear=inputData.elements.namedItem("expYear").value;


			var message2;

			if(inputYear < curYear || (inputYear==curYear && inputMonth<=curMonth)){
				isDateValid= "expired";
				message2 = "Your card has expired!";
				color2="red";
			}else{
				isDateValid="current";
				message2="Your card is current!";
				color2="green";
			}

			isNumberValid=validatecreditcard(inputNum);
			console.log(isNumberValid);
			console.log(validateCard);

			document.getElementById("demo").style.color=color;
			document.getElementById("demo2").style.color=color2;
			document.getElementById("demo").innerHTML=isNumberValid;
			document.getElementById("demo2").innerHTML=message2;
		}
		//end of validate() function

		//start of validatecreditcard(card) function
		function validatecreditcard(card){
			error="";
			message="";

			var digit;
			cardnumber="";
			isValid="";
			for(var i=0; i<card.length; i++){
				digit=card[i];
				if(digit != "-"){
					cardnumber +=parseInt(digit);
				}
			}

			/*formatting input number for console log
			  number may be entered without dashes*/
			inputNum="";
			for(var i = 0; i<cardnumber.length; i++){

				if(i%4==0 && i>1){
					inputNum +="-";
				}
				inputNum +=cardnumber[i];
			}

			//validate credit card number number of digits
			if(cardnumber.length != 16){
				isValid=false;
				message="Invalid number - Must have 16 digits!";
				error="Must have 16 Digits!";
				color="red";
			}
			//validate for non-digit characters
			else if(isNaN(cardnumber)){
				message="Invalid number - Must have digits ONLY!";
				isValid=false;
				error="Non-digit characters not accepted!"
				color="red";
			}
			//validation-card number must contain more than one digit!
			else if(! cardDigit(cardnumber)){
				message="Invalid number - card cannot have ONLY one digit!";
				isValid=false;
				error="Card number must have more than one digits!"
				color="red";
			//validate-for last digit must be even
			} else if( ((cardnumber %10)%2) != 0){
				message="Invalid number - Last digit must be an even number!";
				isValid=false;
				error ="Last digit not an even number"
				color="red";
			}else if(!sumOfDigits(cardnumber)){
				message="Invalid number - Sum of digits Must be greater than 16!";
				isValid=false;
				error = "Sum of digits must be greater than 16."
				color="red";
			}
			else {
				message="Your credit card number is valid!";
				isValid=true;
				color="green";
				error="";
			}
				if(isValid){
					validateCard.push({valid: isValid, number: inputNum, date: isDateValid});
				}else{
					validateCard.push({valid: isValid, number: inputNum, error: error, date: isDateValid});
				}

				return message;
		}

		//function to check on number of different digits used
		function cardDigit(card){
			var series=[];
			var count=0;
			var isDigitValid;

			//convert number to string
			var cardStr=card.toString();
			//Iterate digits of card number
			for(var i=0; i<cardStr.length; i++){
				var num=parseInt(cardStr[i]);
				//checking if digit exist in array and pushing if not!
				if(series.indexOf(num) == -1){
					series.push(num);
					//counter
					count++;
				}
			}
			//updating boolean variable
			if(count>=2){
				isDigitValid=true;
			}
			else{
				isDigitValid=false;
			}
			//return response
			return isDigitValid;

		}
		//function to check sum of digits
		function sumOfDigits(card){
			var sum = 0;
			var cardStr=card.toString();
			for(var i=0; i<cardStr.length; i++){
				sum += parseInt(cardStr[i]);
			}
			//updating boolean variable
			var isSumValid;
			if(sum>16){
				isSumValid= true;
			}
			else{
				isSumValid= false;
			}
			return isSumValid;
		}
