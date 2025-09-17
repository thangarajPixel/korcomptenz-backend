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
    subTitleTwo: Schema.Attribute.String;
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

export interface HomeCards extends Struct.ComponentSchema {
  collectionName: 'components_home_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    idnumber: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    order: Schema.Attribute.String;
    position: Schema.Attribute.Enumeration<['bottom', 'top', 'topAbove']>;
    title: Schema.Attribute.String;
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

export interface HomeHeroSectionOne extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_section_ones';
  info: {
    displayName: 'heroSectionOne';
    icon: 'cog';
  };
  attributes: {
    list: Schema.Attribute.Component<'global.global-field', true>;
  };
}

export interface HomeInsightSection extends Struct.ComponentSchema {
  collectionName: 'components_home_insight_sections';
  info: {
    displayName: 'insightSection';
    icon: 'cloud';
  };
  attributes: {
    inspire_section: Schema.Attribute.Relation<
      'oneToOne',
      'api::inspire-section.inspire-section'
    >;
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
    mainheading: Schema.Attribute.Component<'home.mainheading', true>;
  };
}

export interface HomeMainheading extends Struct.ComponentSchema {
  collectionName: 'components_home_mainheadings';
  info: {
    displayName: 'mainheading';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'home.cards', true>;
    title: Schema.Attribute.String;
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

export interface HomeOpportunity extends Struct.ComponentSchema {
  collectionName: 'components_home_opportunities';
  info: {
    displayName: 'opportunity';
    icon: 'briefcase';
  };
  attributes: {
    arrowImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    bannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    breakFour: Schema.Attribute.String;
    breakOne: Schema.Attribute.String;
    breakThree: Schema.Attribute.String;
    breakTwo: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    profiles: Schema.Attribute.Component<'home.opportunity-profile', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
  };
}

export interface HomeOpportunityProfile extends Struct.ComponentSchema {
  collectionName: 'components_home_opportunity_profiles';
  info: {
    displayName: 'opportunity-profile';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface HomeServiceSection extends Struct.ComponentSchema {
  collectionName: 'components_home_service_sections';
  info: {
    displayName: 'serviceSection';
  };
  attributes: {
    service_sections: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-section.service-section'
    >;
  };
}

export interface HomeServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_services_sections';
  info: {
    displayName: 'services-section';
  };
  attributes: {
    list: Schema.Attribute.Component<'home.services-section-list', true>;
  };
}

export interface HomeServicesSectionList extends Struct.ComponentSchema {
  collectionName: 'components_home_services_section_lists';
  info: {
    displayName: 'services-section-list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
  };
}

export interface HomeWeAreKorcomptenz extends Struct.ComponentSchema {
  collectionName: 'components_home_we_are_korcomptenzs';
  info: {
    displayName: 'weAreKorcomptenz';
    icon: 'code';
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

export interface MenuAboutData extends Struct.ComponentSchema {
  collectionName: 'components_menu_about_data';
  info: {
    displayName: 'aboutData';
  };
  attributes: {
    about_us: Schema.Attribute.Relation<'oneToOne', 'api::about-us.about-us'>;
    navigationItems: Schema.Attribute.Component<
      'menu.aboutus-navigationitems',
      true
    >;
    sidebarSections: Schema.Attribute.Component<'menu.sidebar-aboutus', true>;
    who_we_are: Schema.Attribute.Relation<
      'oneToOne',
      'api::who-we-are.who-we-are'
    >;
  };
}

export interface MenuAboutusNavigationitems extends Struct.ComponentSchema {
  collectionName: 'components_menu_aboutus_navigationitems';
  info: {
    displayName: 'aboutusNavigationitems';
  };
  attributes: {
    description: Schema.Attribute.Text;
    idName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MenuCareersandsSuccesstories extends Struct.ComponentSchema {
  collectionName: 'components_menu_careersands_successtories';
  info: {
    displayName: 'careersandsSuccesstories';
  };
  attributes: {
    href: Schema.Attribute.String;
    isChild: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface MenuEcosystemChild extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_children';
  info: {
    displayName: 'ecosystemChild';
  };
  attributes: {
    ecosystem_discriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::ecosystemdiscription.ecosystemdiscription'
    >;
    title: Schema.Attribute.String;
  };
}

export interface MenuEcosystemItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_items';
  info: {
    displayName: 'ecosystemItems';
  };
  attributes: {
    buttontext: Schema.Attribute.String;
    child: Schema.Attribute.Component<'menu.home-menu', true>;
    childtype: Schema.Attribute.String;
    discription: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface MenuEcosystemSidebar extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_sidebars';
  info: {
    displayName: 'ecosystemSidebar';
  };
  attributes: {
    item: Schema.Attribute.Component<'menu.ecosystem-items', true>;
    items: Schema.Attribute.Component<'menu.ecosysystem-items-type2', true>;
    menu: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface MenuEcosysystemItemsType2 extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosysystem_items_type2s';
  info: {
    displayName: 'ecosysystemItems_type2';
  };
  attributes: {
    buttontext: Schema.Attribute.String;
    child: Schema.Attribute.Component<'menu.ecosystem-child', true>;
    childtype: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::ecosystemdiscription.ecosystemdiscription'
    >;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MenuInsightsCategories extends Struct.ComponentSchema {
  collectionName: 'components_menu_insights_categories';
  info: {
    displayName: 'insightsCategories';
  };
  attributes: {
    description: Schema.Attribute.Text;
    idName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MenuInsightsData extends Struct.ComponentSchema {
  collectionName: 'components_menu_insights_data';
  info: {
    displayName: 'insightsData';
  };
  attributes: {
    categories: Schema.Attribute.Component<'menu.insights-categories', true>;
    heroImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
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

export interface MenuSidebarAboutus extends Struct.ComponentSchema {
  collectionName: 'components_menu_sidebar_aboutuses';
  info: {
    displayName: 'sidebarAboutus';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    idName: Schema.Attribute.String;
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

export interface PageComponetsInsightsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_insights_sections';
  info: {
    displayName: 'insights-section';
    icon: 'book';
  };
  attributes: {
    buttontext: Schema.Attribute.String;
    list: Schema.Attribute.Component<
      'page-componets.insights-section-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsInsightsSectionCard
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_insights_section_cards';
  info: {
    displayName: 'insights-section-card';
    icon: 'collapse';
  };
  attributes: {
    category: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsStickyCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sticky_cards';
  info: {
    displayName: 'sticky-card';
    icon: 'book';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    specificId: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsStickyCardsList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sticky_cards_lists';
  info: {
    displayName: 'sticky-cards-list';
    icon: 'arrowDown';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    list: Schema.Attribute.Component<'page-componets.sticky-card', true>;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.global-field': GlobalGlobalField;
      'global.title': GlobalTitle;
      'home.address': HomeAddress;
      'home.banner': HomeBanner;
      'home.button': HomeButton;
      'home.button-header': HomeButtonHeader;
      'home.cards': HomeCards;
      'home.company-detail': HomeCompanyDetail;
      'home.header': HomeHeader;
      'home.hero-section-one': HomeHeroSectionOne;
      'home.insight-section': HomeInsightSection;
      'home.inspire-banner': HomeInspireBanner;
      'home.inspire-section': HomeInspireSection;
      'home.mainheading': HomeMainheading;
      'home.nav-item': HomeNavItem;
      'home.opportunity': HomeOpportunity;
      'home.opportunity-profile': HomeOpportunityProfile;
      'home.schedule-call': HomeScheduleCall;
      'home.service-banner': HomeServiceBanner;
      'home.service-section': HomeServiceSection;
      'home.services-section': HomeServicesSection;
      'home.services-section-list': HomeServicesSectionList;
      'home.we-are-korcomptenz': HomeWeAreKorcomptenz;
      'menu.about-data': MenuAboutData;
      'menu.aboutus-navigationitems': MenuAboutusNavigationitems;
      'menu.careersands-successtories': MenuCareersandsSuccesstories;
      'menu.ecosystem-child': MenuEcosystemChild;
      'menu.ecosystem-items': MenuEcosystemItems;
      'menu.ecosystem-sidebar': MenuEcosystemSidebar;
      'menu.ecosysystem-items-type2': MenuEcosysystemItemsType2;
      'menu.home-menu': MenuHomeMenu;
      'menu.industry-cloumn': MenuIndustryCloumn;
      'menu.industry-items': MenuIndustryItems;
      'menu.insights-categories': MenuInsightsCategories;
      'menu.insights-data': MenuInsightsData;
      'menu.items': MenuItems;
      'menu.section': MenuSection;
      'menu.sidebar-aboutus': MenuSidebarAboutus;
      'page-componets.faq': PageComponetsFaq;
      'page-componets.faq-title': PageComponetsFaqTitle;
      'page-componets.insights-section': PageComponetsInsightsSection;
      'page-componets.insights-section-card': PageComponetsInsightsSectionCard;
      'page-componets.sticky-card': PageComponetsStickyCard;
      'page-componets.sticky-cards-list': PageComponetsStickyCardsList;
      'seo.seo': SeoSeo;
    }
  }
}
