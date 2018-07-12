<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu :theme="theme3" @on-select="onSelectMenu" ref="contactMenu" :active-name="currentSelTag" style="width:100%">
                                    <MenuItem name="1">
                                        <Icon type="document-text"></Icon>
                                        <router-link to="/" exact>首页</router-link>
                                    </MenuItem>
                                    <MenuItem name="2">
                                        <Icon type="chatbubbles"></Icon>
                                        <router-link to="/user">用户管理</router-link>
                                    </MenuItem>
                                <MenuGroup title="新闻">
                                    <MenuItem name="3">
                                        <Icon type="heart"></Icon>
                                        <router-link to="/cate">分类管理</router-link>
                                    </MenuItem>
                                    <MenuItem name="4">
                                        <Icon type="heart-broken"></Icon>
                                        <router-link to="/news">新闻管理</router-link>
                                    </MenuItem>
                                    <MenuItem name="5">
                                        <Icon type="heart-broken"></Icon>
                                        <router-link to="/comment">评论管理</router-link>
                                    </MenuItem>
                                    <MenuItem name="6">
                                        <Icon type="heart-broken"></Icon>
                                        <router-link to="/file">文件管理</router-link>
                                    </MenuItem>
                                </MenuGroup>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
    import {Base} from './common/Base.js'

    export default {
        data () {
            return {
                theme3: 'light',
                currentSelTag:"1",
            }
        },
        methods:{
            onSelectMenu(name){
                console.log('miaomao',name);
            }
        },
        watch:{
            '$route'(to,from){
            if(to.path == '/comment'){
                console.log('sssssss')
                this.currentSelTag = "5";
                this.$nextTick(()=>{
                    this.$refs.contactMenu.updateOpened();
                    this.$refs.contactMenu.updateActiveName();
                })
            }
        }
        }
    }
</script>