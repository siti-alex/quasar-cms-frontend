<template>
  <q-page class="flex flex-center">
    <div id="body" style="width: 100%; padding-top: 5%">
      <q-editor
        id="editor"
        ref="editorRef"
        @drop.prevent.stop="evt => dropImage(evt)"
        v-model="html"
        :dense="$q.screen.lt.md"
        :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['fullscreen'],
        ['img','video','file'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
        :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      :definitions="{
          img: {
            tip: 'Вставить изображение',
            icon: 'image',
            label: '',
            handler: imgTest
          },
          video: {
            tip: 'Вставить видео',
            icon: 'videocam',
            label: '',
            handler: '',
          },
          file: {
            tip: 'Вставить файл',
            icon: 'attach_file',
            label: '',
            handler: ''
          },
      }"
      height="80vh"/>
    </div>
  </q-page>
<!--  <q-card flat bordered>-->
<!--    <q-card-section v-html="html" />-->
<!--  </q-card>-->
</template>

<script>

export default {
  name: 'cms-page',
  data() {
    return {
      html: 'What you see is <b>what</b> you get.',
    }
  },
  methods: {
    getHtml(html){
      this.html = html.htmlCode;
      console.log(html);
    },
    imgTest() {
      this.$refs['editorRef'].focus();
    },
    dropImage(image){
      console.log(image);
      let mult = image.dataTransfer.files;
      Object.values(mult).forEach(element => {
        this.imgPreview(element);
      })
      // this.imgPreview(image.dataTransfer.files[0]);
    },
    imgPreview(img){
      if(img) {
        const file = img;
        let imgPrev = URL.createObjectURL(file);
        this.$refs['editorRef'].runCmd('insertHTML', `<img width="160px" src="${imgPrev}"/>`)
        this.$refs['editorRef'].focus()
      }
    },
  },
  created() {

  }
}
</script>
<style scoped>

#body {
  overflow: auto;
  display: inline-block;
  width: 100%;
}
#view {
  padding: 10px;
}
</style>
