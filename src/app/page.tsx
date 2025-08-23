import dynamic from "next/dynamic";

const DashboardPage = dynamic(
  () => import("../features/dashboard/DashboardPage")
);

export default function Home() {
  return (
    <main className="min-h-screen w-full px-4 py-6 md:px-8 bg-gray-100 text-gray-900">
      <DashboardPage />
    </main>
  );
}
