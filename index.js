let http =require('http');
let fs =require('fs');
let path=require('path');
let mime=require('mime')
let mysql=require('mysql');
let template=require('art-template');
let qs =require('querystring');
//网站跟目录
let rootPath=path.join(__dirname,'www');
//开启服务
http.createServer((request,response)=>{
    //过来就生成首页
    let filePath=path.join(rootPath,qs.unescape(request.url));

    //判断是否是首页
    if(filePath.indexOf('index.html')!=-1){
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root', //用户
            password : 'root',//密码
            database : 'test' //数据库名称
            });

            connection.connect(); //链接服务器
            connection.query('select * from manyhero', function (error, results, fields) {
            if (error) throw error;
            // console.log(results);
            //引入模板
                let html =template(__dirname+'/www/index.html',{
                    results
                })
                response.end(html);
            });
            
            connection.end(); //关闭数据库
    }else{
        fs.readFile(filePath,(err,data)=>{
            if(err){

            }else{
            response.writeHead(200,{
                'content-tyle':mime.getType(filePath)
            });

            response.end(data)
            }
        })
        // console.log('no');
    }

}).listen(80,'127.0.0.1',()=>{
    console.log('监听成功')
})