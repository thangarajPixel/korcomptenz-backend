import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsAchievementColumn extends Struct.ComponentSchema {
  collectionName: 'components_about_us_achievement_columns';
  info: {
    displayName: 'achievement-column';
    icon: 'chartCircle';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface AboutUsAchievementList extends Struct.ComponentSchema {
  collectionName: 'components_about_us_achievement_lists';
  info: {
    displayName: 'achievement-list';
    icon: 'chartCircle';
  };
  attributes: {
    column: Schema.Attribute.Component<'about-us.achievement-column', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 1;
        },
        number
      >;
  };
}

export interface AboutUsAchievementSection extends Struct.ComponentSchema {
  collectionName: 'components_about_us_achievement_sections';
  info: {
    displayName: 'achievement-section';
    icon: 'gift';
  };
  attributes: {
    isColumnFour: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'about-us.achievement-list', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 3;
        },
        number
      >;
    title: Schema.Attribute.Text;
  };
}

export interface AboutUsContentShowcaseSectionCard
  extends Struct.ComponentSchema {
  collectionName: 'components_about_us_content_showcase_section_cards';
  info: {
    displayName: 'content-showcase-section-card';
    icon: 'database';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsContentShowcaseSectionList
  extends Struct.ComponentSchema {
  collectionName: 'components_about_us_content_showcase_section_lists';
  info: {
    displayName: 'content-showcase-section-list';
    icon: 'database';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    list: Schema.Attribute.Component<
      'about-us.content-showcase-section-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsMapSectionCard extends Struct.ComponentSchema {
  collectionName: 'components_about_us_map_section_cards';
  info: {
    displayName: 'map-section-card';
    icon: 'earth';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
    x: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 110;
          min: 0;
        },
        number
      >;
    y: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 110;
          min: 0;
        },
        number
      >;
  };
}

export interface AboutUsMapSectionList extends Struct.ComponentSchema {
  collectionName: 'components_about_us_map_section_lists';
  info: {
    displayName: 'map-section-list';
    icon: 'earth';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    list: Schema.Attribute.Component<'about-us.map-section-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsMediaSlider extends Struct.ComponentSchema {
  collectionName: 'components_about_us_media_sliders';
  info: {
    displayName: 'media-slider';
    icon: 'stack';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    isVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    videoLink: Schema.Attribute.String;
  };
}

export interface AboutUsMediaSliderSection extends Struct.ComponentSchema {
  collectionName: 'components_about_us_media_slider_sections';
  info: {
    displayName: 'media-slider-section';
    icon: 'stack';
  };
  attributes: {
    list: Schema.Attribute.Component<'about-us.media-slider', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsOurStory extends Struct.ComponentSchema {
  collectionName: 'components_about_us_our_stories';
  info: {
    displayName: 'our-story';
    icon: 'walk';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    year: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface AboutUsOurStoryList extends Struct.ComponentSchema {
  collectionName: 'components_about_us_our_story_lists';
  info: {
    displayName: 'our-story-list';
    icon: 'walk';
  };
  attributes: {
    list: Schema.Attribute.Component<'about-us.our-story', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsPeopleShowcaseCard extends Struct.ComponentSchema {
  collectionName: 'components_about_us_people_showcase_cards';
  info: {
    displayName: 'people-showcase-card';
    icon: 'alien';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    miniDescription: Schema.Attribute.Text;
    position: Schema.Attribute.Text;
    socialPlatform: Schema.Attribute.Component<'global.social-platform', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsPeopleShowcaseList extends Struct.ComponentSchema {
  collectionName: 'components_about_us_people_showcase_lists';
  info: {
    displayName: 'people-showcase-list';
    icon: 'alien';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    isAdvisoryBoard: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'about-us.people-showcase-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_us_stats_sections';
  info: {
    displayName: 'stats-section';
    icon: 'slideshow';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'about-us.stats-section-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsStatsSectionCard extends Struct.ComponentSchema {
  collectionName: 'components_about_us_stats_section_cards';
  info: {
    displayName: 'stats-section-card';
    icon: 'slideshow';
  };
  attributes: {
    count: Schema.Attribute.Integer;
    description: Schema.Attribute.Text;
    isIncrement: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface CareerCareerBuildData extends Struct.ComponentSchema {
  collectionName: 'components_career_career_build_data';
  info: {
    displayName: 'career-build-data';
    icon: 'connector';
  };
  attributes: {
    description: Schema.Attribute.Text;
    descriptionTitle: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    mainImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    titleDescription: Schema.Attribute.Text;
    videoLink: Schema.Attribute.String;
  };
}

export interface CareerMansonryGallery extends Struct.ComponentSchema {
  collectionName: 'components_career_mansonry_galleries';
  info: {
    displayName: 'mansonry-gallery';
    icon: 'slideshow';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    isVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    videoLink: Schema.Attribute.String;
  };
}

export interface CareerMansonryGalleryCol extends Struct.ComponentSchema {
  collectionName: 'components_career_mansonry_gallery_cols';
  info: {
    displayName: 'mansonry-gallery-col';
    icon: 'slideshow';
  };
  attributes: {
    column: Schema.Attribute.Component<'career.mansonry-gallery', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 2;
        },
        number
      >;
  };
}

export interface CareerMansonryGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_career_mansonry_gallery_sections';
  info: {
    displayName: 'mansonry-gallery-section';
    icon: 'slideshow';
  };
  attributes: {
    highLightText: Schema.Attribute.String;
    isPerRowFour: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'career.mansonry-gallery-col', true>;
    title: Schema.Attribute.String;
  };
}

export interface CareerOpenJobs extends Struct.ComponentSchema {
  collectionName: 'components_career_open_jobs';
  info: {
    displayName: 'open-jobs';
    icon: 'briefcase';
  };
  attributes: {
    iframeLink: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

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
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface CaseStudyCaseStudyDomainData extends Struct.ComponentSchema {
  collectionName: 'components_case_study_case_study_domain_data';
  info: {
    displayName: 'case-study-domain-data';
    icon: 'code';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read All'>;
    link: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/client-success'>;
    list: Schema.Attribute.Relation<'oneToMany', 'api::case-study.case-study'>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyCaseStudyForm extends Struct.ComponentSchema {
  collectionName: 'components_case_study_case_study_forms';
  info: {
    displayName: 'case-study-form';
    icon: 'connector';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    title: Schema.Attribute.Text;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyFilterLabel extends Struct.ComponentSchema {
  collectionName: 'components_case_study_filter_labels';
  info: {
    displayName: 'filter-label';
  };
  attributes: {
    childTitle: Schema.Attribute.String;
    filterKey: Schema.Attribute.Enumeration<
      ['businessOutcomes', 'industries', 'region', 'service', 'technology']
    >;
    isDesignedDropdown: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isMultiple: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface CaseStudyHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_hero_sections';
  info: {
    displayName: 'hero-section';
    icon: 'apps';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    mobileImage: Schema.Attribute.Media<'images'>;
  };
}

export interface CaseStudyPartner extends Struct.ComponentSchema {
  collectionName: 'components_case_study_partners';
  info: {
    displayName: 'partner';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface CaseStudyPartnerSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_partner_sections';
  info: {
    displayName: 'partner-section';
  };
  attributes: {
    isPerRowFive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isSingleLine: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    partner: Schema.Attribute.Component<'case-study.partner', true>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyPopularFilter extends Struct.ComponentSchema {
  collectionName: 'components_case_study_popular_filters';
  info: {
    displayName: 'popular-filter';
  };
  attributes: {
    label: Schema.Attribute.String;
    popularFilterList: Schema.Attribute.Component<
      'case-study.popular-filter-list',
      true
    >;
    resetButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Reset'>;
  };
}

export interface CaseStudyPopularFilterList extends Struct.ComponentSchema {
  collectionName: 'components_case_study_popular_filter_lists';
  info: {
    displayName: 'popular-filter-list';
    icon: 'crop';
  };
  attributes: {
    label: Schema.Attribute.String;
    sort: Schema.Attribute.Enumeration<
      ['createdAt:asc', 'createdAt:desc', 'title:asc', 'title:desc']
    >;
  };
}

export interface CaseStudyRelatedCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_case_study_related_case_studies';
  info: {
    displayName: 'related-case-study';
    icon: 'clock';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View all case studies'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore more success stories'>;
  };
}

export interface CaseStudyRelatedOfferings extends Struct.ComponentSchema {
  collectionName: 'components_case_study_related_offerings';
  info: {
    displayName: 'related-offerings';
    icon: 'cloud';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface CaseStudyRightSection extends Struct.ComponentSchema {
  collectionName: 'components_case_study_right_sections';
  info: {
    displayName: 'right-section';
    icon: 'bold';
  };
  attributes: {
    descripition: Schema.Attribute.Text;
    descripitionKey: Schema.Attribute.Enumeration<
      ['service', 'technology', 'region', 'industry']
    >;
    icon: Schema.Attribute.Media<'images'>;
    isCustomDescripition: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isPreTitle: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    preTitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::case-study-right-title.case-study-right-title'
    >;
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
    logo: Schema.Attribute.Media<'images'>;
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
    author: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsContactUsFormSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_us_form_sections';
  info: {
    displayName: 'contact-us-form-section';
    icon: 'puzzle';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    images: Schema.Attribute.Component<'case-study.banner-image', true>;
    listLeft: Schema.Attribute.Component<
      'contact-us.contact-us-from-left-section-list',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsContactUsFromLeftSectionList
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_us_from_left_section_lists';
  info: {
    displayName: 'contact-us-from-left-section-list';
    icon: 'cloud';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsContactUsInsight extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_us_insights';
  info: {
    displayName: 'contact-us-insight';
    icon: 'phone';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsContactUsInsightList extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_us_insight_lists';
  info: {
    displayName: 'contact-us-insight-list';
    icon: 'sun';
  };
  attributes: {
    list: Schema.Attribute.Component<'contact-us.contact-us-insight', true>;
  };
}

export interface ContactUsFixedSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_fixed_sections';
  info: {
    displayName: 'fixed-section';
    icon: 'connector';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'global.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    description: Schema.Attribute.Text;
  };
}

export interface ContactUsLogoSlider extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_logo_sliders';
  info: {
    displayName: 'logo-slider';
    icon: 'envelop';
  };
  attributes: {
    logo: Schema.Attribute.Component<'contact-us.logo-slider-list', true>;
  };
}

export interface ContactUsLogoSliderList extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_logo_slider_lists';
  info: {
    displayName: 'logo-slider-list';
    icon: 'crop';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ContactUsNewsLetter extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_news_letters';
  info: {
    displayName: 'news-letter';
    icon: 'phone';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    image: Schema.Attribute.Media<'images'>;
    isForm: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsOfficeLocation extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_office_locations';
  info: {
    displayName: 'office-location';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    country: Schema.Attribute.String;
    email: Schema.Attribute.String;
    fax: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    phone: Schema.Attribute.String;
  };
}

export interface ContactUsOfficeLocationList extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_office_location_lists';
  info: {
    displayName: 'office-location-list';
    icon: 'rotate';
  };
  attributes: {
    list: Schema.Attribute.Component<'contact-us.office-location', true>;
  };
}

export interface ContactUsOurOffice extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_our_offices';
  info: {
    displayName: 'our-office';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    country: Schema.Attribute.String;
    email: Schema.Attribute.String;
    enquiryText: Schema.Attribute.String;
    fax: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DemoPageBannerInfoDetail extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_banner_info_details';
  info: {
    displayName: 'banner-info-detail';
    icon: 'handHeart';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    info: Schema.Attribute.String;
    isDate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface DemoPageBuildDemo extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_build_demos';
  info: {
    displayName: 'build-demo';
    icon: 'apps';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    isSwap: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    item: Schema.Attribute.Relation<'oneToOne', 'api::book-demo.book-demo'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DemoPageDemoBannerInfo extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_banner_infos';
  info: {
    displayName: 'demo-banner-info';
    icon: 'chartBubble';
  };
  attributes: {
    details: Schema.Attribute.Component<'demo-page.banner-info-detail', true>;
    title: Schema.Attribute.String;
  };
}

export interface DemoPageDemoBannerList extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_banner_lists';
  info: {
    displayName: 'demo-banner-list';
    icon: 'cast';
  };
  attributes: {
    demoDetails: Schema.Attribute.Relation<
      'oneToOne',
      'api::book-demo.book-demo'
    >;
    list: Schema.Attribute.Component<'service.banner-section-data', true>;
  };
}

export interface DemoPageDemoDemonstration extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_demonstrations';
  info: {
    displayName: 'demo-demonstration';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    footer: Schema.Attribute.Component<'global.image-description', false>;
    isHasFooter: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'global.editor-descripiton', true>;
    title: Schema.Attribute.Text;
  };
}

export interface DemoPageDemoItem extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_items';
  info: {
    displayName: 'demo-item';
    icon: 'bulletList';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a Demo'>;
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface DemoPageDemoItemList extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_item_lists';
  info: {
    displayName: 'demo-item-list';
    icon: 'apps';
  };
  attributes: {
    item: Schema.Attribute.Relation<'oneToMany', 'api::book-demo.book-demo'>;
    title: Schema.Attribute.String;
  };
}

export interface DemoPageDemoList extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_lists';
  info: {
    displayName: 'demo-list';
    icon: 'bulletList';
  };
  attributes: {
    list: Schema.Attribute.Component<'demo-page.demo-item-list', true>;
  };
}

export interface DemoPageDemoOpportunity extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_opportunities';
  info: {
    displayName: 'demo-opportunity';
    icon: 'cup';
  };
  attributes: {
    arrowImage: Schema.Attribute.Media<'images'>;
    bannerImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<'global.custom-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface DemoPageDemoPartnership extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_partnerships';
  info: {
    displayName: 'demo-partnership';
    icon: 'collapse';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    isTwoPerRow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'case-study.partner', true>;
    title: Schema.Attribute.Text;
  };
}

export interface DemoPageDemoTimeDescripition extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_demo_time_descripitions';
  info: {
    displayName: 'demo-time-descripition';
    icon: 'apps';
  };
  attributes: {};
}

export interface DemoPageExpertsSection extends Struct.ComponentSchema {
  collectionName: 'components_demo_page_experts_sections';
  info: {
    displayName: 'experts-section';
  };
  attributes: {
    list: Schema.Attribute.Component<'page-componets.why-we-are-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface FormFieldsBookDemoForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_book_demo_forms';
  info: {
    displayName: 'book-demo-form';
    icon: 'television';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a Demo'>;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    organizationLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Organization'>;
    title: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Book a Demo'>;
  };
}

export interface FormFieldsCareer extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_careers';
  info: {
    displayName: 'career';
    icon: 'collapse';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Send'>;
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    departmentLabel: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Department'>;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    firstNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'First Name'>;
    lastNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Last Name'>;
    mobileLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Phone'>;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Phone'>;
    resumeLabel: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Resume'>;
    serviceLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select Service'>;
    technologyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select Technology'>;
  };
}

export interface FormFieldsCaseForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_case_forms';
  info: {
    displayName: 'case-form';
    icon: 'cloud';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Submit'>;
    downloadContent: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Message'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    organizationLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Organization'>;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Phone'>;
    title: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Case Form'>;
  };
}

export interface FormFieldsCloudForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_cloud_forms';
  info: {
    displayName: 'cloud-form';
    icon: 'eye';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    companyLabel: Schema.Attribute.String;
    firstNameLabel: Schema.Attribute.String;
    infrastructureLabel: Schema.Attribute.String;
    lastNameLabel: Schema.Attribute.String;
    migrationUrgencyLabel: Schema.Attribute.String;
    roleLabel: Schema.Attribute.String;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface FormFieldsContactUsForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_contact_us_forms';
  info: {
    displayName: 'contact-us-form';
    icon: 'collapse';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Send'>;
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    firstNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'First Name'>;
    lastNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Last Name'>;
    list: Schema.Attribute.Component<'global.custom-list', true>;
    messageLabel: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Message'>;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Phone'>;
    serviceLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select Service'>;
    technologyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select Technology'>;
  };
}

export interface FormFieldsFabconBookMeet extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_fabcon_book_meets';
  info: {
    displayName: 'fabcon-book-meet';
    icon: 'book';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    company: Schema.Attribute.String;
    email: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    message: Schema.Attribute.Text;
    timeSlot: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface FormFieldsForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_forms';
  info: {
    displayName: 'form';
    icon: 'collapse';
  };
  attributes: {
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
  };
}

export interface FormFieldsForresterReportDownload
  extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_forrester_report_downloads';
  info: {
    displayName: 'forrester-report-download';
    icon: 'dashboard';
  };
  attributes: {
    download: Schema.Attribute.String;
    emal: Schema.Attribute.String;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.String;
  };
}

export interface FormFieldsFreeConsultationForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_free_consultation_forms';
  info: {
    displayName: 'free-consultation-form';
    icon: 'chartBubble';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Submit'>;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    image: Schema.Attribute.Media<'images'>;
    locationLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Location'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Message'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    organizationLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Organization'>;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Phone'>;
    title: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Case Form'>;
  };
}

export interface FormFieldsIndustryForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_industry_forms';
  info: {
    displayName: 'industry-form';
    icon: 'connector';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    companyLabel: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    disclaimerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailLabel: Schema.Attribute.String;
    firstNameLabel: Schema.Attribute.String;
    lastNameLabel: Schema.Attribute.String;
    messageLabel: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    serviceLabel: Schema.Attribute.String;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface FormFieldsInsightReserveSpot extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_insight_reserve_spots';
  info: {
    displayName: 'insight-reserve-spot';
    icon: 'chartBubble';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    nameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full Name'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Phone Number'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormFieldsNewsRoomForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_news_room_forms';
  info: {
    displayName: 'news-room-form';
  };
  attributes: {
    emailLabel: Schema.Attribute.String;
    nameLabel: Schema.Attribute.String;
  };
}

export interface FormFieldsNewsletterSubscription
  extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_newsletter_subscriptions';
  info: {
    displayName: 'newsletter-subscription';
    icon: 'file';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    email: Schema.Attribute.String;
  };
}

export interface FormFieldsReserveSpotFields extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_reserve_spot_fields';
  info: {
    displayName: 'reserve-spot-fields';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Submit'>;
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    emailLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Email'>;
    nameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full Name'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Phone Number'>;
  };
}

export interface FormFieldsSapForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_sap_forms';
  info: {
    displayName: 'SAP-form';
    icon: 'eye';
  };
  attributes: {
    businessEmailLabel: Schema.Attribute.String;
    fullNameLabel: Schema.Attribute.String;
    messageLabel: Schema.Attribute.String;
    organizationLabel: Schema.Attribute.String;
    phoneNumberLabel: Schema.Attribute.String;
  };
}

export interface FormFieldsStreamlineForm extends Struct.ComponentSchema {
  collectionName: 'components_form_fields_streamline_forms';
  info: {
    displayName: 'sap-questionnaire-form';
    icon: 'cast';
  };
  attributes: {
    designationLabel: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    messageLabel: Schema.Attribute.Text;
    nameLabel: Schema.Attribute.String;
    question10Label: Schema.Attribute.Text;
    question11Label: Schema.Attribute.Text;
    question12Label: Schema.Attribute.Text;
    question1Label: Schema.Attribute.Text;
    question2Label: Schema.Attribute.Text;
    question3Label: Schema.Attribute.Text;
    question4Label: Schema.Attribute.Text;
    question5Label: Schema.Attribute.Text;
    question6Label: Schema.Attribute.Text;
    question7Label: Schema.Attribute.Text;
    question8Label: Schema.Attribute.Text;
    question9Label: Schema.Attribute.Text;
  };
}

export interface GlobalButton extends Struct.ComponentSchema {
  collectionName: 'components_global_buttons';
  info: {
    displayName: 'button';
    icon: 'chartBubble';
  };
  attributes: {
    isTargetNew: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalCustomList extends Struct.ComponentSchema {
  collectionName: 'components_global_custom_lists';
  info: {
    displayName: 'custom-list';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

export interface GlobalEditorDescripiton extends Struct.ComponentSchema {
  collectionName: 'components_global_editor_descripitons';
  info: {
    displayName: 'editor-descripiton';
    icon: 'connector';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface GlobalGlobalField extends Struct.ComponentSchema {
  collectionName: 'components_global_global_fields';
  info: {
    displayName: 'global-field';
    icon: 'refresh';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    bannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    design: Schema.Attribute.Enumeration<['image', 'video', 'bgcolor']>;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    mobile_image: Schema.Attribute.Media<'images'>;
    mobileVideo: Schema.Attribute.Media<'videos'>;
    subtitle: Schema.Attribute.String;
    subTitleTwo: Schema.Attribute.String;
    title: Schema.Attribute.Text;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GlobalImageDescription extends Struct.ComponentSchema {
  collectionName: 'components_global_image_descriptions';
  info: {
    displayName: 'image-description';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface GlobalLink extends Struct.ComponentSchema {
  collectionName: 'components_global_links';
  info: {
    displayName: 'link';
    icon: 'arrowLeft';
  };
  attributes: {
    link: Schema.Attribute.String;
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

export interface GlobalVideo extends Struct.ComponentSchema {
  collectionName: 'components_global_videos';
  info: {
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    link: Schema.Attribute.String;
    thumbnail: Schema.Attribute.Media<'images'>;
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
    href: Schema.Attribute.String;
    isButton: Schema.Attribute.Boolean;
    isHideMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    button: Schema.Attribute.Component<'global.button', false>;
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
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Schedule a Call'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    link: Schema.Attribute.String;
    title: Schema.Attribute.Text;
    topDescription: Schema.Attribute.Text;
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
    bottomButtonText: Schema.Attribute.String;
    bottomlink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isBottomButton: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    videoLink: Schema.Attribute.String;
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

export interface InsightSectionBlogSection extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_blog_sections';
  info: {
    displayName: 'blog-section';
    icon: 'command';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faq: Schema.Attribute.Component<'page-componets.faq-title', false>;
  };
}

export interface InsightSectionInsightList extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_insight_lists';
  info: {
    displayName: 'insight-list';
    icon: 'doctor';
  };
  attributes: {
    buttonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/insights'>;
    buttontext: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read All'>;
    list: Schema.Attribute.Relation<'oneToOne', 'api::insight.insight'>;
    title: Schema.Attribute.String;
  };
}

export interface InsightSectionPodcast extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_podcasts';
  info: {
    displayName: 'podcast';
  };
  attributes: {
    description: Schema.Attribute.Text;
    podcastLink: Schema.Attribute.String;
    podcastPlatForm: Schema.Attribute.Component<'global.link', true>;
    title: Schema.Attribute.Text;
  };
}

export interface InsightSectionPostWebinar extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_post_webinars';
  info: {
    displayName: 'post-webinar';
    icon: 'chartPie';
  };
  attributes: {
    dateText: Schema.Attribute.String;
    preSummary: Schema.Attribute.Component<
      'page-componets.why-we-are-list',
      false
    >;
    timeText: Schema.Attribute.String;
    webinarTime: Schema.Attribute.DateTime;
  };
}

export interface InsightSectionWebStories extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_web_stories';
  info: {
    displayName: 'web-stories';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface InsightSectionWebinar extends Struct.ComponentSchema {
  collectionName: 'components_insight_section_webinars';
  info: {
    displayName: 'webinar';
  };
  attributes: {
    buildData: Schema.Attribute.Component<
      'kor-cares.kor-care-build-data',
      false
    >;
    demonstrate: Schema.Attribute.Component<
      'page-componets.demonstrate-section',
      false
    >;
    expert: Schema.Attribute.Component<'demo-page.experts-section', false>;
    summary: Schema.Attribute.Component<'page-componets.faq', false>;
  };
}

export interface KorCaresAward extends Struct.ComponentSchema {
  collectionName: 'components_kor_cares_awards';
  info: {
    displayName: 'award';
    icon: 'code';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface KorCaresImpactDescription extends Struct.ComponentSchema {
  collectionName: 'components_kor_cares_impact_descriptions';
  info: {
    displayName: 'impact-description';
    icon: 'chartPie';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    roleDescription: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface KorCaresImpactHighlight extends Struct.ComponentSchema {
  collectionName: 'components_kor_cares_impact_highlights';
  info: {
    displayName: 'impact-highlight';
    icon: 'earth';
  };
  attributes: {
    list: Schema.Attribute.Component<'contact-us.contact-us-insight', true>;
    title: Schema.Attribute.String;
  };
}

export interface KorCaresKorCareBuildData extends Struct.ComponentSchema {
  collectionName: 'components_kor_cares_kor_care_build_data';
  info: {
    displayName: 'kor-care-build-data';
    icon: 'paperPlane';
  };
  attributes: {
    description: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    videoLink: Schema.Attribute.String;
  };
}

export interface KorCaresStraightSlider extends Struct.ComponentSchema {
  collectionName: 'components_kor_cares_straight_sliders';
  info: {
    displayName: 'straight-slider';
    icon: 'dashboard';
  };
  attributes: {
    isPerRowFive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'contact-us.contact-us-insight', true>;
    title: Schema.Attribute.String;
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
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
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
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
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
    link: Schema.Attribute.String;
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
    attachment: Schema.Attribute.Media<'images' | 'files'>;
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
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
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
    bgColor: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    footerLink: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    image: Schema.Attribute.Media<'images'>;
    isText: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    title: Schema.Attribute.String;
  };
}

export interface NewsAndEventBuildData extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_build_data';
  info: {
    displayName: 'build-data';
    icon: 'collapse';
  };
  attributes: {
    button: Schema.Attribute.Component<'global.button', false>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    listDescription: Schema.Attribute.Component<'global.custom-list', true>;
  };
}

export interface NewsAndEventColorCustomDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_color_custom_descriptions';
  info: {
    displayName: 'colour-custom-description';
  };
  attributes: {
    colour: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface NewsAndEventCompoundsNewsroom extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_compounds_newsrooms';
  info: {
    displayName: 'compounds-newsroom';
    icon: 'apps';
  };
  attributes: {
    heading: Schema.Attribute.Component<
      'news-and-event.news-title-description-only',
      false
    >;
    stretchableComponent: Schema.Attribute.Component<
      'page-componets.stretchable-section',
      false
    >;
    thirdSection: Schema.Attribute.Component<
      'news-and-event.news-list-description',
      false
    >;
  };
}

export interface NewsAndEventNewsBanner extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_banners';
  info: {
    displayName: 'news-banner';
    icon: 'archive';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    emailBody: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailSubject: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    formButtonText: Schema.Attribute.String;
    formDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    formImage: Schema.Attribute.Media<'images'>;
    formTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isForm: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sapForm: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    title: Schema.Attribute.Text;
    videoLink: Schema.Attribute.String;
  };
}

export interface NewsAndEventNewsDescriptionOnly
  extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_description_onlies';
  info: {
    displayName: 'news-description-only';
    icon: 'handHeart';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface NewsAndEventNewsEventList extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_event_lists';
  info: {
    displayName: 'news-event-list';
    icon: 'cast';
  };
  attributes: {};
}

export interface NewsAndEventNewsListDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_list_descriptions';
  info: {
    displayName: 'news-list-description';
    icon: 'chartBubble';
  };
  attributes: {
    list: Schema.Attribute.Component<
      'news-and-event.news-title-description-only',
      true
    >;
    title: Schema.Attribute.Text;
  };
}

export interface NewsAndEventNewsService extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_services';
  info: {
    displayName: 'news-service';
  };
  attributes: {
    button: Schema.Attribute.Component<'global.button', false>;
    heading: Schema.Attribute.Component<
      'news-and-event.news-title-description-only',
      false
    >;
    thirdSection: Schema.Attribute.Component<
      'news-and-event.news-list-description',
      false
    >;
  };
}

export interface NewsAndEventNewsTitleDescriptionOnly
  extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_news_title_description_onlies';
  info: {
    displayName: 'news-title-description-only';
    icon: 'code';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface NewsAndEventSimpleImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_simple_image_galleries';
  info: {
    displayName: 'simple-image-gallery';
    icon: 'layer';
  };
  attributes: {
    list: Schema.Attribute.Component<'home.opportunity-profile', true>;
  };
}

export interface NewsAndEventTestimonalList extends Struct.ComponentSchema {
  collectionName: 'components_news_and_event_testimonal_lists';
  info: {
    displayName: 'testimonal-list';
    icon: 'file';
  };
  attributes: {
    list: Schema.Attribute.Component<'case-study.testimonial-section', true>;
  };
}

export interface NotFoundNotFound extends Struct.ComponentSchema {
  collectionName: 'components_not_found_not_founds';
  info: {
    displayName: 'not-found';
    icon: 'typhoon';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsBankingFinancialBanner
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_banking_financial_banners';
  info: {
    displayName: 'banking-financial-Banner';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailBody: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailSubject: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    formDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    formImage: Schema.Attribute.Media<'images'>;
    formTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    imageMobile: Schema.Attribute.Media<'images'>;
    isForm: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isHasFooter: Schema.Attribute.Boolean;
    isTarget: Schema.Attribute.Boolean;
    list: Schema.Attribute.Component<'sub-page-componets.footer-list', true>;
    noofcolumns: Schema.Attribute.Enumeration<['col-span-4', 'col-span-3']>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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
    description: Schema.Attribute.Text;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    descriptionButtonLink: Schema.Attribute.String;
    descriptionButtonText: Schema.Attribute.String;
    descriptiontitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageCaption: Schema.Attribute.String;
    isBgGray: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isSwap: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTargetBlankDescription: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    mobileImage: Schema.Attribute.Media<'images'>;
    rightSection: Schema.Attribute.Component<
      'sub-page-componets.build-data-right-section',
      false
    >;
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

export interface PageComponetsCertificationsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_certifications_sections';
  info: {
    displayName: 'certifications-section';
    icon: 'shield';
  };
  attributes: {
    backgroundimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    partnerlogos: Schema.Attribute.Component<
      'page-componets.partner-logos',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsChecklistitems extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_checklistitems';
  info: {
    displayName: 'checklistitems';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
  };
}

export interface PageComponetsClientTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_client_testimonials';
  info: {
    displayName: 'client-testimonial';
    icon: 'calendar';
  };
  attributes: {
    subtext: Schema.Attribute.String;
    testimonials: Schema.Attribute.Component<
      'page-componets.testimonials',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsCloudAiPower extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_ai_powers';
  info: {
    displayName: 'cloud-ai-power';
    icon: 'eye';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-ai-power-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudBanner extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_banners';
  info: {
    displayName: 'cloud-banner';
    icon: 'cloud';
  };
  attributes: {
    bgColor: Schema.Attribute.String;
    buttonLinkOne: Schema.Attribute.String;
    buttonLinkTwo: Schema.Attribute.String;
    buttonTextOne: Schema.Attribute.String;
    buttonTextTwo: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTargetOne: Schema.Attribute.Boolean;
    isTargetTwo: Schema.Attribute.Boolean;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-banner-list',
      false
    >;
    mobileImage: Schema.Attribute.Media<'images'>;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudBuiltPeople extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_built_people';
  info: {
    displayName: 'cloud-built-people';
    icon: 'collapse';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-buil-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudFirstCall extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_first_calls';
  info: {
    displayName: 'cloud-first-call';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    listFive: Schema.Attribute.Component<
      'sub-page-componets.cloud-first-call-list',
      false
    >;
    listFour: Schema.Attribute.Component<
      'sub-page-componets.cloud-first-call-list',
      false
    >;
    listOne: Schema.Attribute.Component<
      'sub-page-componets.cloud-first-call-list',
      false
    >;
    listThree: Schema.Attribute.Component<
      'sub-page-componets.cloud-first-call-list',
      false
    >;
    listTwo: Schema.Attribute.Component<
      'sub-page-componets.cloud-first-call-list',
      false
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudKeyOfferings extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_key_offerings';
  info: {
    displayName: 'cloud-key-offerings';
    icon: 'scissors';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-offering-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudMigrationHandle
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_migration_handles';
  info: {
    displayName: 'cloud-migration-handle';
    icon: 'paperPlane';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-migration-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudOnePlatform extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_one_platforms';
  info: {
    displayName: 'cloud-one-platform';
    icon: 'chartBubble';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean;
    isVideoUrl: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mobileImage: Schema.Attribute.Media<'images'>;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    videoUrl: Schema.Attribute.String;
  };
}

export interface PageComponetsCloudReadinessReport
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_readiness_reports';
  info: {
    displayName: 'cloud-readiness-report';
    icon: 'check';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    isTarget: Schema.Attribute.Boolean;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudRecognition extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_recognitions';
  info: {
    displayName: 'cloud-recognition';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-recognition-list',
      true
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudTechnology extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_technologies';
  info: {
    displayName: 'cloud-technology';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.cloud-recognition-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCloudWarningSigns extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_cloud_warning_signs';
  info: {
    displayName: 'cloud-warning-signs';
    icon: 'expand';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.title-description',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsCombinedAboutCardSlider
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_combined_about_card_sliders';
  info: {
    displayName: 'combined-about-card-slider';
  };
  attributes: {
    digitalAbout: Schema.Attribute.Component<
      'page-componets.digital-about',
      false
    >;
    digitalCardSlider: Schema.Attribute.Component<
      'page-componets.digital-card-slider',
      false
    >;
  };
}

export interface PageComponetsCustomFooter extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_custom_footers';
  info: {
    displayName: 'custom-footer';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    list: Schema.Attribute.Component<'page-componets.custom-footer-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsCustomFooterList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_custom_footer_lists';
  info: {
    displayName: 'custom-footer-list';
  };
  attributes: {
    link: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    descripition: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    isPerRowThree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isSwap: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slides: Schema.Attribute.Component<'page-componets.dark-slider-card', true>;
  };
}

export interface PageComponetsDemonstrateCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_demonstrate_cards';
  info: {
    displayName: 'demonstrate-card';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore More'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    isTargetBlank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    list: Schema.Attribute.Component<'page-componets.demonstrate-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalAbout extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_abouts';
  info: {
    displayName: 'digital-about';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    badges: Schema.Attribute.Component<'sub-page-componets.badges', false>;
    countries: Schema.Attribute.Component<
      'sub-page-componets.digitial-countries',
      true
    >;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<
      'sub-page-componets.digitial-features',
      true
    >;
    noPadding: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    stats: Schema.Attribute.Component<
      'sub-page-componets.digitial-stats',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalAnalytics extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_analytics';
  info: {
    displayName: 'digital-analytics';
  };
  attributes: {
    bottomDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    heading1: Schema.Attribute.String;
    heading2: Schema.Attribute.String;
    list1: Schema.Attribute.Component<
      'page-componets.digital-analytics-list1',
      true
    >;
    list2: Schema.Attribute.Component<
      'page-componets.digital-analytics-list2',
      true
    >;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsDigitalAnalyticsList1
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_analytics_list1s';
  info: {
    displayName: 'digital-analytics-list1';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalAnalyticsList2
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_analytics_list2s';
  info: {
    displayName: 'digital-analytics-list2';
    icon: 'book';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface PageComponetsDigitalBenefits extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_benefits';
  info: {
    displayName: 'digital-benefits';
  };
  attributes: {
    isbgGrey: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'page-componets.digital-benifit-card',
      true
    >;
    noOfColumn: Schema.Attribute.Enumeration<
      [
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols--6',
      ]
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalBenifitCard
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_benifit_cards';
  info: {
    displayName: 'digital-benifit-card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalCard extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_cards';
  info: {
    displayName: 'digital-card';
    icon: 'filePdf';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<'page-componets.digital-card-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsDigitalCardList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_card_lists';
  info: {
    displayName: 'digital-card-list';
    icon: 'cloud';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsDigitalCardSlider extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_card_sliders';
  info: {
    displayName: 'digital-card-slider';
    icon: 'slideshow';
  };
  attributes: {
    list: Schema.Attribute.Component<
      'page-componets.digital-card-slider-list',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalCardSliderList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_card_slider_lists';
  info: {
    displayName: 'Digital-card-slider-list';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalErpList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_erp_lists';
  info: {
    displayName: 'digital-erp-list';
    icon: 'discuss';
  };
  attributes: {
    list1: Schema.Attribute.Component<'page-componets.erp-list', true>;
    list2: Schema.Attribute.Component<'page-componets.erp-list', true>;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
  };
}

export interface PageComponetsDigitalFullLifecycle
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_full_lifecycles';
  info: {
    displayName: 'digital-full-lifecycle';
    icon: 'crop';
  };
  attributes: {
    bottom: Schema.Attribute.Component<
      'page-componets.full-lifecycle-bottom',
      false
    >;
    mid: Schema.Attribute.Component<'page-componets.full-lifecycle-mid', false>;
    top: Schema.Attribute.Component<'page-componets.full-lifecycle-top', false>;
  };
}

export interface PageComponetsDigitalInspire extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_inspires';
  info: {
    displayName: 'digital-inspire';
    icon: 'collapse';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'page-componets.digital-inspire-list',
      true
    >;
    noPadding: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsDigitalInspireList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_inspire_lists';
  info: {
    displayName: 'digital-inspire-list';
    icon: 'calendar';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image1: Schema.Attribute.Media<'images'>;
    image2: Schema.Attribute.Media<'images'>;
    imageText: Schema.Attribute.String;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalServicesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_services_sections';
  info: {
    displayName: 'digital-services-section';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'page-componets.digital-services-section-list',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsDigitalServicesSectionList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_digital_services_section_lists';
  info: {
    displayName: 'Digital-services-section-list';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
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
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsErpList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_erp_lists';
  info: {
    displayName: 'erp-list';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsExportMigration extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_export_migrations';
  info: {
    displayName: 'export-migration';
    icon: 'cog';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    bgColor: Schema.Attribute.String;
    bgImage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconAbout extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_abouts';
  info: {
    displayName: 'fabcon-about';
    icon: 'earth';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2']>;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconAiPowered extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_ai_powereds';
  info: {
    displayName: 'fabcon-ai-powered';
    icon: 'collapse';
  };
  attributes: {
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    list: Schema.Attribute.Component<
      'page-componets.fabcon-ai-poweres-list',
      true
    >;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconAiPoweresList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_ai_poweres_lists';
  info: {
    displayName: 'fabcon-ai-powered-list';
    icon: 'crop';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconComposableIntelligence
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_composable_intelligences';
  info: {
    displayName: 'fabcon-composable-intelligence';
    icon: 'arrowUp';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    list: Schema.Attribute.Component<
      'page-componets.fabcon-composable-intelligence-list',
      true
    >;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconComposableIntelligenceList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_composable_intelligence_lists';
  info: {
    displayName: 'fabcon-composable-intelligence-list';
    icon: 'crop';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    mainImage: Schema.Attribute.Media<'images'>;
    subImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconDataAnalytics
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_data_analytics';
  info: {
    displayName: 'fabcon-data-analytics';
    icon: 'file';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    bottom: Schema.Attribute.Component<
      'page-componets.fabcon-data-analytics-bottom-list',
      true
    >;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2']>;
    mid: Schema.Attribute.Component<
      'page-componets.fabcon-data-analytics-mid',
      false
    >;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    top: Schema.Attribute.Component<
      'page-componets.fabcon-data-analytics-top-list',
      true
    >;
  };
}

export interface PageComponetsFabconDataAnalyticsBottomList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_data_analytics_bottom_lists';
  info: {
    displayName: 'fabcon-data-analytics-bottom-list';
    icon: 'expand';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconDataAnalyticsMid
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_data_analytics_mids';
  info: {
    displayName: 'fabcon-data-analytics-mid';
    icon: 'command';
  };
  attributes: {
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2']>;
    midList: Schema.Attribute.Component<
      'page-componets.fabcon-data-analytics-mid-list',
      true
    >;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconDataAnalyticsMidList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_data_analytics_mid_lists';
  info: {
    displayName: 'fabcon-data-analytics-mid-list';
    icon: 'crop';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    percentage: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconDataAnalyticsTopList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_data_analytics_top_lists';
  info: {
    displayName: 'fabcon-data-analytics-top-list';
    icon: 'crop';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconDecisionFabric
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_decision_fabrics';
  info: {
    displayName: 'fabcon-decision-fabric';
    icon: 'connector';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconFabricAiLeadership
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_fabric_ai_leaderships';
  info: {
    displayName: 'fabcon-fabric-ai-leadership';
    icon: 'globe';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    list: Schema.Attribute.Component<
      'page-componets.fabcon-fabric-ai-leadership-list',
      true
    >;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconFabricAiLeadershipList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_fabric_ai_leadership_lists';
  info: {
    displayName: 'fabcon-fabric-ai-leadership-list';
    icon: 'crop';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconFabricCommunityConference
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_fabric_community_conferences';
  info: {
    displayName: 'fabcon-fabric-community-conference';
    icon: 'cast';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    date: Schema.Attribute.Text;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2']>;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    location: Schema.Attribute.String;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconLedTransformation
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_led_transformations';
  info: {
    displayName: 'fabcon-led-transformation';
    icon: 'filter';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'page-componets.fabcon-led-transformation-list',
      true
    >;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.Text;
  };
}

export interface PageComponetsFabconLedTransformationList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_led_transformation_lists';
  info: {
    displayName: 'fabcon-led-transformation-list';
    icon: 'crop';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFabconSmartForge extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_fabcon_smart_forges';
  info: {
    displayName: 'fabcon-smart-forge';
    icon: 'eye';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    fabconColor: Schema.Attribute.Enumeration<['title1', 'title2', 'title3']>;
    image: Schema.Attribute.Media<'images'>;
    isVideoLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title1: Schema.Attribute.Text;
    title2: Schema.Attribute.Text;
    title3: Schema.Attribute.String;
    videoLink: Schema.Attribute.String;
  };
}

export interface PageComponetsFaq extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_faqs';
  info: {
    displayName: 'faq';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isHasCustomList: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'global.title-descripiton', true>;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    faq: Schema.Attribute.Component<'page-componets.faq', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsFootergridlist extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_footergridlists';
  info: {
    displayName: 'footergridlist';
  };
  attributes: {
    footerdescription: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface PageComponetsFullLifecycleBottom
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_bottoms';
  info: {
    displayName: 'full-lifecycle-bottom';
  };
  attributes: {
    bottomCard: Schema.Attribute.Component<
      'page-componets.full-lifecycle-bottom-card',
      true
    >;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsFullLifecycleBottomCard
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_bottom_cards';
  info: {
    displayName: 'full-lifecycle-bottom-card';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface PageComponetsFullLifecycleMid extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_mids';
  info: {
    displayName: 'full-lifecycle-mid';
  };
  attributes: {
    midList1: Schema.Attribute.Component<
      'page-componets.full-lifecycle-mid-list1',
      true
    >;
    midList2: Schema.Attribute.Component<
      'page-componets.full-lifecycle-bottom-card',
      true
    >;
  };
}

export interface PageComponetsFullLifecycleMidList1
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_mid_list1s';
  info: {
    displayName: 'full-lifecycle-mid-list1';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsFullLifecycleTop extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_tops';
  info: {
    displayName: 'full-lifecycle-top';
  };
  attributes: {
    title: Schema.Attribute.Text;
    topList: Schema.Attribute.Component<
      'page-componets.full-lifecycle-top-list',
      true
    >;
  };
}

export interface PageComponetsFullLifecycleTopList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_full_lifecycle_top_lists';
  info: {
    displayName: 'full-lifecycle-top-list';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsGramBanner extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_gram_banners';
  info: {
    displayName: 'gram-banner';
    icon: 'chartPie';
  };
  attributes: {
    buttonLink: Schema.Attribute.Text;
    buttonText: Schema.Attribute.Text;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    footerButtonLink: Schema.Attribute.String;
    FooterbuttonText: Schema.Attribute.String;
    footerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    footerHeading: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageList: Schema.Attribute.Component<
      'sub-page-componets.image-list',
      true
    >;
    isCustomList: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isDescriptionLeft: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isFooter: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isImageSlider: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTargetBlank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTitleLeft: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'sub-page-componets.gram-banner-list',
      true
    >;
    mobileImage: Schema.Attribute.Media<'images'>;
    theme: Schema.Attribute.Enumeration<['default', 'dark', 'light', 'blank']>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsGridSystem extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_grid_systems';
  info: {
    displayName: 'grid-system';
    icon: 'dashboard';
  };
  attributes: {
    centerdescription: Schema.Attribute.Blocks;
    centericon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    centertitle: Schema.Attribute.Text;
    description: Schema.Attribute.Blocks;
    footergridlist: Schema.Attribute.Component<
      'page-componets.footergridlist',
      true
    >;
    footertext: Schema.Attribute.Text;
    griditemlist: Schema.Attribute.Component<
      'page-componets.griditemlist',
      true
    >;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsGriddetails extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_griddetails';
  info: {
    displayName: 'griddetails';
  };
  attributes: {
    buttonLink: Schema.Attribute.Text;
    buttonText: Schema.Attribute.Text;
    checklistitems: Schema.Attribute.Component<
      'page-componets.checklistitems',
      true
    >;
    griddescription: Schema.Attribute.Blocks;
    gridtitle: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface PageComponetsGriditemlist extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_griditemlists';
  info: {
    displayName: 'griditemlist';
  };
  attributes: {
    griddescription: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    listitems: Schema.Attribute.Component<'page-componets.listitems', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsGridlist extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_gridlists';
  info: {
    displayName: 'gridlist';
  };
  attributes: {
    griddetails: Schema.Attribute.Component<'page-componets.griddetails', true>;
    number: Schema.Attribute.BigInteger;
    steptitle: Schema.Attribute.Text;
  };
}

export interface PageComponetsGridlisting extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_gridlistings';
  info: {
    displayName: 'gridlisting';
    icon: 'landscape';
  };
  attributes: {
    buttontext: Schema.Attribute.String;
    buttonurl: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface PageComponetsIndustryBuildData extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_industry_build_data';
  info: {
    displayName: 'industry-build-data';
    icon: 'paperPlane';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean;
    mobileImage: Schema.Attribute.Media<'images', true>;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsIndustryFeaturedContent
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_industry_featured_contents';
  info: {
    displayName: 'industry-featured-content';
    icon: 'exit';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isButtonHeading: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'sub-page-componets.industry-featured-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsIndustryIntelligentExperience
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_industry_intelligent_experiences';
  info: {
    displayName: 'industry-intelligent-experience';
    icon: 'alien';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.industry-experience-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsIndustryServicePortfolio
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_industry_service_portfolios';
  info: {
    displayName: 'industry-service-portfolio';
    icon: 'fileError';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean;
    list: Schema.Attribute.Component<
      'sub-page-componets.industry-service-list',
      false
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsIndustrySolutionSpotlight
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_industry_solution_spotlights';
  info: {
    displayName: 'industry-solution-spotlight';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.industry-spotlight-list',
      true
    >;
    subHeading: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface PageComponetsInsightsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_insights_sections';
  info: {
    displayName: 'insights-section';
    icon: 'book';
  };
  attributes: {
    buttonLink: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    buttontext: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read All'>;
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
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    isAlignCenter: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTargetBlank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
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
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    link: Schema.Attribute.String;
    list: Schema.Attribute.Component<
      'page-componets.inspire-section-card',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 8;
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
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Know More'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    position: Schema.Attribute.Enumeration<['bottom', 'top', 'topAbove']>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsKeyMetricsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_key_metrics_sections';
  info: {
    displayName: 'key-metrics-section';
    icon: 'apps';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    listLeft: Schema.Attribute.Component<'page-componets.list-left', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsKpiPartner extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_kpi_partners';
  info: {
    displayName: 'kpi-partner';
  };
  attributes: {
    items: Schema.Attribute.Component<'page-componets.kpi-partner-items', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsKpiPartnerItems extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_kpi_partner_items';
  info: {
    displayName: 'kpi-partner-items';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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

export interface PageComponetsListLeft extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_list_lefts';
  info: {
    displayName: 'listLeft';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsListbox extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_listboxes';
  info: {
    displayName: 'listbox';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsListitems extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_listitems';
  info: {
    displayName: 'listitems';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    listdescription: Schema.Attribute.Blocks;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsMicrosoftGoldCertified
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_microsoft_gold_certifieds';
  info: {
    displayName: 'microsoft-gold-certified';
    icon: 'code';
  };
  attributes: {
    card1: Schema.Attribute.Component<
      'page-componets.microsoft-gold-certified-card1',
      false
    >;
    card2: Schema.Attribute.Component<
      'page-componets.microsoft-gold-certified-card2',
      false
    >;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsMicrosoftGoldCertifiedCard1
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_microsoft_gold_certified_card1s';
  info: {
    displayName: 'microsoft-gold-certified-card1';
    icon: 'command';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsMicrosoftGoldCertifiedCard2
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_microsoft_gold_certified_card2s';
  info: {
    displayName: 'microsoft-gold-certified-card2';
    icon: 'command';
  };
  attributes: {
    buttonImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
    title3: Schema.Attribute.String;
  };
}

export interface PageComponetsMidFabconDataAnalytics
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_mid_fabcon_data_analytics';
  info: {
    displayName: 'mid-fabcon-data-analytics';
    icon: 'crop';
  };
  attributes: {};
}

export interface PageComponetsMidmarketEnterprises
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_midmarket_enterprises';
  info: {
    displayName: 'midmarket-enterprises';
    icon: 'clock';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    backgroundImage: Schema.Attribute.Media<'images'>;
    isBackground: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'page-componets.midmarket-enterprises-list',
      true
    >;
    noOfColumn: Schema.Attribute.Enumeration<
      [
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols--6',
      ]
    >;
    title: Schema.Attribute.String;
    topDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    topTitle: Schema.Attribute.String;
  };
}

export interface PageComponetsMidmarketEnterprisesList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_midmarket_enterprises_lists';
  info: {
    displayName: 'midmarket-enterprises-list';
    icon: 'crop';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsPartnerLogos extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_partner_logos';
  info: {
    displayName: 'partner-logos';
    icon: 'cast';
  };
  attributes: {
    logoimage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface PageComponetsPricingSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_pricing_sections';
  info: {
    description: 'Pricing section with title, subtitle and multiple pricing plans';
    displayName: 'pricing-section';
    icon: 'dollar-sign';
  };
  attributes: {
    plans: Schema.Attribute.Component<'sub-page-componets.pricing-plan', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponetsRequestConsultation
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_request_consultations';
  info: {
    displayName: 'request-consultation';
    icon: 'calendar';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    subtext: Schema.Attribute.String;
    title: Schema.Attribute.String;
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

export interface PageComponetsSapImplementation extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_implementations';
  info: {
    displayName: 'sap-implementation';
    icon: 'alien';
  };
  attributes: {
    list: Schema.Attribute.Component<'sub-page-componets.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSapPracticeAreas extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_practice_areas';
  info: {
    displayName: 'sap-practice-areas';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    gridlisting: Schema.Attribute.Component<'page-componets.gridlisting', true>;
    subtext: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSapQuestionnaire extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_questionnaires';
  info: {
    displayName: 'sap-questionnaire';
    icon: 'filter';
  };
  attributes: {
    sap_questionnaire_form_label: Schema.Attribute.Relation<
      'oneToOne',
      'api::streamline-form-label.streamline-form-label'
    >;
    title: Schema.Attribute.String;
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
    image3: Schema.Attribute.Media<'images'>;
    imageSection: Schema.Attribute.Component<
      'page-componets.sap-image-section',
      false
    >;
    isItemOnly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isSecoundImage: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    item: Schema.Attribute.Component<'page-componets.card', true>;
    itemDescription: Schema.Attribute.Text;
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

export interface PageComponetsSapWhyKorcomptenz extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_sap_why_korcomptenzs';
  info: {
    displayName: 'sap-why-korcomptenz';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    introimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    listbox: Schema.Attribute.Component<'page-componets.listbox', true>;
    subtext: Schema.Attribute.String;
    title: Schema.Attribute.String;
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

export interface PageComponetsSliderServiceSection
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_slider_service_sections';
  info: {
    displayName: 'slider-service-section';
  };
  attributes: {
    tablist: Schema.Attribute.Component<'sub-page-componets.tab-list', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSmartForgeBuild extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_smart_forge_builds';
  info: {
    displayName: 'smart-forge-build';
    icon: 'cast';
  };
  attributes: {
    list: Schema.Attribute.Component<
      'page-componets.smart-forge-build-list',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsSmartForgeBuildList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_smart_forge_build_lists';
  info: {
    displayName: 'Smart-forge-build-list';
    icon: 'crop';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsSmartForgeEnterprises
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_smart_forge_enterprises';
  info: {
    displayName: 'smart-forge-enterprises';
    icon: 'file';
  };
  attributes: {
    list: Schema.Attribute.Component<
      'page-componets.smart-forge-build-list',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsSmartForgeOperationalRoadblock
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_smart_forge_operational_roadblocks';
  info: {
    displayName: 'smart-forge-operational-roadblock';
  };
  attributes: {
    isBgGrey: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<
      'page-componets.smart-forge-operational-roadblock-list',
      true
    >;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsSmartForgeOperationalRoadblockList
  extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_smart_forge_operational_roadblock_lists';
  info: {
    displayName: 'smartForge-operational-roadblock-list';
    icon: 'cloud';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    number: Schema.Attribute.Integer;
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
    isTargetBlank: Schema.Attribute.Boolean;
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

export interface PageComponetsStepGridSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_step_grid_sections';
  info: {
    displayName: 'step-grid-section';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    gridlist: Schema.Attribute.Component<'page-componets.gridlist', true>;
    highlighttext: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
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
    link: Schema.Attribute.String;
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
    link: Schema.Attribute.String;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    IsVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    position: Schema.Attribute.Enumeration<['corner', 'main', 'side']> &
      Schema.Attribute.DefaultTo<'corner'>;
    secondaryDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    isTargetBlank: Schema.Attribute.Boolean;
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
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
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    list: Schema.Attribute.Component<'page-componets.stretchable-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsTabSection extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_tab_sections';
  info: {
    displayName: 'tab-section';
    icon: 'dashboard';
  };
  attributes: {
    highlighttext: Schema.Attribute.Text;
    tablist: Schema.Attribute.Component<'page-componets.tablist', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsTablist extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_tablists';
  info: {
    displayName: 'tablist';
  };
  attributes: {
    tablistdetails: Schema.Attribute.Component<
      'page-componets.tablistdeatils',
      true
    >;
    tabtitle: Schema.Attribute.Text;
  };
}

export interface PageComponetsTablistdeatils extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_tablistdeatils';
  info: {
    displayName: 'tablistdeatils';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.Text;
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

export interface PageComponetsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    clientname: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    designation: Schema.Attribute.String;
    star: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsWhatToExpect extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_what_to_expects';
  info: {
    displayName: 'what-to-expect';
    icon: 'book';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    gridlisting: Schema.Attribute.Component<
      'page-componets.whygridlisting',
      true
    >;
    subtext: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageComponetsWhyWeAre extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_why_we_ares';
  info: {
    displayName: 'why-we-are';
    icon: 'briefcase';
  };
  attributes: {
    colSpan: Schema.Attribute.Enumeration<['grid-cols-3', 'grid-cols-4']>;
    description: Schema.Attribute.Text;
    isBgGray: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPerRowFive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'page-componets.why-we-are-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsWhyWeAreList extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_why_we_are_lists';
  info: {
    displayName: 'why-we-are-list';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.Text;
  };
}

export interface PageComponetsWhygridlisting extends Struct.ComponentSchema {
  collectionName: 'components_page_componets_whygridlistings';
  info: {
    displayName: 'whygridlisting';
    icon: 'apps';
  };
  attributes: {
    buttontext: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read More'>;
    buttonurl: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
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
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceBannerSectionData extends Struct.ComponentSchema {
  collectionName: 'components_service_banner_section_data';
  info: {
    displayName: 'Banner-section-data';
  };
  attributes: {
    bannerCaption: Schema.Attribute.Text;
    bannerH1Tag: Schema.Attribute.String;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contact us'>;
    customFooter: Schema.Attribute.Component<
      'page-componets.custom-footer',
      false
    >;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailBody: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    emailSubject: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    footer: Schema.Attribute.Component<'case-study.partner', false>;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    formDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    formImage: Schema.Attribute.Media<'images'>;
    formTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    imageMobile: Schema.Attribute.Media<'images'>;
    isCustomFooter: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isForm: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isHasFooter: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isListPage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    logoMobile: Schema.Attribute.Media<'images'>;
    secondButton: Schema.Attribute.String;
    secondLink: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsBadges extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_badges';
  info: {
    displayName: 'badges';
  };
  attributes: {
    badge1: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    badge2: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SubPageComponetsBuildDataRightSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_build_data_right_sections';
  info: {
    displayName: 'build-data-right-section';
    icon: 'chartPie';
  };
  attributes: {
    content: Schema.Attribute.Enumeration<
      ['image', 'description', 'form', 'video', 'customDescription']
    >;
    customDescription: Schema.Attribute.Component<'global.custom-list', true>;
    customDescriptionImage: Schema.Attribute.Media<'images'>;
    customTitle: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    isBgGray: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    responsiveImage: Schema.Attribute.Component<
      'sub-page-componets.responsive-image',
      false
    >;
    videoButtonText: Schema.Attribute.String;
    videoLink: Schema.Attribute.String;
  };
}

export interface SubPageComponetsCloudAiPowerList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_ai_power_lists';
  info: {
    displayName: 'cloud-ai-power-list';
    icon: 'shirt';
  };
  attributes: {
    bgColor: Schema.Attribute.String;
    bgImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean;
    subList: Schema.Attribute.Component<
      'sub-page-componets.title-description',
      true
    >;
    tabTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudBannerList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_banner_lists';
  info: {
    displayName: 'cloud-banner-list';
    icon: 'envelop';
  };
  attributes: {
    subList: Schema.Attribute.Component<
      'sub-page-componets.title-description',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsCloudBuilList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_buil_lists';
  info: {
    displayName: 'cloud-buil-list';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    message: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    roleSubtitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    roleTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudFirstCallList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_first_call_lists';
  info: {
    displayName: 'cloud-first-call-list';
    icon: 'filter';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    duration: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudMigrationList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_migration_lists';
  info: {
    displayName: 'cloud-migration-list';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    disclaimer: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    subList: Schema.Attribute.Component<
      'sub-page-componets.cloud-migration-sublist',
      true
    >;
    tabTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudMigrationSublist
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_migration_sublists';
  info: {
    displayName: 'cloud-migration-sublist';
    icon: 'bell';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudOfferingList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_offering_lists';
  info: {
    displayName: 'cloud-offering-list';
    icon: 'star';
  };
  attributes: {
    subList: Schema.Attribute.Component<
      'sub-page-componets.cloud-offering-sublist',
      true
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudOfferingSublist
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_offering_sublists';
  info: {
    displayName: 'cloud-offering-sublist';
    icon: 'filePdf';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsCloudRecognitionList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_cloud_recognition_lists';
  info: {
    displayName: 'cloud-recognition-list';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTitleDescription: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsDescription extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_descriptions';
  info: {
    displayName: 'description';
    icon: 'cog';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsDigitialCountries
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_digitial_countries';
  info: {
    displayName: 'digitial-countries';
  };
  attributes: {
    flag: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    label: Schema.Attribute.String;
  };
}

export interface SubPageComponetsDigitialFeatures
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_digitial_features';
  info: {
    displayName: 'digitial-features';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SubPageComponetsDigitialStats extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_digitial_stats';
  info: {
    displayName: 'digitial-stats';
  };
  attributes: {
    label: Schema.Attribute.Text;
    value: Schema.Attribute.String;
  };
}

export interface SubPageComponetsFooterList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_footer_lists';
  info: {
    displayName: 'footerList';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsGramBannerList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_gram_banner_lists';
  info: {
    displayName: 'gram-banner-list';
    icon: 'cloud';
  };
  attributes: {
    item: Schema.Attribute.Component<'global.custom-list', true>;
    title: Schema.Attribute.Text;
  };
}

export interface SubPageComponetsImageList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_image_lists';
  info: {
    displayName: 'imageList';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    mobileImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SubPageComponetsIndustryExperienceList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_experience_lists';
  info: {
    displayName: 'industry-experience-list';
    icon: 'cloud';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean;
    linkType: Schema.Attribute.Enumeration<['Third Party', 'Download']>;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsIndustryFeaturedList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_featured_lists';
  info: {
    displayName: 'industry-featured-list';
    icon: 'crown';
  };
  attributes: {
    bgColor: Schema.Attribute.String;
    bgImage: Schema.Attribute.Media<'images'>;
    buttonColor: Schema.Attribute.Enumeration<
      ['Primary', 'White', 'Blue', 'Black']
    >;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isBgImage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isFirstCard: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTarget: Schema.Attribute.Boolean;
    linkType: Schema.Attribute.Enumeration<
      ['Third Party', 'Download', 'Video']
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsIndustryServiceBullets
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_service_bullets';
  info: {
    displayName: 'industry-service-bullets';
    icon: 'feather';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    isTarget: Schema.Attribute.Boolean;
    link: Schema.Attribute.String;
  };
}

export interface SubPageComponetsIndustryServiceList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_service_lists';
  info: {
    displayName: 'industry-service-list';
    icon: 'filter';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    list: Schema.Attribute.Component<
      'sub-page-componets.industry-service-sublist',
      true
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsIndustryServiceSublist
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_service_sublists';
  info: {
    displayName: 'industry-service-sublist';
    icon: 'cloud';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    subList: Schema.Attribute.Component<
      'sub-page-componets.title-multi-description',
      false
    >;
    tabTitle: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsIndustrySpotlightList
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_industry_spotlight_lists';
  info: {
    displayName: 'industry-spotlight-list';
    icon: 'cog';
  };
  attributes: {
    bgColor: Schema.Attribute.String;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    isTarget: Schema.Attribute.Boolean;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    sublist: Schema.Attribute.Component<'sub-page-componets.sub-list', true>;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsPricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_pricing_plans';
  info: {
    description: 'Individual pricing plan card';
    displayName: 'pricing-plan';
  };
  attributes: {
    billing: Schema.Attribute.String;
    button: Schema.Attribute.Component<'global.button', false>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal;
  };
}

export interface SubPageComponetsResponsiveImage
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_responsive_images';
  info: {
    displayName: 'responsive-image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageLink: Schema.Attribute.String;
    isTarget: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mobileImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SubPageComponetsSubList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_sub_lists';
  info: {
    displayName: 'sub-list';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsSublist extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_sublists';
  info: {
    displayName: 'sublist';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsTabList extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_tab_lists';
  info: {
    displayName: 'tabList';
  };
  attributes: {
    sublist: Schema.Attribute.Component<'sub-page-componets.sublist', true>;
    title: Schema.Attribute.String;
  };
}

export interface SubPageComponetsTitleDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_title_descriptions';
  info: {
    displayName: 'title-description';
    icon: 'feather';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SubPageComponetsTitleMultiDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_sub_page_componets_title_multi_descriptions';
  info: {
    displayName: 'title-multi-description';
    icon: 'code';
  };
  attributes: {
    descriptionList: Schema.Attribute.Component<
      'sub-page-componets.industry-service-bullets',
      true
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.achievement-column': AboutUsAchievementColumn;
      'about-us.achievement-list': AboutUsAchievementList;
      'about-us.achievement-section': AboutUsAchievementSection;
      'about-us.content-showcase-section-card': AboutUsContentShowcaseSectionCard;
      'about-us.content-showcase-section-list': AboutUsContentShowcaseSectionList;
      'about-us.map-section-card': AboutUsMapSectionCard;
      'about-us.map-section-list': AboutUsMapSectionList;
      'about-us.media-slider': AboutUsMediaSlider;
      'about-us.media-slider-section': AboutUsMediaSliderSection;
      'about-us.our-story': AboutUsOurStory;
      'about-us.our-story-list': AboutUsOurStoryList;
      'about-us.people-showcase-card': AboutUsPeopleShowcaseCard;
      'about-us.people-showcase-list': AboutUsPeopleShowcaseList;
      'about-us.stats-section': AboutUsStatsSection;
      'about-us.stats-section-card': AboutUsStatsSectionCard;
      'career.career-build-data': CareerCareerBuildData;
      'career.mansonry-gallery': CareerMansonryGallery;
      'career.mansonry-gallery-col': CareerMansonryGalleryCol;
      'career.mansonry-gallery-section': CareerMansonryGallerySection;
      'career.open-jobs': CareerOpenJobs;
      'case-study.banner': CaseStudyBanner;
      'case-study.banner-image': CaseStudyBannerImage;
      'case-study.case-study-domain-data': CaseStudyCaseStudyDomainData;
      'case-study.case-study-form': CaseStudyCaseStudyForm;
      'case-study.case-study-sticky-cards-list': CaseStudyCaseStudyStickyCardsList;
      'case-study.customer': CaseStudyCustomer;
      'case-study.customer-value': CaseStudyCustomerValue;
      'case-study.description-section': CaseStudyDescriptionSection;
      'case-study.filter-label': CaseStudyFilterLabel;
      'case-study.hero-section': CaseStudyHeroSection;
      'case-study.partner': CaseStudyPartner;
      'case-study.partner-section': CaseStudyPartnerSection;
      'case-study.popular-filter': CaseStudyPopularFilter;
      'case-study.popular-filter-list': CaseStudyPopularFilterList;
      'case-study.related-case-study': CaseStudyRelatedCaseStudy;
      'case-study.related-offerings': CaseStudyRelatedOfferings;
      'case-study.right-section': CaseStudyRightSection;
      'case-study.sponser-card': CaseStudySponserCard;
      'case-study.testimonial-section': CaseStudyTestimonialSection;
      'contact-us.contact-us-form-section': ContactUsContactUsFormSection;
      'contact-us.contact-us-from-left-section-list': ContactUsContactUsFromLeftSectionList;
      'contact-us.contact-us-insight': ContactUsContactUsInsight;
      'contact-us.contact-us-insight-list': ContactUsContactUsInsightList;
      'contact-us.fixed-section': ContactUsFixedSection;
      'contact-us.logo-slider': ContactUsLogoSlider;
      'contact-us.logo-slider-list': ContactUsLogoSliderList;
      'contact-us.news-letter': ContactUsNewsLetter;
      'contact-us.office-location': ContactUsOfficeLocation;
      'contact-us.office-location-list': ContactUsOfficeLocationList;
      'contact-us.our-office': ContactUsOurOffice;
      'demo-page.banner-info-detail': DemoPageBannerInfoDetail;
      'demo-page.build-demo': DemoPageBuildDemo;
      'demo-page.demo-banner-info': DemoPageDemoBannerInfo;
      'demo-page.demo-banner-list': DemoPageDemoBannerList;
      'demo-page.demo-demonstration': DemoPageDemoDemonstration;
      'demo-page.demo-item': DemoPageDemoItem;
      'demo-page.demo-item-list': DemoPageDemoItemList;
      'demo-page.demo-list': DemoPageDemoList;
      'demo-page.demo-opportunity': DemoPageDemoOpportunity;
      'demo-page.demo-partnership': DemoPageDemoPartnership;
      'demo-page.demo-time-descripition': DemoPageDemoTimeDescripition;
      'demo-page.experts-section': DemoPageExpertsSection;
      'form-fields.book-demo-form': FormFieldsBookDemoForm;
      'form-fields.career': FormFieldsCareer;
      'form-fields.case-form': FormFieldsCaseForm;
      'form-fields.cloud-form': FormFieldsCloudForm;
      'form-fields.contact-us-form': FormFieldsContactUsForm;
      'form-fields.fabcon-book-meet': FormFieldsFabconBookMeet;
      'form-fields.form': FormFieldsForm;
      'form-fields.forrester-report-download': FormFieldsForresterReportDownload;
      'form-fields.free-consultation-form': FormFieldsFreeConsultationForm;
      'form-fields.industry-form': FormFieldsIndustryForm;
      'form-fields.insight-reserve-spot': FormFieldsInsightReserveSpot;
      'form-fields.news-room-form': FormFieldsNewsRoomForm;
      'form-fields.newsletter-subscription': FormFieldsNewsletterSubscription;
      'form-fields.reserve-spot-fields': FormFieldsReserveSpotFields;
      'form-fields.sap-form': FormFieldsSapForm;
      'form-fields.streamline-form': FormFieldsStreamlineForm;
      'global.button': GlobalButton;
      'global.custom-list': GlobalCustomList;
      'global.editor-descripiton': GlobalEditorDescripiton;
      'global.global-field': GlobalGlobalField;
      'global.image-description': GlobalImageDescription;
      'global.link': GlobalLink;
      'global.policy': GlobalPolicy;
      'global.social-platform': GlobalSocialPlatform;
      'global.title-descripiton': GlobalTitleDescripiton;
      'global.video': GlobalVideo;
      'home.header': HomeHeader;
      'home.hero-section-one': HomeHeroSectionOne;
      'home.nav-item': HomeNavItem;
      'home.opportunity': HomeOpportunity;
      'home.opportunity-profile': HomeOpportunityProfile;
      'home.schedule-call': HomeScheduleCall;
      'home.services-section': HomeServicesSection;
      'home.services-section-list': HomeServicesSectionList;
      'home.we-are-korcomptenz': HomeWeAreKorcomptenz;
      'insight-section.blog-section': InsightSectionBlogSection;
      'insight-section.insight-list': InsightSectionInsightList;
      'insight-section.podcast': InsightSectionPodcast;
      'insight-section.post-webinar': InsightSectionPostWebinar;
      'insight-section.web-stories': InsightSectionWebStories;
      'insight-section.webinar': InsightSectionWebinar;
      'kor-cares.award': KorCaresAward;
      'kor-cares.impact-description': KorCaresImpactDescription;
      'kor-cares.impact-highlight': KorCaresImpactHighlight;
      'kor-cares.kor-care-build-data': KorCaresKorCareBuildData;
      'kor-cares.straight-slider': KorCaresStraightSlider;
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
      'news-and-event.build-data': NewsAndEventBuildData;
      'news-and-event.color-custom-description': NewsAndEventColorCustomDescription;
      'news-and-event.compounds-newsroom': NewsAndEventCompoundsNewsroom;
      'news-and-event.news-banner': NewsAndEventNewsBanner;
      'news-and-event.news-description-only': NewsAndEventNewsDescriptionOnly;
      'news-and-event.news-event-list': NewsAndEventNewsEventList;
      'news-and-event.news-list-description': NewsAndEventNewsListDescription;
      'news-and-event.news-service': NewsAndEventNewsService;
      'news-and-event.news-title-description-only': NewsAndEventNewsTitleDescriptionOnly;
      'news-and-event.simple-image-gallery': NewsAndEventSimpleImageGallery;
      'news-and-event.testimonal-list': NewsAndEventTestimonalList;
      'not-found.not-found': NotFoundNotFound;
      'page-componets.banking-financial-banner': PageComponetsBankingFinancialBanner;
      'page-componets.banner-section-list': PageComponetsBannerSectionList;
      'page-componets.benefit-data': PageComponetsBenefitData;
      'page-componets.benifit-cards': PageComponetsBenifitCards;
      'page-componets.build-data': PageComponetsBuildData;
      'page-componets.build-datas': PageComponetsBuildDatas;
      'page-componets.card': PageComponetsCard;
      'page-componets.certifications-section': PageComponetsCertificationsSection;
      'page-componets.checklistitems': PageComponetsChecklistitems;
      'page-componets.client-testimonial': PageComponetsClientTestimonial;
      'page-componets.cloud-ai-power': PageComponetsCloudAiPower;
      'page-componets.cloud-banner': PageComponetsCloudBanner;
      'page-componets.cloud-built-people': PageComponetsCloudBuiltPeople;
      'page-componets.cloud-first-call': PageComponetsCloudFirstCall;
      'page-componets.cloud-key-offerings': PageComponetsCloudKeyOfferings;
      'page-componets.cloud-migration-handle': PageComponetsCloudMigrationHandle;
      'page-componets.cloud-one-platform': PageComponetsCloudOnePlatform;
      'page-componets.cloud-readiness-report': PageComponetsCloudReadinessReport;
      'page-componets.cloud-recognition': PageComponetsCloudRecognition;
      'page-componets.cloud-technology': PageComponetsCloudTechnology;
      'page-componets.cloud-warning-signs': PageComponetsCloudWarningSigns;
      'page-componets.combined-about-card-slider': PageComponetsCombinedAboutCardSlider;
      'page-componets.custom-footer': PageComponetsCustomFooter;
      'page-componets.custom-footer-list': PageComponetsCustomFooterList;
      'page-componets.dark-slider-card': PageComponetsDarkSliderCard;
      'page-componets.dark-slider-list': PageComponetsDarkSliderList;
      'page-componets.demonstrate-card': PageComponetsDemonstrateCard;
      'page-componets.demonstrate-section': PageComponetsDemonstrateSection;
      'page-componets.digital-about': PageComponetsDigitalAbout;
      'page-componets.digital-analytics': PageComponetsDigitalAnalytics;
      'page-componets.digital-analytics-list1': PageComponetsDigitalAnalyticsList1;
      'page-componets.digital-analytics-list2': PageComponetsDigitalAnalyticsList2;
      'page-componets.digital-benefits': PageComponetsDigitalBenefits;
      'page-componets.digital-benifit-card': PageComponetsDigitalBenifitCard;
      'page-componets.digital-card': PageComponetsDigitalCard;
      'page-componets.digital-card-list': PageComponetsDigitalCardList;
      'page-componets.digital-card-slider': PageComponetsDigitalCardSlider;
      'page-componets.digital-card-slider-list': PageComponetsDigitalCardSliderList;
      'page-componets.digital-erp-list': PageComponetsDigitalErpList;
      'page-componets.digital-full-lifecycle': PageComponetsDigitalFullLifecycle;
      'page-componets.digital-inspire': PageComponetsDigitalInspire;
      'page-componets.digital-inspire-list': PageComponetsDigitalInspireList;
      'page-componets.digital-services-section': PageComponetsDigitalServicesSection;
      'page-componets.digital-services-section-list': PageComponetsDigitalServicesSectionList;
      'page-componets.domain-data': PageComponetsDomainData;
      'page-componets.domain-slides': PageComponetsDomainSlides;
      'page-componets.erp-list': PageComponetsErpList;
      'page-componets.export-migration': PageComponetsExportMigration;
      'page-componets.fabcon-about': PageComponetsFabconAbout;
      'page-componets.fabcon-ai-powered': PageComponetsFabconAiPowered;
      'page-componets.fabcon-ai-poweres-list': PageComponetsFabconAiPoweresList;
      'page-componets.fabcon-composable-intelligence': PageComponetsFabconComposableIntelligence;
      'page-componets.fabcon-composable-intelligence-list': PageComponetsFabconComposableIntelligenceList;
      'page-componets.fabcon-data-analytics': PageComponetsFabconDataAnalytics;
      'page-componets.fabcon-data-analytics-bottom-list': PageComponetsFabconDataAnalyticsBottomList;
      'page-componets.fabcon-data-analytics-mid': PageComponetsFabconDataAnalyticsMid;
      'page-componets.fabcon-data-analytics-mid-list': PageComponetsFabconDataAnalyticsMidList;
      'page-componets.fabcon-data-analytics-top-list': PageComponetsFabconDataAnalyticsTopList;
      'page-componets.fabcon-decision-fabric': PageComponetsFabconDecisionFabric;
      'page-componets.fabcon-fabric-ai-leadership': PageComponetsFabconFabricAiLeadership;
      'page-componets.fabcon-fabric-ai-leadership-list': PageComponetsFabconFabricAiLeadershipList;
      'page-componets.fabcon-fabric-community-conference': PageComponetsFabconFabricCommunityConference;
      'page-componets.fabcon-led-transformation': PageComponetsFabconLedTransformation;
      'page-componets.fabcon-led-transformation-list': PageComponetsFabconLedTransformationList;
      'page-componets.fabcon-smart-forge': PageComponetsFabconSmartForge;
      'page-componets.faq': PageComponetsFaq;
      'page-componets.faq-title': PageComponetsFaqTitle;
      'page-componets.footergridlist': PageComponetsFootergridlist;
      'page-componets.full-lifecycle-bottom': PageComponetsFullLifecycleBottom;
      'page-componets.full-lifecycle-bottom-card': PageComponetsFullLifecycleBottomCard;
      'page-componets.full-lifecycle-mid': PageComponetsFullLifecycleMid;
      'page-componets.full-lifecycle-mid-list1': PageComponetsFullLifecycleMidList1;
      'page-componets.full-lifecycle-top': PageComponetsFullLifecycleTop;
      'page-componets.full-lifecycle-top-list': PageComponetsFullLifecycleTopList;
      'page-componets.gram-banner': PageComponetsGramBanner;
      'page-componets.grid-system': PageComponetsGridSystem;
      'page-componets.griddetails': PageComponetsGriddetails;
      'page-componets.griditemlist': PageComponetsGriditemlist;
      'page-componets.gridlist': PageComponetsGridlist;
      'page-componets.gridlisting': PageComponetsGridlisting;
      'page-componets.image': PageComponetsImage;
      'page-componets.image-section': PageComponetsImageSection;
      'page-componets.industry-build-data': PageComponetsIndustryBuildData;
      'page-componets.industry-featured-content': PageComponetsIndustryFeaturedContent;
      'page-componets.industry-intelligent-experience': PageComponetsIndustryIntelligentExperience;
      'page-componets.industry-service-portfolio': PageComponetsIndustryServicePortfolio;
      'page-componets.industry-solution-spotlight': PageComponetsIndustrySolutionSpotlight;
      'page-componets.insights-section': PageComponetsInsightsSection;
      'page-componets.insights-section-card': PageComponetsInsightsSectionCard;
      'page-componets.inspire-section': PageComponetsInspireSection;
      'page-componets.inspire-section-card': PageComponetsInspireSectionCard;
      'page-componets.key-metrics-section': PageComponetsKeyMetricsSection;
      'page-componets.kpi-partner': PageComponetsKpiPartner;
      'page-componets.kpi-partner-items': PageComponetsKpiPartnerItems;
      'page-componets.light-slider-card': PageComponetsLightSliderCard;
      'page-componets.light-slider-group-list': PageComponetsLightSliderGroupList;
      'page-componets.light-slider-list': PageComponetsLightSliderList;
      'page-componets.list-left': PageComponetsListLeft;
      'page-componets.listbox': PageComponetsListbox;
      'page-componets.listitems': PageComponetsListitems;
      'page-componets.microsoft-gold-certified': PageComponetsMicrosoftGoldCertified;
      'page-componets.microsoft-gold-certified-card1': PageComponetsMicrosoftGoldCertifiedCard1;
      'page-componets.microsoft-gold-certified-card2': PageComponetsMicrosoftGoldCertifiedCard2;
      'page-componets.mid-fabcon-data-analytics': PageComponetsMidFabconDataAnalytics;
      'page-componets.midmarket-enterprises': PageComponetsMidmarketEnterprises;
      'page-componets.midmarket-enterprises-list': PageComponetsMidmarketEnterprisesList;
      'page-componets.partner-logos': PageComponetsPartnerLogos;
      'page-componets.pricing-section': PageComponetsPricingSection;
      'page-componets.request-consultation': PageComponetsRequestConsultation;
      'page-componets.salesforce': PageComponetsSalesforce;
      'page-componets.salesforce-services': PageComponetsSalesforceServices;
      'page-componets.sap-image-section': PageComponetsSapImageSection;
      'page-componets.sap-implementation': PageComponetsSapImplementation;
      'page-componets.sap-practice-areas': PageComponetsSapPracticeAreas;
      'page-componets.sap-questionnaire': PageComponetsSapQuestionnaire;
      'page-componets.sap-section-data': PageComponetsSapSectionData;
      'page-componets.sap-section-image': PageComponetsSapSectionImage;
      'page-componets.sap-why-korcomptenz': PageComponetsSapWhyKorcomptenz;
      'page-componets.slide-content': PageComponetsSlideContent;
      'page-componets.slider-service-section': PageComponetsSliderServiceSection;
      'page-componets.smart-forge-build': PageComponetsSmartForgeBuild;
      'page-componets.smart-forge-build-list': PageComponetsSmartForgeBuildList;
      'page-componets.smart-forge-enterprises': PageComponetsSmartForgeEnterprises;
      'page-componets.smart-forge-operational-roadblock': PageComponetsSmartForgeOperationalRoadblock;
      'page-componets.smart-forge-operational-roadblock-list': PageComponetsSmartForgeOperationalRoadblockList;
      'page-componets.solutions': PageComponetsSolutions;
      'page-componets.solutions-data': PageComponetsSolutionsData;
      'page-componets.step-grid-section': PageComponetsStepGridSection;
      'page-componets.sticky-card': PageComponetsStickyCard;
      'page-componets.sticky-cards-list': PageComponetsStickyCardsList;
      'page-componets.sticky-title-card': PageComponetsStickyTitleCard;
      'page-componets.sticky-title-list': PageComponetsStickyTitleList;
      'page-componets.stretchable-card': PageComponetsStretchableCard;
      'page-componets.stretchable-section': PageComponetsStretchableSection;
      'page-componets.tab-section': PageComponetsTabSection;
      'page-componets.tablist': PageComponetsTablist;
      'page-componets.tablistdeatils': PageComponetsTablistdeatils;
      'page-componets.tech-data': PageComponetsTechData;
      'page-componets.testimonials': PageComponetsTestimonials;
      'page-componets.what-to-expect': PageComponetsWhatToExpect;
      'page-componets.why-we-are': PageComponetsWhyWeAre;
      'page-componets.why-we-are-list': PageComponetsWhyWeAreList;
      'page-componets.whygridlisting': PageComponetsWhygridlisting;
      'seo.seo': SeoSeo;
      'service.banner-section-data': ServiceBannerSectionData;
      'sub-page-componets.badges': SubPageComponetsBadges;
      'sub-page-componets.build-data-right-section': SubPageComponetsBuildDataRightSection;
      'sub-page-componets.cloud-ai-power-list': SubPageComponetsCloudAiPowerList;
      'sub-page-componets.cloud-banner-list': SubPageComponetsCloudBannerList;
      'sub-page-componets.cloud-buil-list': SubPageComponetsCloudBuilList;
      'sub-page-componets.cloud-first-call-list': SubPageComponetsCloudFirstCallList;
      'sub-page-componets.cloud-migration-list': SubPageComponetsCloudMigrationList;
      'sub-page-componets.cloud-migration-sublist': SubPageComponetsCloudMigrationSublist;
      'sub-page-componets.cloud-offering-list': SubPageComponetsCloudOfferingList;
      'sub-page-componets.cloud-offering-sublist': SubPageComponetsCloudOfferingSublist;
      'sub-page-componets.cloud-recognition-list': SubPageComponetsCloudRecognitionList;
      'sub-page-componets.description': SubPageComponetsDescription;
      'sub-page-componets.digitial-countries': SubPageComponetsDigitialCountries;
      'sub-page-componets.digitial-features': SubPageComponetsDigitialFeatures;
      'sub-page-componets.digitial-stats': SubPageComponetsDigitialStats;
      'sub-page-componets.footer-list': SubPageComponetsFooterList;
      'sub-page-componets.gram-banner-list': SubPageComponetsGramBannerList;
      'sub-page-componets.image-list': SubPageComponetsImageList;
      'sub-page-componets.industry-experience-list': SubPageComponetsIndustryExperienceList;
      'sub-page-componets.industry-featured-list': SubPageComponetsIndustryFeaturedList;
      'sub-page-componets.industry-service-bullets': SubPageComponetsIndustryServiceBullets;
      'sub-page-componets.industry-service-list': SubPageComponetsIndustryServiceList;
      'sub-page-componets.industry-service-sublist': SubPageComponetsIndustryServiceSublist;
      'sub-page-componets.industry-spotlight-list': SubPageComponetsIndustrySpotlightList;
      'sub-page-componets.list': SubPageComponetsList;
      'sub-page-componets.pricing-plan': SubPageComponetsPricingPlan;
      'sub-page-componets.responsive-image': SubPageComponetsResponsiveImage;
      'sub-page-componets.sub-list': SubPageComponetsSubList;
      'sub-page-componets.sublist': SubPageComponetsSublist;
      'sub-page-componets.tab-list': SubPageComponetsTabList;
      'sub-page-componets.title-description': SubPageComponetsTitleDescription;
      'sub-page-componets.title-multi-description': SubPageComponetsTitleMultiDescription;
    }
  }
}
