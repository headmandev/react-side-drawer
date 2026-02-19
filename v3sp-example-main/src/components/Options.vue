<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import { highlighter } from "../utils/highlighter";
import { PrismEditor } from "vue-prism-editor";
import { VueSidePanel } from "vue3-side-panel";

export default defineComponent({
  components: {
    PrismEditor,
    VueSidePanel
  },
  setup() {
    const isOpened = ref(false);
    // const isOpened2 = ref(false);

    const form = reactive({
      lockScroll: true,
      closeButton: true,
      side: "right",
      fixedHeader: false,
      fixedFooter: false,
      isRecursion: false,
      rerender: false,
      transitionName: 'auto',
      panelDuration: 300,
    });

    const stringOptions = computed(() => {
      const res = [
        form.lockScroll ? "lock-scroll" : "",
        !form.closeButton ? "hide-close-btn" : "",
        form.rerender ? 'rerender' : "",
        form.side !== "right" ? `side="${form.side}"` : "",
        ['left', 'right'].includes(form.side) ? `width="600px"` : "",
        ['top', 'bottom'].includes(form.side) ? `height="500px"` : "",
        form.panelDuration !== 300 ? `:panel-duration="${form.panelDuration}"` : "",
        form.panelDuration !== 300 ? `:overlay-duration="${form.panelDuration}"` : "",
        form.transitionName !== 'auto' ? `transition-name="${form.transitionName}"` : "",
      ].filter((e) => !!e);
      return !res.length ? "" : "\n\t\t" + res.join("\n\t\t");
    });


    const fixedHeaderCode = computed(() => {
      return form.fixedHeader
          ? `\n\t <template #header>
      <div style="text-align: center; background-color: #2d2d2d; color: white;">
        <h2 :style="{ fontSize: '58px' }"> This is fixed header! </h2>
      </div>
    </template>`
          : ""
    })

    const bodyCode = computed(() => {
      let res =
      `\t\t <div style="padding-top: 70px; color: #f14668">
        <h2
          v-for="item in 50"
          :key="item"
          :style="{fontSize: '58px', fontWeight: 700, opacity: item * 2 / 100, lineHeight: '43px'}"
        >
          This is scrolled body!
        </h2>
      </div>`
      if (!!fixedHeaderCode.value || !!fixedFooterCode.value) {
        res = ['\t <template #default>\n', res, '\n\t </template>'].join('');
      }
      return res;
    })


    const fixedFooterCode = computed(() => {
      return form.fixedFooter
          ?
    `\t <template #footer>
      <div style="text-align: center; background-color: #2d2d2d; color: white">
        <h2 :style="{ fontSize: '58px' }">This is fixed footer!</h2>
      </div>
    </template>`
          : ""
    })

    const componentCodeExample = computed(
      () => `// BASIC EXAMPLE
<script lang="ts">
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    setup() {
      return {
        isOpened: ref(false)
      }
    }
  })
<\/script>
<template>
  <VueSidePanel
\t\tv-model="isOpened"${stringOptions.value}
  >${fixedHeaderCode.value}
${bodyCode.value}
${fixedFooterCode.value}
  </VueSidePanel>
</template>
    `
    );


    const exampleCloseButtonCode = `
<template #header>
  <span @click="isOpened = false"> X </span>
</template>
`;

    return {
      isOpened,
      // isOpened2,
      form,
      highlighter,
      componentCodeExample,
      exampleCloseButtonCode,
    };
  },
});
</script>
<template>
  <h3 class="is-size-3 mb-5">Options</h3>
  <div class="mb-5">
    <div class="control is-unselectable mb-3">
      <label class="radio">
        <input type="radio" value="right" v-model="form.side" />
        Right
      </label>
      <label class="radio">
        <input type="radio" value="left" v-model="form.side" />
        Left
      </label>
      <label class="radio">
        <input type="radio" value="top" v-model="form.side" />
        Top
      </label>
      <label class="radio">
        <input type="radio" value="bottom" v-model="form.side" />
        Bottom
      </label>
    </div>

    <label class="checkbox is-unselectable mr-5">
      <input type="checkbox" v-model="form.lockScroll" />
      Lock scroll
    </label>
    <label class="checkbox is-unselectable mr-5">
      <input type="checkbox" v-model="form.closeButton" />
      Close button
    </label>

    <label class="checkbox is-unselectable mr-5">
      <input type="checkbox" v-model="form.fixedHeader" />
      Fixed header
    </label>
    <label class="checkbox is-unselectable mr-5">
      <input type="checkbox" v-model="form.fixedFooter" />
      Fixed footer
    </label>

    <label class="checkbox is-unselectable mr-5">
      <input type="checkbox" v-model="form.rerender" />
      Render on opening
    </label>

    <div class="columns mt-3">
      <div class="column mb-0 is-narrow field has-addons">
        <p class="control">
          <a class="button is-small is-static is-white ">
            Transition name
          </a>
        </p>
        <p class="control is-small select">
          <select v-model="form.transitionName">
            <option value="auto">auto</option>
            <option value="slide-right">Slide Right</option>
            <option value="slide-left">Slide Left</option>
            <option value="slide-top">Slide Top</option>
            <option value="slide-bottom">Slide Bottom</option>
          </select>
        </p>
      </div>

      <div class="column is-narrow field has-addons">
        <p class="control">
          <a class="button is-small is-static is-white">
            Duration
          </a>
        </p>
        <p class="control select is-small">
          <select v-model.number="form.panelDuration">
            <option :value="0">0ms</option>
            <option :value="100">100ms</option>
            <option :value="300">300ms</option>
            <option :value="500">500ms</option>
            <option :value="1000">1000ms</option>
          </select>
        </p>
      </div>
    </div>

    <div>
      <label class="checkbox is-unselectable">
        <input type="checkbox" v-model="form.isRecursion" />
        Recursion mode
      </label>
    </div>

  </div>

  <button class="button is-dark" @click="isOpened = true">CHECK IT OUT</button>

  <VueSidePanel
    v-model="isOpened"
    @opened="() => console.log('@opened event: transition stopped and modal is opened')"
    @closed="() => console.log('@closed event: transition stopped and modal is closed')"
    :lock-scroll="form.lockScroll"
    :rerender="form.rerender"
    :hide-close-btn="!form.closeButton"
    :width="['left', 'right'].includes(form.side) ? '600px' : 'auto'"
    :height="['top', 'bottom'].includes(form.side) ? '500px' : 'auto'"
    :side="form.side"
    :panel-duration="form.panelDuration"
    :overlay-duration="form.panelDuration"
    :transition-name="form.transitionName === 'auto' ? undefined : form.transitionName"
  >
    <template v-if="form.fixedHeader" #header>
      <div style="text-align: center; background-color: #2d2d2d; color: white">
        <h2 :style="{ fontSize: '58px' }">This is fixed header!</h2>
      </div>
    </template>

    <template #default>
      <div v-if="form.isRecursion" style="padding: 20px;">
        <Options />
      </div>

      <div style="padding-top: 70px; color: #f14668">
        <h2
          v-for="item in 50"
          :key="item"
          :style="{
            backgroundColor: 'white',
            fontSize: '58px',
            fontWeight: 700,
            opacity: (item * 2) / 100,
            lineHeight: '43px',
          }"
        >
          This is scrolled body!
        </h2>
      </div>
    </template>

    <template v-if="form.fixedFooter" #footer>
      <div style="text-align: center; background-color: #2d2d2d; color: white">
        <h2 :style="{ fontSize: '58px' }">This is fixed footer!</h2>
      </div>
    </template>
  </VueSidePanel>

  <div class="mt-5">
    <prism-editor
      class="editor"
      v-model="componentCodeExample"
      readonly
      :highlight="highlighter"
      :line-numbers="false"
    ></prism-editor>
  </div>


  <div v-if="form.fixedHeader === true" class=" mt-5">
    <hr />
    You can always hide the default close button with the 'hide-close-btn' option because it is only added to the default template slot.
    You own close-button may be added by yourself. <br> <b> Example: </b>
    <prism-editor
      class="editor mt-2"
      v-model="exampleCloseButtonCode"
      readonly
      :highlight="highlighter"
      :line-numbers="false"
    ></prism-editor>
    <hr />
  </div>

</template>


<style lang="css">
@import "vue3-side-panel/dist/vue3-side-panel.css";
</style>
