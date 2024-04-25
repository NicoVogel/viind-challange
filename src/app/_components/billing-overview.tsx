"use client";

import { graphql } from "gql.tada";
import { useQuery } from "@urql/next";

const CreditBalanceQuery = graphql(`
  query GetCreditBalance($customerId: String!) {
    billing(customerId: $customerId) {
      id
      monthlyCredits
      usedCredits
      additionalCredits
      remainingCredits
      debtLimit
    }
  }
`);

export function BillingOverview() {
  const [result] = useQuery({
    query: CreditBalanceQuery,
    variables: { customerId: "1234" },
  });
  if (result.fetching) return <p>Loading...</p>;

  return <section>{JSON.stringify(result.data, null, 2)}</section>;
}
