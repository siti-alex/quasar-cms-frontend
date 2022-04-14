<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #8b2639">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Система управления контентом
        </q-toolbar-title>

        <div>ЛИТ БГПУ</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Разделы
        </q-item-label>

        <EssentialLink @pushHtml="pushHtml"/>
      </q-list>
    </q-drawer>

    <q-page-container>
<!--      <router-view />-->
        <cms-page ref="cms-page"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Api from 'boot/axios'
import CmsPage from 'pages/IndexPage'


export default defineComponent({
  name: 'MainLayout',

  components: {
    CmsPage,
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data() {
    return {
      html: 'What you see is <b>what</b> you get.',
      auth: {
        username: 'test',
        password: 'test'
      },
      tree: null,
    }
  },
  methods: {
    authorization() {
      Api.auth(this.auth).then((response) => {
        // console.log(response);
      })
    },
    getSections() {
      Api.getSections().then((result) => {
        console.log(result);
      })
    },
    pushHtml(html) {
      this.html = html;
      this.$refs['cms-page'].getHtml(html);
    }
  },
  created() {
    // this.authorization(this.auth);
    // api.getData
    this.authorization(this.auth);
  }
})
</script>
