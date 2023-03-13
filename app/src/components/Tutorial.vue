<template>
    <div v-if="currentTutorial" class="edit-form">
      <h4>Article</h4>
      <form>
        <div class="form-group">
          <label for="title"><strong>Title</strong></label>
          <input type="text" class="form-control" id="title"
            v-model="currentTutorial.title"
          />
        </div>
        <div class="form-group">
          <label for="text"><strong>Text</strong></label>
          <input type="text" class="form-control" id="text"
            v-model="currentTutorial.text"
          />
        </div>
        <div class="form-group">
          <label for="text"><strong>created_at</strong></label>
          <p>{{ currentTutorial.created_at.date }}</p>
        </div>
        <div class="form-group">
            <label><strong>updated_at:</strong></label> 
            <p>{{  currentTutorial.updated_at? currentTutorial.updated_at.date: "not updated"   }}</p>
          </div>
        </form>
  
      <button class="btn btn-danger mr-2"
        @click="deleteTutorial"
      >
        Delete
      </button>
  
      <button type="submit" class="btn btn-success"
        @click="updateTutorial"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Artical...</p>
    </div>
  </template>
  
  <script>
  import TutorialDataService from "../services/TutorialDataService";
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "tutorial",
    data() {
      return {
        currentTutorial: null,
        message: ''
      };
    },
    methods: {
      getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => {
            this.currentTutorial = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
  
  
      updateTutorial() {
        TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteTutorial() {
        TutorialDataService.delete(this.currentTutorial.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "home" });
            this.message = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getTutorial(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>