type LocalizedRouteProps = {
  locale: string;
  route: string;
};

/**
 * Formats a route by prefixing it with the specified locale.
 *
 * @param locale - The locale to use in the route.
 * @param route - The route to be localized.
 * @returns A formatted string representing the localized route.
 */
const formatLocalizedRoute = ({ locale, route }: LocalizedRouteProps): string =>
  `/${locale}${route}`;

export default formatLocalizedRoute;
