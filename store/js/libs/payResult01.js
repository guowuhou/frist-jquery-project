(function(){
    var payResultView={
        init:function(){
            var orderList=common.getData("orderList");
            this.bindEvent(orderList);
            this.render();
            /*//公共样式的点击写法
            common.bindEvent(this.events,this)//公共样式在common01中*/
        },
      /*  //公共样式的点击写法
        events:{
          '#goto_order_btn click':'shows',
        },
        //公共样式的点击写法
        shows:function(){
            self.render(data)
        },*/

        //常规点击写法
        bindEvent:function(data){
            var self=this;
            $("#goto_order_btn").on("click",function(){
                self.render(data)
            })
        },
        render:function(data){
          var tpl=$("#tpl").html();
           var html= _.template(tpl)(data);
            $("#pay_order").html(html);
        }
    };
    payResultView.init();
})();
