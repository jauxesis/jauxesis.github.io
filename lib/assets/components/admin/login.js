(function($)
{
    var email = $("#exampleInputEmail1");
    var pass = $("#exampleInputPassword1");
    var exampleOtp = $("#exampleOtp");
    
    var rememberToken = localStorage.getItem("AUXadminRememberToken");
    
    var falock = $("#falock");
    var famsg = $("#famsg");
    
    var logindiv = $("#logindiv");
    var otpdiv = $("#otpdiv");
    
    var spin = $("#spin");
    
    logindiv.show();
    otpdiv.hide();
    
    spin.hide();
    
    localStorage.setItem("AUXadminISIN","N");
    
    localStorage.setItem("AUXadminAPI","http://192.168.0.114:8000/");
    var api = localStorage.getItem("AUXadminAPI");
    
    
    //if remember
    if(rememberToken == "" || rememberToken == null || !rememberToken ){
            //console.log("not set");
    }else{
            console.log("to set d");
        //console.log(rememberToken);
        var t = CryptoJS.AES.decrypt(rememberToken,"auxesis");
        //console.log(t);
        var decrypt = (t).toString(CryptoJS.enc.Utf8);
        //console.log(decrypt);
        email.val(decrypt);
        $("#remember").prop("checked",true);
    }
    $("#remember").change(function() {
        if(this.checked) {
            console.log("checked");
            var emailtxt = email.val();
            if(emailtxt != "" || emailtxt != null){
                var e2 = CryptoJS.AES.encrypt(emailtxt,"auxesis");
                localStorage.setItem("AUXadminRememberToken",e2);
            }else{
                localStorage.removeItem("AUXadminRememberToken");
            }
        }else{
            console.log("uncheckd");
            localStorage.removeItem("AUXadminRememberToken");
        }
    });
    
    //index.html?lang=en
  
    //var e = CryptoJS.AES.encrypt("jitendra@auxesisgroup.com","auxesis");
    //localStorage.setItem("AUXadminRememberToken",e);//U2FsdGVkX19wFQhJsVAMeEuzf+8bz/7vgPCaZoo9VcblmJ49TkEDeCtrb1+CAQgC
       
   /* var e = "";
    console.log("called");*/
    
    
    
    var promptclr = function(msg,type){
        var clr1 = "#f00";var clr2 = "#0f0";
        if(type == "success"){
            falock.css({color:"#0f0"});
            famsg.empty().html(msg).css({color:clr2});
        }else if(type == "fail"){
            falock.css({color:"#f00"});
            famsg.empty().html(msg).css({color:clr1});
        }
        setTimeout(function(){
            falock.css({color:"#dfdfdf"});
            famsg.empty();
        },2900);
    }
    
    //form submit login
    $("#adminform").submit((event)=>{
        event.preventDefault();
        spin.show();
        
        var postemail = email.val();
        var postpass = pass.val();
        if(postemail == "" || postemail == null){
            spin.hide();promptclr("Email is required","fail");   
        }else if(postpass == "" || postpass == null){
            spin.hide();promptclr("Password is required","fail"); 
        }else{
            
            var ifchk = $('#remember:checked').length;
            if(ifchk>0){
                console.log("checked");
                var emailtxt = email.val();
                if(emailtxt != "" || emailtxt != null){
                    var e2 = CryptoJS.AES.encrypt(emailtxt,"auxesis");
                    localStorage.setItem("AUXadminRememberToken",e2);
                }
            }else{
                console.log("uncheckd");
                localStorage.removeItem("AUXadminRememberToken");
            }
            $.ajax({
                type:'POST',
                url:api+$("#adminform").attr('action'),//"https://freegeoip.net/json",//
                data:JSON.stringify({
                    email:postemail,
                    password:postpass
                }),
//                beforeSend: function(xhr){
//                    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//                },
                //contentType:'application/json',
                success:function(response){
                    var res = JSON.parse(JSON.stringify(response));
                    spin.hide();
                    
                    if(res.code==200){
                        var msg = res.success;
                        promptclr(msg,"success");
                        var e1 = CryptoJS.AES.encrypt(postemail,postpass);
                        var e2 = CryptoJS.AES.encrypt(postpass,"auxesis");
                        
                        localStorage.setItem("AUXadminEmail",e1);
                        localStorage.setItem("AUXadminSecret",e2);
                        localStorage.setItem("AUXadminISIN","Y");
                        
                        var pp = CryptoJS.AES.encrypt(postemail,"auxesis");
                        localStorage.setItem("AUXadminSavedToken",pp);
                        
                        setTimeout(function(){
                            otpdiv.show();
                            logindiv.hide();
                        },4000);
                    }else{
                        //console.log(res);
                        var msg = res.failed;
                        promptclr(msg,"fail");
                    }
                },
                error:function(err){
                    spin.hide();
                    console.log(err);
                    /*$("#alertmsg").html("err msg comes");
                    $("#alertdanger").show();//.fadeOut(5000);*/
                    localStorage.setItem("AUXadminISIN","N");
                    promptclr("Network unavailable due to connectivity problem","fail");
                }
            });       

        }
    });
    
    
 
       
    
    //form submit otp
    $("#adminotpform").submit((event)=>{
        event.preventDefault();
        var otp = exampleOtp.val();
        var postemail = email.val();
        spin.show();
        if(otp == "" || otp == null){
            spin.hide();promptclr("OTP is required","fail");   
        }else{
            //decrypt first
            var e1 = localStorage.getItem("AUXadminEmail");
            var e2 = localStorage.getItem("AUXadminSecret");
            
            var d2 = CryptoJS.AES.decrypt(e2,"auxesis");
            var decryptsecret = d2.toString(CryptoJS.enc.Utf8);
            
            var d1 = CryptoJS.AES.decrypt(e1,decryptsecret);
            var decryptemail = d1.toString(CryptoJS.enc.Utf8);
            console.log(decryptemail);
            //console.log(d1.toString(CryptoJS.enc.Utf8));
            
            $.ajax({
                type:'POST',
                url:api+$("#adminotpform").attr('action'),//"https://freegeoip.net/json",//
                data:JSON.stringify({
                    email:decryptemail,
                    otp:otp
                }),
//                beforeSend: function(xhr){
//                    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//                },
                success:function(response){
                    spin.hide();
                    var res = JSON.parse(JSON.stringify(response));
                    console.log(res);
                    if(res.code==200){
                        var msg = "Wait we transferring to your asset...";
            
                        var clr1 = "#f00";var clr2 = "#0f0";

                        falock.html("<i class='fa fa-unlock-alt'></i>").css({color:clr2});
                        famsg.empty().html("All Done!").css({color:clr2});

                        setTimeout(function(){
                            logindiv.hide();
                            otpdiv.fadeOut(1200);
                            setTimeout(function(){
                                $("#otpfinaldiv").empty().fadeIn(2400).html("<div class='panel-body innerAll text-center'>"+msg+"</div>");
                                setTimeout(function(){
                                    location.href = "index.html";
                                },2500);
                            },1000);
                        },1500);
                        
                        
                    }else{spin.hide();
                        promptclr("Fail due to server unable to response","fail");
                    }
                },
                error:function(err){
                    spin.hide();console.log(err);
                }
            });   
            
            
            
            
        }
    });
    
    
    //back div
    $("#back").click(()=>{
        otpdiv.hide();
        logindiv.show();
    });
    
    
//    var e1 = CryptoJS.AES.encrypt("mail@outlook.com","admin");
//    var d1 = CryptoJS.AES.decrypt(e1,"admin");

    //console.log("mail@outlook.com");
    //localStorage.setItem("AUXadminSecret",e1);
    //localStorage.setItem("AUXadminSecret2",d1);
    
    
    //console.log(d1);
    //console.log(d1.toString(CryptoJS.enc.Utf8));
    
})(jQuery);