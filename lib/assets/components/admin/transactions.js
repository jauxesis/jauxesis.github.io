//(function($){
    
    var spin = $("#spin");
    spin.hide();
    var api = localStorage.getItem("AUXadminAPI");
    
    var tablebody = $("#tablebody2");
    //tablebody.show();
    console.log("Adsf23d2");
    
    var callyes = function(i){
        console.log("i "+i + $("#amount"+i).val());
    }
    
    function callno(i){
        console.log("fg "+i);
    }
    var body = "";
    function got(){
        for(var i=1;i<=10;i++){
            $("#amount"+i).click(function(){
                console.log("im called");
            })

            $("#amountto"+i).click(function(){
                console.log("im 2 called");
            })

            body += "<tr>"+
                        "<td>"+i+"</td> "+
                        "<td>Usd99"+i+"</td>"+
                        "<td>Saving</td>"+
                        "<td>3000</td>"+
                        "<td>Dena</td>"+
                        '<td><input type="text" name="amount'+i+'" id="amount'+i+'"></td>'+
                        '<td><input type="text" name="amountto'+i+'" id="amountto'+i+'"></td>'+
                        '<td>&nbsp;<i class="fa fa-check" aria-hidden="true" style="color: forestgreen" onclick="callyes('+i+')">'+'</i>&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" style="color: crimson" id="btnamountto'+i+'" onclick="callno('+i+')">'+'</i>&nbsp;</td>'+
                    "</tr>";


        }
        
        tablebody.append(body);
        
    }
    got();
    
    
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
                    "accoudnt_no":accoundtno,
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

    
    //console.clear();
//})(jQuery);