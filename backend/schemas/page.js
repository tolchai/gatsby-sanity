export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug",
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
      name: "body",
      title: "Body",
      type: "localeBlock",
    },
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return Object.assign({}, selection, {
        title: `${title.en}`,
      });
    },
  },
};
