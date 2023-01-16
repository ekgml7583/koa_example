/**사이트 메인페이지 */
exports.home=(ctx,next)=>{
    ctx.body='홈페이지';
}

exports.page=async (ctx,next)=>{

    let {name} = ctx.params;

    let page="";

    let pagename;
    
    switch (page){
        case 'terms':
            pagename="이용약관";
            break;
        case 'policy':
            pagename="개인정보 처리방침";
            break;
    }

    
    await ctx.render('index',{pagename:pagename});
}