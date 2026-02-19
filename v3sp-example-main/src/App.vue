<script lang="ts">
import { defineComponent } from "vue";
import { PrismEditor } from "vue-prism-editor";
import { highlighter } from "./utils/highlighter";
import PropertyDocumentation from './components/PropertyDocumentation.vue'
import Options from './components/Options.vue'

export default defineComponent({
  components: {
    PrismEditor,
    PropertyDocumentation,
    Options,
  },
  setup() {

    const editorCode = `// main.ts
import { createApp } from 'vue';
import VueSidePanel from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css'

const app = createApp(App);
app.use(VueSidePanel);
`;
    return {
      editorCode,
      highlighter,
    };
  },
});
</script>
<template>
  <section class="hero is-danger is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a
              class="navbar-item fixed"
              href="https://github.com/headmandev/vue3-side-panel"
              target="_blank"
            >
              <span class="icon is-medium">
                <i class="fab fa-github fa-lg"></i>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="fixed">
              <p class="title">🔥 VUE3-SIDE-PANEL</p>
              <p class="subtitle mb-5">
                Easy to use and flexible <br />
                screenside modal component
              </p>

              <code class="p-2 language-html"> npm i vue3-side-panel </code>

              <div class="mt-5">
                <prism-editor
                  class="editor"
                  v-model="editorCode"
                  readonly
                  :highlight="highlighter"
                  :line-numbers="false"
                ></prism-editor>
              </div>
            </div>
          </div>
          <div class="column is-two-thirds">

            <Options />

            <PropertyDocumentation />

            <h5 class="is-size-5">
              <a href="https://github.com/headmandev" target="_blank">
                👉 Github
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@media (min-width: 1216px) {
  .fixed {
    position: fixed !important;
  }
}

@media only screen and (max-width: 600px) {
  body {
    font-size: 0.9em !important;
  }
}

.editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 12px;
  line-height: 1.5;
  padding: 10px;
  border-radius: 10px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.editor .prism-editor__editor {
  color: #ccc;
}

@media (max-width: 600px) {
  table {
    font-size: 10px;
  }
}
</style>
