const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "de", title: "Deutsch" },
];

export default {
  name: "localeSlug",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "slug",
    fieldset: lang.isDefault ? null : "translations",
    options: {
      source: "title",
      maxLength: 96,
    },
  })),
};
