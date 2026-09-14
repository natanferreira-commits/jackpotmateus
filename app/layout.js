import "./globals.css";
import { config } from "./config";

export const metadata = {
  title: "Quiz de Futebol — responda e resgate seu prêmio",
  description:
    "5 perguntas rápidas de futebol. Quanto mais você acertar, maior o prêmio pra resgatar no WhatsApp.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Quiz de Futebol — responda e resgate seu prêmio",
    description: "Teste o que você sabe de futebol e resgate seu prêmio no WhatsApp.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
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
    <html lang="pt-BR">
      <head>
        <Pixel id={config.pixelId} />
      </head>
      <body>{children}</body>
    </html>
  );
}
