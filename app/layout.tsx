import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SupabseProvider from "@/providers/SupabseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import LoaderProvider from "@/providers/LoaderProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify clone",
  description: "Listen to music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/spotify.png" type="image/x-icon" />
      </head>
      <body className={figtree.className}>
        <ToasterProvider/>
        <SupabseProvider>
          <UserProvider>
            <ModalProvider />
            <LoaderProvider/>
            <Sidebar userSongs={userSongs}>{children}</Sidebar>
            <Player/>
          </UserProvider>
        </SupabseProvider>
      </body>
    </html>
  );
}
