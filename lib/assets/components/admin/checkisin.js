
    //load bootbox
    var bootbox = document.createElement('script');
    bootbox.src = '../assets/components/library/bootbox.min.js';
    document.head.appendChild(bootbox);

//(function($){
    
    //Crypto check
    var check = localStorage.getItem("AUXadminISIN");
    //console.log(check);
    if(check == "N" || check == "" || check == null || !check ){
        location.href = "login.html";
    }else{
        var checkemail = localStorage.getItem("AUXadminEmail");
        var checkrmmbr = localStorage.getItem("AUXadminRememberToken") || localStorage.getItem("AUXadminSavedToken");
        var checksecret = localStorage.getItem("AUXadminSecret");

        var d2 = CryptoJS.AES.decrypt(checksecret,"auxesis");
        var decryptsecret = d2.toString(CryptoJS.enc.Utf8);
        //console.log(decryptsecret);
        var d1 = CryptoJS.AES.decrypt(checkemail,decryptsecret);
        var decryptemail = d1.toString(CryptoJS.enc.Utf8);

        //console.log(decryptemail);

        var decryptemail2 = (CryptoJS.AES.decrypt(checkrmmbr,"auxesis")).toString(CryptoJS.enc.Utf8);

        //console.log(decryptemail2);
        if( check == "Y" && decryptemail === decryptemail2 ){
            //console.log("valid auth");
        }else{
            //console.error("invalid auth");
            location.href = "login.html";
        }
    }
    
    //normal
    /*if( check == "Y"){
        console.log("valid auth");
    }else{
        console.error("invalid auth");
        location.href = "login.html";
    }*/
    
    
    
    
//})(jQuery);
//logout
function logout(){
    bootbox.confirm({
        message: "Are you sure want to logout?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            //console.log('This was logged in the callback: ' + result);
            if(result == true){
                localStorage.removeItem("AUXadminEmail");
                localStorage.removeItem("AUXadminRememberToken");
                localStorage.removeItem("AUXadminSecret");
                localStorage.removeItem("AUXadminISIN");
                location.href = "login.html";
            }
        }
    });
    /**/
};