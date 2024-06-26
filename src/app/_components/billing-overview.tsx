"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery, useMutation } from "@urql/next";
import { graphql } from "gql.tada";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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

const UpdateMonthlyCreditsMutation = graphql(`
  mutation UpdateMonthlyCredits($input: SetBillingInput!) {
    setBillingPlan(setBillingInput: $input) {
      customerId
      monthlyCredits
      additionalCredits
      usedCredits
      remainingCredits
      debtLimit
    }
  }
`);

export function BillingOverview() {
  const [customerId, setCustomerId] = useState("");

  return (
    <>
      <InputCustomerId params={{ customerId, setCustomerId }} />
      <CustomerCreditBalance params={{ customerId }} />
    </>
  );
}

function InputCustomerId({
  params,
}: {
  params: { customerId: string; setCustomerId: (customerId: string) => void };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Id input</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Customer ID"
          value={params.customerId}
          onChange={(e) => params.setCustomerId(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}

function CustomerCreditBalance({ params }: { params: { customerId: string } }) {
  const [result] = useQuery({
    query: CreditBalanceQuery,
    variables: { customerId: params.customerId },
  });
  if (result.fetching) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  if (!result.data?.billing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No data</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Credit Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <Label>per month</Label>
          <Label>{result.data.billing.monthlyCredits}</Label>
        </div>
        <div className="flex flex-row justify-between">
          <Label>left this month</Label>
          <Label>{result.data.billing.remainingCredits}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <EditMonthlyCredits
          params={{
            customerId: params.customerId,
            currentMonthlyCredit: result.data.billing.monthlyCredits,
            limit: result.data.billing.debtLimit,
          }}
        />
      </CardFooter>
    </Card>
  );
}

function EditMonthlyCredits({
  params,
}: {
  params: { customerId: string; currentMonthlyCredit: number; limit: number };
}) {
  const [open, setOpen] = useState(false);
  const [monthlyCredits, setMonthlyCredits] = useState(
    params.currentMonthlyCredit,
  );
  const [mutation, runMutation] = useMutation(UpdateMonthlyCreditsMutation);

  useEffect(() => {
    setMonthlyCredits(params.currentMonthlyCredit);
  }, [params.currentMonthlyCredit, setMonthlyCredits]);

  async function onSubmit() {
    console.log("submit", monthlyCredits);
    const result = await runMutation({
      input: {
        customerId: params.customerId,
        monthlyCredits,
        debtLimit: params.limit,
      },
    });
    if (result.error) {
      // todo: show to user
      console.error(result.error);
      return;
    }
    // todo: show toast that it was successful
    setOpen(false);
  }

  // todo: use form to introduce validation
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">Edit monthly credits</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit monthly credits</DialogTitle>
        </DialogHeader>
        <Input
          value={monthlyCredits}
          type="number"
          onChange={(e) => setMonthlyCredits(Number(e.target.value))}
        />
        <DialogFooter>
          <Button disabled={mutation.fetching} onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
