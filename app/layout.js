import NavBar from "@/components/NavBar";
import dbConnect from "@/services/mongo";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Tree - Home",
  description:
    "A single entry to connected to all the online events from the globe.",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="py-8">{children}</main>
      </body>
    </html>
  );
}
