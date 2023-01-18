const {create,view_all,view,alter,erase}=require('./query');
const { isNewFeed } = require('../../common/formatter/date');

/** 전체 피드 보기 */
exports.index=async(ctx,next)=>{
    let query=ctx.query;
    //let {color, size, count} = ctx.query;
    //let result=isNewFeed('')
    let item=await view_all();
    ctx.body=item;
}


/** 새 피드 작성 처리 */
exports.store=async ctx=>{
    let {user_id,image_id,content}=ctx.request.body;

    let {affectedRows,insertId}= await create(user_id,image_id,content);
    if (affectedRows>0){
        ctx.body={
            result:"새 피드가 생성되었습니다.",
            id:insertId
        }
    }
    else{
        ctx.body={
            result:"fail",
        }
    }
}

/** 피드 상세보기 */
exports.show=async ctx=>{
    let id=ctx.params.id;
    let item= await view(id);
 
    if(item==null){
        ctx.body={result:"fail"};
        return;
    } 
    ctx.body=item;
}




/**피드 수정 */
exports.update=async ctx =>{
    let id=ctx.params.id;
    let {image_id,content}=ctx.request.body;
    
    let item= await alter(id,image_id,content);
    let body= await view(id);

    if(body==null){
        ctx.body={result:"fail"};
        return;
    } 
    ctx.body=body;
    
}


/** 피드 삭제 */
exports.delete=async ctx=>{
    let id=ctx.params.id;
    let {affectedRows}= await erase(id);
    if (affectedRows>0){
        ctx.body={
            result:"삭제되었습니다.",
            //id:insertId
        }
    }
    else{
        ctx.body={
            result:"실패하였습니다.",
        }
    }
    
}



/*exports.store=(ctx,next)=>{
    let body=ctx.request.body
    ctx.body=body;
}
*/