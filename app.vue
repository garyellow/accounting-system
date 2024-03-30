<template>
  <div class="q-pa-md font-sansTC">
    <noscript>
      您的瀏覽器尚未啟用 JavaScript。請於啟用後重新載入頁面。
    </noscript>
    <q-layout view="lHh lpr lFf">
      <q-header
        bordered
        class="bg-grey-3"
      >
        <q-toolbar>
          <q-toolbar-title
            class="mx-4 flex items-center justify-center lg:justify-between"
          >
            <div class="my-3 flex">
              <q-avatar>
                <nuxt-img
                  format="jpg"
                  preload
                  src="/ntpusu.jpg"
                />
              </q-avatar>
              <span
                class="pointer-events-none text-3xl font-bold leading-8 text-amber-800/90"
              >
                &nbsp;主計系統
              </span>
            </div>
            <q-tabs
              inline-label
              active-color="primary"
              indicator-color="primary"
              class="text-grey-8 !hidden lg:!flex"
              v-model="tab"
            >
              <q-route-tab
                v-if="user"
                icon="home"
                to="/"
                name=""
                exact
                label="首頁"
              />
              <q-route-tab
                v-if="user"
                icon="admin_panel_settings"
                to="/setAdmin"
                name="setAdmin"
                exact
                label="設定管理員"
              />
              <q-route-tab
                v-if="!user"
                icon="login"
                to="/login"
                name="login"
                exact
                label="登入"
              />
              <q-tab
                v-else
                icon="logout"
                @click="signOut(auth)"
                label="登出"
              />
            </q-tabs>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-footer
        bordered
        class="bg-grey-3 text-primary"
      >
        <q-tabs
          active-color="primary"
          indicator-color="primary"
          class="text-grey-8 lg:!hidden"
          v-model="tab"
        >
          <q-route-tab
            v-if="user"
            icon="home"
            to="/"
            name=""
            exact
            label="首頁"
          />
          <q-route-tab
            v-if="user"
            icon="admin_panel_settings"
            to="/setAdmin"
            name="setAdmin"
            exact
            label="設定管理員"
          />
          <q-route-tab
            v-if="!user"
            icon="login"
            to="/login"
            name="login"
            exact
            label="登入"
          />
          <q-tab
            v-else
            icon="logout"
            @click="signOut(auth)"
            label="登出"
          />
        </q-tabs>
        <div
          class="mx-4 my-1 !hidden justify-between text-center text-lg tracking-normal text-stone-700 lg:!flex"
        >
          <nuxt-link
            to="https://github.com/garyellow"
            class="font-bold hover:text-stone-600 hover:underline"
            target="_blank"
          >
            Made by garyellow
          </nuxt-link>
          <nuxt-link
            to="https://github.com/garyellow/accounting-system"
            class="font-bold hover:text-stone-600 hover:underline"
            target="_blank"
          >
            Open Source
          </nuxt-link>
        </div>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <nuxt-page keepalive />

          <q-page-scroller
            position="bottom-right"
            :scroll-offset="150"
            :offset="[18, 18]"
          >
            <q-btn
              fab
              icon="keyboard_arrow_up"
              color="primary"
            />
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { signOut } from 'firebase/auth'

const route = useRoute()
const url = 'https://' + useRuntimeConfig().public.productionDomain

useSeoMeta({
  title: '學生會主計系統',
  titleTemplate() {
    return `${route.meta.title} | 學生會主計系統`
  },
  description: '國立臺北大學三峽校區學生會主計系統',
  ogTitle: '國立臺北大學三峽校區學生會主計系統',
  ogDescription() {
    return `${route.meta.title} | 國立臺北大學三峽校區學生會主計系統`
  },
  ogSiteName: '國立臺北大學三峽校區學生會主計系統',
  ogType: 'website',
  ogUrl: url,
  ogImage: url + '/ntpusu.jpg',
  ogImageAlt: '國立臺北大學三峽校區學生會的標誌',
  ogImageType: 'image/png',
  ogImageSecureUrl: url,
  ogLocale: 'zh_TW',
  ogLocaleAlternate: 'zh_TW',
  author: '國立臺北大學三峽校區學生會',
  creator: '國立臺北大學三峽校區學生會',
  publisher: '國立臺北大學三峽校區學生會',
  twitterTitle: '國立臺北大學三峽校區學生會主計系統',
  twitterDescription() {
    return `${route.meta.title} | 國立臺北大學三峽校區學生會主計系統`
  },
  twitterImage: url + '/ntpusu.jpg',
  twitterImageAlt: '國立臺北大學三峽校區學生會的標誌',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'zh_TW',
  },
  meta: [
    {
      name: 'copyright',
      content: '國立臺北大學三峽校區學生會',
    },
  ],
  link: [
    {
      rel: 'favicon icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
  script: [
    {
      src: 'https://www.instagram.com/embed.js',
      tagPosition: 'bodyClose',
    },
  ],
})

const auth = useFirebaseAuth()!
const router = useRouter()
const user = useCurrentUser()
watch(
  user,
  async (user, prevUser) => {
    if (prevUser && !user) {
      await router.push('/login')
    } else if (user) {
      if (typeof route.query.redirect === 'string') {
        await router.push(route.query.redirect)
      } else {
        await router.push('/')
      }
    }
  },
  { immediate: true },
)

const tab = ref('/')
</script>

<style>
.page-enter-active,
.page-leave-active {
  @apply transition-all;
}

.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur;
}
</style>
