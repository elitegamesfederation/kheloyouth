// Hook for the "shop_click" event, called when someone taps "Buy on Amazon".
//
// The site has no event analytics yet. VisitorTracker only records page views
// into Firestore's `pageViews` collection, and the admin dashboard counts every
// document in it as a visit, so click events must NOT be written there or they
// would inflate the visitor numbers.
//
// When an analytics tool is added, send the event from this one function.
// For example, with Google Analytics 4 (gtag):
//
//   window.gtag?.("event", "shop_click", { product_id: productId });
//
// Do not call preventDefault or redirect from here: the link must go straight
// to Amazon.
export function trackShopClick(productId: string): void {
  void productId;
}
