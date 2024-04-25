/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'Billing': { kind: 'OBJECT'; name: 'Billing'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'customerId': { name: 'customerId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'monthlyCredits': { name: 'monthlyCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'usedCredits': { name: 'usedCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'additionalCredits': { name: 'additionalCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'remainingCredits': { name: 'remainingCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'debtLimit': { name: 'debtLimit'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'ID': unknown;
    'String': unknown;
    'Int': unknown;
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'billing': { name: 'billing'; type: { kind: 'OBJECT'; name: 'Billing'; ofType: null; } }; }; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'setBillingPlan': { name: 'setBillingPlan'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Billing'; ofType: null; }; } }; 'addAdditionalCredits': { name: 'addAdditionalCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Billing'; ofType: null; }; } }; 'checkAvailableCredits': { name: 'checkAvailableCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'Boolean': unknown;
    'SetBillingInput': { kind: 'INPUT_OBJECT'; name: 'SetBillingInput'; inputFields: [{ name: 'customerId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'monthlyCredits'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'debtLimit'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }]; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}