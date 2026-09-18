//export const createCartMutationWithAttributes = `
// mutation createCart($lines: [CartLineInput!]!, $attributes: [AttributeInput!]) {
//   cartCreate(input: { lines: $lines, attributes: $attributes }) {
//   mutation createCart($lines: [CartLineInput!]!, $attributes: [AttributeInput!], $countryCode: CountryCode) {
//     cartCreate(input: { lines: $lines, attributes: $attributes, buyerIdentity: { countryCode: $countryCode } }) {
//       cart {
//         buyerIdentity {
//           countryCode
//         }
//         id
//         checkoutUrl
//         attributes {
//           key
//           value
//         }
//         cost {
//           totalAmount {
//             amount
//             currencyCode
//           }
//         }
//         lines(first: 100) {
//           edges {
//             node {
//               id
//               quantity
//               cost {
//                 compareAtAmount {
//                   amount
//                   currencyCode
//                 }
//                 amount {
//                   amount
//                   currencyCode
//                 }
//               }
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `
export const createCartMutationWithAttributes = `
  mutation createCart($lines: [CartLineInput!]!, $attributes: [AttributeInput!], $countryCode: CountryCode) {
    cartCreate(input: { lines: $lines, attributes: $attributes, buyerIdentity: { countryCode: $countryCode } }) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          countryCode
        }
        lines(first: 50) {
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
                  title
                  product {
                    title
                  }
                  id
                  quantityAvailable
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
        code
        message
      }
    }
  }
`;
export const createCartMutation = `
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
`; // export const createCartMutation = `
//   mutation createCart($lines: [CartLineInput!]!) {
//     cartCreate(input: lines: $lines}) {
//       cart {
//         id
//         checkoutUrl
//         attributes {
//           key
//           value
//         }
//         lines(first: 100) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `
export const addToCartMutation = `
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
`;
export const updateCartAttributes = `
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
`; // mutation with the selling plans:
export const createCartMutationNoPlans = `
mutation cartCreate($input: CartInput!, $countryCode: CountryCode) {
  cartCreate(input: $input, buyerIdentity: { countryCode: $countryCode }) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        countryCode
      }
      createdAt
      note
      attributes {
        key
        value
      }
      lines(first: 10) {
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
                title
                price {
                  amount
                  currencyCode
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
}
`;
export const addToCartMutationNoPlans = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $attributes: [AttributeInput!]) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        countryCode
      }
      note
      attributes {
        key
        value
      }
      lines(first: 10) {
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
                title
                price {
                  amount
                  currencyCode
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
  cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
    cart {
      id
      note
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
`;
/***
 * Cart Product Card V2 Mutations
 */
export const updatelineMutation = `
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
`;
export const removeLineMutation = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
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
  }`;
export const updatelineMutationNoPlans = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
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
  }`;
export const removeLineMutationNoPlans = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
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
  }`;
export const getProducts = `
  query GetProducts($cursor: String) {
    products(first: 250, after: $cursor) {
      edges {
        node {
          id
          title
          vendor
          handle
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
               }
              }
          }
          totalInventory
          sellingPlanGroups(first: 1) {
            edges {
              node {
                name
                options {
                  name
                  values
                }
                sellingPlans(first: 10) {
                  edges {
                    node {
                      id
                      name
                      description
                      recurringDeliveries
                      priceAdjustments {
                        orderCount
                        adjustmentValue {
                          __typename
                          ... on SellingPlanPercentagePriceAdjustment {
                            adjustmentPercentage
                          }
                          ... on SellingPlanFixedAmountPriceAdjustment {
                            adjustmentAmount {
                              amount
                              currencyCode
                            }
                          }
                          ... on SellingPlanFixedPriceAdjustment {
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            edges {
              node {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                title
                sku
                availableForSale
                requiresShipping
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export const getProductsBackup = `
  query GetProductsBackup($cursor: String) {
    products(first: 250, after: $cursor) {
      edges {
        node {
          id
          title
          vendor
          handle
          totalInventory
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
               }
              }
          }
          options {
            id
            name
            values
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            edges {
              node {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                title
                sku
                availableForSale
                requiresShipping
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export const getCartQuery = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      buyerIdentity {
        countryCode
      }
      lines(first: 250) {
        edges {
          node {
            id
            quantity
            sellingPlanAllocation { 
              checkoutChargeAmount {
                amount
                currencyCode
              }
              sellingPlan {
                id
                name
                description
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                selectedOptions {
                  name
                  value
                }
                product {
                  title
                  handle
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
            attributes {
              key
              value
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
      }
      attributes {
        key
        value
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
`;
export const getCartQueryNoPlans = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      buyerIdentity {
        countryCode
      }
      lines(first: 250) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                selectedOptions {
                  name
                  value
                }
                product {
                  title
                  handle
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
            attributes {
              key
              value
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
      }
      attributes {
        key
        value
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
`;
export const cartQuery = `
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
`;
export const getProductMetafields = `
  query getProductMetafields($handle: String!) {
    product(handle: $handle) {
      id
      metafield_order_max: metafield(namespace: "custom", key: "order_max") {
        value
        type
      }
    }
  }
`; // Get available currencies from the store
export const getAvailableCurrencies = `
  query getAvailableCurrencies {
    localization {
      availableCountries {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
        unitSystem
      }
      country {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
      }
    }
  }
`; // Get products by country
export const getProductsQueryByCountry = `
  query GetProductsByCountry ($cursor: String, $countryCode: CountryCode) @inContext(country: $countryCode) {
    products(first: 250, after: $cursor) {
      edges {
        node {
          id
          title
          vendor
          handle
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          sellingPlanGroups(first: 1) {
            edges {
              node {
                name
                options {
                  name
                  values
                }
                sellingPlans(first: 10) {
                  edges {
                    node {
                      id
                      name
                      description
                      recurringDeliveries
                      priceAdjustments {
                        orderCount
                        adjustmentValue {
                          __typename
                          ... on SellingPlanPercentagePriceAdjustment {
                            adjustmentPercentage
                          }
                          ... on SellingPlanFixedAmountPriceAdjustment {
                            adjustmentAmount {
                              amount
                              currencyCode
                            }
                          }
                          ... on SellingPlanFixedPriceAdjustment {
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            edges {
              node {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                title
                sku
                quantityAvailable
                availableForSale
                requiresShipping
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export const updateCartCurrency = `
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
`;
export const __FramerMetadata__ = {
    "exports": {
        "updateCartAttributes": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getProducts": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getCartQueryNoPlans": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "updatelineMutationNoPlans": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "addToCartMutationNoPlans": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "removeLineMutationNoPlans": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getAvailableCurrencies": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "cartQuery": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getProductsBackup": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getProductMetafields": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "updateCartCurrency": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getCartQuery": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getProductsQueryByCountry": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "addToCartMutation": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "createCartMutationWithAttributes": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "updatelineMutation": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "createCartMutationNoPlans": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "createCartMutation": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "removeLineMutation": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./mutations_v2.map