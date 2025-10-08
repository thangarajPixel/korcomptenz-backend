import type { Schema, Struct } from '@strapi/strapi';

export interface CaseStudyBanner extends Struct.ComponentSchema {
  collectionName: 'components_case_study_banners';
  info: {
    displayName: 'banner';
    icon: 'train';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Component<'case-study.banner-image', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    searchPlaceholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyBannerImage extends Struct.ComponentSchema {
  collectionName: 'components_case_study_banner_images';
  info: {
    displayName: 'banner-image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface CaseStudyCaseStudyDomainData extends Struct.ComponentSchema {
  collectionName: 'components_case_study_case_study_domain_data';
  info: {
    displayName: 'case-study-domain-data';
    icon: 'code';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    link: Schema.Attribute.String;
    list: Schema.Attribute.Relation<'oneToMany', 'api::case-study.case-study'>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyCaseStudyStickyCardsList
  extends Struct.ComponentSchema {
  collectionName: 'components_case_study_case_study_sticky_cards_lists';
  info: {
    displayName: 'case-study-sticky-cards-list';
    icon: 'chartCircle';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    link: Schema.Attribute.String;
    list: Schema.Attribute.Relation<'oneToMany', 'api::case-study.case-study'>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyCustomer extends Struct.ComponentSchema {
  collectionName: 'components_case_study_customers';
  info: {
    displayName: 'customer';
    icon: 'calendar';
  };
  attributes: {
    customerValues: Schema.Attribute.Component<
      'case-study.customer-value',
      true
    >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyCustomerValue extends Struct.ComponentSchema {
  collectionName: 'components_case_study_customer_values';
  info: {
    displayName: 'customer-value';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyDescriptionSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_description_sections';
  info: {
    displayName: 'description-section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyFilterLabel extends Struct.ComponentSchema {
  collectionName: 'components_case_study_filter_labels';
  info: {
    displayName: 'filter-label';
  };
  attributes: {
    industry: Schema.Attribute.String;
    outcome: Schema.Attribute.String;
    region: Schema.Attribute.String;
    resetFilter: Schema.Attribute.String;
    service: Schema.Attribute.String;
    technology: Schema.Attribute.String;
  };
}

export interface CaseStudyHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_hero_sections';
  info: {
    displayName: 'hero-section';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyPartner extends Struct.ComponentSchema {
  collectionName: 'components_case_study_partners';
  info: {
    displayName: 'partner';
    icon: 'crown';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface CaseStudyPartnerSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_partner_sections';
  info: {
    displayName: 'partner-section';
  };
  attributes: {
    partner: Schema.Attribute.Component<'case-study.partner', true>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudySponserCard extends Struct.ComponentSchema {
  collectionName: 'components_case_study_sponser_cards';
  info: {
    displayName: 'sponser-card';
    icon: 'crop';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface CaseStudyTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_testimonial_sections';
  info: {
    displayName: 'testimonial-section';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface GlobalGlobalField extends Struct.ComponentSchema {
  collectionName: 'components_global_global_fields';
  info: {
    displayName: 'global-field';
    icon: 'refresh';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    mobile_image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    subTitleTwo: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface GlobalPolicy extends Struct.ComponentSchema {
  collectionName: 'components_global_policies';
  info: {
    displayName: 'policy';
    icon: 'attachment';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface GlobalSocialPlatform extends Struct.ComponentSchema {
  collectionName: 'components_global_social_platforms';
  info: {
    displayName: 'social-platform';
    icon: 'layer';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    labal: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface GlobalTitleDescripiton extends Struct.ComponentSchema {
  collectionName: 'components_global_title_descripitons';
  info: {
    displayName: 'title-descripiton';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeHeader extends Struct.ComponentSchema {
  collectionName: 'components_home_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    childKey: Schema.Attribute.String & Schema.Attribute.Required;
    hasChild: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    isButton: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface HomeHeroSectionOne extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_section_ones';
  info: {
    displayName: 'hero-section';
    icon: 'cog';
  };
  attributes: {
    list: Schema.Attribute.Component<'global.global-field', true>;
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
    arrowImage: Schema.Attribute.Media<'images'>;
    bannerImage: Schema.Attribute.Media<'images'>;
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
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface HomeScheduleCall extends Struct.ComponentSchema {
  collectionName: 'components_home_schedule_calls';
  info: {
    displayName: 'schedule-call';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.Text;
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
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface HomeWeAreKorcomptenz extends Struct.ComponentSchema {
  collectionName: 'components_home_we_are_korcomptenzs';
  info: {
    displayName: 'we-are-korcomptenz';
    icon: 'code';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
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
    displayName: 'about-menu';
  };
  attributes: {
    navigationItems: Schema.Attribute.Component<
      'menu.aboutus-navigationitems',
      true
    >;
    sidebarSections: Schema.Attribute.Component<'menu.sidebar-aboutus', true>;
    title: Schema.Attribute.String;
    whoWeAre: Schema.Attribute.Component<'menu.about-menu-who-we-are', false>;
  };
}

export interface MenuAboutMenuWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_menu_about_menu_who_we_ares';
  info: {
    displayName: 'about-menu-whoWeAre';
  };
  attributes: {
    content: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface MenuAboutusNavigationitems extends Struct.ComponentSchema {
  collectionName: 'components_menu_aboutus_navigationitems';
  info: {
    displayName: 'aboutUs-navigation-items';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface MenuEcosystemChildDescription extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_child_descriptions';
  info: {
    displayName: 'ecosystem-child-description';
  };
  attributes: {
    description: Schema.Attribute.String;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface MenuEcosystemChildType2 extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_child_type2s';
  info: {
    displayName: 'ecosystem-child-type2';
  };
  attributes: {
    description: Schema.Attribute.Component<
      'menu.ecosystem-child-description',
      true
    >;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface MenuEcosystemItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_items';
  info: {
    displayName: 'ecosystem-menu-Items';
  };
  attributes: {
    buttontext: Schema.Attribute.String;
    child: Schema.Attribute.Component<'menu.ecosystem-child-type2', true>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface MenuEcosystemSidebar extends Struct.ComponentSchema {
  collectionName: 'components_menu_ecosystem_sidebars';
  info: {
    displayName: 'ecosystem-menu';
  };
  attributes: {
    item: Schema.Attribute.Component<'menu.ecosystem-items', false>;
    menu: Schema.Attribute.String;
  };
}

export interface MenuHomeMenu extends Struct.ComponentSchema {
  collectionName: 'components_menu_home_menus';
  info: {
    displayName: 'service-child';
  };
  attributes: {
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface MenuIndustryCloumn extends Struct.ComponentSchema {
  collectionName: 'components_menu_industry_cloumns';
  info: {
    displayName: 'industry-menu';
  };
  attributes: {
    colSpan: Schema.Attribute.Enumeration<
      ['col-span-8', 'col-span-6', 'col-span-4']
    >;
    sectionName: Schema.Attribute.String;
    sections: Schema.Attribute.Component<'menu.industry-items', true>;
  };
}

export interface MenuIndustryItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_industry_items';
  info: {
    displayName: 'industry-section';
  };
  attributes: {
    height: Schema.Attribute.Enumeration<['tall', 'short']>;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['side', 'down']>;
    items: Schema.Attribute.Component<'menu.industry-menu-items', true>;
    title: Schema.Attribute.String;
  };
}

export interface MenuIndustryMenuItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_industry_menu_items';
  info: {
    displayName: 'industry-section-items';
  };
  attributes: {
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    title: Schema.Attribute.String;
  };
}

export interface MenuInsightsCategories extends Struct.ComponentSchema {
  collectionName: 'components_menu_insights_categories';
  info: {
    displayName: 'insights-categories';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface MenuInsightsData extends Struct.ComponentSchema {
  collectionName: 'components_menu_insights_data';
  info: {
    displayName: 'insights-menu';
  };
  attributes: {
    categories: Schema.Attribute.Component<'menu.insights-categories', true>;
    heroImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface MenuItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_items';
  info: {
    displayName: 'service -items';
  };
  attributes: {
    child: Schema.Attribute.Component<'menu.home-menu', true>;
    href: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    side: Schema.Attribute.Enumeration<['left', 'right', 'top', 'bottom']>;
    title: Schema.Attribute.String;
  };
}

export interface MenuSection extends Struct.ComponentSchema {
  collectionName: 'components_menu_sections';
  info: {
    displayName: 'service-menu';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'menu.items', true>;
    title: Schema.Attribute.String;
  };
}

export interface MenuSidebarAboutus extends Struct.ComponentSchema {
  collectionName: 'components_menu_sidebar_aboutuses';
  info: {
    displayName: 'sidebar-aboutUs';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsBannerSectionList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_banner_section_lists';
  info: {
    displayName: 'banner-section-list';
    icon: 'book';
  };
  attributes: {
    list: Schema.Attribute.Component<'service.banner-section-data', true>;
  };
}

export interface PageComponetsBenefitData extends Struct.ComponentSchema {
  collectionName: 'components_service_benefit_data';
  info: {
    displayName: 'benefit-data';
  };
  attributes: {
    cards: Schema.Attribute.Component<'page-componets.benifit-cards', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsBenifitCards extends Struct.ComponentSchema {
  collectionName: 'components_service_benifit_cards';
  info: {
    displayName: 'benifit-cards';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsBuildData extends Struct.ComponentSchema {
  collectionName: 'components_service_build_data';
  info: {
    displayName: 'build-data';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageCaption: Schema.Attribute.String;
    link: Schema.Attribute.String;
    mobileImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsBuildDatas extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_build_datas';
  info: {
    displayName: 'build-datas';
  };
  attributes: {
    buildData: Schema.Attribute.Component<'page-componets.build-data', false>;
  };
}

export interface PageComponetsCard extends Struct.ComponentSchema {
  collectionName: 'components_service_cards';
  info: {
    displayName: 'sap-card-detail';
  };
  attributes: {
    content: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface PageComponetsDarkSliderCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_dark_slider_cards';
  info: {
    displayName: 'dark-slider-card';
    icon: 'briefcase';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDarkSliderList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_dark_slider_lists';
  info: {
    displayName: 'dark-slider-list';
    icon: 'briefcase';
  };
  attributes: {
    descripition: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'page-componets.dark-slider-card', true>;
  };
}

export interface PageComponetsDemonstrateCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_demonstrate_cards';
  info: {
    displayName: 'demonstrate-card';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDemonstrateSection
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_demonstrate_sections';
  info: {
    displayName: 'demonstrate-section';
    icon: 'clock';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    link: Schema.Attribute.String;
    list: Schema.Attribute.Component<'page-componets.demonstrate-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDomainData extends Struct.ComponentSchema {
  collectionName: 'components_service_domain_data';
  info: {
    displayName: 'domain-data';
  };
  attributes: {
    description: Schema.Attribute.Text;
    slides: Schema.Attribute.Component<'page-componets.domain-slides', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDomainSlides extends Struct.ComponentSchema {
  collectionName: 'components_service_domain_slides';
  info: {
    displayName: 'domain-slides';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
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
    displayName: 'faq-title';
    icon: 'car';
  };
  attributes: {
    faq: Schema.Attribute.Component<'page-componets.faq', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsImage extends Struct.ComponentSchema {
  collectionName: 'components_service_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageMobile: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    logoMobile: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsImageSection extends Struct.ComponentSchema {
  collectionName: 'components_service_image_sections';
  info: {
    displayName: 'image-section';
  };
  attributes: {
    image1: Schema.Attribute.Component<'page-componets.image', false>;
    image2: Schema.Attribute.Component<'page-componets.image', false>;
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
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsInspireSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_inspire_sections';
  info: {
    displayName: 'inspire-section';
    icon: 'dashboard';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    list: Schema.Attribute.Component<
      'page-componets.inspire-section-card',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 2;
        },
        number
      >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsInspireSectionCard
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_inspire_section_cards';
  info: {
    displayName: 'inspire-section-card';
    icon: 'chartBubble';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    position: Schema.Attribute.Enumeration<['bottom', 'top', 'topAbove']>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsLightSliderCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_light_slider_cards';
  info: {
    displayName: 'light-slider-card';
    icon: 'briefcase';
  };
  attributes: {
    solutions: Schema.Attribute.Component<
      'page-componets.light-slider-group-list',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsLightSliderGroupList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_light_slider_group_lists';
  info: {
    displayName: 'light-slider-group-list';
    icon: 'collapse';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsLightSliderList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_light_slider_lists';
  info: {
    displayName: 'light-slider-list';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    list: Schema.Attribute.Component<'page-componets.light-slider-card', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsSalesforce extends Struct.ComponentSchema {
  collectionName: 'components_service_salesforces';
  info: {
    displayName: 'salesforce';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSalesforceServices
  extends Struct.ComponentSchema {
  collectionName: 'components_service_salesforce_services';
  info: {
    displayName: 'salesforce-services';
  };
  attributes: {
    salesforceServices: Schema.Attribute.Component<
      'page-componets.salesforce',
      true
    >;
  };
}

export interface PageComponetsSapImageSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_image_sections';
  info: {
    displayName: 'sap-image-section';
  };
  attributes: {
    image1: Schema.Attribute.Component<
      'page-componets.sap-section-image',
      false
    >;
    image2: Schema.Attribute.Component<
      'page-componets.sap-section-image',
      false
    >;
  };
}

export interface PageComponetsSapSectionData extends Struct.ComponentSchema {
  collectionName: 'components_service_sap_section_data';
  info: {
    displayName: 'sap-section-data';
  };
  attributes: {
    card: Schema.Attribute.Component<'page-componets.card', false>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    imageSection: Schema.Attribute.Component<
      'page-componets.sap-image-section',
      false
    >;
  };
}

export interface PageComponetsSapSectionImage extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_section_images';
  info: {
    displayName: 'sap-section-image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface PageComponetsSlideContent extends Struct.ComponentSchema {
  collectionName: 'components_service_slide_contents';
  info: {
    displayName: 'slide-content';
  };
  attributes: {
    solutions: Schema.Attribute.Component<'page-componets.solutions', true>;
  };
}

export interface PageComponetsSolutions extends Struct.ComponentSchema {
  collectionName: 'components_service_solutions';
  info: {
    displayName: 'solutions';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSolutionsData extends Struct.ComponentSchema {
  collectionName: 'components_service_solutions_data';
  info: {
    displayName: 'solutions-data';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    slideContent: Schema.Attribute.Component<
      'page-componets.slide-content',
      true
    >;
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
    image: Schema.Attribute.Media<'images'>;
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

export interface PageComponetsStickyTitleCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sticky_title_cards';
  info: {
    displayName: 'sticky-title-card';
    icon: 'briefcase';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsStickyTitleList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sticky_title_lists';
  info: {
    displayName: 'sticky-title-list';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'page-componets.sticky-title-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsStretchableCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_stretchable_cards';
  info: {
    displayName: 'stretchable-card';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn more'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsStretchableSection
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_stretchable_sections';
  info: {
    displayName: 'stretchable-section';
    icon: 'command';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    list: Schema.Attribute.Component<'page-componets.stretchable-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsTechData extends Struct.ComponentSchema {
  collectionName: 'components_service_tech_data';
  info: {
    displayName: 'tech-data';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    mobileimage: Schema.Attribute.Media<'images'>;
    techslides: Schema.Attribute.Component<'page-componets.solutions', true>;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
    icon: 'alien';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 155;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface ServiceBannerSectionData extends Struct.ComponentSchema {
  collectionName: 'components_service_banner_section_data';
  info: {
    displayName: 'Banner-section-data';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageMobile: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    logoMobile: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'case-study.banner': CaseStudyBanner;
      'case-study.banner-image': CaseStudyBannerImage;
      'case-study.case-study-domain-data': CaseStudyCaseStudyDomainData;
      'case-study.case-study-sticky-cards-list': CaseStudyCaseStudyStickyCardsList;
      'case-study.customer': CaseStudyCustomer;
      'case-study.customer-value': CaseStudyCustomerValue;
      'case-study.description-section': CaseStudyDescriptionSection;
      'case-study.filter-label': CaseStudyFilterLabel;
      'case-study.hero-section': CaseStudyHeroSection;
      'case-study.partner': CaseStudyPartner;
      'case-study.partner-section': CaseStudyPartnerSection;
      'case-study.sponser-card': CaseStudySponserCard;
      'case-study.testimonial-section': CaseStudyTestimonialSection;
      'global.global-field': GlobalGlobalField;
      'global.policy': GlobalPolicy;
      'global.social-platform': GlobalSocialPlatform;
      'global.title-descripiton': GlobalTitleDescripiton;
      'home.header': HomeHeader;
      'home.hero-section-one': HomeHeroSectionOne;
      'home.nav-item': HomeNavItem;
      'home.opportunity': HomeOpportunity;
      'home.opportunity-profile': HomeOpportunityProfile;
      'home.schedule-call': HomeScheduleCall;
      'home.services-section': HomeServicesSection;
      'home.services-section-list': HomeServicesSectionList;
      'home.we-are-korcomptenz': HomeWeAreKorcomptenz;
      'menu.about-data': MenuAboutData;
      'menu.about-menu-who-we-are': MenuAboutMenuWhoWeAre;
      'menu.aboutus-navigationitems': MenuAboutusNavigationitems;
      'menu.ecosystem-child-description': MenuEcosystemChildDescription;
      'menu.ecosystem-child-type2': MenuEcosystemChildType2;
      'menu.ecosystem-items': MenuEcosystemItems;
      'menu.ecosystem-sidebar': MenuEcosystemSidebar;
      'menu.home-menu': MenuHomeMenu;
      'menu.industry-cloumn': MenuIndustryCloumn;
      'menu.industry-items': MenuIndustryItems;
      'menu.industry-menu-items': MenuIndustryMenuItems;
      'menu.insights-categories': MenuInsightsCategories;
      'menu.insights-data': MenuInsightsData;
      'menu.items': MenuItems;
      'menu.section': MenuSection;
      'menu.sidebar-aboutus': MenuSidebarAboutus;
      'page-componets.banner-section-list': PageComponetsBannerSectionList;
      'page-componets.benefit-data': PageComponetsBenefitData;
      'page-componets.benifit-cards': PageComponetsBenifitCards;
      'page-componets.build-data': PageComponetsBuildData;
      'page-componets.build-datas': PageComponetsBuildDatas;
      'page-componets.card': PageComponetsCard;
      'page-componets.dark-slider-card': PageComponetsDarkSliderCard;
      'page-componets.dark-slider-list': PageComponetsDarkSliderList;
      'page-componets.demonstrate-card': PageComponetsDemonstrateCard;
      'page-componets.demonstrate-section': PageComponetsDemonstrateSection;
      'page-componets.domain-data': PageComponetsDomainData;
      'page-componets.domain-slides': PageComponetsDomainSlides;
      'page-componets.faq': PageComponetsFaq;
      'page-componets.faq-title': PageComponetsFaqTitle;
      'page-componets.image': PageComponetsImage;
      'page-componets.image-section': PageComponetsImageSection;
      'page-componets.insights-section': PageComponetsInsightsSection;
      'page-componets.insights-section-card': PageComponetsInsightsSectionCard;
      'page-componets.inspire-section': PageComponetsInspireSection;
      'page-componets.inspire-section-card': PageComponetsInspireSectionCard;
      'page-componets.light-slider-card': PageComponetsLightSliderCard;
      'page-componets.light-slider-group-list': PageComponetsLightSliderGroupList;
      'page-componets.light-slider-list': PageComponetsLightSliderList;
      'page-componets.salesforce': PageComponetsSalesforce;
      'page-componets.salesforce-services': PageComponetsSalesforceServices;
      'page-componets.sap-image-section': PageComponetsSapImageSection;
      'page-componets.sap-section-data': PageComponetsSapSectionData;
      'page-componets.sap-section-image': PageComponetsSapSectionImage;
      'page-componets.slide-content': PageComponetsSlideContent;
      'page-componets.solutions': PageComponetsSolutions;
      'page-componets.solutions-data': PageComponetsSolutionsData;
      'page-componets.sticky-card': PageComponetsStickyCard;
      'page-componets.sticky-cards-list': PageComponetsStickyCardsList;
      'page-componets.sticky-title-card': PageComponetsStickyTitleCard;
      'page-componets.sticky-title-list': PageComponetsStickyTitleList;
      'page-componets.stretchable-card': PageComponetsStretchableCard;
      'page-componets.stretchable-section': PageComponetsStretchableSection;
      'page-componets.tech-data': PageComponetsTechData;
      'seo.seo': SeoSeo;
      'service.banner-section-data': ServiceBannerSectionData;
    }
  }
}
