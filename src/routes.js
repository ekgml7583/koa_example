const Router = require('@koa/router');
const router = new Router();
const multer=require('@koa/multer');
const path=require('path');
const upload=multer({
    dest:path.resolve(__dirname,'../','storage')
})

const {myLogging}=require('./middlware/logging');


const webController=require('./web/controller');
const apiUserController=require('./api/user/controller');
const apiFeedController=require('./api/feed/controller');
const { verify } = require('./middlware/auth');

router.use(myLogging);

router.post('/file/upload',upload.single('file'),require('./api/file/controller').upload);
router.get('/file/:id',require('./api/file/controller').download);

router.get('/', webController.home);
router.get('/page/:page', webController.page);


router.post('/api/user/register',apiUserController.register);
router.post('/api/user/login',apiUserController.login);


router.use(verify);

router.get('/api/user/:id',apiUserController.info);



router.get('/api/feed',apiFeedController.index);
router.post('/api/feed',apiFeedController.store);
router.get('/api/feed/:id',apiFeedController.show);
router.put('/api/feed/:id',apiFeedController.update);
router.delete('/api/feed/:id',apiFeedController.delete);
/*
//로컬호스트 3000번에 들어갔을때 아래와 같이 출력
router.get('/', (ctx, next) => {
    ctx.body = 'Hello World';
});
*//*
router.get('/page/:page',(ctx,next)=>{
    let page=ctx.params.page;
    ctx.body=`${page} 페이지`;
});
*/
/*
router.get('/user/:id',(ctx,next)=>{
    let id=ctx.params.id;
    ctx.body=`${id} 회원에 대한 정보`;
});
*/
/*
router.get('/feed',(ctx,next)=>{
    ctx.body=`피드 리스트`;
});

router.post('/feed',(ctx,next)=>{
    ctx.body=`피드 작성 완료`;
});

router.get('/feed/:id',(ctx,next)=>{
    let id=ctx.params.id;
    ctx.body=`${id} 피드 상세`;
});

*/

module.exports=router;