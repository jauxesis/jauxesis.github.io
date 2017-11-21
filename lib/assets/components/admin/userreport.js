
    //load bootbox
    var bootbox = document.createElement('script');
    bootbox.src = '../assets/components/library/bootbox.min.js';
    document.head.appendChild(bootbox);
(function($){
    
    
    var spin = $("#spin");
    spin.hide();
    var api = localStorage.getItem("AUXadminAPI");
    
    var tabletitle = $("#tabletitle");
    var tablepreview = $("#tablepreview");
    var tableheader = $("#tableheader");
    var tablebody = $("#tablebody");
    
    var responseBody = [];
    var responseBodyVerify = [];
    
    function actverified(key,rs){
        /*console.log(key);
        console.log(rs)*/
        var findid = _.find(rs,function(o){ if(key == o.id) return o; });
        var email = findid.email;   
        if(email != "" || email != null){
            spin.show();
            
            $.ajax({
                type:'POST',
                url:api+"user_verify/",
                data:JSON.stringify({
                    email:email
                }),
                contentType:'application/json'
            })
            .done(function(res){
                spin.hide();
                if(res.code==200){
                    console.log("Document verified"+JSON.stringify(res));
                }else{
                    console.log("Document unverified"+JSON.stringify(res));
                }
            })
            .fail(function(err){
                spin.hide();
                console.error("Network failed"+JSON.stringify(err));
            });
        }
        
    }

    var actreject = function(key,rs){
        var findid = _.find(rs,function(o){ if(key == o.id) return o; });
        var email = findid.email;   
        var name = findid.name;
        if(email != "" || email != null){
            //input[type=text], input[type=password], select, textarea
            $(".reason").css({color:'#000',width:'100%'});
            var funcall = function(result){
                    if(result != "" || result != null){
                        console.log(result); 
                        spin.show();
            
                        $.ajax({
                            type:'POST',
                            url:api+"user_reject/",
                            data:JSON.stringify({
                                email:email,
                                reason:result
                            }),
                            contentType:'application/json'
                        })
                        .done(function(res){
                            spin.hide();
                            if(res.code==200){
                                console.log("Document rejected"+JSON.stringify(res));
                            }else{
                                console.log("Document not rejected"+JSON.stringify(res));
                            }
                        })
                        .fail(function(err){
                            spin.hide();
                            console.error("Network failed"+JSON.stringify(err));
                        });
                    }else{
                        console.log(result+" is empty");
                    }
            }
            var dialog = bootbox.dialog({
                title: "Type reason to reject "+name+"'s kyc details.",
                message: "<input type='text' name='reason' class='reason' id='reason' placeholder='type reason here...'>",
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: 'btn-info',
                        callback: function(){
                            //Example.show('Custom cancel clicked');
                        }
                    },
                    ok: {
                        label: "Reject",
                        className: 'btn-danger',
                        callback: function(){
                            var result = $("#reason").val();
                            funcall(result);
                        }
                    }
                }
            });
        }
    }
    
    var loadData = function(){
        $("td").css({"border-top":"1px solid #ddd"});
        
        var url = location.search;
        //console.log("loading..."+url);
        
        var urlParams = {};
          url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) {
              urlParams[$1] = $3;
            }
          );
        
        var empres = function(msg){
            tableheader.empty().html("<tr>"+"<th colspan='5'><b>No "+msg+" users</b></th>"+"</tr>");
            tablebody.empty().html("<tr>"+"<td colspan='5'><b>No data for kyc detail</b><td>"+""); 
        }
        
        
        
        var rejected = function(){
            spin.show();
            tabletitle.html("Rejected users list");
            
            $.ajax({
                type:'POST',
                url:api+"display_rejected/",
                data:JSON.stringify({

                }),
                contentType:'application/json'
            })
            .done(function(res){
                spin.hide();
                //console.log(res);
                var code = res.code;
                if(code == 200){
                    tableheader.empty();
                    tablebody.empty();
                    var rs = res.kyc_list;
                    //console.log(rs);
                    
                    if(rs == "" || rs ==null){
                        empres("rejected");
                    }else{
                    
                        var thead = "<th>Sr No.</th>"+
                                    "<th>Name</th>"+
                                    "<th>Email</th>"+
                                    "<th>Aadhar</th>"+
                                    "<th>Pan</th>"+
                                    "<th>Status</th>";
                        tableheader.html("<tr>"+thead+"</tr>");
                    //END
                    
                    
                    //populating table body
                        var tbody = "";
                        _.forEach(rs,function(value,key){
                            //console.log(value.kyc.status);
                            responseBodyVerify.push({
                               id:key, 
                               email:value.email,
                               status:(value.kyc.status).charAt(0).toUpperCase()+(value.kyc.status).slice(1),
                               city:value.kyc.city,
                               aadhar_file_front:value.kyc.aadhar_file_front,
                               state:value.kyc.state,
                               dob:value.kyc.dob,
                               aadhar_file_back:value.kyc.aadhar_file_back,
                               pan_no:value.kyc.pan_no,
                               aadhar_no:value.kyc.aadhar_no,
                                pan_file:value.kyc.pan_file,
                                pin_code:value.kyc.pin_code,
                                street_address:value.kyc.street_address,
                                name:value.kyc.name
                                //status,city,aadhar_file_front,state,dob,aadhar_file_back,pan_no,aadhar_no,pan_file,pin_code,street_address,name
                                
                            });
                        });
                        //console.log(responseBodyVerify)
                        _.forEach(responseBodyVerify,function(value,key){
                            //if(value.status == "pending"){
                            var aadhar1 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar1'+value.id+'" '+ 'href="../assets/images/demo/demoaadhar.jpg">'+
                                                                '<img class="docsimg" '+ 'src="../assets/images/demo/demoaadhar.jpg"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var aadhar2 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar2'+value.id+'" '+ 'href="'+value.aadhar_file_back+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.aadhar_file_back+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var pan = '<div class="col-md-12 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idpan'+value.id+'" '+ 'href="'+value.pan_file+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.pan_file+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            $("#idaadhar1"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idaadhar2"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idpan"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            var item = (key+1);
                            tbody += "<td>"+item+"</td>"+
                                     "<td>"+value.name+"</td>"+
                                     "<td>"+value.email+"</td>"+
                                     "<td>"+aadhar1+aadhar2+"</td>"+
                                     "<td>"+pan+"</td>"+
                                     "<td><font color='#f5022d'><b>"+value.status+"</b></font></td>";
                            tbody = "<tr>"+tbody+"</tr>";
                            
                            
                            
                        });
                        tablebody.append(""+
                                       tbody+
                                   ""); 
                    //END
                    }
                }else{
                    empres("rejected");
                }
                
            })
            .error(function(err){
                spin.hide();
                console.log(err);
                empres("rejected");
            });
        }
        var verified = function(){
            spin.show();
            tabletitle.html("Verified users list");
            
            $.ajax({
                type:'POST',
                url:api+"display_accepted/",
                data:JSON.stringify({

                }),
                contentType:'application/json'
            })
            .done(function(res){
                spin.hide();
                //console.log(res);
                var code = res.code;
                if(code == 200){
                    tableheader.empty();
                    tablebody.empty();
                    var rs = res.kyc_list;
                    //console.log(rs);
                    
                    if(rs == "" || rs ==null){
                        empres("verified");
                    }else{
                    
                        var thead = "<th>Sr No.</th>"+
                                    "<th>Name</th>"+
                                    "<th>Email</th>"+
                                    "<th>Aadhar</th>"+
                                    "<th>Pan</th>"+
                                    "<th>Status</th>";
                        tableheader.html("<tr>"+thead+"</tr>");
                    //END
                    
                    
                    //populating table body
                        var tbody = "";
                        _.forEach(rs,function(value,key){
                            //console.log(value.kyc.status);
                            responseBodyVerify.push({
                               id:key, 
                               email:value.email,
                               status:(value.kyc.status).charAt(0).toUpperCase()+(value.kyc.status).slice(1),
                               city:value.kyc.city,
                               aadhar_file_front:value.kyc.aadhar_file_front,
                               state:value.kyc.state,
                               dob:value.kyc.dob,
                               aadhar_file_back:value.kyc.aadhar_file_back,
                               pan_no:value.kyc.pan_no,
                               aadhar_no:value.kyc.aadhar_no,
                                pan_file:value.kyc.pan_file,
                                pin_code:value.kyc.pin_code,
                                street_address:value.kyc.street_address,
                                name:value.kyc.name
                                //status,city,aadhar_file_front,state,dob,aadhar_file_back,pan_no,aadhar_no,pan_file,pin_code,street_address,name
                                
                            });
                        });
                        //console.log(responseBodyVerify)
                        _.forEach(responseBodyVerify,function(value,key){
                            //if(value.status == "pending"){
                            var aadhar1 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar1'+value.id+'" '+ 'href="../assets/images/demo/demoaadhar.jpg">'+
                                                                '<img class="docsimg" '+ 'src="../assets/images/demo/demoaadhar.jpg"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var aadhar2 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar2'+value.id+'" '+ 'href="'+value.aadhar_file_back+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.aadhar_file_back+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var pan = '<div class="col-md-12 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idpan'+value.id+'" '+ 'href="'+value.pan_file+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.pan_file+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            $("#idaadhar1"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idaadhar2"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idpan"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idaadhar1"+value.id).click(function(){
                                console.log("adf "+"#idaadhar1"+value.id);
                            });
                            var item = (key+1);
                            tbody += "<td>"+item+"</td>"+
                                     "<td>"+value.name+"</td>"+
                                     "<td>"+value.email+"</td>"+
                                     "<td>"+aadhar1+aadhar2+"</td>"+
                                     "<td>"+pan+"</td>"+
                                     "<td><font color='green'><b>"+value.status+"</b></font></td>";
                            tbody = "<tr>"+tbody+"</tr>";
                            
                            
                            
                        });
                        tablebody.append(""+
                                       tbody+
                                   ""); 
                    //END
                    }
                }else{
                    empres("verified");
                }
                
            })
            .error(function(err){
                spin.hide();
                console.log(err);
                empres("verified");
            });
        }
        var pending = function(){
            spin.show();
            tabletitle.html("Pending users list");
            
            $.ajax({
                type:'POST',
                url:api+"display_pending/",
                data:JSON.stringify({

                }),
                contentType:'application/json'
            })
            .done(function(res){
                spin.hide();
                //console.log(res);
                var code = res.code;
                if(code == 200){
                    tableheader.empty();
                    tablebody.empty();
                    var rs = res.kyc_list;
                    console.log(rs);
                    
                    if(rs == "" || rs ==null){
                        empres("pending");
                    }else{
                    
                    //Make table header formalized
                        /*var arr = ["Sr No.","Detail"];
                        var keys ;
                        _.forEach(rs,function(value,key){
                            keys = Object.keys(value);
                        });

                        _.forEach(keys,function(val){//take only 
                           //console.log(val)
                            //status,city,aadhar_file_front,state,dob,aadhar_file_back,pan_no,aadhar_no,pan_file,pin_code,street_address,name
                            if(val == "aadhar_file_front" || val == "aadhar_file_back" || val == "pan_file"){
                                val = val.replace("_"," ");
                                val = val.charAt(0).toUpperCase()+(val.slice(1)).replace("_"," ");
                                val = val.replace(" file","");
                                arr.push(val);
                            }
                        });
                        arr.push("Status");
                        //console.log(arr);

                        var thead = "";
                        _.forEach(arr,function(val,key){
                            //if(key == 1){
                            //    thead += "<th data-class='expand'>"+val+"<th>";
                            //}
                            //else{ 
                                thead += "<th>"+val+"<th>"; 
                            //}
                        })*/
                        //console.log(thead);
                        var thead = "<th>Sr No.</th>"+
                                    "<th>Name</th>"+
                                    "<th>Email</th>"+
                                    "<th>Aadhar</th>"+
                                    "<th>Pan</th>"+
                                    "<th>Status</th>"+
                                    "<th>Action</th>";
                        tableheader.html("<tr>"+thead+"</tr>");
                    //END
                    
                    
                    //populating table body
                        var tbody = "";
                        _.forEach(rs,function(value,key){
                            console.log(value.kyc.status);
                            responseBody.push({
                               id:key, 
                               email:value.email,
                               status:value.kyc.status,
                               city:value.kyc.city,
                               aadhar_file_front:value.kyc.aadhar_file_front,
                               state:value.kyc.state,
                               dob:value.kyc.dob,
                               aadhar_file_back:value.kyc.aadhar_file_back,
                               pan_no:value.kyc.pan_no,
                               aadhar_no:value.kyc.aadhar_no,
                                pan_file:value.kyc.pan_file,
                                pin_code:value.kyc.pin_code,
                                street_address:value.kyc.street_address,
                                name:value.kyc.name
                                //status,city,aadhar_file_front,state,dob,aadhar_file_back,pan_no,aadhar_no,pan_file,pin_code,street_address,name
                                
                            });
                        });
                        //console.log(responseBody)
                        _.forEach(responseBody,function(value,key){
                            var aadhar1 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar1'+value.id+'" '+ 'href="../assets/images/demo/demoaadhar.jpg">'+
                                                                '<img class="docsimg" '+ 'src="../assets/images/demo/demoaadhar.jpg"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var aadhar2 = '<div class="col-md-6 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idaadhar2'+value.id+'" '+ 'href="'+value.aadhar_file_back+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.aadhar_file_back+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            var pan = '<div class="col-md-12 col-sm-6"><div class="widget text-center">'+
                                                '<div class="widget-body padding-none">'+
                                                    '<div>'+
                                                        '<div class="innerAll bg-inverse">'+
                                                            '<a id="idpan'+value.id+'" '+ 'href="'+value.pan_file+'">'+
                                                                '<img class="docsimg" '+ 'src="'+value.pan_file+'"/>'+
                                                            '</a>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div></div>';
                            $("#idaadhar1"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idaadhar2"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            $("#idpan"+value.id).fancybox({
                                  helpers:  {
                                        title : { type : 'inside' },
                                        overlay : { showEarly : false }
                                    }
                              });
                            
                            
                            if(value.status == "pending"){
                            var item = (key+1);
                            tbody += "<td>"+item+"</td>"+
                                     "<td>"+value.name+"</td>"+
                                     "<td>"+value.email+"</td>"+
                                     "<td>"+aadhar1+aadhar2+"</td>"+
                                     "<td>"+pan+"</td>"+
                                     "<td><font color='#e69f00'><b>"+value.status+"</b></font></td>"+
                                     "<td>"+
                                        '<button type="button" class="btn btn-success btnkyc" id="btnVerify'+(key)+'" ><i class="fa fa-fw fa-check"></i> Verified</button><br>'+
				                        '<button type="button" id="btnReject'+(key)+'" class="btn btn-danger btnkyc"><i class="fa fa-fw fa-times"></i> Reject</button>'+
                                     "</td>";
                            tbody = "<tr>"+tbody+"</tr>";
                            }
                            
                            
                            
                        });
                    
                            tablepreview.on("click", "button", function(values) {
                                var id = values.currentTarget.id;
                                var text = values.currentTarget.outerText;
                                text = (text.replace(" ","")).toLowerCase();
                                console.log(id+" "+text)
                                var takelastid = id.charAt(id.length-1);
                                if(text == "reject"){
                                    actreject(takelastid,responseBody);
                                }else if(text == "verified"){
                                    actverified(takelastid,responseBody);
                                }
                            });
                        //console.log(tbody);
                        /*var aa = "<td colspan='5'>asdfsdf</td>";
                        tbody += "<tr>"+aa+"</tr>";*/
                        tablebody.append(""+
                                       tbody+
                                   ""); 
                    //END
                    }
                }else{
                    empres("pending");
                }
                
            })
            .error(function(err){
                spin.hide();
                console.log(err);
                empres("pending");
            });
            //console.log("pending");
        }
        
        
        
        
        var apitype = urlParams.type;
        if(apitype == "rejected"){
            rejected();
        }else if(apitype == "verified"){
            verified();
        }else{
            pending();
        }
        
        
    }
    loadData();
})(jQuery);