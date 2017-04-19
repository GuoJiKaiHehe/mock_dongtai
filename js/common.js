var cart=store.get('cart')?store.get('cart').toString():'';
 $(function(){    



// document.body.appendChild(script);
          $("#nav-switch").click(function () {
            $("#nav-toggle").toggle('linear');
          });
          var other='<div class="other pull-right" style="position:absolute; right:50px;top:0px;" >'+
          '<a class="site-nav-item active" href="javascript:;" id="Sign_in">Sign in</a>'+
          '<i style="color:#fff">|</i>'+
          '<a class="site-nav-item" href="./Categories.html" id="register">register</a>'+
      '</div>';
         $('.site-nav').after(other) 

         var str_login='<form class="form-horizontal" id="login">'+
      
       ' <div class="form-group">'+
       ' <label for="firstname" class="col-sm-2 control-label">User:</label>'+
       ' <div class="col-sm-10">'+
        '    <input type="text" class="form-control" id="firstname" '+
             '      placeholder="please enter your username">'+
       ' </div>'+
      '  </div>'+
      ' <div class="form-group">'+
       ' <label for="firstname" class="col-sm-2 control-label">Pass:</label>'+
       ' <div class="col-sm-10">'+
        '    <input type="password" class="form-control" id="password" name="password"'+
             '      placeholder="please enter your password">'+
       ' </div>'+
      ' </div>'+
      '<div class="form-group">'+
        '<div class="col-sm-offset-2 col-sm-10">'+
           ' <button type="submit" class="submit_login btn btn-default">Sign in</button>'+
     '   </div>'+
  '  </div>'+

' </form>';

$('body').on('click','#Sign_in',function(e){
    e.preventDefault();
   var layer_index=layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['450px', '250px'], //宽高
        shade: false,
        title:'Login',
        content:str_login
        });
    $('#firstname').focus();
    $('body').on('click','.submit_login',function(e){
    e.preventDefault();
    username=$('#firstname').val();
    password=$('#password').val();
    if(!/[\S]{2,20}/i.test( username )){
        dialog.error('User name must be greater than 2 and less than 20');
        return;
    }
    if(!/[\S]{6,20}/i.test(password)){
        dialog.error('Password must be greater than 6 and less than 20');
        return;
    }
    var t=0;
    for(var i=0;i<users_obj.length;i++){
        if(users_obj[i].username==username){
            t++
        }
        if(users_obj[i].password==password){
            t++
        }

    }
    var users=store.get('users')||[];

    for(var i=0;i<users.length;i++){
        if(users[i].username==username){
            t++
        }
        if(users[i].password==password){
            t++
        }
    }
   
    if(t>=2){
        dialog.success('success')
        $('#login')[0].reset();
         store.set('user',username);
        dialog.close(layer_index);
        location.reload();

    }else{
      dialog.error('User name or password erro');
    }

});

   })


if(store.get('user')){
    $('.other').html('<a class="site-nav-item active" href="javascript:;" id="'+store.get('user')+'">'+store.get('user')+'</a>|<a class="site-nav-item active" href="javascript:;" id="Sign_out">Sign out</a>');
 
}

$('body').on('click','#Sign_out',function(e){
        e.preventDefault();
        store.remove('user');
         location.reload();
     })




 //登录：
var str_register='<form class="form-horizontal col-sm-offset-3 col-md-offset-3" id="register_form">'+  
               ' <h3 class="form-title">Login to your account</h3> '+   
               ' <div class="col-sm-9 col-md-9">  '+  
                 '   <div class="form-group">  '+  
                  '      <i class="fa fa-user fa-lg"></i>  '+
                   ' <input class="form-control required" type="text" placeholder="Username" name="username" autofocus="autofocus"/>  '+  
                   ' </div>  '+  
                    '<div class="form-group">'+    
                     '       <i class="fa fa-lock fa-lg"></i>  '+  
                      ' <input class="form-control required" type="password" placeholder="Password"   id="register_password" name="password"/>  '+  
                     '</div>  '+  
                     ' <div class="form-group">  '+  
                        '      <i class="fa fa-check fa-lg"></i>  '+  
                           '   <input class="form-control required" type="password" placeholder="Re-type Your Password"   name="rpassword"/>  '+  
                     ' </div>  '+  
                     ' <div class="form-group">  '+  
                        '      <i class="fa fa-envelope fa-lg"></i>  '+  
                          '    <input class="form-control eamil" type="text" placeholder="Email" name="email"/> '+   
                     ' </div>  '+  
                     ' <div class="form-group">'+    
                        '  <input type="submit" class="btn btn-success pull-right" value="Sign Up "/>  '+  
                         ' <input type="submit" class="btn btn-info pull-left" id="back_btn" value="Back"/>  '+  
                     ' </div>   '+  
                '  </div>   '+  
             ' </form>  ';
 


$('body').on('click','#register',function(e){
    e.preventDefault();
   var layer_index=layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['450px', '70%'], //宽高
        shade: false,
        title:'register',
        content:str_register
        });

   $('#register_form').submit(function(e){
    e.preventDefault();

})
  $("#register_form").validate({ 
      submitHandler:function(form){
           var users=store.get('users')||[];
           user={
            username:$('#register_form input[name=username]').val(),
            email:$('#register_form input[name=email]').val(),
            password:$('#register_form input[name=password]').val(),
           };
           users.push(user);
           store.set('users',users);
           $('#register_form')[0].reset();
           dialog.smaile('注册成功请登录!');
        }, 
        rules: {  
            username: "required",  
            password: {  
                required: true,  
                minlength: 2  
            },  
            rpassword: {  
                equalTo: "#register_password"  
            },  
            email: {  
                required: true,  
                email: true  
            }  
        }
    });  
})
    
   $('body').on('click','.goods',function(){
        var gid=$(this).attr('gid');
        store.set('click_goods',gid);
        location.href="./details.html";
   })
   $('body').on('click','.Settlement',function(e){
        if(!store.get('user')){

            $('#Sign_in').click();
            dialog.smaile('请先登录！');
        }
   })

});  


Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
        }

 function purchase(o,type){
          var gid=$(o).attr('gid')
          console.log(gid);
          if(cart!=""){
            goods_str=cart;
            
          }else{
            goods_str=gid+'-0'; //购物车没有东西；
          }
        var  temp_one=0;
          goods_arr=goods_str.split(',');
          console.log(goods_arr);
          temp_str='';
          var goods_c=0;
          for(var i=0;i<goods_arr.length;i++){
               goods_temp=goods_arr[i].split('-');
               goods_c=goods_temp[1];
               if(gid==goods_temp[0]){
                   goods_c=parseInt(goods_temp[1])+parseInt($('.mui-amount-input').val());
                   temp_one=1;//存在该商品；
               }
               temp_str+=goods_temp[0]+'-'+goods_c+',';
               console.log(temp_str);
          }
          if(!temp_one){
            temp_str+=gid+'-'+$('.mui-amount-input').val()+',';
          }
          temp_str=temp_str.slice(0,-1);
          
          store.set("cart",temp_str);
          if(type=='buy'){
          location.href="./Cart.html";

        }else if(type=="add"){
          dialog.smaile('加入购物车成功！');
        }
        }