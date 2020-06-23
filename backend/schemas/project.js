export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    // {
    //   name: "body",
    //   title: "Body",
    //   type: "blockContent",
    // },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
      published: "publishedAt",
    },
    prepare(selection) {
      const { title, published } = selection;
      const date = new Date(published);
      const year = date.getFullYear();
      return Object.assign({}, selection, {
        title: `${title} (${year})`,
      });
    },
  },
};
