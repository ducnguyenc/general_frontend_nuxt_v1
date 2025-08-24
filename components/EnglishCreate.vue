<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="English:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.english" placeholder="Enter english" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Vietnamese:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.vietnamese" placeholder="Enter vietnamese" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Example:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.example" placeholder="Enter example"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Image:" label-for="input-4">
        <div class="mb-2">
          <b-button-group>
            <b-button 
              :variant="imageMode === 'file' ? 'primary' : 'outline-primary'" 
              @click="imageMode = 'file'"
              size="sm"
            >
              Upload File
            </b-button>
            <b-button 
              :variant="imageMode === 'string' ? 'primary' : 'outline-primary'" 
              @click="imageMode = 'string'"
              size="sm"
            >
              Input String
            </b-button>
          </b-button-group>
        </div>
        
        <!-- File Upload Mode -->
        <div v-if="imageMode === 'file'">
          <b-form-file
            id="input-4"
            v-model="imageFile"
            placeholder="Choose an image file..."
            drop-placeholder="Drop image here..."
            accept="image/*"
            @change="handleImageChange"
          ></b-form-file>
          <small class="form-text text-muted">Select an image file (JPG, PNG, GIF, etc.)</small>
          
          <!-- Image Preview 150x150 căn trái -->
          <div v-if="form.image" class="mt-2">
            <img 
              :src="form.image" 
              alt="Preview" 
              style="width: 150px; height: 150px; object-fit: cover; border: 1px solid #ddd;"
            />
          </div>
        </div>
        
        <!-- String Input Mode -->
        <div v-if="imageMode === 'string'">
          <b-form-input
            id="input-4-string"
            v-model="form.image"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg) or base64 string"
            type="text"
          ></b-form-input>
          <small class="form-text text-muted">Enter image URL (e.g., https://example.com/image.jpg) or base64 string</small>
          
          <!-- Image Preview 150x150 căn trái -->
          <div v-if="form.image" class="mt-2">
            <img 
              :src="form.image" 
              alt="Preview" 
              style="width: 150px; height: 150px; object-fit: cover; border: 1px solid #ddd;"
            />
          </div>
        </div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>
  
<script>
export default {
  data() {
    return {
      form: {
        english: "",
        vietnamese: "",
        example: "",
        image: "",
      },
      imageFile: null,
      imageMode: 'string', // Default to string input mode
    };
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.convertToBase64(file);
      }
    },
    
    convertToBase64(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    async onSubmit(event) {
      event.preventDefault();
      // const response = await this.$axios.$post(
      //   "http://localhost:8080/api/english/vocabulary",
      //   this.form
      // );

      const response = await fetch("http://localhost:8080/api/english/vocabulary", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response) {
        this.$router.push({ path: "/english" });
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.english = "";
      this.form.vietnamese = "";
      this.form.example = "";
      this.form.image = "";
      this.imageFile = null;
    },
  },
};
</script>