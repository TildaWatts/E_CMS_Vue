import Home from './components/Home.vue'
import User from './components/user/index.vue'
import News from './components/news/index.vue'
import Cate from './components/category/index.vue'
import Comt from './components/comment/index.vue'
import FileM from './components/file/index.vue'

export const routes = [
    {path: '/',component: Home},
    {path: '/user',component: User},
    {path: '/cate',component: Cate},
    {path: '/news',component: News},
    {path: '/comment',component: Comt},
    {path: '/file',component: FileM},
]