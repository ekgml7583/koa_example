const jwt=require('jsonwebtoken');
const {register}=require('./query');
const crypto=require('crypto');

exports.info=(ctx,next)=>{
    let id=ctx.params.id;
    ctx.body=`${id} 회원에 대한 정보`;
}

exports.register=async(ctx,next)=>{
    //회원가입 처리 모듈
    let {email,password,name}=ctx.request.body;

    let {affectRows}= await register(email,password,name);

    if(affectRows>0){
        let token=await ganerteToken({name});
        ctx.body=token;

    }else{
        ctx.body={result:"fail"};
    }
}

exports.login=async(ctx,next)=>{
    //로그인 모듈

    let {email, password}=ctx.request.body; 
    let result=crypto.pdkdf2Sync(password,process.env.APP_KEY,50,255,'sha512');


    let item = await this.login(email,result.toString('base64'));
    
    if(itme==null){
        ctx.body={result:"fail"};
    } 
    else{
        let token=await generteToken({name:item.name});
        ctx.body=token;
    }
}


let generteToken=(payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.APP_KEY,(error,token)=>{
            if (error){reject(error);}
            resolve(token);
        })
    })
}