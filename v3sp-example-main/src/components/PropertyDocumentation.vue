<template>
  <h3 class="is-size-3 mb-2 mt-5">Documentation</h3>
  <h4 class="is-size-4 mb-2 mt-5">Properties</h4>
  <div class="table-container">
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tbody>
        <tr>
          <th style="width: 150px;">id-name</th>
          <td style="width: 50px;">String</td>
          <td style="width: 200px;">default: <b>'vsp-container'</b></td>
          <td>ID of div element which contain the all side panels</td>
        </tr>
        <tr>
          <th>side</th>
          <td>'right' | 'bottom' | 'left' | 'top'</td>
          <td>default: <b>'right'</b></td>
          <td>Screenside for a modal panel</td>
        </tr>
        <tr>
          <th>rerender</th>
          <td>Boolean</td>
          <td>default: <b>false</b></td>
          <td>
            By default, the modal is rendered once,<br> and changing <b>v-model</b> simply causes show or hide.
            <br>
            You can render modal on opening if set the <b>true</b> value. <br>
          </td>
        </tr>
        <tr>
          <th>hide-close-btn</th>
          <td>Boolean</td>
          <td>default: <b>false</b></td>
          <td>Hide the close button component which appears by default</td>
        </tr>
        <tr>
          <th>no-close</th>
          <td>Boolean</td>
          <td>default: <b>false</b></td>
          <td>
            Disable the ability to close the panel by clicking on the overlay
          </td>
        </tr>
        <tr>
          <th>z-index</th>
          <td>Number | 'auto' | undefined</td>
          <td>default: <b>'auto'</b></td>
          <td>
            By default the component finds and sets the maximum z-index of your
            DOM. <br />
            You will disable it if you set a specific value or 'undefined'
          </td>
        </tr>
        <tr>
          <th>width</th>
          <td>String</td>
          <td>default: <b>'auto'</b></td>
          <td>
            Min-width style property for the side panel. <br />
            Example: '500px' NOTICE! Works only with 'right' and 'left' values
            of side option
          </td>
        </tr>
        <tr>
          <th>height</th>
          <td>String</td>
          <td>default: <b>'auto'</b></td>
          <td>
            Min-height style property for the side panel. Example: '500px'
            <br />
            NOTICE! Works only with 'top' and 'bottom' values of side option
          </td>
        </tr>
        <tr>
          <th>lock-scroll</th>
          <td>Boolean</td>
          <td>default: <b>false</b></td>
          <td>
            Locks the body scroll if you set it to true. <br />
            NOTICE! For some css frameworks this is not enough. Read the
            description of the <b>lock-scroll-html</b> option
          </td>
        </tr>
        <tr>
          <th>lock-scroll-html</th>
          <td>Boolean</td>
          <td>default: <b>true</b></td>
          <td>
            Works only with the <b>lock-scroll</b> option. <br />
            Bulma alike frameworks add "overflow-y: scroll;" option to the html
            tag and BSL (body-scroll-lock library) stops working after that.
            <br />
            This option helps to resolve this problem. You can turn it off if
            you are not suffering of this issue.
          </td>
        </tr>
        <tr>
          <th>transition-name</th>
          <td>String | undefined</td>
          <td>default: <b>undefined</b></td>
          <td>
            There are <b>slide-right | slide-left | slide-top | slide-bottom | undefined</b>
            options to use. Under the hood,
            selecting 'undefined' simply sets <br>
            <b>slide-right</b> if the side == 'right'
            or <br>
            <b>slide-left</b> if the side == 'left'
            <br />
            <br />
            <small>
              Animation works through <b>&lt;Transtion&gt;</b> Vue component. <br>
              You can use your own transition name to override the default animation.
              For example: setting <b>transition-name="my-transition"</b> expects you to create at least these classes with your own css
              <br>
              <b>.my-transition-enter-active</b> and <b>.my-transition-leave-active</b>
            </small>
            <br>
            <br>
            @see <a href="https://vuejs.org/guide/built-ins/transition.html">
            https://vuejs.org/guide/built-ins/transition.html
             </a>
          </td>
        </tr>
        <tr>
          <th>overlay-color</th>
          <td>String</td>
          <td>default: <b>'black'</b></td>
          <td>
            Color of overlay that you can see under a side panel.
            <br />
            This is a style option and it is why you can use a different string
            format to set a color. <br />
            For example: <b>rgb(0, 22, 22)</b>, <b>#aaa;</b>, <b>white</b> also
            suit
          </td>
        </tr>
        <tr>
          <th>overlay-opacity</th>
          <td>Number</td>
          <td>default: <b>0.5</b></td>
          <td>Opacity of the overlay</td>
        </tr>
        <tr>
          <th>overlay-duration</th>
          <td>Number</td>
          <td>default: <b>500</b></td>
          <td>
            How fast the overlay spawn animation works. ( in milliseconds )
          </td>
        </tr>
        <tr>
          <th>panel-color</th>
          <td>String</td>
          <td>default: <b>'white'</b></td>
          <td>
            Default color of main container. This is a style option so it can be
            any string that the browser supports.
            <br />
            See 'overlay-color' to find the examples
          </td>
        </tr>
        <tr>
          <th>panel-duration</th>
          <td>Number</td>
          <td>default: <b>300</b></td>
          <td>
            This is the same as the
            <b> overlay-duration </b> option. See above
          </td>
        </tr>
        <tr>
          <th>header-class</th>
          <td>String</td>
          <td>default: <b>''</b></td>
          <td>
            It will be necessary in cases where you need to change the default
            styles of a static header block within a panel
          </td>
        </tr>
        <tr>
          <th>body-class</th>
          <td>String</td>
          <td>default: <b>''</b></td>
          <td>
            It will be necessary in cases where you need to change the default
            styles of a scrolled body block within a panel
          </td>
        </tr>
        <tr>
          <th>footer-class</th>
          <td>String</td>
          <td>default: <b>''</b></td>
          <td>
            It will be necessary in cases where you need to change the default
            styles of a static footer block within a panel
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4 class="is-size-4 mb-2 mt-5">Events</h4>
  <table class="table is-bordered is-striped is-narrow is-fullwidth">
    <tbody>
    <tr>
      <th style="width: 150px;">@opened</th>
      <td>Called when opening animation is finished and modal is opened</td>
    </tr>
    <tr>
      <th style="width: 150px;">@closed</th>
      <td>Called when closing animation is finished and modal is closed</td>
    </tr>
    </tbody>
  </table>




</template>
<script setup lang="ts">
</script>
