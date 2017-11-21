(function($){
    
    var spin = $("#spin");
    spin.hide();
    var api = localStorage.getItem("AUXadminAPI");
    
    /*var divalerts1 = $("#alertsuccess");
    divalerts1.show();
    //document.getElementById("#alertsuccess").style.display = 'block';
    
    $("#alertmsg").text("Asdfsd");*/
    console.log("Adsf23d");
    //form submit bankdetail
    $("#bankdetailform").submit(function(event){
        event.preventDefault();
        spin.show();
        
        var bankname = $("#formBankName").val();
        var accountname = ($("#formAccountName").val()).toUpperCase();
        var accountno = $("#formAccountNo").val();
        var ifsccode = $("#formIFSCcode").val();
        var accounttype = $("#formAccountType").val();
        
        
        if(bankname == "" || bankname == null){
            spin.hide(); 
        }else if(accountname == "" || accountname == null){
            spin.hide();
        }else if(accountno == "" || accountno == null){
            spin.hide();
        }else if(ifsccode == "" || ifsccode == null){
            spin.hide();
        }else if(accounttype == "" || accounttype == null){
            spin.hide();
        }else{
            console.log(accountno+" "+accountname);
            console.log(accounttype+" "+ifsccode+" "+bankname);
            $.ajax({
                type:'POST',
                url:api+$("#bankdetailform").attr('action'),
                data:JSON.stringify({
                    "bank_name":bankname,
                    "user_name":accountname,
                    "account_no":accountno,
                    "isfc":ifsccode,
                    "account_type":accounttype,
                }),
                success:function(response){
                    var res = JSON.parse(JSON.stringify(response));
                    spin.hide();
                    
                    if(res.code==200){
                        console.log(response);
                    }else{
                        //console.log(res);
                    }
                },
                error:function(err){
                    spin.hide();
                    console.log(err);
                }
            });       

        }
    });
    
    
    
    /*$("p:contains('"+searchedText+"')").each( function( i, element ) {
          var content = $(element).text();
          content = content.replace( searchedText, '<span class="search-found">' + searchedText + '</span>' );
          element.html( content );
     });

     .search-found {
         text-decoration: underline;
     }*/
    
    //console.clear();
})(jQuery);