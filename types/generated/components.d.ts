import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalGlobalField extends Struct.ComponentSchema {
  collectionName: 'components_global_global_fields';
  info: {
    displayName: 'global_field';
    icon: 'refresh';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    link: Schema.Attribute.String;
    mobile_image: Schema.Attribute.Media<'images' | 'files'>;
    number: Schema.Attribute.String;
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

export interface HomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_banners';
  info: {
    displayName: 'banner';
  };
  attributes: {
    button: Schema.Attribute.String;
    content: Schema.Attribute.Component<'global.global-field', true>;
    h1: Schema.Attribute.String;
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

export interface HomeButtonHeader extends Struct.ComponentSchema {
  collectionName: 'components_home_button_headers';
  info: {
    displayName: 'button-header';
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

export interface HomeHeader extends Struct.ComponentSchema {
  collectionName: 'components_home_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface HomeInspireBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_inspire_banners';
  info: {
    displayName: 'inspireBanner';
  };
  attributes: {
    button: Schema.Attribute.String;
    content: Schema.Attribute.Component<'home.inspire-section', true>;
    h1: Schema.Attribute.String;
  };
}

export interface HomeInspireSection extends Struct.ComponentSchema {
  collectionName: 'components_home_inspire_sections';
  info: {
    displayName: 'inspireSection';
  };
  attributes: {
    h3: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    p: Schema.Attribute.Text;
    postion: Schema.Attribute.Enumeration<['top', 'bottom', 'topabove']>;
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

export interface HomeServiceBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_service_banners';
  info: {
    displayName: 'serviceBanner';
  };
  attributes: {
    content: Schema.Attribute.Component<'global.global-field', true>;
  };
}

export interface MenuHomeMenu extends Struct.ComponentSchema {
  collectionName: 'components_menu_home_menus';
  info: {
    displayName: 'serviceChild';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface MenuIndustryCloumn extends Struct.ComponentSchema {
  collectionName: 'components_menu_industry_cloumns';
  info: {
    displayName: 'industryCloumn';
  };
  attributes: {
    colSpan: Schema.Attribute.String;
    sectionName: Schema.Attribute.String;
    sections: Schema.Attribute.Component<'menu.industry-items', true>;
  };
}

export interface MenuIndustryItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_industry_items';
  info: {
    displayName: 'industrySection';
  };
  attributes: {
    heigh: Schema.Attribute.Enumeration<['tall', 'short']>;
    imagePath: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imagePostion: Schema.Attribute.Enumeration<['side', 'down']>;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MenuItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_items';
  info: {
    displayName: 'serviceItems';
  };
  attributes: {
    child: Schema.Attribute.Component<'menu.home-menu', true>;
    side: Schema.Attribute.Enumeration<['left', 'right', 'top', 'bottom']>;
    title: Schema.Attribute.String;
  };
}

export interface MenuSection extends Struct.ComponentSchema {
  collectionName: 'components_menu_sections';
  info: {
    displayName: 'serviceSection';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    items: Schema.Attribute.Component<'menu.items', true>;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFaq extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_faqs';
  info: {
    displayName: 'faq';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFaqTitle extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_faq_titles';
  info: {
    displayName: 'faq title';
    icon: 'car';
  };
  attributes: {
    faq: Schema.Attribute.Component<'page-componets.faq', true>;
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
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.String;
    p1: Schema.Attribute.Text;
    p2: Schema.Attribute.Text;
    titleH1: Schema.Attribute.String;
    titleSpan: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.global-field': GlobalGlobalField;
      'global.title': GlobalTitle;
      'home.address': HomeAddress;
      'home.banner': HomeBanner;
      'home.button': HomeButton;
      'home.button-header': HomeButtonHeader;
      'home.company-detail': HomeCompanyDetail;
      'home.header': HomeHeader;
      'home.inspire-banner': HomeInspireBanner;
      'home.inspire-section': HomeInspireSection;
      'home.nav-item': HomeNavItem;
      'home.schedule-call': HomeScheduleCall;
      'home.service-banner': HomeServiceBanner;
      'menu.home-menu': MenuHomeMenu;
      'menu.industry-cloumn': MenuIndustryCloumn;
      'menu.industry-items': MenuIndustryItems;
      'menu.items': MenuItems;
      'menu.section': MenuSection;
      'page-componets.faq': PageComponetsFaq;
      'page-componets.faq-title': PageComponetsFaqTitle;
      'seo.seo': SeoSeo;
      'seo.we-are-korcomptenz-section': SeoWeAreKorcomptenzSection;
    }
  }
}
