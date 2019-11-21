<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary" sticky="true">
      <b-navbar-brand href="#">Lightbox Demo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="//icagile.com" target="_blank">ICAgile</b-nav-item>
          <b-nav-item href="//noutc.com" target="_blank">NOUTC</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-form-input size="sm" class="mr-sm-2" :id="`searchText`" type="text" v-model="text" placeholder="Search Flickr images" ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" variant="dark" @click="searchImagesClick()">Search</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    
    <b-container-fluid class=" mx-md-n5">
      <ul>
        <li
          v-for="(image, index) in images"
          v-bind:key="index"
          style="display: inline-block"
        >
          <img
            v-lazy="image.url"
            style="height: 240px;padding:5px;"
            @click="openGallery(index)"
          />
        </li>
      </ul>
      <LightBox
        :images="images"
        ref="lightbox"
        :show-caption="true"
        :show-light-box="false"
      >
      </LightBox>
    </b-container-fluid>
  </div>
</template>

<script>
import LightBox from "./components/LightBox";
import api from "./data";

export default {
  components: {
    LightBox
  },
  data() {
    return {
      images: [],
      text: ''
    }
  },
  created() {
    return;
  },
  methods: {
    search(v = 'sunset'){
      api.search(v).then(search_result => {
        this.images = search_result.map(s=>{return s});
      });
    },
  searchImagesClick(){
    if(!this.text){
      this.images=[];
      return;
      }

    this.search(this.text);
  },
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    }
  }
};
</script>
