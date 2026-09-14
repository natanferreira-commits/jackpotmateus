import { Archivo } from "next/font/google";
import "./globals.css";
import { config } from "./config";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata = {
  title: "Bolão da Libertadores — R$ 500 pra quem cravar 8 palpites",
  description:
    "Dois palpites por jogo das quartas de final. Cravou os 8, leva R$ 500 no Pix. Grátis.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Bolão da Libertadores — R$ 500 pra quem cravar 8 palpites",
    description: "Crava seus 8 palpites da rodada, registra o bilhete no WhatsApp e concorre a R$ 500.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#050814",
  width: "device-width",
  initialScale: 1,
};

function Pixel({ id }) {
  if (!id) return null;
  const code = [
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?",
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;",
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;",
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,",
    "document,'script','https://connect.facebook.net/en_US/fbevents.js');",
    "fbq('init','" + id + "');fbq('track','PageView');",
  ].join("\n");
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <head>
        <Pixel id={config.pixelId} />
      </head>
      <body>{children}</body>
    </html>
  );
}
