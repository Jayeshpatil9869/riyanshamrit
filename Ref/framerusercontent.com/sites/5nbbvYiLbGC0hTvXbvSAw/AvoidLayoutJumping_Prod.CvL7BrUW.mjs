import{t as e}from"./rolldown-runtime.Dh6celcD.mjs";import{A as t,B as n,E as r,F as i,H as a,l as o,s}from"./react.CJOJsS6v.mjs";import{M as c,Z as l,o as u,w as d}from"./framer.DRvrCH-6.mjs";var f,p,m,h,g,_,v,y,b,x,S=e((()=>{f=`
  mutation createCart($lines: [CartLineInput!]!, $countryCode: CountryCode) {
    cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: $countryCode } }) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          countryCode
        }
        attributes {
          key
          value
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`,p=`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          countryCode
        }
        attributes {
          key
          value
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    title
                    metafields(
                      identifiers: [
                        { namespace: "custom", key: "order_max" }
                      ]
                    ) {
                      namespace
                      key
                      value
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`,m=`
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        id
        attributes {
          key
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`,h=`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        buyerIdentity {
          countryCode
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    handle
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`,g=`mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
              id
              buyerIdentity {
                countryCode
              }
              lines(first: 250) {
                  edges {
                      node {
                          id
                          quantity
                          sellingPlanAllocation{ 
                              checkoutChargeAmount{
                                  amount
                                  currencyCode
                                  }
                          }
                          cost {
                              totalAmount {
                                  amount
                                  currencyCode
                              }
                              subtotalAmount {
                                  amount
                                  currencyCode
                              }
                          }
                          merchandise {
                              ... on ProductVariant {
                                  id
                                  title
                                  product {
                                      id
                                      title
                                  }
                                  price {
                                      amount
                                      currencyCode
                                  }
                                  image {
                                      url
                                  }
                                      selectedOptions
                            {
                              name
                              value
                            }
                              }
                          }
                      }
                  }
              }
          }
          userErrors {
              field
              message
          }
      }
  }`,_=`mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
              id
              buyerIdentity {
                countryCode
              }
              cost {
                  totalAmount {
                      amount
                      currencyCode
                  }
                  subtotalAmount {
                      amount
                      currencyCode
                  }
              }
              lines(first: 250) {
                  edges {
                      node {
                          id
                          quantity
                          cost {
                              totalAmount {
                                  amount
                                  currencyCode
                              }
                              subtotalAmount {
                                  amount
                                  currencyCode
                              }
                          }
                          merchandise {
                              ... on ProductVariant {
                                  id
                                  title
                                  product {
                                      id
                                      title
                                  }
                                  price {
                                      amount
                                      currencyCode
                                  }
                                  image {
                                      url
                                  }
                                  selectedOptions
                                  {
                              name
                              value
                            }

                              }
                          }
                      }
                  }
              }
          }
          userErrors {
              field
              message
          }
      }
  }`,v=`mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
              id
              buyerIdentity {
                countryCode
              }
              lines(first: 250) {
                  edges {
                      node {
                          id
                          quantity
                          cost {
                              totalAmount {
                                  amount
                                  currencyCode
                              }
                              subtotalAmount {
                                  amount
                                  currencyCode
                              }
                          }
                          merchandise {
                              ... on ProductVariant {
                                  id
                                  title
                                  product {
                                      id
                                      title
                                  }
                                  price {
                                      amount
                                      currencyCode
                                  }
                                  image {
                                      url
                                  }
                                      selectedOptions
                            {
                              name
                              value
                            }
                              }
                          }
                      }
                  }
              }
          }
          userErrors {
              field
              message
          }
      }
  }`,y=`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      buyerIdentity {
        countryCode
      }
      attributes {
        key
        value
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                product {
                  id
                  title
                  metafields(
                    identifiers: [
                      { namespace: "custom", key: "order_max" }
                    ]
                  ) {
                    namespace
                    key
                    value
                  }
                }
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
            sellingPlanAllocation {
              sellingPlan {
                id
                name
              }
              checkoutChargeAmount {
                amount
                currencyCode
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`,b=`
  query getProductMetafields($handle: String!) {
    product(handle: $handle) {
      id
      metafield_order_max: metafield(namespace: "custom", key: "order_max") {
        value
        type
      }
    }
  }
`,x=`
  mutation updateCartCurrency($cartId: ID!, $countryCode: CountryCode) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: { countryCode: $countryCode }) {
      cart {
        id
        buyerIdentity {
          countryCode
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`})),C,w,T,E,D,O,k=e((()=>{n(),C=e=>e?.split(`/`).pop()||``,w=()=>a!==void 0&&a.FCConsentManager?a.FCConsentManager.getConsent().marketing===!0:!0,T=e=>{if(!w())return;if(typeof fbq!=`function`){console.warn(`Facebook Pixel not available`);return}let{variant:t,product:n,quantity:r=1,currency:i=`USD`}=e;if(!t||!n){console.warn(`Missing variant or product data for Facebook Pixel tracking`);return}let a=C(t.id),o=n.title||``;t.title;let s=parseFloat(t.price?.amount||`0`),c=s*r,l=t.price?.currencyCode||i;if(!a||!o||s<=0){console.warn(`❌ Skipping Facebook Pixel AddToCart: missing required data`,{item_id:a,item_name:o,price:s,value:c});return}let u={content_type:`product`,content_ids:[a],content_name:o,content_category:n.productType||``,content_brand:n.vendor||``,value:parseFloat(c.toFixed(2)),currency:l,contents:[{id:a,price:parseFloat(s.toFixed(2)),quantity:parseInt(r.toString())}]};fbq(`track`,`AddToCart`,u,{eventID:`addtocart_`+Date.now()})},E=e=>{if(!w())return;if(typeof fbq!=`function`){console.warn(`Facebook Pixel not available`);return}let{variant:t,product:n,quantity:r=1,currency:i=`USD`,value:a,content_ids:o,content_name:s,num_items:c}=e,l={content_type:`product`,currency:i};if(t&&n){let e=C(t.id),a=n.title||``,o=parseFloat(t.price?.amount||`0`),s=o*r,c=t.price?.currencyCode||i;if(!e||!a||o<=0){console.warn(`❌ Skipping Facebook Pixel InitiateCheckout: missing required data`,{item_id:e,item_name:a,price:o,calculatedValue:s});return}l={content_type:`product`,content_ids:[e],content_name:a,content_category:n.productType||``,content_brand:n.vendor||``,value:parseFloat(s.toFixed(2)),currency:c,num_items:parseInt(r.toString())}}else if(o&&a!==void 0)l={content_type:`product`,content_ids:o,content_name:s||`Checkout`,value:parseFloat((typeof a==`number`?a:parseFloat(a)||0).toFixed(2)),currency:i,num_items:parseInt((c||1).toString())};else{console.warn(`❌ Skipping Facebook Pixel InitiateCheckout: insufficient data`,e);return}let u={eventID:`initiatecheckout_`+Date.now()};e.useBeacon?fbq(`track`,`InitiateCheckout`,l,{...u,transport:`beacon`}):fbq(`track`,`InitiateCheckout`,l,u)},D=e=>{if(!w())return;if(typeof fbq!=`function`){console.warn(`Facebook Pixel not available`);return}let{lineItem:t,currency:n=`USD`}=e;if(!t){console.warn(`Missing lineItem data for Facebook Pixel RemoveFromCart tracking`);return}let r=C(t.merchandise.id),i=t.merchandise.product?.title||``;t.merchandise.title;let a=parseFloat(t.cost.subtotalAmount.amount||`0`),o=t.quantity||1,s=a*o,c=t.cost.subtotalAmount.currencyCode||n;if(!r||!i||a<=0){console.warn(`❌ Skipping Facebook Pixel RemoveFromCart: missing required data`,{item_id:r,item_name:i,price:a,value:s,quantity:o});return}let l={content_type:`product`,content_ids:[r],content_name:i,content_category:t.merchandise.product?.productType||``,content_brand:t.merchandise.product?.vendor||``,value:parseFloat(s.toFixed(2)),currency:c,contents:[{id:r,price:parseFloat(a.toFixed(2)),quantity:parseInt(o.toString())}]};fbq(`track`,`RemoveFromCart`,l,{eventID:`removefromcart_`+Date.now()})},O=e=>{if(!w())return;if(typeof fbq!=`function`){console.warn(`Facebook Pixel not available`);return}let{variant:t,product:n,currency:r=`USD`}=e;if(!n){console.warn(`Missing product data for Facebook Pixel ViewContent tracking`);return}let i=C(t?t.id:n.id),a=n.title||``;t?.title;let o=parseFloat(t?t.price?.amount||`0`:n.priceRange?.minVariantPrice?.amount||`0`),s=t?.price?.currencyCode||n.priceRange?.minVariantPrice?.currencyCode||r;if(!i||!a||o<=0){console.warn(`❌ Skipping Facebook Pixel ViewContent: missing required data`,{item_id:i,item_name:a,price:o});return}let c={content_type:`product`,content_ids:[i],content_name:a,content_category:n.productType||``,content_brand:n.vendor||``,value:parseFloat(o.toFixed(2)),currency:s};fbq(`track`,`ViewContent`,c,{eventID:`viewcontent_`+Date.now()})}}));function A(e,t,n=30){let r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);let i=`expires=${r.toUTCString()}`,o=a.location.protocol===`https:`?`;secure`:``;document.cookie=`${e}=${t};${i};path=/${o}`}function j(e){let t=`${e}=`,n=document.cookie.split(`;`);for(let e=0;e<n.length;e++){let r=n[e];for(;r.charAt(0)===` `;)r=r.substring(1);if(r.indexOf(t)===0)return r.substring(t.length,r.length)}return null}function M(){let e=new URLSearchParams(a.location.search),t={};if([`utm_source`,`utm_medium`,`utm_campaign`,`utm_term`,`utm_content`].forEach(n=>{let r=e.get(n);r&&(t[n]=r)}),Object.keys(t).length>0)try{Object.entries(t).forEach(([e,t])=>{A(e,t)}),A(`_shopify_utm`,JSON.stringify(t)),a.utmParams=t}catch(e){console.error(`Error storing UTM parameters:`,e)}return t}function N(){let e=new URLSearchParams(a.location.search),t={};if([`sca_ref`,`sca_source`,`sca_medium`,`sca_campaign`,`sca_term`,`sca_content`].forEach(n=>{let r=e.get(n);r&&(t[n]=r)}),Object.keys(t).length>0)try{Object.entries(t).forEach(([e,t])=>{A(e,t)}),A(`_shopify_sca_ref`,JSON.stringify(t)),a.scaRefParams=t}catch(e){console.error(`Error storing SCA ref parameters:`,e)}return t}function P(){if(a.utmParams&&Object.keys(a.utmParams).length>0)return a.utmParams;try{let e=j(`_shopify_utm`);if(e)try{let t=JSON.parse(e);return a.utmParams=t,t}catch(e){console.error(`Error parsing Shopify UTM params:`,e)}let t={};if([`utm_source`,`utm_medium`,`utm_campaign`,`utm_term`,`utm_content`].forEach(e=>{let n=j(e);n&&(t[e]=n)}),Object.keys(t).length>0)return a.utmParams=t,t}catch(e){console.error(`Error retrieving stored UTM parameters:`,e)}return{}}function F(){if(a.scaRefParams&&Object.keys(a.scaRefParams).length>0)return a.scaRefParams;try{let e=j(`_shopify_sca_ref`);if(e)try{let t=JSON.parse(e);return a.scaRefParams=t,t}catch(e){console.error(`Error parsing Shopify SCA ref params:`,e)}let t={};if([`sca_ref`,`sca_source`,`sca_medium`,`sca_campaign`,`sca_term`,`sca_content`].forEach(e=>{let n=j(e);n&&(t[e]=n)}),Object.keys(t).length>0)return a.scaRefParams=t,t}catch(e){console.error(`Error retrieving stored SCA ref parameters:`,e)}return{}}function I(e){if(!e)return e;let t=P();Object.keys(t).length===0&&M();let n=P();if(Object.keys(n).length>0)try{let t=new URL(e);return Object.keys(n).forEach(e=>{t.searchParams.has(e)||t.searchParams.append(e,n[e])}),t.toString()}catch(t){return console.error(`Error appending UTM params to URL:`,t),e}return e}function L(e){if(!e)return e;let t=F();Object.keys(t).length===0&&N();let n=F();if(Object.keys(n).length>0)try{let t=new URL(e);return Object.keys(n).forEach(e=>{t.searchParams.has(e)||t.searchParams.append(e,n[e])}),t.toString()}catch(t){return console.error(`Error appending SCA ref params to URL:`,t),e}return e}function R(e){return!e||typeof e!=`string`||e.length>50?!1:/^[a-zA-Z0-9_-]+$/.test(e)}function z(){if(a===void 0||typeof sessionStorage>`u`)return null;try{let e=new URLSearchParams(a.location.search).get(`discount`);return e?R(e)?(sessionStorage.setItem(`fc_discount_code`,e),e):(console.warn(`Invalid discount code format. Only alphanumeric characters, hyphens, and underscores are allowed. Max length: 50 characters.`),null):null}catch(e){return console.error(`Error parsing discount code from URL:`,e),null}}function B(){if(a===void 0||typeof sessionStorage>`u`)return null;try{let e=sessionStorage.getItem(`fc_discount_code`);return e&&R(e)?e:(e&&sessionStorage.removeItem(`fc_discount_code`),null)}catch(e){return console.error(`Error retrieving stored discount code:`,e),null}}function V(e){if(!e)return e;let t=B();if(t)try{let n=new URL(e);return n.searchParams.has(`discount`)||n.searchParams.append(`discount`,t),n.toString()}catch(t){return console.error(`Error appending discount code to URL:`,t),e}return e}function H(e){if(!e)return e;let t=e;return t=I(t),t=L(t),t=V(t),t}var U=e((()=>{n(),a!==void 0&&(document.readyState===`complete`?(M(),N(),z()):a.addEventListener(`load`,()=>{M(),N(),z()}))}));function W({direction:e,style:n}){let r=d.current()===d.canvas,a=t(null),s=t(),c=e===`vertical`||e===`both`,l=e===`horizontal`||e===`both`;return i(()=>{if(r)return;let e=a.current?.parentElement?.parentElement;if(!e)return;let t=e.parentElement;if(!t)return;let n=()=>{let r=e.getBoundingClientRect();l&&(t.style.width=`${r.width}px`),c&&(t.style.height=`${r.height}px`),s.current=requestAnimationFrame(n)};return s.current=requestAnimationFrame(n),()=>{s.current&&cancelAnimationFrame(s.current),t&&(l&&(t.style.width=``),c&&(t.style.height=``))}},[e]),o(`div`,{ref:a,style:{...n}})}var G=e((()=>{s(),l(),r(),W.displayName=`Layout Jump Preventer`,c(W,{direction:{type:u.Enum,defaultValue:`vertical`,options:[`vertical`,`horizontal`,`both`],optionTitles:[`Vertical`,`Horizontal`,`Both`],displaySegmentedControl:!0,segmentedControlDirection:`vertical`,optionIcons:[`direction-vertical`,`direction-horizontal`,`direction-all`],description:`More components at [Framer University](https://frameruni.link/cc).`}})}));export{_ as S,g as _,M as a,x as b,T as c,O as d,p as f,S as g,b as h,N as i,E as l,f as m,G as n,U as o,y as p,H as r,k as s,W as t,D as u,v,h as x,m as y};
//# sourceMappingURL=AvoidLayoutJumping_Prod.CvL7BrUW.mjs.map