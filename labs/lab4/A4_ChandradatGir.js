			var isValid=false;
			var creditNum="";
			var error="";
			var numTot="";
			var message="";
			var message2="";
			var color="";
			var data;
			var mth;
			var year;
			var curYear= new Date().getFullYear();
			var curMonth=new Date().getMonth();
			var isDateValid;
	
			//referring to html document NB:Without this jQuery fails to connect to your page
			$(document).ready(function(){

				$("#btn_1").click(function(){
					data=$("#credit-1").val();
					mth=$("#expMth").val();
					year=$("#expYr").val();


					if(year<curYear || (year == curYear && mth<= curMonth)){
						isDateValid=false;
						message2="<b>Expired!</b>";
					}else{
						isDateValid=true;
						message2="Current!";
					}

					//calling the validatecreditcard function
					message=validatecreditcard(data);
					$("#demo").css("color", color);
					$("#demo").html(message);
					//$("#demo2").html(message2);
					console.log(message);
					});

					//validatecreditcard function
					window.validatecreditcard = function(data){
						creditNum=""; //get blank - to avoid number accumulating

						//RegExp expression-searches for and replace with ""
						creditNum = data.replace(/-/g,"");

						//formatting number for display/console log.
						data="";
						for(var i = 0; i<creditNum.length; i++){

							if(i%4==0 && i>1){
								data +="-";
							}
							data +=creditNum[i];
						}

						//check number of digits
						if(creditNum.length != 16){
							isValid=false;
							error="Number must be <b>16 digits!</b>";
						}
						//check if Not a Number
						else if(isNaN(creditNum)){
							isValid=false;
							error="Only <b>digits</b> accepted!";
						}
						//check sum of digits
						else if(sumOfDigits(creditNum)<=16){
							isValid=false;
							error="Sum of digits must be <b>greater than 16!</b>";
						}
						else if(((creditNum%10)%2) !=0){
							isValid=false;
							error="Last digit must be an <b>even</b> number!";
						}
						else if(numOfDigits(creditNum)<2){
							isValid=false;
							error="Number cannot be of only <b>one</b> digit!";
						}else{
							isValid=true;
							error="none";
						}
						if(isValid && isDateValid){
							color="green";
						}else{color="blue";}
						if(isValid){
							return "Card Number-Valid: "+ isValid +",  Number: "+ data+"; Date: "+message2;
						}
						else{
							return "Card Number-Valid: <b>"+ isValid +"</b>,  Number: <b>"+ data+"</b>,  Error: "+ error+"; Date: "+message2;
						}
					}

				//function that sum digits
				function sumOfDigits(card){
					var sum = 0;
					var cardStr=card.toString();
					for(var i=0; i<cardStr.length; i++){
						sum += parseInt(cardStr[i]);
					}
					return sum;
				}
				//checking number of digits
				var series=[];
				var num;
				function numOfDigits(card){
					series=[];
					for(var i = 0; i<card.length; i++){
						num=card[i];
						if(series.indexOf(num)==-1){
							series.push(num);
						}
					}
					return series.length;
				}
		});
