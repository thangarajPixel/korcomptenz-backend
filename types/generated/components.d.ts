import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalGlobalField extends Struct.ComponentSchema {
  collectionName: 'components_global_global_fields';
  info: {
    displayName: 'global_field';
    icon: 'refresh';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    link: Schema.Attribute.String;
    mobile_image: Schema.Attribute.Media<'images' | 'files'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface GlobalTitle extends Struct.ComponentSchema {
  collectionName: 'components_global_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface HomeAddress extends Struct.ComponentSchema {
  collectionName: 'components_home_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    line1: Schema.Attribute.String;
    line2: Schema.Attribute.String;
    line3: Schema.Attribute.String;
  };
}

export interface HomeButton extends Struct.ComponentSchema {
  collectionName: 'components_home_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    href: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface HomeCompanyDetail extends Struct.ComponentSchema {
  collectionName: 'components_home_company_details';
  info: {
    displayName: 'company-detail';
  };
  attributes: {
    logo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
  };
}

export interface HomeNavItem extends Struct.ComponentSchema {
  collectionName: 'components_home_nav_items';
  info: {
    displayName: 'nav-item';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeScheduleCall extends Struct.ComponentSchema {
  collectionName: 'components_home_schedule_calls';
  info: {
    displayName: 'schedule-call';
  };
  attributes: {
    cta: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
    icon: 'alien';
  };
  attributes: {
    descripition: Schema.Attribute.String;
    meta_tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SeoWeAreKorcomptenzSection extends Struct.ComponentSchema {
  collectionName: 'components_seo_we_are_korcomptenz_sections';
  info: {
    displayName: 'WeAreKorcomptenzSection';
  };
  attributes: {
    Description: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.global-field': GlobalGlobalField;
      'global.title': GlobalTitle;
      'home.address': HomeAddress;
      'home.button': HomeButton;
      'home.company-detail': HomeCompanyDetail;
      'home.nav-item': HomeNavItem;
      'home.schedule-call': HomeScheduleCall;
      'seo.seo': SeoSeo;
      'seo.we-are-korcomptenz-section': SeoWeAreKorcomptenzSection;
    }
  }
}
