/**
 * Umami custom event names (snake_case).
 * Use with `trackEvent()` or `data-umami-event` + `data-umami-event-*` props.
 *
 * @see https://umami.is/docs/track-events
 */

export const UMAMI_EVENTS = {
  /** Anchor navigation to #sections. Extra props: location, section */
  NAV_SECTION_CLICK: 'nav_section_click',

  NAV_LOGO_CLICK: 'nav_logo_click',

  /** Resume PDF CTAs. Extra props: location (header | hero | mobile_menu) */
  CTA_RESUME_CLICK: 'cta_resume_click',

  /** Hero primary → #portfolio. Extra props: location */
  CTA_PORTFOLIO_CLICK: 'cta_portfolio_click',

  /** Project card outbound links. Extra props: link_type (live | github), project_slug */
  PORTFOLIO_PROJECT_LINK_CLICK: 'portfolio_project_link_click',

  /** Social profile links. Extra props: location, network */
  SOCIAL_LINK_CLICK: 'social_link_click',

  /** Certification “View credential”. Extra props: cert_id */
  CERT_CREDENTIAL_CLICK: 'cert_credential_click',

  CONTACT_FORM_SUBMIT_ATTEMPT: 'contact_form_submit_attempt',
  CONTACT_FORM_SUBMIT_SUCCESS: 'contact_form_submit_success',
  CONTACT_FORM_SUBMIT_ERROR: 'contact_form_submit_error',

  UI_BACK_TO_TOP_CLICK: 'ui_back_to_top_click',

  /** LinkedIn link from testimonial cards */
  TESTIMONIAL_LINKEDIN_CLICK: 'testimonial_linkedin_click',

  /** Carousel prev / next. Extra props: direction (prev | next) */
  TESTIMONIALS_CAROUSEL_ARROW: 'testimonials_carousel_arrow',

  /** Carousel dot pagination. Extra props: index (0-based) */
  TESTIMONIALS_CAROUSEL_DOT: 'testimonials_carousel_dot',

  /** Non-fatal client logging (@/lib/error-tracking) */
  ERROR_CLIENT: 'error_client',

  /** React error boundary (app/error.tsx) */
  APP_ERROR_BOUNDARY: 'app_error_boundary',

  ERROR_BOUNDARY_RELOAD: 'error_boundary_reload',
  ERROR_BOUNDARY_RETRY: 'error_boundary_retry',
} as const;

export type UmamiEventName = (typeof UMAMI_EVENTS)[keyof typeof UMAMI_EVENTS];
