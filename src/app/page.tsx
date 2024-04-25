import { BillingOverview } from "./_components/billing-overview";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Hello World</h1>
      <BillingOverview />
    </main>
  );
}
