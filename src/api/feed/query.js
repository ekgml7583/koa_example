const {pool}= require('../../data')


//전체 게시물 보기
exports.view_all=async()=>{
    const query=`SELECT * FROM feed`;
    let result= await pool(query);
    return (result.length<0)?null:result;
}



//새 게시물 작성
exports.create=async(user_id,image_id,content)=>{
    const query=`INSERT INTO feed
    (user_id,image_id,content)
    VALUES(?,?,?)`;
    return await pool(query,[user_id, image_id, content]);
}


//해당 게시물 보기
exports.view=async(id)=>{
    const query=`SELECT * FROM feed WHERE id=?`;
    let result= await pool(query,[id]);
    return (result.length<0)?null:result[0];

    
}


//해당 계정의 게시물 수정
exports.alter=async(id,image_id, content)=>{
    const query=`UPDATE feed SET image_id=?,content=? WHERE id=?`;
    let result=await pool(query,[image_id, content,id]);
    return (result.length<0)?null:result[0];

}


//해당 계정의 게시물 삭제
exports.erase=async(id)=>{
    const query=`DELETE FROM feed WHERE id=?`;
    return await pool(query,[id]);
}
    
