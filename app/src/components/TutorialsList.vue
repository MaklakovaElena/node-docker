<template>
    <div class="list row">
      <div class="col-md-6">
        <h4>Article List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(tutorial, index) in tutorials"
            :key="index"
            @click="setActiveTutorial(tutorial, index)"
          >
            {{ tutorial.title }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentTutorial">
          <h4>Article</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentTutorial.title }}
          </div>
          <div>
            <label><strong>Text:</strong></label> {{ currentTutorial.text }}
          </div>
          <div>
            <label><strong>created_at:</strong></label> {{ currentTutorial.created_at.date }}
          </div>
          <div>
            <label><strong>updated_at:</strong></label> 
            {{  currentTutorial.updated_at? currentTutorial.updated_at.date: "not updated"   }}
          </div>
          <a class="btn btn-warning" :href="'/tutorials/' + currentTutorial.id" role="button">Edit</a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Article...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TutorialDataService from "../services/TutorialDataService";
  
  export default {
    name: "tutorials-list",
    data() {
      return {
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
      retrieveTutorials() {
        TutorialDataService.getAll()
          .then(response => {
            this.tutorials = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
  
      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
      }
      

    },
    mounted() {
      this.retrieveTutorials();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>