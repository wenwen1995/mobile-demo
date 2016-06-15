# mobile-demo
   做完这个小项目大概前后花了3天的时间，中间其实还遇到蛮多问题的，现在来总结下问题的出现和解决方法，以及获得的经验。
   最终效果图为:![image](https://github.com/wenwen1995/mobile-demo/screenshot/MobileImg.png)
1.问题1：如何让一个div处于一直垂直居中，不随浏览器大小的变化而移动位置？
  answer:对于一个有固定宽度的div,比如它的宽度为width:500px;此时再设置margin:0 auto;就可以实现。
  对于一个<div id="Content"></div>,它的position:absolute的话，有2种方法可以实现，方法1：
  #Content{
    position:absolute;
    margin:auto;
    top:0;
    left:0;
    bottom:0;
    right:0;
  }
  方法2：
  #Content{
  position:absolute;
  width:500px;
  height:200px;
  background-color:red;
  left:50%;
  top:50%;
  margin-left:-100px;/*设置为宽度的一半*/
  margin-top:-250px;/*设置为高度的一半*/
  }
问题2:在点击活动奖励和查看历史战绩出现遮罩弹框时，设置的cursor:pointer;没有反应？
answer:原因是：当时在类名称为background的div属性时，加了属性z-index:-1;去掉了后一切就好了。

问题3：如何让在一个div的文字处于居中的位置？
answer:在设置了div的高度height后，再设置属性line-height的值跟height一样，即可实现。

问题4：在引入自己写的page.js文件后，浏览器报错文件尾的(function($){...})(jQuery)中的jQuery未定义？
answer:查了后才发现，原来是位置放错，应该将jquery.min.js文件放在page.js前面。还有就是这个的意思表示：(function($){...}) (jQuery)只在形参使用$，是为了不与其他库冲突，所以实参用jQuery其实就等于
var fn = function($){....};
fn(jQuery);

问题5：在给p标签的文字加下划线的时候发现很长？
answer:给p设置width后，下划线的长度就是可调的。

问题6：写这个最大的难点在于如何使用jquery对表格数据进行无刷新的分页？
answer:这里参考了露姐的代码，中间也有点小问题，但是基本解决。所有代码集中page.js里。
  （1）如何将保存数据，且里面含有多个属性？
    即：
    var rankList = [];//设置一个数组
    var Len = 100;//数据的总长度为100
    for(var i = 0;i < Len;i++){
        var item = {
            rank:i+1,//排名
            name:'风轻轻'+(i+1),//名称
            times:10000-i//牌型次数
        };
        rankList.push(item);//将数据压入
    }

    (2)在单独的分页处理函数中，一直不太理解其中有些的含义？
    解决：
    var tempA = '';
    var start = 0;
    var end = 10;
    var len = rankList.length;//长度为100
    //翻页需要2个参数，第一个是currentPage(当前页)，另一个是pageSize(每页显示的条目数)
    if(currentPage < totalPage)//当前页数<总页数时
    {
       start = (currentPage - 1) * pageSize;//第一页开始-结束的数据应该是数组中的0-9号，第二页开始-结束的数据应该是数组中的:10-20;
       end = currentPage * pageSize;//第一页的结束记录号码是10
    }else{//当前页数 ==总页数
        start = (currentPage -1) * pageSize;//最后一页开始-结束的数据应该是数组中的90-100号
        end = len;
    }

    (3)如何用jQuery给表格添加行?
    解决：
     //一页显示10个记录
    for(var i = start;i <end;i++){
            tempA = '<tr><td width="5%">'+rankList[i]['rank']+'</td>'+"<td  width='40%'>"+rankList[i]['name']+"</td>"
           +"<td width='30%'>"+rankList[i]['times']+"</td></tr>";
           $('.tablebody').append(tempA);//将10条记录放入table下的tbody中
           $('.tablebody tr:eq(0) td:nth-child(1)').addClass('circle');//给table中的第1个tr下的第一个td添加属性circle
           $('.tablebody tr:eq(1) td:nth-child(1)').addClass('circle');//给table中的第2个tr下的第一个td添加属性circle
           $('.tablebody tr:eq(2) td:nth-child(1)').addClass('circle');//给table中的第3个tr下的第一个td添加属性circle

        }

        (4)点击下一页时，前一页的内容未清除，后一页的内容反而加到前一页的后面？
        解决：
        Click:function(){
           var that = this;
     
             //上一页点击
        $('.prev').on('click',function(){
            if(currentPage == 1){//当前页就是第一页
                return;
            }
            currentPage--;
             $('.tablebody tr').remove();//清除上一页table的10条记录
            that.pager(currentPage,totalPage,pageSize,rankList);//继续添加下一页的记录
        });

        //下一页点击
        $('.next').on('click',function(){
            if(currentPage == totalPage){//当前页是最后一页
                return;
            }
            currentPage++;
           $('.tableBody tr:eq(0) td:nth-child(1)').removeClass('circle');//给table中的第1个tr下的第一个td移除属性circle
           $('.tablebody tr:eq(1) td:nth-child(1)').removeClass('circle');//给table中的第2个tr下的第一个td移除属性circle
           $('.tablebody tr:eq(2) td:nth-child(1)').removeClass('circle');//给table中的第3个tr下的第一个td移除属性circle
           $('.tablebody tr').remove();//清除上一页table的10条记录
           that.pager(currentPage,totalPage,pageSize,rankList);
        });
        },

        问题7：如何给table的每一行加下划线？
        answer:设置table tr td{border-bottom:1px solid black;}即可

        问题8：如何使用jquery动态的改变img的src属性？
        answer:
        <a class="next"><img src="./images/next.png"></a>

        $('.next').mouseover(function(){
            $(this).find('img').attr({
                'src':'./images/nextHover.png'
                }).mouseout(function(){
                '$('.next').find('img').attr({
                'src': './images/next.png'
                 })
              })
            })
  获得的经验：在进行页面的操作时，能不设置position的属性尽量不设置，也不要经常用margin-left,margin-top的值来调整元素的位置，居中方法就按照上述的来。

  在写代码时，不要一层写好再写另一层，要先想好整个页面的布局，写出大概的每层div轮廓，然后再在每一层里面进行细写。
