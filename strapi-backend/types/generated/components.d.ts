import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_features_sections';
  info: {
    description: '';
    displayName: 'Features Section';
  };
  attributes: {
    features: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsRecyclingSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_recycling_sections';
  info: {
    description: '';
    displayName: 'Recycling Section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.features-section': SectionsFeaturesSection;
      'sections.recycling-section': SectionsRecyclingSection;
    }
  }
}
