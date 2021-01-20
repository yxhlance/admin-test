<template>
    <div class="app-wrapper">
        <!-- <div class="drawer-bg"></div> -->
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <div>
                <navbar />
                <tags-view v-if="needTagsView"></tags-view>
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import TagsView from './components/TagsView/index'

export default {
    data () {
        return {

        }
    },
    components: {
        Sidebar,
        Navbar,
        TagsView,
        AppMain
    },
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device,
            showSettings: state => state.settings.showSettings,
            needTagsView: state => state.settings.tagsView,
            fixedHeader: state => state.settings.fixedHeader
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    mounted () {
        
        console.log('this.$store.state',this.$store.state)
    }
}
</script>

<style lang="scss" scoped>

</style>