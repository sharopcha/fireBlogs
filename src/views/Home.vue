<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View recent blogs</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, i) in sampleBlogCards"
            :key="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BlogPost from '../components/BlogPost';
  import BlogCard from '../components/BlogCard';
  export default {
    name: 'Home',
    components: {
      BlogPost,
      BlogCard,
    },
    data() {
      return {
        welcomeScreen: {
          title: 'Welcome!',
          blogPost:
            'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
          welcomeScreen: true,
          photo: 'coding',
        },
        sampleBlogPost: [
          {
            title: 'This is a first title',
            blogHTML: 'This is a blog content',
            blogCoverPhoto: 'beautiful-stories',
          },
          {
            title: 'This is a second title',
            blogHTML: 'This is a blog content for second blog',
            blogCoverPhoto: 'designed-for-everyone',
          },
        ],
        sampleBlogCards: [
          {
            blogTitle: 'Blog Crad #1',
            blogCoverPhoto: 'stock-1.jpg',
            blogData: 'First blog Content',
            blogDate: '12/02/2021',
          },
          {
            blogTitle: 'Blog Crad #2',
            blogCoverPhoto: 'stock-2.jpg',
            blogData: 'Second blog Content',
            blogDate: '22/03/2021',
          },
          {
            blogTitle: 'Blog Crad #3',
            blogCoverPhoto: 'stock-3.jpg',
            blogData: 'Third blog Content',
            blogDate: '1/04/2021',
          },
          {
            blogTitle: 'Blog Crad #4',
            blogCoverPhoto: 'stock-4.jpg',
            blogData: 'Fourth blog Content',
            blogDate: '8/06/2021',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .blog-card-wrap {
    h3 {
      font-weight: 300;
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
</style>
