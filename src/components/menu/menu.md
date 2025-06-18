<!--
router.getRoutes()得到
0 : {path: '/home/user/info', redirect: undefined, name: 'info', meta: Proxy(Object), aliasOf: undefined, …}
1 : {path: '/home/user/setting', redirect: undefined, name: 'setting', meta: Proxy(Object), aliasOf: undefined, …}
2 : {path: '/home/user', redirect: undefined, name: 'user', meta: {…}, aliasOf: undefined, …}
3 : {path: '/', redirect: '/home', name: undefined, meta: {…}, aliasOf: undefined, …}
4 : {path: '/chat', redirect: undefined, name: 'chat', meta: {…}, aliasOf: undefined, …}
5 : {path: '/home', redirect: undefined, name: 'mainLayout', meta: {…}, aliasOf: undefined, …}
6 : {path: '/login', redirect: undefined, name: 'login', meta: {…}, aliasOf: undefined, …}
7 : {path: '/:pathMatch(.*)*', redirect: undefined, name: 'NotFound', meta: {…}, aliasOf: undefined, …}
length : 8
[[Prototype]]: Array(0)

menu 根据变量rt实现动态菜单，
1.使用el组件库
2.有子路由的，将父路由展开出现子路由
3. config.ts meta.hidden为true的不渲染
4.没有component的不渲染,他的子路由也一并不渲染
5.
path: '/home'
name: 'mainLayout',
component: mainLayout,
是路由出口不用渲染
6.
path: '',
name: 'home',
component: () => import('@/views/index.vue'),
是首页，渲染

-----条件没这么复杂描述，依旧 hidden 与 父子路由 处理就行

 -->