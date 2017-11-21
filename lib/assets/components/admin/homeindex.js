(function($){
    
    var spin = $("#spin");
    spin.hide();
    var api = localStorage.getItem("AUXadminAPI");
    
    var calltoken = function(){
        console.log("in");
        $.ajax({
            type:'POST',
            url:api+"token/",
            data:JSON.stringify({
                
            }),
            contentType:'application/json'
        })
        .done(function(res){
            spin.hide();
            var rs = res;
            console.log(rs);
            if(!rs.sold_token){
                console.log("sold");
            }else{
                console.error(res);
            }
        })
        .error(function(err){
            spin.hide();
            console.log(err);
        });
    }
    
    var loadData = function(){
        spin.show();
        //console.log("loading in index...");
        $.ajax({
            type:'POST',
            url:api+"user_count/",
            data:JSON.stringify({
                
            }),
            contentType:'application/json'
        })
        .done(function(res){
            spin.hide();
            console.log(res);
            var rs = res;
            if(rs.code == 200){
                var rejected_docs_counts = rs.rejected_docs_counts;
                rejected_docs_counts = rejected_docs_counts?rejected_docs_counts:0;
                
                var verified_docs = rs.verified_docs;
                verified_docs = verified_docs?verified_docs:0;
                
                var totaldoc = _.values(_.pick(rs, ['total-documents']));
                totaldoc = totaldoc[0];
                totaldoc = totaldoc?totaldoc:0;
                
                $("#doc1").empty().html(verified_docs);
                //calltoken();
            }else{
                //console.log(res);
                $("#doc1").empty().html(0);
            }
        })
        .error(function(err){
            spin.hide();
            console.log(err);
        });
    }
    loadData();
})(jQuery);