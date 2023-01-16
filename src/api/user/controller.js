const jwt=require('jsonwebtoken');
const SECRET_KEY='my-secret-key';

exports.info=(ctx,next)=>{
    let id=ctx.params.id;
    ctx.body=`${id} 회원에 대한 정보`;
}

exports.register=async(ctx,next)=>{
    //회원가입 처리 모듈
    let token=await generteToken({name:'my-name'});
    ctx.body=token;
}

exports.login=async(ctx,next)=>{
    //로그인 모듈

    let {id, pw}=ctx.request.body; 
    let result="";

    
    if(id==='admin'&&pw==='1234'){
        result=await generteToken({name :'abc'});
    }else{
        result="아이디 혹은 비밀번호가 올바르지 않습니다.";
    }
    //let token=await generteToken({name: 'my-name'});
    ctx.body=result;
}


let generteToken=(payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.APP_KEY,(error,token)=>{
            if (error){reject(error);}
            resolve(token);
        })
    })
}